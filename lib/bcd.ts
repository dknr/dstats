export const splitDecimalDigits = (i: number): number[] => {
  const digits: number[] = [];
  while (i > 0) {
    digits.push(i % 10);
    i = Math.floor(i / 10);
  }
  return digits;
};
// export const binaryToBcd = (i: number): Uint8Array => {
//   const digits = splitDecimalDigits(i);
//   const nibbles = digits.reduce((acc, cur, idx) => {

//   });
// };
