import { access } from "fs";
import { Add, Subtract } from "../../types/arithmetic";
import { Length, MapAsString, NumberRange, ParseInt, Tuple } from "../../types/utils";
import { Bit, BitArr } from "./binaryTypes";
import { RuleForX } from "./rules";

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

type NextIteration<
    Arr extends BitArr,
> = 
Subtract<Length<Arr>, 2> extends infer NextArrLength 
    ? NextArrLength extends number
        ? Tuple<NextArrLength> extends infer NextArr
            ? {
                [K in keyof NextArr]: 
                    K extends string 
                        ? ParseInt<K> extends never 
                            ? NextArr[K]
                            : RuleForX<GetNeighborhood<Arr, Add<ParseInt<K>, 1>>>
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

type Calculate<Iteration extends BitArr, Acc extends readonly BitArr[] = []> = 
    Length<Iteration> extends 1 | 2 
        ? [...Acc, Iteration]
        : Calculate<NextIteration<Iteration>, [...Acc, Iteration]>

type MapAsFormatted<Arr extends readonly BitArr[]> = {
    [K in keyof Arr]: K extends string
        ? ParseInt<K> extends number 
            ? FormattedIteration<Arr[K], ParseInt<K>>
            : Arr[K]
        : Arr[K];
}

const a = [1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0] as const;
type Test = MapAsFormatted<Calculate<typeof a>>;

// Output
type Fst = Test[0];
type Snd = Test[1];
type Trd = Test[2];
type Fth = Test[3];
type Fft = Test[4];
type Sxt = Test[5];
