import { BitArr } from "./binaryTypes";

export type RuleForX<T extends BitArr> = 
    T extends [infer X, infer Y, infer Z] 
        ? [X, Y, Z] extends
            (
                [1, 0, 0]
            )
            ? 1 : 0
        : never;