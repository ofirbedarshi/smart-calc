import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsOpen(o => !o)} style={styles.header} activeOpacity={0.7}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    alignSelf: 'flex-end',
    marginRight: 24,
    marginBottom: 4,
  },
  title: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '500',
    textAlign: 'right',
  },
  content: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    textAlign: 'right',
  },
});

export default Accordion; 