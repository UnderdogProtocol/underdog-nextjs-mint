const colors = {
  neonGreen: {
    50: "#f7fcf9",
    100: "#eff9f3",
    200: "#d6f1e0",
    300: "#bde8cd",
    400: "#8cd7a8",
    500: "#5BC682",
    600: "#52b275",
    700: "#449562",
    800: "#37774e",
    900: "#2d6140",
  },
  deepPurple: {
    50: "#f4f4f5",
    100: "#e8e8ea",
    200: "#c6c6cb",
    300: "#a3a3ab",
    400: "#5e5f6d",
    500: "#191A2E",
    600: "#171729",
    700: "#131423",
    800: "#0f101c",
    900: "#0c0d17",
  },
  lightPurple: {
    50: "#fcfbfe",
    100: "#f8f7fc",
    200: "#eeebf8",
    300: "#e3dff4",
    400: "#cfc8eb",
    500: "#bab0e3",
    600: "#a79ecc",
    700: "#8c84aa",
    800: "#706a88",
    900: "#5b566f",
  },
};

const primaryColor = colors.neonGreen;
const primary = {
  light: primaryColor[400],
  DEFAULT: primaryColor[500],
  dark: primaryColor[600],
  ...primaryColor,
};

const lightColor = colors.lightPurple;
const light = {
  light: colors.white,
  DEFAULT: lightColor[50],
  dark: lightColor[100],
  accent: lightColor[300],
  ...lightColor,
};

const darkColor = colors.deepPurple;
const dark = {
  accent: darkColor[400],
  light: darkColor[500],
  DEFAULT: darkColor[800],
  dark: darkColor[900],
  ...darkColor,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*"],
  theme: {
    extend: {
      colors: {
        primary,
        light,
        dark,
        ...colors,
      },
    },
  },
  darkMode: "class",
};
