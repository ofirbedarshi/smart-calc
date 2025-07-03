import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NadbarScheme } from '../../../components/common/nadbarTypes';
import SearchBar from '../../../components/common/SearchBar';
import { NadbarService } from '../../../services/NadbarService';
import { formatDate } from '../../../utils/dateUtils';

const NadbarList: React.FC = () => {
  const [nadbars, setNadbars] = useState<NadbarScheme[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<NadbarScheme[]>([]);

  useEffect(() => {
    NadbarService.getNadbars().then(setNadbars);
  }, []);

  useEffect(() => {
    NadbarService.filterNadbars(search).then(setFiltered);
  }, [search, nadbars]);

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearch} placeholder="חפש נדבר לפי שם..." />
      {filtered.length === 0 ? (
        <Text style={styles.empty}>לא נמצאו נדברים</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id || item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => console.log('Pressed nadbar:', item)}
            >
              <View style={styles.itemRow}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.updatedAtContainer}>
                  <Text style={styles.updatedAtLabel}>עודכן לאחרונה:</Text>
                  <Text style={styles.updatedAtDate}>{formatDate(Number(item.updatedAt))}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 18,
    color: '#888',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  itemRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default NadbarList; 