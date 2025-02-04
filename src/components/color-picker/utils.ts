import { RgbaColor } from 'react-colorful';

export const convertToHex = (color: RgbaColor) => {
  return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
};

export const convertToRgba = (hex: string) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return { r, g, b, a: 1 };
};
