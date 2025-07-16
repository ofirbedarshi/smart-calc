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
  small?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, small = false }) => {
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
      style={[styles.dropdown, small && styles.smallDropdown]}
      textStyle={[styles.dropdownText, small && styles.smallDropdownText]}
      dropDownContainerStyle={[styles.dropdownContainer, small && styles.smallDropdownContainer]}
      containerStyle={small ? styles.smallDropdownOuter : undefined}
      labelStyle={small ? styles.smallDropdownLabel : undefined}
      listItemContainerStyle={styles.listItemContainer}
      selectedItemContainerStyle={styles.selectedItemContainer}
      selectedItemLabelStyle={styles.selectedItemLabel}
      placeholder="בחר..."
      placeholderStyle={styles.placeholder}
      listMode="SCROLLVIEW"
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
  smallDropdown: {
    minHeight: 24,
    height: 24,
    borderRadius: 0,
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 2,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    marginVertical: 0,
    marginHorizontal: 2,
    alignSelf: 'center',
    shadowColor: 'transparent',
    elevation: 0,
  },
  smallDropdownOuter: {
    minHeight: 24,
    height: 24,
    maxWidth: 200,
    alignSelf: 'center',
    marginHorizontal: 2,
    backgroundColor: 'transparent',
  },
  smallDropdownLabel: {
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 2,
    textAlign: 'right',
    backgroundColor: 'transparent',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
  smallDropdownText: {
    fontSize: 16,
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 2,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    zIndex: 9000,
  },
  smallDropdownContainer: {
    borderRadius: 0,
    minHeight: 24,
    backgroundColor: '#fff',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    shadowColor: 'transparent',
    elevation: 0,
    zIndex: 9000,
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