import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AutoGrowingInput from './AutoGrowingInput';

export type VariableStringInputValueMap = Record<string, string>;

export interface VariableStringInputProps {
  template: string;
  values: VariableStringInputValueMap;
  onChange: (fieldId: string, value: string) => void;
  editable?: boolean;
}

export type VariableStringPart =
  | { type: 'text'; value: string }
  | { type: 'var'; value: string; fieldId: string };

// Utility to parse a string and return an array of { type: 'text' | 'var', value: string, fieldId?: string }
export function parseVariableString(template: string): VariableStringPart[] {
  const regex = /{{(.*?)}}/g;
  const result: VariableStringPart[] = [];
  let lastIndex = 0;
  let match;
  let varCount: Record<string, number> = {};
  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      result.push({ type: 'text', value: template.slice(lastIndex, match.index) });
    }
    const varName = match[1].trim();
    varCount[varName] = (varCount[varName] || 0) + 1;
    // Make each instance unique by appending _1, _2, etc. if needed
    const fieldId = varCount[varName] > 1 ? `${varName}_${varCount[varName]}` : varName;
    result.push({ type: 'var', value: '', fieldId });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < template.length) {
    result.push({ type: 'text', value: template.slice(lastIndex) });
  }
  return result;
}

const VariableStringInput: React.FC<VariableStringInputProps> = ({ template, values, onChange, editable = true }) => {
  const parsed = parseVariableString(template);
  return (
    <View style={styles.row}>
      {parsed.map((part, idx) => {
        if (part.type === 'text') {
          return <Text key={idx} style={styles.text}>{part.value}</Text>;
        } else {
          return (
            <AutoGrowingInput
              key={idx}
              value={values[part.fieldId] ?? ''}
              onChangeText={text => onChange(part.fieldId, text)}
              editable={editable}
              style={styles.inlineInput}
            />
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    gap: 4,
  },
  text: {
    fontSize: 16,
    color: '#222',
    textAlign: 'right',
    lineHeight: 24,
  },
  inlineInput: {
    marginHorizontal: 2,
    alignSelf: 'center',
  },
});

export default VariableStringInput; 