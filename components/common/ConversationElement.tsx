import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import VariableStringInput, { VariableStringInputValueMap } from './VariableStringInput';

interface ConversationElementProps {
  element: {
    type: 'conversation';
    header?: string;
    data: { type: 'me' | 'they'; data: string }[];
  };
  variableValues: VariableStringInputValueMap;
  onVariableChange: (fieldId: string, value: string) => void;
  editable?: boolean;
}

const ConversationElement: React.FC<ConversationElementProps> = ({ element, variableValues, onVariableChange, editable = true }) => {
  return (
    <View style={styles.card}>
      {element.header && <Text style={styles.header}>{element.header}</Text>}
      <View style={styles.messagesContainer}>
        {element.data.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.messageWrapper,
              msg.type === 'me' ? styles.meAlign : styles.theyAlign
            ]}
          >
            <View
              style={[
                styles.bubble,
                msg.type === 'me' ? styles.meBubble : styles.theyBubble
              ]}
            >
              <VariableStringInput
                template={msg.data}
                values={variableValues}
                onChange={onVariableChange}
                editable={editable}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 8,
    width: '100%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'right',
  },
  messagesContainer: {
    gap: 8,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 4,
    width: '100%',
  },
  meAlign: {
    justifyContent: 'flex-start',
  },
  theyAlign: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '80%',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  meBubble: {
    backgroundColor: '#E5E5EA',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  theyBubble: {
    backgroundColor: '#E5E5EA',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  messageText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'right',
  },
});

export default ConversationElement; 