import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NadbarScheme, NadbarType } from '../../../components/common/nadbarTypes';
import SearchBar from '../../../components/common/SearchBar';
import { NadbarService } from '../../../services/NadbarService';
import { formatDate } from '../../../utils/dateUtils';

function getNadbarRoute(nadbar: NadbarScheme) {
  switch (nadbar.type) {
    case NadbarType.Maskar:
      return '/TargetPage/Maskar';
    // Add more cases for other nadbar types/screens as needed
    default:
      return null;
  }
}

const NadbarList: React.FC = () => {
  const [nadbars, setNadbars] = useState<NadbarScheme[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<NadbarScheme[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const router = useRouter();

  useEffect(() => {
    NadbarService.getNadbars().then(setNadbars);
  }, []);

  useEffect(() => {
    NadbarService.filterNadbars(search).then(setFiltered);
  }, [search, nadbars]);

  const handlePress = (nadbar: NadbarScheme) => {
    if (showCheckboxes) {
      handleMark(nadbar.id);
      return;
    }
    const route = getNadbarRoute(nadbar);
    if (route) {
      router.push({ pathname: route, params: { nadbar: JSON.stringify(nadbar) } });
    } else {
      // fallback: just log
      console.log('No route for nadbar:', nadbar);
    }
  };

  const handleLongPress = (id: string) => {
    setShowCheckboxes(true);
    setSelectedIds([id]);
  };

  const handleMark = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    Alert.alert('מחיקה', 'האם אתה בטוח שברצונך למחוק את הנדברים שנבחרו?', [
      { text: 'ביטול', style: 'cancel' },
      {
        text: 'מחק', style: 'destructive', onPress: async () => {
          for (const id of selectedIds) {
            await NadbarService.deleteNadbar(id);
          }
          const updated = await NadbarService.getNadbars();
          setNadbars(updated);
          setSelectedIds([]);
          setShowCheckboxes(false);
          Alert.alert('מחיקה', 'הנדברים נמחקו בהצלחה');
        }
      }
    ]);
  };

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
              style={[styles.item, showCheckboxes && selectedIds.includes(item.id) && styles.itemSelected]}
              onPress={() => handlePress(item)}
              onLongPress={() => handleLongPress(item.id)}
            >
              <View style={styles.itemRow}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.updatedAtContainer}>
                  <Text style={styles.updatedAtLabel}>עודכן לאחרונה:</Text>
                  <Text style={styles.updatedAtDate}>{formatDate(Number(item.updatedAt))}</Text>
                </View>
                {showCheckboxes && (
                  <View style={styles.checkbox}>
                    <Text style={{ fontSize: 18, color: selectedIds.includes(item.id) ? '#007AFF' : '#bbb' }}>
                      {selectedIds.includes(item.id) ? '☑' : '☐'}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {showCheckboxes && (
        <View style={styles.actionBar}>
          <Button title="מחק" onPress={handleDelete} color="#ff3b30" disabled={selectedIds.length === 0} />
          <Button title="ביטול" onPress={() => { setShowCheckboxes(false); setSelectedIds([]); }} />
        </View>
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
  itemSelected: {
    borderColor: '#007AFF',
    borderWidth: 2,
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
  checkbox: {
    marginLeft: 12,
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

export default NadbarList; 