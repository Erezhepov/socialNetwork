import React from 'react';
import s from "./Info.module.css";

const Info = ({state}: any) => {
    return (
        <div className={s.info}>
            <div className={s.item}>
                {state.aboutMe && <span className={s.age}><strong>About me:</strong> {state.aboutMe}</span>}
            </div>
            <div className={s.item}>
                <span><strong>Looking for job:</strong> {state.lookingForAJob ? 'Yes' : 'No'}</span>
            </div>
            <div className={s.item}>
                {state.lookingForAJob && <div className={s.description}><span className={s.description}>{state.lookingForAJobDescription}</span></div>}
            </div>
        </div>
    );
};

export default Info;