import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TargetItemList from '../../../components/targetList/TargetItemList';
import { useTargetStore } from '../../../stores/targetStore';

export default function TargetsList() {
  const { targets, loadTargets } = useTargetStore();

  useEffect(() => {
    loadTargets();
  }, [loadTargets]);

  const sortedTargets = [...targets].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <View style={styles.container}>
      {sortedTargets.length === 0 ? (
        <Text style={styles.empty}>לא נמצאו מטרות</Text>
      ) : (
        <FlatList
          data={sortedTargets}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TargetItemList target={item} />}
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