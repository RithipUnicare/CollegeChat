import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * Width percentage
 * @param percentage - Percentage of screen width (0-100)
 * @returns Calculated width in pixels
 */
export const wp = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

/**
 * Height percentage
 * @param percentage - Percentage of screen height (0-100)
 * @returns Calculated height in pixels
 */
export const hp = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

/**
 * Font size scaler based on screen width
 * @param size - Base font size
 * @returns Scaled font size
 */
export const fs = (size: number): number => {
  return (SCREEN_WIDTH / 375) * size; // 375 is iPhone X width as base
};
