export type Option = {
  label: string;
  value: string;
};

export const createOption = (name: string) => {
  return {
    label: name,
    value: name.toLowerCase(),
  };
};

export const createOptions = (names: string[]): Option[] => {
  return names.map((v) => {
    return {
      label: v,
      value: v.toLowerCase(),
    };
  });
};
