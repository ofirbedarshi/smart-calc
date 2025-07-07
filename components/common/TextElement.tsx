import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputCard from './InputCard';
import VariableStringInput, { VariableStringInputValueMap } from './VariableStringInput';

interface TextElementProps {
  element: {
    type: 'text';
    header?: string;
    data: string;
  };
  variableValues: VariableStringInputValueMap;
  onVariableChange: (fieldId: string, value: string) => void;
  editable?: boolean;
}

const TextElement: React.FC<TextElementProps> = ({ element, variableValues, onVariableChange, editable = true }) => {
  return (
    <InputCard style={styles.card}>
      <View style={styles.container}>
        {element.header && (
          <Text style={styles.header}>{element.header}</Text>
        )}
        <VariableStringInput
          template={element.data}
          values={variableValues}
          onChange={onVariableChange}
          editable={editable}
        />
      </View>
    </InputCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  container: {
    marginVertical: 8,
    gap: 12,
    width: '100%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'right',
  },
});

export default TextElement; 