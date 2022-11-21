import { Bit, BitArr } from "./binaryTypes";

export type RulePattern = readonly [Bit, Bit, Bit];

export type Rule<T extends BitArr, Pattern extends RulePattern> = 
    T extends [infer X, infer Y, infer Z] 
        ? [X, Y, Z] extends Pattern ? 1 : 0
        : never;
