import { useThemeProvider } from '@/utils/ThemeContext';
import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import Select, {components, OptionProps} from 'react-select';
import { customSelectStyles } from './autoCompleteStyles';

// Define types for key-value pairs
export type KeyValuePair = {
  key: string;
  value: string;
};

// Define option types for react-select
export type OptionType = {
  value: string;
  label: string;
};

// Custom component for react-select to show delete button inside each selected item
const MultiValueRemove = (props: any) => (
  <components.MultiValueRemove {...props}>
    <span>&times;</span>
  </components.MultiValueRemove>
);

interface AutocompleteInputProps {
  predefinedOptions: OptionType[]; // Prop for predefined options
  keyValuePairs: KeyValuePair[];
  setKeyValuePairs: React.Dispatch<React.SetStateAction<KeyValuePair[]>>
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({predefinedOptions, keyValuePairs, setKeyValuePairs}) => {
  // State for input value (value for the key=value pair)
  const [inputValue, setInputValue] = useState<string>(''); // String type
  const { currentTheme } = useThemeProvider();
  // console.log("currentTheme",currentTheme);
  // State for the list of key-value pairs
  // const [keyValuePairs, setKeyValuePairs] = useState<KeyValuePair[]>([]); // Array of objects with 'key' and 'value' as strings

  // State for selected key in react-select
  const [selectedKey, setSelectedKey] = useState<string | null>(null); // String or null

  // State for tracking the current item being edited (index of the item, or null if none)
  const [currentItem, setCurrentItem] = useState<number | null>(null); // Number or null

  // Handle input changes for the value input field
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  // Handle key press for Enter to add or update key=value pair
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      if (!selectedKey || !inputValue) {
        alert('Please select a key and provide a value.');
        return;
      }

      const value = inputValue;

      // If editing an existing item, update it
      if (currentItem !== null) {
        const updatedPairs = keyValuePairs.map((pair, index) =>
          index === currentItem ? {key: selectedKey, value} : pair
        );
        setKeyValuePairs(updatedPairs);
        setCurrentItem(null); // Clear current item after update
      } else {
        // If adding new item
        setKeyValuePairs([...keyValuePairs, {key: selectedKey, value}]);
      }

      setSelectedKey(null); // Clear selected key after pressing Enter
      setInputValue('');      // Clear value after pressing Enter
    }
  };

  // Handle key-value pair removal
  const handleDeletePair = (index: number): void => {
    const updatedPairs = keyValuePairs.filter((_, i) => i !== index);
    setKeyValuePairs(updatedPairs);
    if (currentItem === index) {
      setCurrentItem(null);
      setInputValue(''); // Clear input if the current item is deleted
    }
  };

  // Handle key-value pair editing
  const handleEdit = (index: number): void => {
    setCurrentItem(index); // Set the current item being edited
    const {key, value} = keyValuePairs[index];
    setSelectedKey(key); // Set the selected key in the react-select component
    setInputValue(value); // Set the value in the input
  };

  // Custom options for react-select, showing key-value pairs
  const customKeyValueOptions = keyValuePairs.map((pair, index) => ({
    value: `${pair.key}`,
    label: `${pair.key}: ${pair.value}`,
  }));

  // Handle react-select for key-value pairs delete
  const handleDeleteSelect = (selected: any) => {
    // console.log("handleDeleteSelect", selected)
    const selectedValue = selected ? selected.map((item: OptionType) => (item.value)) : [];

    const updatedPairs = selected ? keyValuePairs.filter((k, index) => {console.log("k", k); return selectedValue.includes(k.key)}) : [];
    setKeyValuePairs(updatedPairs);
  };

  return (
    <div className="flex space-x-4 w-full">

      {/* Display key-value pairs in the center (flex-grow) */}
      <div className="flex-grow">
        <Select
          isMulti
          isClearable
          value={customKeyValueOptions}
          onChange={(e) => handleDeleteSelect(e)}
          options={customKeyValueOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          components={{MultiValueRemove, DropdownIndicator: () => null}} // Remove the down arrow
          placeholder="Filters key-value pairs"
          styles={customSelectStyles}
        />
      </div>

      {/* Predefined keys and value input on the right */}
      <div className="flex space-x-4">
        <Select
          isClearable
          value={selectedKey ? {value: selectedKey, label: selectedKey} : null} // Update for string
          onChange={(selected) => setSelectedKey(selected ? selected.value : null)} // Update for string
          options={predefinedOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select"
          // styles={{
          //   control: (provided, state) => ({
          //     ...provided,
          //     borderColor: state.isFocused ? 'rgb(16, 185, 129)' : provided.borderColor, // Tailwind color 'emerald-400'
          //     boxShadow: state.isFocused ? '0 0 0 2px rgba(16, 185, 129, 0.5)' : provided.boxShadow, // Tailwind ring-2 emerald-400 equivalent
          //     '&:hover': {
          //       borderColor: state.isFocused ? 'rgb(16, 185, 129)' : provided.borderColor,
          //     },
          //   }),
          // }}
          styles={customSelectStyles}
        />

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="="
          className="bg-gray-150 dark:bg-gray-50 border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>
    </div>
  );
};

export default AutocompleteInput;
