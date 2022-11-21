export type I<Type extends 1 | true = 1> = Type;
export type O<Type extends 0 | false = 0> = Type;
export type Bit = I | O;
export type BitArr = readonly Bit[];