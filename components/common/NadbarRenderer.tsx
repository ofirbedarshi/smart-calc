import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import FormElement from './FormElement';
import { NadbarElement, NadbarScheme } from './nadbarTypes';

interface NadbarRendererProps {
  scheme: NadbarScheme;
  onChange?: (updatedScheme: NadbarScheme) => void;
  onError?: (message: string, params?: any) => void;
}

const NadbarRenderer: React.FC<NadbarRendererProps> = ({ scheme, onChange, onError }) => {
  const handleFormFieldChange = (elementIdx: number, fieldId: string, value: string) => {
    const element = scheme.elements[elementIdx];
    if (!element) {
      onError?.('Element not found at index', { elementIdx });
      return;
    }
    if (element.type !== 'form') {
      onError?.('Element at index is not of type "form"', { elementIdx, type: element.type });
      return;
    }
    const updatedElement: NadbarElement = {
      ...element,
      data: element.data.map(field =>
        field.fieldId === fieldId ? { ...field, value } : field
      ),
    };
    const updatedElements = [...scheme.elements];
    updatedElements[elementIdx] = updatedElement;
    const updatedScheme = { ...scheme, elements: updatedElements };
    onChange?.(updatedScheme);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {scheme.elements.map((element, idx) => {
          switch (element.type) {
            case 'form':
              return (
                <View key={idx} style={styles.elementWrapper}>
                  <FormElement
                    element={element}
                    onFieldChange={(fieldId: string, value: string) => handleFormFieldChange(idx, fieldId, value)}
                  />
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
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  elementWrapper: {
    width: '100%',
    marginBottom: 20,
  },
});

export default NadbarRenderer; 