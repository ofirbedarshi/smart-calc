import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, placeholder = 'בחר שעה' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const parseTime = (timeStr: string): Date | null => {
    if (!timeStr) return null;
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    if (hours === undefined || minutes === undefined || seconds === undefined) return null;
    
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  };

  const handleConfirm = (date: Date) => {
    onChange(formatTime(date));
    setIsVisible(false);
  };

  return (
    <>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setIsVisible(true)}
      >
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setIsVisible(false)}
        date={parseTime(value) || new Date()}
        locale="he-IL"
        is24Hour={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    minHeight: 40,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
  placeholder: {
    color: '#666',
  },
}); 