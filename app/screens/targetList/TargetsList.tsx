import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Button from '../../../components/common/Button';
import DeleteButtonWithConfirm from '../../../components/common/DeleteButtonWithConfirm';
import SearchBar from '../../../components/common/SearchBar';
import TargetItemList from '../../../components/targetList/TargetItemList';
import { TargetService } from '../../../services/TargetService';
import { useTargetStore } from '../../../stores/targetStore';
import TargetFilters from './TargetFilters';

export default function TargetsList() {
  const { targets, loadTargets, deleteTarget } = useTargetStore();
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedTargetsIds, setSelectedTargetsIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [isAttackedFilter, setIsAttackedFilter] = useState('הכל');
  const [searchResults, setSearchResults] = useState(targets);

  useEffect(() => {
    loadTargets();
  }, [loadTargets]);

  useEffect(() => {
    setSearchResults(targets);
  }, [targets]);

  const handleSearch = async (query: string) => {
    setSearch(query);
    const results = await TargetService.filterTargets({ query, isAttacked: isAttackedFilter });
    setSearchResults(results);
  };

  const handleFilterChange = async (value: string) => {
    setIsAttackedFilter(value);
    const results = await TargetService.filterTargets({ query: search, isAttacked: value });
    setSearchResults(results);
  };

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
  };

  const sortedTargets = [...searchResults]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .map(target => ({
      target,
      isMarked: selectedTargetsIds.includes(target.id || ''),
    }));

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} placeholder="חפש לפי שם או תיאור..." />
      <TargetFilters value={isAttackedFilter} onFilterChange={handleFilterChange} />
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
                <DeleteButtonWithConfirm
                  items={sortedTargets
                    .filter(t => t.target.id && selectedTargetsIds.includes(t.target.id))
                    .map(t => typeof t.target.name === 'string' ? t.target.name : '')
                    .filter(Boolean)
                  }
                  onDelete={handleDelete}
                  buttonProps={{
                    title: 'מחיקה',
                    disabled: selectedTargetsIds.length === 0,
                    theme: 'danger',
                    small: true,
                    onPress: () => {},
                  }}
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
  filterAccordionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
}); 