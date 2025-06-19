import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import Accordion from '../../../components/common/Accordion';
import Button from '../../../components/common/Button';
import RadioGroup from '../../../components/common/RadioGroup';
import SearchBar from '../../../components/common/SearchBar';
import TargetItemList from '../../../components/targetList/TargetItemList';
import { TargetService } from '../../../services/TargetService';
import { useTargetStore } from '../../../stores/targetStore';

export default function TargetsList() {
  const { targets, loadTargets, deleteTarget } = useTargetStore();
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedTargetsIds, setSelectedTargetsIds] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState(targets);
  const [isAttackedFilter, setIsAttackedFilter] = useState('הכל');

  useEffect(() => {
    loadTargets();
  }, [loadTargets]);

  useEffect(() => {
    setSearchResults(targets);
  }, [targets]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults(targets);
    } else {
      const results = await TargetService.searchTargets(query);
      setSearchResults(results);
    }
  };

  const filteredTargets = searchResults.filter(target => {
    if (isAttackedFilter === 'הכל') return true;
    return target.isAttacked === isAttackedFilter;
  });

  const sortedTargets = [...filteredTargets]
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
      <SearchBar onSearch={handleSearch} placeholder="חפש לפי שם או תיאור..." />
      <Accordion
        title="סינון לפי"
      >
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.filterLabel}>האם נתקף?</Text>
          <RadioGroup
            options={[
              { label: 'כן', value: 'כן' },
              { label: 'לא', value: 'לא' },
              { label: 'הכל', value: 'הכל' },
            ]}
            value={isAttackedFilter}
            onChange={setIsAttackedFilter}
          />
        </View>
      </Accordion>
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
  filterLabel: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
    textAlign: 'right',
    fontWeight: '500',
  },
}); 