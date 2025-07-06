import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MergedNadbar, MergedNadbarElement } from '../../utils/NadbarMerger';
import FormElement from './FormElement';

interface NadbarRendererProps {
  nadbar: MergedNadbar;
  onChange?: (updatedNadbar: MergedNadbar) => void;
  onError?: (message: string, params?: any) => void;
}

const NadbarRenderer: React.FC<NadbarRendererProps> = ({ nadbar, onChange, onError }) => {
  const handleFormFieldChange = (elementIdx: number, fieldId: string, value: string) => {
    const element = nadbar.elements[elementIdx];
    if (!element) {
      onError?.('Element not found at index', { elementIdx });
      return;
    }
    if (element.type !== 'form') {
      onError?.('Element at index is not of type "form"', { elementIdx, type: element.type });
      return;
    }
    const updatedElement: MergedNadbarElement = {
      ...element,
      data: element.data.map(field =>
        field.fieldId === fieldId ? { ...field, value } : field
      ),
    };
    const updatedElements = [...nadbar.elements];
    updatedElements[elementIdx] = updatedElement;
    const updatedNadbar = { ...nadbar, elements: updatedElements };
    onChange?.(updatedNadbar);
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