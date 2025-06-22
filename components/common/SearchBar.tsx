import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BaseInput } from './BaseInput';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'חפש...' }) => {
  const [value, setValue] = useState('');
  const debounceRef = useRef<any>(null);

  const handleChange = (text: string) => {
    setValue(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(text);
    }, 250);
  };

  return (
    <View style={styles.container}>
      <BaseInput value={value} onChange={handleChange} placeholder={placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

export default SearchBar; 