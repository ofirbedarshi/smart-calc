import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TargetItemList from '../../../components/targetList/TargetItemList';
import { useTargetStore } from '../../../stores/targetStore';

export default function TargetsList() {
  const { targets, loadTargets } = useTargetStore();
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

  return (
    <View style={styles.container}>
      {sortedTargets.length === 0 ? (
        <Text style={styles.empty}>לא נמצאו מטרות</Text>
      ) : (
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
}); 