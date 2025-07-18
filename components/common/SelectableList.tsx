import { Ionicons } from '@expo/vector-icons';
import { useRef, useState, type ReactNode } from 'react';
import { Animated, FlatList, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from './Button';
import DeleteButtonWithConfirm from './DeleteButtonWithConfirm';
// Conditional import for DraggableFlatList
let DraggableFlatList: any = null;
let RenderItemParams: any = null;
if (Platform.OS !== 'web') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require('react-native-draggable-flatlist');
  DraggableFlatList = mod.default;
  RenderItemParams = mod.RenderItemParams;
}

interface SelectableListProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  renderItemContent: (item: T) => ReactNode;
  onDelete: (ids: string[]) => Promise<void>;
  itemLabel: (item: T) => string;
  onItemPress?: (item: T) => void;
  allowToReorder?: boolean;
  onReorder?: (newData: T[]) => void;
}

function SelectableList<T>({ data, keyExtractor, renderItemContent, onDelete, itemLabel, onItemPress, allowToReorder = false, onReorder }: SelectableListProps<T>) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
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
    setSelectedIds((prev: string[]) =>
      prev.includes(id) ? prev.filter((selectedId: string) => selectedId !== id) : [...prev, id]
    );
  };

  const handlePress = (item: T) => {
    const id = keyExtractor(item);
    if (showCheckboxes) {
      handleMark(id);
    } else {
      onItemPress?.(item);
    }
  };

  // Unified row rendering
  const renderRow = (item: T, drag?: () => void) => {
    const id = keyExtractor(item);
    if (!shakeAnim[id]) shakeAnim[id] = new Animated.Value(0);
    const shake = shakeAnim[id].interpolate({ inputRange: [-1, 1], outputRange: [-8, 8] });
    return (
      <View style={styles.outerRow}>
        <Animated.View style={[styles.card, { transform: [{ translateX: shake }] }]}> 
          <View style={styles.row}>
            {/* Drag handle only if reorder+checkboxes */}
            {allowToReorder && showCheckboxes && drag && (
              <TouchableOpacity
                onPressIn={drag}
                style={styles.dragHandleTouchable}
                activeOpacity={0.7}
              >
                <Ionicons name="reorder-three" size={28} color="#888" style={styles.dragHandle} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => handlePress(item)}
              onLongPress={() => {
                if (!showCheckboxes) handleLongPress(id);
              }}
              activeOpacity={0.8}
              style={[styles.contentRow, { flex: 1 }]}
            >
              {renderItemContent(item)}
            </TouchableOpacity>
          </View>
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
  };

  // Choose list component
  let ListComponent: any = FlatList;
  if (allowToReorder && Platform.OS !== 'web' && DraggableFlatList) {
    ListComponent = DraggableFlatList;
  }
  const listProps = allowToReorder && Platform.OS !== 'web' && DraggableFlatList
    ? {
        data,
        keyExtractor,
        renderItem: ({ item, drag }: any) => renderRow(item, drag),
        onDragEnd: ({ data: newData }: { data: T[] }) => {
          if (onReorder) onReorder(newData);
        },
      }
    : {
        data,
        keyExtractor,
        renderItem: ({ item }: { item: T }) => renderRow(item),
      };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={{ flex: 1 }}>
        {allowToReorder && Platform.OS === 'web' && (
          <View style={{ padding: 16, backgroundColor: '#fff', alignItems: 'center' }}>
            <Ionicons name="alert-circle" size={24} color="#f39c12" />
            <Animated.Text style={{ color: '#f39c12', marginTop: 8 }}>
              גרירת שורות אינה נתמכת בגרסת הדפדפן
            </Animated.Text>
          </View>
        )}
        <ListComponent {...listProps} />
      </View>
      {showCheckboxes && (
        <View style={styles.actionBar}>
          <DeleteButtonWithConfirm
            items={data.filter(i => selectedIds.includes(keyExtractor(i))).map(itemLabel)}
            onDelete={async () => {
              await onDelete(selectedIds);
              setSelectedIds([]);
              setShowCheckboxes(false);
            }}
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
            title="סיים"
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
  dragHandleTouchable: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default SelectableList; 