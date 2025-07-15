import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../../components/common/Button';
import { FirePlanData } from '../../../../components/common/firePlanTypes';
import { Modal } from '../../../../components/common/Modal';
import SelectableList from '../../../../components/common/SelectableList';
import FirePlanDetails from '../../../../components/FirePlanDetails';
import { useFirePlanStore } from '../../../../stores/firePlanStore';

const FirePlan = () => {
  const { firePlans, loadFirePlans, deleteFirePlan, updateFirePlansOrder } = useFirePlanStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedFirePlanId, setSelectedFirePlanId] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadFirePlans();
  }, [loadFirePlans]);

  const handleAdd = () => {
    setSelectedFirePlanId(undefined);
    setShowModal(true);
  };

  const handleItemPress = (item: FirePlanData) => {
    setSelectedFirePlanId(item.id);
    setShowModal(true);
  };

  const handleDelete = async (ids: string[]) => {
    for (const id of ids) {
      await deleteFirePlan(id);
    }
    loadFirePlans();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFirePlanId(undefined);
  };

  const handleReorder = async (newData: FirePlanData[]) => {
    // Assign new order index to each item
    const reordered = newData.map((item, idx) => ({ ...item, order: idx }));
    await updateFirePlansOrder(reordered);
    loadFirePlans();
  };

  const sortedFirePlans = [...firePlans].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>תוכנית אש</Text>
      <Button title="הוסף תוכנית אש" onPress={handleAdd} />
      {sortedFirePlans.length === 0 ? (
        <Text style={styles.empty}>לא נמצאו תוכניות אש</Text>
      ) : (
        <SelectableList
          data={sortedFirePlans}
          keyExtractor={(item: FirePlanData) => item.id}
          renderItemContent={(item: FirePlanData) => (
            <View style={styles.itemContent}>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel} numberOfLines={1} ellipsizeMode="tail">זמן</Text>
                <Text style={styles.time} numberOfLines={1} ellipsizeMode="tail">{item.time}</Text>
              </View>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel} numberOfLines={1} ellipsizeMode="tail">שם מטרה</Text>
                <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{item.targetName}</Text>
              </View>
              <View style={styles.fieldColumn}>
                <Text style={styles.fieldLabel} numberOfLines={1} ellipsizeMode="tail">חימוש</Text>
                <Text style={styles.ammo} numberOfLines={1} ellipsizeMode="tail">{item.ammunition}</Text>
              </View>
            </View>
          )}
          onDelete={handleDelete}
          itemLabel={(item: FirePlanData) => item.targetName}
          onItemPress={handleItemPress}
          allowToReorder
          onReorder={handleReorder}
        />
      )}
      <Modal
        visible={showModal}
        onClose={handleCloseModal}
        title="פרטי תוכנית אש"
        fullScreen
      >
        <FirePlanDetails firePlanId={selectedFirePlanId} onDeleteSuccess={handleCloseModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 24,
    color: '#222',
    writingDirection: 'rtl',
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 18,
    color: '#888',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  fieldColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 12,
    minWidth: 70,
  },
  fieldLabel: {
    fontSize: 11,
    color: '#888',
    textAlign: 'right',
    opacity: 0.7,
    marginBottom: 2,
    writingDirection: 'rtl',
  },
  name: {
    fontSize: 18,
    color: '#222',
    textAlign: 'right',
    marginLeft: 12,
    writingDirection: 'rtl',
  },
  time: {
    fontSize: 16,
    color: '#444',
    textAlign: 'right',
    marginLeft: 12,
    writingDirection: 'rtl',
  },
  ammo: {
    fontSize: 16,
    color: '#444',
    textAlign: 'right',
    writingDirection: 'rtl',
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

export default FirePlan; 