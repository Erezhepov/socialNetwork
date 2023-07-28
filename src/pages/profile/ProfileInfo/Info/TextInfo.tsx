import React from 'react';
import s from "./Info.module.css";

interface ITextInfo {
    value: string
    text: string
}

export const TextInfo :React.FC<ITextInfo> = ({value, text}) => {
    return value ? (
        <div className={s.item}>
            <div className={s.description}>
                <span className={s.description}>
                    <b>{text + ' '}</b>{value}</span>
            </div>
        </div>
    ) : <></>

};
