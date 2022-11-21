import { Serializable } from "child_process";
import { Add, Subtract } from "../../types/arithmetic";
import { Length, MapAsString, NumberRange, ParseInt, Tuple } from "../../types/utils";
import { BitArr } from "./binaryTypes";
import { RulePattern, Rule } from "./rules";

/**
 * Neighborhood cells of the element.
 */
type GetNeighborhood<
    Arr extends BitArr, 
    Index extends number
> = Tuple<3> extends infer Neighborhood 
    ? NumberRange<0, 3> extends infer Length 
        ? {
            [K in keyof Neighborhood]: K extends string 
                ? ParseInt<K> extends Length 
                    ? Arr[Subtract<Add<ParseInt<K>, Index>, 1>] 
                    : Neighborhood[K]
                : never; 
        }
        : never 
    : never;

/**
 * Next
 */
type NextIteration<
    Arr extends BitArr,
    Pattern extends RulePattern
> = 
Subtract<Length<Arr>, 2> extends infer NextArrLength 
    ? NextArrLength extends number
        ? Tuple<NextArrLength> extends infer NextArr
            ? {
                [K in keyof NextArr]: 
                    K extends string 
                        ? ParseInt<K> extends never 
                            ? NextArr[K]
                            : Rule<GetNeighborhood<Arr, Add<ParseInt<K>, 1>>, Pattern>
                        : NextArr[K];
            } 
            : never
        : never
    : never;

type FormattedIteration<Arr extends BitArr, Iteration extends number> = [
    ...Tuple<Iteration, '-'>, 
    ...MapAsString<Arr>, 
    ...Tuple<Iteration, '-'>
];

type Calculate<Iteration extends BitArr, Pattern extends RulePattern, Acc extends readonly BitArr[] = []> = 
    Length<Iteration> extends 1 | 2 
        ? [...Acc, Iteration]
        : Calculate<NextIteration<Iteration, Pattern>, Pattern, [...Acc, Iteration]>

type MapAsFormatted<Arr extends readonly BitArr[]> = {
    [K in keyof Arr]: K extends string
        ? ParseInt<K> extends number 
            ? FormattedIteration<Arr[K], ParseInt<K>>
            : Arr[K]
        : Arr[K];
}

const a = [1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0] as const;
type Test = MapAsFormatted<
    Calculate<typeof a, [1, 0, 0]>
>;

// Output
type Fst = Test[0];
type Snd = Test[1];
type Trd = Test[2];
type Fth = Test[3];
type Fft = Test[4];
type Sxt = Test[5];

type Result = {
    [K in NumberRange<0, Length<Test>>]: Test[K]
}

