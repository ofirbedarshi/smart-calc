import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MergedNadbar } from '../../utils/NadbarMerger';
import ConversationElement from './ConversationElement';
import FormElement from './FormElement';
import NadbarHeader from './NadbarHeader';
import TextElement from './TextElement';
import { VariableStringInputValueMap } from './VariableStringInput';

interface NadbarRendererProps {
  nadbar: MergedNadbar;
  onChange?: (updatedNadbar: MergedNadbar) => void;
  onError?: (message: string, params?: any) => void;
}

const NadbarRenderer: React.FC<NadbarRendererProps> = ({ nadbar, onChange, onError }) => {
  // Gather all variable values from nadbar.values
  const variableValues: VariableStringInputValueMap = (nadbar as any).values || {};

  // Handle variable value change (for both form and variable string inputs)
  const handleVariableChange = useCallback((fieldId: string, value: string) => {
    if (!onChange) return;
    const updatedNadbar = {
      ...nadbar,
      values: {
        ...variableValues,
        [fieldId]: value,
      },
      // Also update all form fields with this fieldId
      elements: nadbar.elements.map(element => {
        if (element.type === 'form') {
          return {
            ...element,
            data: element.data.map(field =>
              field.fieldId === fieldId ? { ...field, value } : field
            ),
          };
        }
        return element;
      }),
    };
    onChange(updatedNadbar);
  }, [nadbar, onChange, variableValues]);

  // Updated form field change handler to use handleVariableChange
  const handleFormFieldChange = (fieldId: string, value: string) => {
    handleVariableChange(fieldId, value);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {nadbar.elements.map((element, idx) => {
          switch (element.type) {
            case 'form':
              return (
                <View key={idx} style={styles.elementWrapper}>
                  <FormElement
                    element={{
                      ...element,
                      data: element.data.map(field => ({
                        ...field,
                        value: variableValues[field.fieldId] || '',
                      })),
                    }}
                    onFieldChange={handleFormFieldChange}
                  />
                </View>
              );
            case 'text':
              return (
                <View key={idx} style={styles.elementWrapper}>
                  <TextElement
                    element={element}
                    variableValues={variableValues}
                    onVariableChange={handleVariableChange}
                  />
                </View>
              );
            case 'conversation':
              return (
                <View key={idx} style={styles.elementWrapper}>
                  <ConversationElement
                    element={element}
                    variableValues={variableValues}
                    onVariableChange={handleVariableChange}
                  />
                </View>
              );
            case 'header':
              return (
                <View key={idx} style={styles.elementWrapper}>
                  <NadbarHeader data={element.data} />
                </View>
              );
            default:
              onError?.('Unsupported element type', { elementIdx: idx, type: element.type });
              return null;
          }
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    width: '100%',
  },
  elementWrapper: {
    width: '100%',
    marginBottom: 20,
  },
});

export default NadbarRenderer; 