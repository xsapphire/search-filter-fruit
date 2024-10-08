import { ReactElement, useRef, useState } from "react";
import { Option } from "../utils/option";
import { useClickOutside } from "../hooks/useClickOutside";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faClose } from "@fortawesome/free-solid-svg-icons";

const SelectInputWrapper = styled.div`
  border: 1px solid #bababa;
  border-radius: 0.25em;
`;

const SelectInputDisplay = styled.div`
  padding: 0.5em;
`;

const SelectInputIcon = styled.div`
  padding: 0.5em;
  border-left: 1px solid #bababa;
`;

const ClearIcon = styled(FontAwesomeIcon)`
  z-index: 1;

  &:hover {
    color: blue;
  }
`;

const Dropdown = styled.div`
  border: 1px solid #bababa;
  background-color: #ffffff;
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

  const clearSelection = () => {
    setSelectedItem(undefined);
  };

  return (
    <div className="relative">
      <SelectInputWrapper className="flex gap-2 items-center">
        <SelectInputDisplay
          className="grow"
          onClick={() => setDropdownOpen(true)}
        >
          {selectedItem?.label}
        </SelectInputDisplay>

        <ClearIcon onClick={clearSelection} className="p-2" icon={faClose} />

        <SelectInputIcon onClick={() => setDropdownOpen(true)}>
          <FontAwesomeIcon color="#bababa" icon={faChevronDown} />
        </SelectInputIcon>
      </SelectInputWrapper>
      {dropdownOpen && (
        <Dropdown ref={ref} className="w-full absolute">
          <div className="w-full p-2">
            <input
              className="w-full"
              onChange={(event) => {
                handleInputChange(event.target.value);
              }}
            />
          </div>

          <ul>
            {_options?.map((o) => {
              return (
                <li
                  className={
                    selectedItem?.value === o.value ? "active" : undefined
                  }
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
          </ul>
        </Dropdown>
      )}
    </div>
  );
};
