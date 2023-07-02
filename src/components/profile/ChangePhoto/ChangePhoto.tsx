import React, {useState} from 'react';
import s from "../../../pages/profile/ProfileInfo/ProfileInfo.module.css";
import {updateProfilePhoto} from "../../../store/actionCreators/profileAC";
import {Dispatch} from "redux";

interface IChangePhoto {
    dispatch: Dispatch<any>
    closeChangePhoto: () => void
}

const ChangePhoto = ({dispatch, closeChangePhoto}: IChangePhoto) => {
    const [error, setError] = useState<boolean>(false)
    let file: File
    const checkPhoto = (e:  React.FocusEvent<HTMLInputElement>) => {
        if (e.target.files?.length){
            setError(false)
            file = e.target.files[0]
        }
    }
    const updatePhoto = (file: File) => {
        if (file){
            setError(false)
            dispatch(updateProfilePhoto(file))
            closeChangePhoto()
        }else setError(true)
    }
    return (
        <div className={s.items}>
            <div className={s.imageBlock}>
                <input onBlur={checkPhoto} type="file"/>
                {error && <div className={'error-text'}>You have not selected an image</div>}
            </div>
            <button onClick={() => updatePhoto(file)} >Update photo</button>
        </div>
    );
};

export default ChangePhoto;