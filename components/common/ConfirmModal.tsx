import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Button';
import { Modal } from './Modal';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message?: string;
  items?: string[];
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  items,
  confirmText = 'אישור',
  cancelText = 'ביטול',
  onConfirm,
  onCancel,
}) => (
  <Modal visible={visible} onClose={onCancel} title={title}>
    <View>
      {message && <Text style={styles.message}>{message}</Text>}
      {items && items.length > 0 && (
        <View style={styles.itemsList}>
          {items.map((name, idx) => (
            <Text key={idx} style={styles.itemText}>• {name}</Text>
          ))}
        </View>
      )}
      <View style={styles.buttonRow}>
        <Button title={cancelText} onPress={onCancel} theme="primary" small />
        <Button title={confirmText} onPress={onConfirm} theme="danger" small />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    textAlign: 'right',
  },
  itemsList: {
    marginBottom: 16,
  },
  itemText: {
    fontSize: 15,
    color: '#444',
    textAlign: 'right',
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    gap: 12,
  },
});

export default ConfirmModal; 