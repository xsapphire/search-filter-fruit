import { ReactElement, useRef, useState } from "react";
import { Option } from "../utils/option";
import { useClickOutside } from "../hooks/useClickOutside";
import styled from "styled-components";

const StyledUl = styled.ul`
  border: 1px solid #ddd;
`;

const SearchInput = styled.input`
  border: 1px solid #ddd;
  padding: 1em;
`;

type SelectProps = {
  options: Option[] | undefined;
  defaultValue?: Option;
  onChange?: (o: Option) => void;
};

export const Select = ({
  options,
  defaultValue,
  onChange,
}: SelectProps): ReactElement => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Option | undefined>(
    defaultValue
  );
  const [_options, setOptions] = useState<Option[] | undefined>(options);

  const onClickOutside = () => {
    setDropdownOpen(false);
  };

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  const handleInputChange = (input: string) => {
    const filteredOptions = options?.reduce<Option[]>((acc, option) => {
      if (option.label.toUpperCase().includes(input.toUpperCase())) {
        acc.push(option);
      }

      return acc;
    }, []);

    setOptions(filteredOptions);
  };

  return (
    <>
      <button onClick={() => setDropdownOpen(true)}>
        {selectedItem?.label}
      </button>
      {dropdownOpen && (
        <div ref={ref}>
          <SearchInput
            onChange={(event) => {
              handleInputChange(event.target.value);
            }}
          ></SearchInput>
          <StyledUl>
            {_options?.map((o) => {
              return (
                <li
                  key={o.value}
                  onClick={() => {
                    setSelectedItem(o);
                    setDropdownOpen(false);
                    onChange?.(o);
                  }}
                >
                  {o.label}
                </li>
              );
            })}
          </StyledUl>
        </div>
      )}
    </>
  );
};
