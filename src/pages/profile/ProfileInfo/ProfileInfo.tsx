import React, {useState} from 'react';
import s from "./ProfileInfo.module.css";
import Status from "../../../components/profile/Status/Status";
import Modal from "../../../components/modal/Modal";
import ChangeProfileForm from "./ChangeProfileForm/ChangeProfileForm";
import Info from "./Info/Info";
import ChangePhoto from "../../../components/profile/ChangePhoto/ChangePhoto";
import {Dispatch} from "redux";

interface IProfileInfo {
    state: any
    authId: number | null
    userId: string | undefined
    dispatch: Dispatch
}

const ProfileInfo = ({state, authId, userId, dispatch}: IProfileInfo) => {
    const [modal, setModal] = useState<boolean>(false)
    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)
    const [isViewPhoto, setIsViewPhoto] = useState<boolean>(false)
    const [isChangePhoto, setIsChangePhoto] = useState<boolean>(false)
    const viewPhoto = () => setIsViewPhoto(true)
    const closeViewPhoto = () => setIsViewPhoto(false)
    const closeChangePhoto = () => setIsChangePhoto(false)
    const changePhoto = () => setIsChangePhoto(true)
    return (
        <div className={s.profileInfo}>
            <div className={s.profileImg}>
                <div className={s.avatar}>
                    <img src={state.photos.large || 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt=""/>
                        <div className={s.dropdown}>
                            <ul>
                                <li onClick={viewPhoto}>View photo</li>
                                {authId === Number(userId) ? <li onClick={changePhoto}>Change photo</li> : <></>}
                            </ul>
                        </div>
                </div>
            </div>
            {isViewPhoto && <Modal title={''} closeModal={closeViewPhoto}>
                <img className={s.largePhoto} src={state.photos?.large || 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt=""/>
            </Modal>}
            {isChangePhoto && <Modal title={'Change photo'} closeModal={closeChangePhoto}>
                <ChangePhoto dispatch={dispatch} closeChangePhoto={closeChangePhoto} />
            </Modal>}
            <div className={s.profileTexts}>
                <div className={s.name}><span>{state.fullName || 'Unknown'}</span></div>
                <Status id={authId} userId={Number(userId)} textStatus={state.status} />
                <Info state={state} />
                {authId === Number(userId) && <button onClick={openModal}>Change Profile</button>}
                {modal && <Modal closeModal={closeModal} title={'Change Profile:'}>
                    <ChangeProfileForm dispatch={dispatch} closeModal={closeModal} authId={authId} />
                </Modal>}
            </div>
        </div>
    );
};

export default ProfileInfo;