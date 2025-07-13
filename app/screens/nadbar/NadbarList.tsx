import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NadbarData } from '../../../components/common/nadbarTypes';
import SearchBar from '../../../components/common/SearchBar';
import SelectableList from '../../../components/common/SelectableList';
import { useNavigation } from '../../../hooks/useNavigation';
import { useNadbarStore } from '../../../stores/nadbarStore';
import { useTargetStore } from '../../../stores/targetStore';
import { formatDate } from '../../../utils/dateUtils';
import { getNadbarName, getNadbarRoute } from '../../../utils/nadbarRegistry';

const NadbarList: React.FC = () => {
  const { nadbars, loadNadbars, loading: nadbarLoading, deleteNadbar } = useNadbarStore();
  const { targets, loadTargets } = useTargetStore();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<NadbarData[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadNadbars();
    loadTargets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(nadbars);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        nadbars.filter(n => n.templateId && n.templateId.toLowerCase().includes(lower))
      );
    }
  }, [search, nadbars]);

  const getTargetName = (targetId?: string): string => {
    if (!targetId) return 'אין מטרה מקושרת';
    const target = targets.find((t: any) => t.id === targetId);
    return target?.name || 'אין שם למטרה המקושרת';
  };

  const handleDelete = async (ids: string[]) => {
    for (const id of ids) {
      await deleteNadbar(id);
    }
    Alert.alert('מחיקה', 'הנדברים נמחקו בהצלחה');
  };

  const handleNavigate = (nadbar: NadbarData) => {
    const route = getNadbarRoute(nadbar);
    if (route) {
      navigation.navigate(route as any, { nadbarId: nadbar.id });
    } else {
      Alert.alert('שגיאה', 'לא ניתן לפתוח נדבר זה');
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearch} placeholder="חפש נדבר לפי שם..." />
      {nadbarLoading ? (
        <Text style={styles.empty}>טוען...</Text>
      ) : filtered.length === 0 ? (
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