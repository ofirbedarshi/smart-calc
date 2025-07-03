import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LinkButton from './LinkButton';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <LinkButton title={title as string} onPress={() => setIsOpen(o => !o)} />
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
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