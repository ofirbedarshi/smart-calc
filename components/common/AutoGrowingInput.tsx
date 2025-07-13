import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface AutoGrowingInputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
  value: string;
  onChangeText: (text: string) => void;
  editable?: boolean;
  style?: any;
}

const AutoGrowingInput: React.FC<AutoGrowingInputProps> = ({ value, onChangeText, editable = true, style, ...rest }) => {
  const [inputWidth, setInputWidth] = useState(40); // start small
  const textRef = useRef<Text>(null);

  useEffect(() => {
    // This effect will run when value changes, and measure the width of the hidden text
    if (textRef.current) {
      // @ts-ignore
      textRef.current.measure((x, y, width, height) => {
        setInputWidth(Math.max(40, Math.ceil(width) + 12)); // add some padding
      });
    }
  }, [value]);

  return (
    <View style={styles.rtlContainer}>
      <TextInput
        style={[styles.input, { width: inputWidth }, style]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        underlineColorAndroid="transparent"
        multiline={false}
        textAlign="right"
        {...rest}
      />
      {/* Hidden text for measuring width */}
      <Text
        ref={textRef}
        style={[styles.hiddenText, style]}
        numberOfLines={1}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {value || ' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rtlContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    writingDirection: 'rtl',
    position: 'relative',
  },
  input: {
    minWidth: 20,
    maxWidth: 200,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    fontSize: 16,
    color: '#222',
    marginHorizontal: 2,
    padding: 0,
    textAlign: 'right',
    backgroundColor: '#f7f7f7',
    borderRadius: 4,
  },
  hiddenText: {
    position: 'absolute',
    opacity: 0,
    fontSize: 16,
    padding: 0,
    margin: 0,
    left: 0,
    top: 0,
    // Same font and style as input
    fontFamily: undefined,
    textAlign: 'right',
  },
});

export default AutoGrowingInput; 