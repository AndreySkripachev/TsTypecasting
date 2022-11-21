import { Length, Tuple } from "./utils";

export type Add<A extends number, B extends number> = 
    Length<[...Tuple<A>, ...Tuple<B>]>;

export type Subtract<A extends number, B extends number> = 
    Tuple<A> extends [...(infer U), ...Tuple<B>]
        ? Length<U>
        : never;