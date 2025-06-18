import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TargetFields } from '../../services/TargetService';

interface TargetItemListProps {
  target: TargetFields;
}

const TargetItemList: React.FC<TargetItemListProps> = ({ target }) => {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/TargetsList/TargetDetails?target=${encodeURIComponent(JSON.stringify(target))}`);
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <Text style={styles.name}>{target.name}</Text>
      <Text style={styles.description}>{target.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
});

export default TargetItemList; 