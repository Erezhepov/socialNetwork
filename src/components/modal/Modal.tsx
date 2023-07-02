import React from 'react';
import s from './Modal.module.css'

interface IModal {
    title: string
    closeModal: () => void
    children: any
}

const Modal = (props: IModal) => {
    const closeModal = () => props.closeModal()

    return (
        <div className={s.modalBg}>
            <div className={s.modalWrapper}>
                {props.title && <h2 className={s.title}>{props.title}</h2>}
                {props.children}
                <button onClick={closeModal} className={s.closeBtn}>X</button>
            </div>
        </div>
    )
};

export default Modal;