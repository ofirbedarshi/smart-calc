import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '../../hooks/useNavigation';
import { TargetFields } from '../../services/TargetService';
import { formatDate } from '../../utils/dateUtils';

interface TargetItemListProps {
  target: TargetFields;
  onLongPress?: (target: TargetFields) => void;
  showCheckbox?: boolean;
  isMarked?: boolean;
  onMark?: (target: TargetFields) => void;
}

const TargetItemList: React.FC<TargetItemListProps> = ({ target, onLongPress, showCheckbox, isMarked, onMark }) => {
  const navigation = useNavigation();
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    navigation.navigate({ name: 'TargetDetails', params: { targetId: target.id } });
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

  const handleMark = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (onMark) onMark(target);
  };

  const shake = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-8, 8],
  });

  return (
    <View style={styles.outerRow}>
      <Animated.View style={[styles.card, { transform: [{ translateX: shake }] }]}> 
        <TouchableOpacity
          onPress={handlePress}
          onLongPress={handleLongPress}
          activeOpacity={0.8}
          style={styles.row}
        >
          <View style={styles.textContainer}>
            <Text style={styles.name}>{target.name}</Text>
            <View style={styles.updatedAtContainer}>
              <Text style={styles.updatedAtLabel}>עודכן לאחרונה:</Text>
              <Text style={styles.updatedAtDate}>{formatDate(Number(target.updatedAt))}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
      {showCheckbox && (
        <TouchableOpacity onPress={handleMark} style={styles.checkboxTouchable} activeOpacity={0.7}>
          <Ionicons
            name={isMarked ? 'checkbox' : 'square-outline'} 
            size={28}
            color="#007AFF"
            style={styles.checkbox}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 0,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  checkboxTouchable: {
    padding: 8,
  },
});

export default TargetItemList; 