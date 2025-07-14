import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../../../components/common/Button';
import { Modal } from '../../../../components/common/Modal';
import SelectableList from '../../../../components/common/SelectableList';
import { TzagonData } from '../../../../components/common/tzagonTypes';
import TzagonDetails from '../../../../components/TzagonDetails';
import { useTzagonPhotosStore } from '../../../../stores/tzagonPhotosStore';
import { formatDate } from '../../../../utils/dateUtils';

const TzagonPhotos = () => {
  const { tzagons, loadTzagons, deleteTzagon } = useTzagonPhotosStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedTzagonId, setSelectedTzagonId] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadTzagons();
  }, [loadTzagons]);

  const handleAddPhoto = () => {
    setSelectedTzagonId('new');
    setShowModal(true);
  };

  const handleItemPress = (item: TzagonData) => {
    setSelectedTzagonId(item.id);
    setShowModal(true);
  };

  const handleDelete = async (ids: string[]) => {
    for (const id of ids) {
      await deleteTzagon(id);
    }
    loadTzagons();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTzagonId(undefined);
  };

  const sortedTzagons = [...tzagons].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>צילומי צגון</Text>
      <Button title="הוסף צילום חדש" onPress={handleAddPhoto} />
      {sortedTzagons.length === 0 ? (
        <Text style={styles.empty}>לא נמצאו צילומים</Text>
      ) : (
        <SelectableList
          data={sortedTzagons}
          keyExtractor={(item: TzagonData) => item.id}
          renderItemContent={(item: TzagonData) => (
            <View style={styles.itemContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.targetNameAndDescription}</Text>
              </View>
              <View style={styles.updatedAtContainer}>
                <Text style={styles.updatedAtLabel}>עודכן לאחרונה:</Text>
                <Text style={styles.updatedAtDate}>{formatDate(Number(item.updatedAt))}</Text>
              </View>
            </View>
          )}
          onDelete={handleDelete}
          itemLabel={(item: TzagonData) => item.targetNameAndDescription}
          onItemPress={handleItemPress}
        />
      )}
      <Modal
        visible={showModal}
        onClose={handleCloseModal}
        title="פרטי צילום צגון"
        fullScreen
      >
        <TzagonDetails tzagonId={selectedTzagonId} onDeleteSuccess={handleCloseModal} />
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
  name: {
    fontSize: 18,
    color: '#222',
    textAlign: 'right',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default TzagonPhotos; 