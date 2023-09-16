import React, {useState} from 'react';
import s from "./ChangeProfileForm.module.css";
import {SubmitHandler, useForm} from "react-hook-form";
import {putProfileAC} from "../../../../store/actionCreators/profileAC";
import {Dispatch} from "redux";
import {LabelInput, LabelInputWithErrors} from "../../../../components/form/LabelInput";

interface IChangeProfileForm {
    dispatch: Dispatch<any>
    authId: number | null
    closeModal: () => void
}


const ChangeProfileForm = ({dispatch, authId, closeModal}: IChangeProfileForm) => {
    const {register, handleSubmit, formState: {errors}} = useForm<any>()
    const [haveContacts, setHaveContacts] = useState(false)
    const changeProfile: SubmitHandler<Object> = (data: any) => {
        let updatedContacts = {
            'instagram': data.instagram,
            'vk': data.vk,
            'github': data.github,
            'website': data.website
        }
        const updatedData: any = {userId: authId, ...data, contacts: updatedContacts}
        dispatch(putProfileAC(updatedData))
        closeModal()
    }

    function contactHandler(e: React.MouseEvent<HTMLElement>) {
        setHaveContacts(prev => !prev)
    }

    return (
        <form className={s.inputs} onSubmit={handleSubmit(changeProfile)} action="">
            <LabelInputWithErrors label={'Full Name: '} name={'fullName'} type={'text'} register={register}
                                  errors={errors}/>
            <LabelInputWithErrors label={'About Me: '} name={'aboutMe'} type={'text'} register={register}
                                  errors={errors}/>
            <LabelInput register={register} label={'Your Skills:'} name={'lookingForAJobDescription'} type={'text'}/>
            <LabelInput register={register} label={'Looking for a Job:'} name={'lookingForAJob'} type={'checkbox'}/>
            <div className={s.input}>
                <label className={s.labelCheckbox}>
                    <span>Do you have contact?</span>
                    <input onClick={contactHandler} checked={haveContacts}
                           type={'radio'} {...register('haveContact')} />
                </label>
            </div>
            {haveContacts && <>
              <LabelInput register={register} label={'Github:'} name={'github'} type={'text'}/>
              <LabelInput register={register} label={'Facebook:'} name={'facebook'} type={'text'}/>
              <LabelInput register={register} label={'Instagram:'} name={'instagram'} type={'text'}/>
              <LabelInput register={register} label={'VK:'} name={'vk'} type={'text'}/>
              <LabelInput register={register} label={'Youtube:'} name={'youtube'} type={'text'}/>
              <LabelInput register={register} label={'Website:'} name={'website'} type={'text'}/>
            </>}
            <div className={s.input}>
                <input type={'submit'}/>
            </div>
        </form>
    );
};

export default ChangeProfileForm;