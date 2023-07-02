import React from 'react';
import s from "./ChangeProfileForm.module.css";
import {SubmitHandler, useForm} from "react-hook-form";
import {PutProfileAC} from "../../../../store/actionCreators/profileAC";
import {Dispatch} from "redux";

interface IChangeProfileForm {
    dispatch: Dispatch<any>
    closeModal: () => void
    authId: number | null
}

const ChangeProfileForm = ({dispatch, closeModal, authId}: IChangeProfileForm) => {
    const {register, handleSubmit, formState: { errors }} = useForm<any>()
    const changeProfile: SubmitHandler<Object>  = (data: Object) => {
        const updatedData: Object = {userId: authId, ...data}
        dispatch(PutProfileAC(updatedData))
        closeModal()
    }
    return (
        <form className={s.inputs} onSubmit={handleSubmit(changeProfile)} action="">
            <div className={s.input}>
                <label >
                    <div>Full Name:</div>
                    <input placeholder={'Full Name'} {...register('fullName', {required: true})} />
                    {errors.FullName && <div className={'error-text'}>This field is required</div>}
                </label>
            </div>
            <div className={s.input}>
                <label >
                    <div>About Me:</div>
                    <input placeholder={'About Me'} {...register('aboutMe', {required: true})} />
                    {errors.FullName && <div className={'error-text'}>This field is required</div>}
                </label>
            </div>
            <div className={s.input}>
                <label >
                    <div>Your Skills:</div>
                    <input placeholder={'Skills'} {...register('lookingForAJobDescription')} />
                </label>
            </div>
            <div className={s.input}>
                <label className={s.labelCheckbox}>
                    <span>Looking for a Job:</span>
                    <input type={'checkbox'} {...register('lookingForAJob')} />
                </label>
            </div>
            <div className={s.input}>
                <input type={'submit'} />
            </div>
        </form>
    );
};

export default ChangeProfileForm;