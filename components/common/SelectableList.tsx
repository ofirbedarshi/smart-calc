import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from './Button';
import DeleteButtonWithConfirm from './DeleteButtonWithConfirm';

interface SelectableListProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItemContent: (item: T) => React.ReactNode;
  onDelete: (ids: string[]) => Promise<void>;
  itemLabel: (item: T) => string;
}

function SelectableList<T>({ data, keyExtractor, renderItemContent, onDelete, itemLabel }: SelectableListProps<T>) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const shakeAnim = useRef<{ [id: string]: Animated.Value }>({}).current;

  const handleLongPress = (id: string) => {
    setShowCheckboxes(true);
    setSelectedIds([id]);
    if (!shakeAnim[id]) shakeAnim[id] = new Animated.Value(0);
    Animated.sequence([
      Animated.timing(shakeAnim[id], { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim[id], { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim[id], { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim[id], { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleMark = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handlePress = (item: T) => {
    const id = keyExtractor(item);
    if (showCheckboxes) {
      handleMark(id);
    } else {
      // Let parent handle navigation or other logic
      if (typeof renderItemContent === 'function') {
        // No-op here, parent should handle
      }
    }
  };

  const handleDelete = async () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    await onDelete(selectedIds);
    setSelectedIds([]);
    setShowCheckboxes(false);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => {
          const id = keyExtractor(item);
          if (!shakeAnim[id]) shakeAnim[id] = new Animated.Value(0);
          const shake = shakeAnim[id].interpolate({ inputRange: [-1, 1], outputRange: [-8, 8] });
          return (
            <View style={styles.outerRow}>
              <Animated.View style={[styles.card, { transform: [{ translateX: shake }] }]}> 
                <TouchableOpacity
                  onPress={() => handlePress(item)}
                  onLongPress={() => handleLongPress(id)}
                  activeOpacity={0.8}
                  style={styles.row}
                >
                  <View style={styles.contentRow}>
                    {renderItemContent(item)}
                  </View>
                </TouchableOpacity>
              </Animated.View>
              {showCheckboxes && (
                <TouchableOpacity onPress={() => handleMark(id)} style={styles.checkboxTouchable} activeOpacity={0.7}>
                  <Ionicons
                    name={selectedIds.includes(id) ? 'checkbox' : 'square-outline'}
                    size={28}
                    color="#007AFF"
                    style={styles.checkbox}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
      {showCheckboxes && (
        <View style={styles.actionBar}>
          <DeleteButtonWithConfirm
            items={data.filter(i => selectedIds.includes(keyExtractor(i))).map(itemLabel)}
            onDelete={handleDeleteConfirm}
            buttonProps={{
              title: 'מחיקה',
              theme: 'danger',
              small: true,
              disabled: selectedIds.length === 0,
              onPress: () => {},
            }}
            confirmText="מחק"
            cancelText="ביטול"
            modalTitle="אישור מחיקה"
            modalMessage="האם אתה בטוח שברצונך למחוק את הפריטים הבאים?"
          />
          <Button
            title="ביטול"
            onPress={() => {
              setShowCheckboxes(false);
              setSelectedIds([]);
            }}
            theme="primary"
            small
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 0,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkbox: {
    marginLeft: 12,
  },
  checkboxTouchable: {
    padding: 8,
  },
  actionBar: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});

export default SelectableList; 