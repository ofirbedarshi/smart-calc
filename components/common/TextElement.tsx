import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';
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

const isHtml = (str: string) => /<[^>]+>/.test(str);

const TextElement: React.FC<TextElementProps> = ({ element, variableValues, onVariableChange, editable = true }) => {
  const { width } = useWindowDimensions();
  return (
    <InputCard style={styles.card}>
      <View style={styles.container}>
        {element.header && (
          <Text style={styles.header}>{element.header}</Text>
        )}
        {isHtml(element.data) ? (
          <RenderHTML
            contentWidth={width - 48}
            source={{ html: element.data }}
            baseStyle={{ color: '#333', fontSize: 16, textAlign: 'right' }}
            tagsStyles={{ b: { fontWeight: 'bold' }, br: { height: 0 } }}
          />
        ) : (
          <VariableStringInput
            template={element.data}
            values={variableValues}
            onChange={onVariableChange}
            editable={editable}
          />
        )}
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