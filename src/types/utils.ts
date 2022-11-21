import { Add } from "./arithmetic";

export type Tuple<L extends number, TypeOfTuple = any, T extends readonly TypeOfTuple[] = []> = 
    T extends { length: L } ? T : Tuple<L, TypeOfTuple,[...T, TypeOfTuple]>;

export type Length<T extends readonly any[]> = 
    T extends { length: infer Length} ? Length : never;

export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type NumberRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type ParseInt<String extends string, CurrentNumber extends number = 0> =
    String extends `${number}` 
        ? `${CurrentNumber}` extends String 
            ? CurrentNumber 
            : ParseInt<String, Add<1, CurrentNumber>> 
        : never;

export type AsString<T extends string | number | boolean> = `${T}`;

export type MapAsString<Arr extends readonly (string | number | boolean)[]> = {
    [K in keyof Arr]: AsString<Arr[K]>;
}