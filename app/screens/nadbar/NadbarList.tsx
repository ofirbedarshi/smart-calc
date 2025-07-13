import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NadbarData } from '../../../components/common/nadbarTypes';
import SearchBar from '../../../components/common/SearchBar';
import SelectableList from '../../../components/common/SelectableList';
import { NadbarService } from '../../../services/NadbarService';
import { TargetFields, TargetService } from '../../../services/TargetService';
import { formatDate } from '../../../utils/dateUtils';
import { getNadbarName, getNadbarRoute } from '../../../utils/nadbarRegistry';

const NadbarList: React.FC = () => {
  const [nadbars, setNadbars] = useState<NadbarData[]>([]);
  const [targets, setTargets] = useState<TargetFields[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<NadbarData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [nadbarsData, targetsData] = await Promise.all([
          NadbarService.getNadbars(),
          TargetService.getTargets()
        ]);
        setNadbars(nadbarsData);
        setTargets(targetsData);
      } catch (error) {
        console.error('[NadbarList] Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    NadbarService.filterNadbars(search).then(setFiltered);
  }, [search, nadbars]);

  const getTargetName = (targetId?: string): string => {
    if (!targetId) return 'אין מטרה מקושרת';
    const target = targets.find(t => t.id === targetId);
    return target?.name || 'אין שם למטרה המקושרת';
  };

  const handleDelete = async (ids: string[]) => {
    for (const id of ids) {
      await NadbarService.deleteNadbar(id);
    }
    Alert.alert('מחיקה', 'הנדברים נמחקו בהצלחה');
    const updated = await NadbarService.getNadbars();
    setNadbars(updated);
  };

  const handleNavigate = (nadbar: NadbarData) => {
    const route = getNadbarRoute(nadbar);
    if (route) {
      router.push({ pathname: route as any, params: { nadbarId: nadbar.id } });
    } else {
      Alert.alert('שגיאה', 'לא ניתן לפתוח נדבר זה');
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearch} placeholder="חפש נדבר לפי שם..." />
      {filtered.length === 0 ? (
        <Text style={styles.empty}>לא נמצאו נדברים</Text>
      ) : (
        <SelectableList
          data={filtered}
          keyExtractor={item => item.id}
          renderItemContent={item => (
            <>
              <View style={styles.contentContainer}>
                <Text style={styles.name}>{getNadbarName(item)}</Text>
                
                  <Text style={styles.targetName}>
                    <Text style={styles.targetLabel}>מטרה: </Text>
                    <Text style={styles.targetNameBold}>{getTargetName(item.targetId)}</Text>
                  </Text>
                
              </View>
              <View style={styles.updatedAtContainer}>
                <Text style={styles.updatedAtLabel}>עודכן לאחרונה:</Text>
                <Text style={styles.updatedAtDate}>{formatDate(Number(item.updatedAt))}</Text>
              </View>
            </>
          )}
          onDelete={handleDelete}
          itemLabel={item => getNadbarName(item)}
          onItemPress={handleNavigate}
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
  contentContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: '#222',
    textAlign: 'right',
  },
  targetName: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  targetLabel: {
    fontSize: 14,
    color: '#666',
  },
  targetNameBold: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
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