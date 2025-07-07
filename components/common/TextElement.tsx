import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputCard from './InputCard';

interface TextElementProps {
  element: {
    type: 'text';
    header?: string;
    data: string;
  };
}

const TextElement: React.FC<TextElementProps> = ({ element }) => {
  return (
    <InputCard style={styles.card}>
      <View style={styles.container}>
        {element.header && (
          <Text style={styles.header}>{element.header}</Text>
        )}
        <Text style={styles.text}>{element.data}</Text>
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
  text: {
    fontSize: 16,
    color: '#444',
    textAlign: 'right',
    lineHeight: 24,
  },
});

export default TextElement; 