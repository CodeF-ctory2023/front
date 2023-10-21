import React from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogActions} from '@mui/material';
import { GoAlertFill } from 'react-icons/go';
import { OperationsButton } from './OperationsButton';
import { primaryColor, primaryColorHover, secondaryColor, secondaryColorHover } from '@/components/PqrsModule/constants/colors';

interface DialogMessageProps {
    isOpen: boolean;
    onClose: () => void;
    back: () => void;
    textContent: string;
    title: string;
}

const DialogDelete = ({ isOpen, onClose, back, textContent, title }: DialogMessageProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} >
            <DialogTitle className='flex items-center justify-center space-x-3'>
                <GoAlertFill className='text-red-500' /> <span>{title} </span>
            </DialogTitle>
            <DialogContentText className='p-1 px-4'>{textContent}</DialogContentText>
            <div className='flex items-center justify-center mb-4'>
                <DialogActions>
                    <OperationsButton label='Cancelar' onClick={back} color={secondaryColor} colorHover={secondaryColorHover} />
                    <OperationsButton label='Aceptar' onClick={onClose} color={primaryColor} colorHover={primaryColorHover} />
                </DialogActions>
            </div>
        </Dialog>
    );
};

export { DialogDelete };


