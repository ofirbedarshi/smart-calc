import React, { useState } from 'react';
import TargetsListSelector from '../../app/screens/targetList/TargetsListSelector';
import Button from './Button';
import { Modal } from './Modal';

interface TargetSelectorModalProps {
  onChooseTarget: (target: any) => void;
  buttonTitle?: string;
}

export const TargetSelectorModal: React.FC<TargetSelectorModalProps> = ({ 
  onChooseTarget, 
  buttonTitle = "בחר מטרה" 
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTargetSelect = (target: any) => {
    onChooseTarget(target);
    setIsModalVisible(false);
  };

  return (
    <>
      <Button 
        title={buttonTitle} 
        onPress={() => setIsModalVisible(true)} 
        theme={'success'}
        small
      />
      
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="בחר מטרה"
        fullScreen={true}
      >
        <TargetsListSelector
          onTargetSelect={handleTargetSelect}
          showAddButton={false}
        />
      </Modal>
    </>
  );
}; 