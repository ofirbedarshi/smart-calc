import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NadbarData } from '../../../components/common/nadbarTypes';
import SearchBar from '../../../components/common/SearchBar';
import SelectableList from '../../../components/common/SelectableList';
import { EXAMPLE_TEMPLATE } from '../../../components/nadbars/example/exampleTemplate';
import { DEFAULT_MASKAR_LOAL_TEMPLATE } from '../../../components/nadbars/maskar/maskarLoalTemplate';
import { DEFAULT_MASKAR_TEMPLATE } from '../../../components/nadbars/maskar/maskarTemplate';
import { NadbarService } from '../../../services/NadbarService';
import { formatDate } from '../../../utils/dateUtils';

// Template registry - add new templates here
const TEMPLATE_REGISTRY = {
  [DEFAULT_MASKAR_TEMPLATE.id]: DEFAULT_MASKAR_TEMPLATE,
  [DEFAULT_MASKAR_LOAL_TEMPLATE.id]: DEFAULT_MASKAR_LOAL_TEMPLATE,
  [EXAMPLE_TEMPLATE.id]: EXAMPLE_TEMPLATE,
  // Add more templates here as needed:
  // 'custom_template_id': CUSTOM_TEMPLATE,
};

function getNadbarRoute(nadbar: NadbarData): string | null {
  switch (nadbar.templateId) {
    case DEFAULT_MASKAR_TEMPLATE.id:
      return '/TargetPage/Maskar';
    case DEFAULT_MASKAR_LOAL_TEMPLATE.id:
      return '/TargetPage/MaskarLoal';
    case EXAMPLE_TEMPLATE.id:
      return '/TargetPage/ExampleNadbar';
    // Add more cases for other nadbar types/screens as needed
    default:
      return null;
  }
}

function getNadbarName(nadbar: NadbarData): string {
  const template = TEMPLATE_REGISTRY[nadbar.templateId];
  return template ? template.name : 'נדבר לא ידוע';
}

const NadbarList: React.FC = () => {
  const [nadbars, setNadbars] = useState<NadbarData[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<NadbarData[]>([]);
  const router = useRouter();

  useEffect(() => {
    NadbarService.getNadbars().then(setNadbars);
  }, []);

  useEffect(() => {
    NadbarService.filterNadbars(search).then(setFiltered);
  }, [search, nadbars]);

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
              <Text style={styles.name}>{getNadbarName(item)}</Text>
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