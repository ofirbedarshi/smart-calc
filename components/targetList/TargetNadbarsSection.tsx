import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '../../hooks/useNavigation';
import { NadbarService } from '../../services/NadbarService';
import { getNadbarName, getNadbarRoute } from '../../utils/nadbarRegistry';
import LinkButton from '../common/LinkButton';
import { NadbarData } from '../common/nadbarTypes';

interface TargetNadbarsSectionProps {
  targetId: string;
}

const TargetNadbarsSection: React.FC<TargetNadbarsSectionProps> = ({ targetId }) => {
  const [nadbars, setNadbars] = useState<NadbarData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadNadbars = async () => {
      try {
        setLoading(true);
        const allNadbars = await NadbarService.getNadbars();
        const targetNadbars = allNadbars.filter(nadbar => nadbar.targetId === targetId);
        setNadbars(targetNadbars);
      } catch (error) {
        console.error('[TargetNadbarsSection] Failed to load nadbars:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNadbars();
  }, [targetId]);

  const handleNadbarPress = (nadbar: NadbarData) => {
    const route = getNadbarRoute(nadbar);
    if (route) {
      navigation.navigate(route as any, { nadbarId: nadbar.id });
    }
  };

  if (loading) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>נדברים קשורים</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>טוען נדברים...</Text>
          <ActivityIndicator size="small" color="#007AFF" style={styles.loadingSpinner} />
        </View>
      </View>
    );
  }

  if (nadbars.length === 0) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>נדברים קשורים</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>אין נדברים למטרה זו</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.countText}>({nadbars.length})</Text>
        <Text style={styles.headerText}>נדברים</Text>
      </View>
      <View style={styles.nadbarsList}>
        {nadbars.map((nadbar, index) => (
          <LinkButton
            key={nadbar.id}
            title={getNadbarName(nadbar)}
            onPress={() => handleNadbarPress(nadbar)}
            style={index === nadbars.length - 1 ? styles.lastItem : styles.nadbarItem}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'flex-end',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  countText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
    textAlign: 'right',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  loadingSpinner: {
    marginRight: 8,
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  nadbarsList: {
    gap: 8,
  },
  nadbarItem: {
    marginBottom: 0,
  },
  lastItem: {
    marginBottom: 0,
  },
});

export default TargetNadbarsSection; 