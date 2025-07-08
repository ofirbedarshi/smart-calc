import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={options}
      setOpen={setOpen}
      setValue={(callback) => {
        const newValue = typeof callback === 'function' ? callback(value) : callback;
        if (newValue) {
          onChange(newValue);
        }
      }}
      style={styles.dropdown}
      textStyle={styles.dropdownText}
      dropDownContainerStyle={styles.dropdownContainer}
      listItemContainerStyle={styles.listItemContainer}
      selectedItemContainerStyle={styles.selectedItemContainer}
      selectedItemLabelStyle={styles.selectedItemLabel}
      placeholder="בחר..."
      placeholderStyle={styles.placeholder}
      listMode="MODAL"
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    minHeight: 40,
    zIndex: 1000,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    zIndex: 1000,
  },
  listItemContainer: {
    height: 40,
  },
  selectedItemContainer: {
    backgroundColor: '#007AFF',
  },
  selectedItemLabel: {
    color: '#fff',
  },
  placeholder: {
    color: '#666',
  },
}); 