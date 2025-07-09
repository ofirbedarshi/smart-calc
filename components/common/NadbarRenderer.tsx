import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import GenericWebViewController from '../../app/screens/webview/controllers/GenericWebViewController';
import { MergedNadbar } from '../../utils/NadbarMerger';
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
    <View style={{ flex: 1, minHeight: 900 }}>
      {nadbar.elements.map((element, idx) =>
        element.type === 'html' ? (
            <GenericWebViewController
              storageKey={element.header || `html_${idx}`}
              fallbackHtml={element.data}
            />
          ) : null
      )}
    </View>
    // <ScrollView contentContainerStyle={styles.scrollContainer} style={{ flex: 1 }}>
    //   <View style={[styles.container, { flex: 1 }]}>
    //     {nadbar.elements.map((element, idx) => {
    //       switch (element.type) {
    //         case 'form':
    //           return (
    //             <View key={idx} style={styles.elementWrapper}>
    //               <FormElement
    //                 element={{
    //                   ...element,
    //                   data: element.data.map(field => ({
    //                     ...field,
    //                     value: variableValues[field.fieldId] || '',
    //                   })),
    //                 }}
    //                 onFieldChange={handleFormFieldChange}
    //               />
    //             </View>
    //           );
    //         case 'text':
    //           return (
    //             <View key={idx} style={styles.elementWrapper}>
    //               <TextElement
    //                 element={element}
    //                 variableValues={variableValues}
    //                 onVariableChange={handleVariableChange}
    //               />
    //             </View>
    //           );
    //         case 'conversation':
    //           return (
    //             <View key={idx} style={styles.elementWrapper}>
    //               <ConversationElement
    //                 element={element}
    //                 variableValues={variableValues}
    //                 onVariableChange={handleVariableChange}
    //               />
    //             </View>
    //           );
    //         case 'header':
    //           return (
    //             <View key={idx} style={styles.elementWrapper}>
    //               <NadbarHeader data={element.data} />
    //             </View>
    //           );
    //         case 'html':
    //           const htmlElement = element as NadbarHtmlElement;
    //           return (
    //             <View key={idx} style={[styles.elementWrapper, { flex: 1, minHeight: 800}]}>
    //               {/* <GenericWebViewController
    //                 storageKey={htmlElement.header || `html_${idx}`}
    //                 fallbackHtml={htmlElement.data}
    //               /> */}
    //             <View style={{ backgroundColor: 'green', width: '100%', height: 100, borderRadius: 8 }} />
    //             </View>
    //           );
    //         default:
    //           onError?.('Unsupported element type', { elementIdx: idx, type: element.type });
    //           return null;
    //       }
    //     })}
    //   </View>
    // </ScrollView>
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