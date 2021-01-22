type Obj = Record<string, unknown>;

export const isObject = (val: unknown): val is Obj =>
  typeof val === "object" && val !== null;
