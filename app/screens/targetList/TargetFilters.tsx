import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import RadioGroup from '../../../components/common/RadioGroup';

interface TargetFiltersProps {
  value: string;
  onFilterChange: (value: string) => void;
}

const TargetFilters: React.FC<TargetFiltersProps> = ({ value, onFilterChange }) => {
  return (
    <Accordion title="סינון לפי">
      <View style={{ marginBottom: 8 }}>
        <Text style={styles.filterLabel}>האם נתקף?</Text>
        <RadioGroup
          options={[
            { label: 'כן', value: 'כן' },
            { label: 'לא', value: 'לא' },
            { label: 'הכל', value: 'הכל' },
          ]}
          value={value}
          onChange={onFilterChange}
        />
      </View>
    </Accordion>
  );
};

const styles = StyleSheet.create({
  filterLabel: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
    textAlign: 'right',
    fontWeight: '500',
  },
});

export default TargetFilters; 