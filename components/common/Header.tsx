import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

interface HeaderProps extends ViewProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
});

export default Header; 