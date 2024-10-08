export type Option = {
  label: string;
  value: string;
};

export const createOptions = (names: string[]): Option[] => {
  return names.map((v) => {
    return {
      label: v,
      value: v.toLowerCase(),
    };
  });
};
