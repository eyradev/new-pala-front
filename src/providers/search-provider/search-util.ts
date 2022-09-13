export const asArray = (value: string | string[]) =>
  Array.isArray(value) ? value : [value];
