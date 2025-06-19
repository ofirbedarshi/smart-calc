import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TargetFields } from '../../services/TargetService';

interface TargetItemListProps {
  target: TargetFields;
  onLongPress?: (target: TargetFields) => void;
}

const TargetItemList: React.FC<TargetItemListProps> = ({ target, onLongPress }) => {
  const router = useRouter();
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    router.push({
      pathname: '/screens/targetList/TargetDetails',
      params: {
        target: JSON.stringify(target),
      },
    });
  };

  const handleLongPress = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start(() => {
      if (onLongPress) onLongPress(target);
    });
  };

  const shake = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-8, 8],
  });

  return (
    <Animated.View style={[styles.card, { transform: [{ translateX: shake }] }]}> 
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        activeOpacity={0.8}
      >
        <Text style={styles.name}>{target.name}</Text>
        <Text style={styles.description}>{target.description}</Text>
      </TouchableOpacity>
    </Animated.View>
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