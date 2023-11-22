import { useEffect, useState } from 'react';

const useDelete = <T>(
  elements: T[] | undefined,
  setElements: React.Dispatch<React.SetStateAction<T[] | undefined>>,
  setAlertOptions: React.Dispatch<
    React.SetStateAction<{
      severity: 'success' | 'error' | 'info' | 'confirm';
      message: string;
    }>
  >,
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>,
  type: 'coupon' | 'discount',
  deleteFn: (id: string) => Promise<void>
) => {
  const [idToDelete, setIdToDelete] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [copyIdToDelete, setCopyIdToDelete] = useState('');

  useEffect(() => {
    if (idToDelete !== '' || copyIdToDelete) {
      setCopyIdToDelete(idToDelete ? idToDelete : copyIdToDelete);
      if (deleteConfirm) {
        deleteFn(copyIdToDelete)
          .then(() => {
            const newElements = elements?.filter(
              (element) => (element as { id: string }).id !== copyIdToDelete
            );
            setElements(newElements ?? []);
            setElements(newElements ?? []);
            setAlertOptions({
              severity: 'success',
              message:
                type === 'coupon'
                  ? 'El cupón fue eliminado'
                  : 'La promoción fue eliminada',
            });
          })
          .catch(() => {
            setAlertOptions({
              severity: 'error',
              message:
                type === 'coupon'
                  ? 'El cupón no pudo ser eliminado'
                  : 'La promoción no pudo ser eliminada',
            });
          })
          .finally(() => {
            setOpenAlert(true);
            setIdToDelete('');
            setDeleteConfirm(false);
            setCopyIdToDelete('');
          });
      } else {
        setAlertOptions({
          severity: 'confirm',
          message:
            type === 'coupon'
              ? '¿Está seguro de eliminar el cupón?'
              : '¿Está seguro de eliminar la promoción?',
        });
        setOpenAlert(true);
      }
    }
    setIdToDelete('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToDelete, deleteConfirm]);

  return { setIdToDelete, setDeleteConfirm };
};

export { useDelete };
