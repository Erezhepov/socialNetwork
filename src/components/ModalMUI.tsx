import {Box, Modal} from '@mui/material';
import React, {ReactNode} from 'react';

interface IModalMUI {
    handleBtn: boolean
    children: ReactNode
    closeModal: () => void
}

const ModalMui = (props: IModalMUI) => {
    const [open, setOpen] = React.useState(props.handleBtn);
    const handleClose = () => {
        props.closeModal()
        setOpen(false)
    };
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 4,
        p: ['25px 20px'],
    };
    return (
        <Modal open={open} onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
            <Box sx={style}>
                {props.children}
            </Box>
        </Modal>
    );
};

export default ModalMui;