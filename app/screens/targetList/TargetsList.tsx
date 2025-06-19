import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/common/Button';
import TargetItemList from '../../../components/targetList/TargetItemList';
import { useTargetStore } from '../../../stores/targetStore';

export default function TargetsList() {
  const { targets, loadTargets, deleteTarget } = useTargetStore();
  const [showCheckboxes, setShowCheckboxes] = useState(true);
  const [selectedTargetsIds, setSelectedTargetsIds] = useState<string[]>([]);

  useEffect(() => {
    loadTargets();
  }, [loadTargets]);

  const sortedTargets = [...targets]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .map(target => ({
      target,
      isMarked: selectedTargetsIds.includes(target.id || ''),
    }));

  const handleLongPress = (id: string) => {
    setShowCheckboxes(true);
    setSelectedTargetsIds([id]);
  };

  const handleMark = (id: string) => {
    setSelectedTargetsIds(prev =>
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    for (const id of selectedTargetsIds) {
      await deleteTarget(id);
    }
    setSelectedTargetsIds([]);
    setShowCheckboxes(false);
    Alert.alert('מחיקה', 'המטרות נמחקו בהצלחה');
  };

  return (
    <View style={styles.container}>
      {sortedTargets.length === 0 ? (
        <Text style={styles.empty}>לא נמצאו מטרות</Text>
      ) : (
        <>
          <FlatList
            data={sortedTargets}
            keyExtractor={item => item.target.id || ''}
            renderItem={({ item }) => (
              <TargetItemList
                target={item.target}
                showCheckbox={showCheckboxes}
                isMarked={item.isMarked}
                onLongPress={() => handleLongPress(item.target.id || '')}
                onMark={() => handleMark(item.target.id || '')}
              />
            )}
          />
          {showCheckboxes && (
            <View style={styles.buttonRow}>
              <Button
                disabled={selectedTargetsIds.length === 0}
                title="מחיקה"
                onPress={handleDelete}
                theme="danger"
                small
              />
              <Button
                title="ביטול"
                onPress={() => {
                  setShowCheckboxes(false);
                  setSelectedTargetsIds([]);
                }}
                theme="primary"
                small
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 18,
    color: '#888',
  },
  deleteButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    alignItems: 'center',
    zIndex: 10,
  },
  buttonRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    zIndex: 10,
  },
}); 