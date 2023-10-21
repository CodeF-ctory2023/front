import React from 'react';
import { Dialog, DialogTitle, DialogContentText, DialogActions } from '@mui/material';
import { GoAlertFill } from 'react-icons/go';
import { OperationsButton } from './OperationsButton';
import { secondaryColor, secondaryColorHover } from '@/components/PqrsModule/constants/colors';

interface DialogMessageProps {
    isOpen: boolean;
    onClose: () => void;
    textContent: string;
    title: string;
}

const DialogMessage = ({ isOpen, onClose, textContent, title }: DialogMessageProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} >
            <DialogTitle className='flex items-center justify-center space-x-3'>
                <GoAlertFill className='text-yellow-500' /> <span>{title} </span>
            </DialogTitle>
            <DialogContentText className='p-1 px-4'>{textContent}</DialogContentText>
            <div className='flex items-center justify-center mb-4'>
                <DialogActions>
                    <OperationsButton label='Aceptar' onClick={onClose} color={secondaryColor} colorHover={secondaryColorHover} />
                </DialogActions>
            </div>
        </Dialog>
    );
};

export { DialogMessage };


