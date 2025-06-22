import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { EditableData } from '../../../components/EditableData';
import { DatePicker } from '../../../components/common/DatePicker';
import { Dropdown } from '../../../components/common/Dropdown';
import PrefixInput from '../../../components/common/PrefixInput';
import { TimePicker } from '../../../components/common/TimePicker';
import { TargetFields } from '../../../services/TargetService';

const YES_NO_OPTIONS = [
  { label: 'כן', value: 'כן' },
  { label: 'לא', value: 'לא' },
];

interface FieldSectionProps {
  targetFields: TargetFields;
  isEditMode: boolean;
  onFieldChange: (field: keyof TargetFields, value: string) => void;
  computed: { azimuth: string; distance: string; elevation: string };
  onToggleEdit: () => void;
}

const FieldSection: React.FC<FieldSectionProps> = ({ targetFields, isEditMode, onFieldChange, computed, onToggleEdit }) => (
  <View style={styles.section}>
    <View style={styles.headerActions}>
      <TouchableOpacity onPress={onToggleEdit} style={styles.iconButton}>
        <Ionicons
          name={isEditMode ? 'close' : 'pencil'}
          size={20}
          color={isEditMode ? '#FF3B30' : '#007AFF'}
        />
      </TouchableOpacity>
    </View>
    <EditableData
      label="שם מטרה"
      value={targetFields.name}
      onChange={value => onFieldChange('name', value)}
      editMode={isEditMode}
      placeholder="הזן שם מטרה"
    />
    <EditableData
      label="תיאור"
      value={targetFields.description}
      onChange={value => onFieldChange('description', value)}
      editMode={isEditMode}
      placeholder="הזן תיאור"
    />
    <EditableData
      label="נ.צ צפוני"
      value={targetFields.northCoord}
      onChange={value => onFieldChange('northCoord', value)}
      editMode={isEditMode}
      editComponent={
        <PrefixInput
          value={targetFields.northCoord}
          onChange={value => onFieldChange('northCoord', value)}
          prefixLength={1}
          type="number"
          placeholder="הזן נ.צ צפוני"
        />
      }
    />
    <EditableData
      label="נ.צ מזרחי"
      value={targetFields.eastCoord}
      onChange={value => onFieldChange('eastCoord', value)}
      editMode={isEditMode}
      type="number"
      placeholder="הזן נ.צ מזרחי"
    />
    <EditableData
      label="גובה"
      value={targetFields.height}
      onChange={value => onFieldChange('height', value)}
      editMode={isEditMode}
      type="number"
      placeholder="הזן גובה"
    />
    <EditableData
      label="אזימוט"
      value={computed.azimuth}
      onChange={() => {}}
      editMode={isEditMode}
      type="number"
      placeholder="הזן אזימוט"
      disabled={true}
      info="הנתון 'אזימוט' מחושב אוטומטית לפי מחשבון ״המרת נ.צ״ לכן אינו ניתן לעריכה"
    />
    <EditableData
      label="טווח"
      value={computed.distance}
      onChange={() => {}}
      editMode={isEditMode}
      type="number"
      placeholder="הזן טווח"
      disabled={true}
      info="הנתון 'טווח' מחושב אוטומטית לפי מחשבון ״המרת נ.צ״ לכן אינו ניתן לעריכה"
    />
    <EditableData
      label="זוה״ר"
      value={computed.elevation}
      onChange={() => {}}
      editMode={isEditMode}
      type="number"
      placeholder="הזן זוה״ר"
      disabled={true}
      info="הנתון 'זוה״ר' מחושב אוטומטית לפי מחשבון ״המרת נ.צ״ לכן אינו ניתן לעריכה"
    />
    <EditableData
      label="האם נתקפה"
      value={targetFields.isAttacked}
      onChange={value => onFieldChange('isAttacked', value)}
      editMode={isEditMode}
      editComponent={
        <Dropdown
          options={YES_NO_OPTIONS}
          value={targetFields.isAttacked}
          onChange={value => onFieldChange('isAttacked', value)}
        />
      }
    />
    <EditableData
      label="שעה"
      value={targetFields.time}
      onChange={value => onFieldChange('time', value)}
      editMode={isEditMode}
      editComponent={
        <TimePicker
          value={targetFields.time}
          onChange={value => onFieldChange('time', value)}
          placeholder="הזן שעה"
        />
      }
    />
    <EditableData
      label="חימוש"
      value={targetFields.ammunition}
      onChange={value => onFieldChange('ammunition', value)}
      editMode={isEditMode}
      placeholder="הזן חימוש"
    />
    <EditableData
      label="חוליה"
      value={targetFields.team}
      onChange={value => onFieldChange('team', value)}
      editMode={isEditMode}
      placeholder="הזן חוליה"
    />
    <EditableData
      label="תאריך"
      value={targetFields.date}
      onChange={value => onFieldChange('date', value)}
      editMode={isEditMode}
      editComponent={
        <DatePicker
          value={targetFields.date}
          onChange={value => onFieldChange('date', value)}
          placeholder="הזן תאריך"
        />
      }
    />
    <EditableData
      label="הערות"
      value={targetFields.notes}
      onChange={value => onFieldChange('notes', value)}
      editMode={isEditMode}
      placeholder="הזן הערות"
    />
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FieldSection; 