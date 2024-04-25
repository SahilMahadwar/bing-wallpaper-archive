import Vibrant from "node-vibrant";
import { Color } from "~/types";

export function findClosestColor(
  targetColor: number[],
  colors: Color[]
): Color {
  let minDistance = Number.MAX_VALUE;
  let closestColor: Color = { name: "Yaru-dark", rgb: [233, 84, 32] };

  colors.forEach((color) => {
    const distance = Math.sqrt(
      Math.pow(color.rgb[0] - targetColor[0], 2) +
        Math.pow(color.rgb[1] - targetColor[1], 2) +
        Math.pow(color.rgb[2] - targetColor[2], 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  });

  return closestColor;
}

export const getColorTheme = ({
  imagePath,
  theme,
}: {
  imagePath: string;
  theme: Color[];
}): Promise<Color> => {
  return new Promise((resolve, reject) => {
    Vibrant.from(imagePath).getPalette((err, palette) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      // Extract the dominant color
      const dominantColor = palette?.Vibrant?.getRgb();

      if (dominantColor) {
        // Find the closest color from the array
        const closestColor = findClosestColor(dominantColor, theme);
        resolve(closestColor);
      } else {
        reject(new Error("Failed to extract dominant color"));
      }
    });
  });
};
