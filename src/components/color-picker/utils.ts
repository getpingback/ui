export const opacityToHex = (opacity: number): string => {
  return Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');
};
