export const opacityToHex = (opacity: number): string => {
  return Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0');
};

export const getInitialOpacity = (color: string): number => {
  const opacity = color.slice(7);
  return opacity ? parseInt(opacity, 16) / 255 : 1;
};
