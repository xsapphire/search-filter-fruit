const baseColors = {
  "blue-500": "#0000cd",
  "grey-300": "#bababa",
  "red-500": "#7d1211",
};

export const themedColors = {
  blue: {
    primary: baseColors["blue-500"],
  },
  input: {
    border: baseColors["grey-300"],
    active: baseColors["blue-500"],
    placeholder: baseColors["grey-300"],
    error: baseColors["red-500"],
  },
  icon: {
    input: baseColors["grey-300"],
    hover: baseColors["blue-500"],
  },
};
