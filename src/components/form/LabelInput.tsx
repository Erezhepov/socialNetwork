import React from 'react';
import s from "../../pages/profile/ProfileInfo/ChangeProfileForm/ChangeProfileForm.module.css";

interface ILabelInput {
    register: any,
    label: string
    name: string
    type: string
}

interface ILabelInputWithErrors extends  ILabelInput {
    errors: any
}

export const LabelInput: React.FC<ILabelInput> = (props) => {
    return (
        <div className={s.input}>
            <label className={props.type !== 'text' ? s.inputRow : ''} >
                <div>{props.label}</div>
                <input type={props.type} {...props.register(props.name)} />
            </label>
        </div>
    );
};

export const LabelInputWithErrors: React.FC<ILabelInputWithErrors> = (props) => {
    return (
        <div className={s.input}>
            <label >
                <div>{props.label}</div>
                <input type={props.type} {...props.register(props.name, {required: true})} />
                {props.errors.fullName && <div className={'error-text'}>This field is required</div>}
            </label>
        </div>
    );
};