export const split_array_into_chunks = (
  array: string[],
  size: number
): string[][] => {
  const result: string[][] = [];
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
};
