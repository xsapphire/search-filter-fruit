import { ReactElement, useRef, useState } from "react";
import { Option } from "../utils/option";
import { useClickOutside } from "../hooks/useClickOutside";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faClose } from "@fortawesome/free-solid-svg-icons";

const SelectInputWrapper = styled.div`
  border: 1px solid #bababa;
  &:focus {
    border: 1px solid mediumblue;
  }
`;

const SelectInputDisplay = styled.div<{ $hasSelectedValue?: boolean }>`
  color: ${({ $hasSelectedValue }) =>
    $hasSelectedValue ? "inherit" : "#bababa"};
`;

const SelectInputIndicator = styled.div`
  border-left: 1px solid #bababa;
`;

const ClearIcon = styled(FontAwesomeIcon)`
  &:hover {
    color: mediumblue;
  }
`;

const Dropdown = styled.div`
  border: 1px solid #bababa;
`;

type SelectProps = {
  options: Option[] | undefined;
  placeholder?: string;
  defaultValue?: Option;
  onSelect?: (o: Option) => void;

  // Optional clear feature
  onClear?: () => void;
  useClearIcon?: boolean;

  // Search feature
  enableSearch?: boolean;
};

/**
 * @param options {Option} an array of Option
 * @param placeholder {string} optional, the placeholder string
 * @param defaultValue {Option} optional, the default value of the select
 * @param onSelect {(Option) => void} optional, on select item
 * @param useClearIcon {boolean} optional, if true, show an "faClose" icon to clear selection
 * @param onClear {() => void} optional, on clearing selection
 * @param enableSearch {boolean} optional, if enabled, show a search box in dropdown
 * @returns A custom select UI component
 */
export const Select = ({
  options,
  placeholder,
  defaultValue,
  onSelect,
  onClear,
  useClearIcon,
  enableSearch,
}: SelectProps): ReactElement => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Option | undefined>(
    defaultValue
  );
  const [_options, setOptions] = useState<Option[] | undefined>(options);

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    setDropdownOpen(false);
  });

  const onSearch = (input: string) => {
    const filteredOptions = options?.reduce<Option[]>((acc, option) => {
      if (option.label.toUpperCase().includes(input.toUpperCase())) {
        acc.push(option);
      }

      return acc;
    }, []);

    setOptions(filteredOptions);
  };

  const _onClear = () => {
    setSelectedItem(undefined);
    onClear?.();
  };

  return (
    <div className="relative">
      <SelectInputWrapper
        className="flex gap-2 items-center rounded"
        tabIndex={0}
      >
        <SelectInputDisplay
          className="grow p-2"
          onClick={() => setDropdownOpen(true)}
          $hasSelectedValue={!!selectedItem}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </SelectInputDisplay>

        {selectedItem && useClearIcon && (
          <ClearIcon
            tabIndex={0}
            onClick={_onClear}
            className="p-2 cursor-pointer"
            icon={faClose}
          />
        )}

        <SelectInputIndicator
          className="p-2"
          onClick={() => setDropdownOpen(true)}
        >
          <FontAwesomeIcon color="#bababa" icon={faChevronDown} />
        </SelectInputIndicator>
      </SelectInputWrapper>

      {dropdownOpen && (
        <Dropdown ref={ref} className="w-full absolute bg-white py-1 mt-1">
          {enableSearch && (
            <div className="w-full p-2">
              <input
                className="w-full"
                onChange={(event) => {
                  onSearch(event.target.value);
                }}
              />
            </div>
          )}

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

                    onSelect?.(o);

                    if (enableSearch) {
                      setOptions(options);
                    }
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
