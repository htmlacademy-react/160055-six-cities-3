const getRandomInteger = (min: number, max: number) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = <Element>(array: Element[] | readonly Element[]) =>
  array[getRandomInteger(0, array.length - 1)];
