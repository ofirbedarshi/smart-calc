import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../../components/common/Button';
import TargetItemList from '../../../components/targetList/TargetItemList';
import { TargetService } from '../../../services/TargetService';
import { useTargetStore } from '../../../stores/targetStore';

export default function TargetsList() {
  const { targets, loadTargets, deleteTarget } = useTargetStore();
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedTargetsIds, setSelectedTargetsIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(targets);

  useEffect(() => {
    loadTargets();
  }, [loadTargets]);

  useEffect(() => {
    setSearchResults(targets);
  }, [targets]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!search.trim()) {
        setSearchResults(targets);
      } else {
        const results = await TargetService.searchTargets(search);
        setSearchResults(results);
      }
    }, 250);
    return () => clearTimeout(handler);
  }, [search, targets]);

  const sortedTargets = [...searchResults]
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
      <TextInput
        style={styles.searchBar}
        placeholder="חפש לפי שם או תיאור..."
        value={search}
        onChangeText={setSearch}
        textAlign="right"
      />
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
            contentContainerStyle={showCheckboxes ? { paddingBottom: 90 } : undefined}
          />
          {showCheckboxes && (
            <View style={styles.actionBar}>
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
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    margin: 16,
    fontSize: 16,
    writingDirection: 'rtl',
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
  },
  actionBar: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderColor: '#eee',
    position: 'relative',
  },
}); 