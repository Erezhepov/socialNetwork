import React, {useState} from 'react';
import s from "./ProfileInfo.module.css";
import Status from "../../../components/profile/Status/Status";
import Modal from "../../../components/modal/Modal";
import ChangeProfileForm from "./ChangeProfileForm/ChangeProfileForm";
import Info from "./Info/Info";
import ChangePhoto from "../../../components/profile/ChangePhoto/ChangePhoto";
import {Dispatch} from "redux";
import Button from '@mui/material/Button';
import {Menu, MenuItem} from "@mui/material";
import ModalMUI from "../../../components/ModalMUI";

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
    const viewPhoto = () => {
        handleClose()
        setIsViewPhoto(true)
    }
    const closeViewPhoto = () => setIsViewPhoto(false)
    const closeChangePhoto = () => setIsChangePhoto(false)
    const changePhoto = () => {
        handleClose()
        setIsChangePhoto(true)
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={s.profileInfo}>
            <div className={s.profileImg}>
                <div title={'click'} className={s.avatar}>
                    <img onClick={handleClick}
                         src={state.photos.large || 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt=""/>
                    <div className={s.dropdown}>
                        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}
                              MenuListProps={{'aria-labelledby': 'basic-button',}}>
                            <MenuItem onClick={viewPhoto}>View photo</MenuItem>
                            {authId === Number(userId) ?
                                <MenuItem onClick={changePhoto}>Change photo</MenuItem> : <></>}
                        </Menu>
                    </div>
                </div>
            </div>
            {isViewPhoto && <Modal title={''} closeModal={closeViewPhoto}>
              <img className={s.largePhoto}
                   src={state.photos?.large || 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt=""/>
            </Modal>}
            {isChangePhoto && <Modal title={'Change photo'} closeModal={closeChangePhoto}>
              <ChangePhoto dispatch={dispatch} closeChangePhoto={closeChangePhoto}/>
            </Modal>}
            <div className={s.profileTexts}>
                <div className={s.name}><span>{state.fullName || 'Unknown'}</span></div>
                {state.status && <Status id={authId} userId={Number(userId)} textStatus={state.status}/>}
                <Info state={state}/>
                {authId === Number(userId) &&
                  <Button className={s.changeProfileBtn} style={{background: '#6A2C91'}} variant={'contained'}
                          onClick={openModal}>Change
                    Profile</Button>}
            </div>
            {modal && <ModalMUI closeModal={closeModal} handleBtn={modal}>
              <ChangeProfileForm closeModal={closeModal} dispatch={dispatch} authId={authId}/>
            </ModalMUI>}
        </div>
    );
};

export default ProfileInfo;