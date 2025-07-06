import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import LinkButton from '../../../components/common/LinkButton';
import SearchBar from '../../../components/common/SearchBar';
import SelectableList from '../../../components/common/SelectableList';
import { TargetService } from '../../../services/TargetService';
import { useTargetStore } from '../../../stores/targetStore';
import { formatDate } from '../../../utils/dateUtils';
import TargetFilters from './TargetFilters';

export default function TargetsList() {
  const { targets, loadTargets, deleteTarget } = useTargetStore();
  const [search, setSearch] = useState('');
  const [isAttackedFilter, setIsAttackedFilter] = useState('הכל');
  const [searchResults, setSearchResults] = useState(targets);
  const router = useRouter();

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

  const handleDelete = async (ids: string[]) => {
    for (const id of ids) {
      await deleteTarget(id);
    }
    loadTargets();
    Alert.alert('מחיקה', 'המטרות נמחקו בהצלחה');
  };

  const handleNavigate = (target: any) => {
    router.push({
      pathname: '/TargetsList/TargetDetails',
      params: { target: JSON.stringify(target) },
    });
  };

  const sortedTargets = [...searchResults]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} placeholder="חפש לפי שם, תיאור או נ.צ..." />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row-reverse', alignItems: 'center', gap: 8, marginHorizontal: 8 }}>
        <TargetFilters value={isAttackedFilter} onFilterChange={handleFilterChange} />
        <LinkButton
          title="הוסף מטרה"
          onPress={() => router.push({
            pathname: '/TargetsList/TargetDetails',
            params: { target: JSON.stringify({}) },
          })}
        />
      </View>
      {sortedTargets.length === 0 ? (
        <Text style={styles.empty}>לא נמצאו מטרות</Text>
      ) : (
        <SelectableList
          data={sortedTargets}
          keyExtractor={item => item.id || ''}
          renderItemContent={item => (
            <>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.updatedAtContainer}>
                <Text style={styles.updatedAtLabel}>עודכן לאחרונה:</Text>
                <Text style={styles.updatedAtDate}>{formatDate(Number(item.updatedAt))}</Text>
              </View>
            </>
          )}
          onDelete={handleDelete}
          itemLabel={item => item.name}
          onItemPress={handleNavigate}
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
  name: {
    fontSize: 18,
    color: '#222',
    textAlign: 'right',
  },
  updatedAtContainer: {
    alignItems: 'flex-start',
    minWidth: 90,
  },
  updatedAtLabel: {
    fontSize: 9,
    color: '#888',
    opacity: 0.6,
    textAlign: 'left',
  },
  updatedAtDate: {
    fontSize: 10,
    color: '#888',
    textAlign: 'left',
  },
}); 