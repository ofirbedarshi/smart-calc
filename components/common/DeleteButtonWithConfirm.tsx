import React, { useState } from 'react';
import Button from './Button';
import ConfirmModal from './ConfirmModal';

interface DeleteButtonWithConfirmProps {
  items: string[];
  onDelete: () => void;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, 'title'> & { title?: string };
  confirmText?: string;
  cancelText?: string;
  modalTitle?: string;
  modalMessage?: string;
}

const DeleteButtonWithConfirm: React.FC<DeleteButtonWithConfirmProps> = ({
  items,
  onDelete,
  buttonProps = {},
  confirmText = 'מחק',
  cancelText = 'ביטול',
  modalTitle = 'אישור מחיקה',
  modalMessage = 'האם אתה בטוח שברצונך למחוק את הפריטים הבאים?',
}) => {
  const [visible, setVisible] = useState(false);

  const handleConfirm = () => {
    setVisible(false);
    onDelete();
  };

  const { title = 'מחיקה', ...restButtonProps } = buttonProps;

  return (
    <>
      <Button
        {...restButtonProps}
        title={title}
        onPress={() => setVisible(true)}
      />
      <ConfirmModal
        visible={visible}
        title={modalTitle}
        message={modalMessage}
        items={items}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={handleConfirm}
        onCancel={() => setVisible(false)}
      />
    </>
  );
};

export default DeleteButtonWithConfirm; 