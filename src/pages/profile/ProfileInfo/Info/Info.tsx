import React from 'react';
import s from "./Info.module.css";
import {TextInfo} from './TextInfo';

const Info = ({state}: any) => {
    return (
        <div className={s.info}>
            <TextInfo value={state.aboutMe} text={'About me:'} />
            <div className={s.item}>
                <span><strong>Looking for job:</strong> {state.lookingForAJob ? 'Yes' : 'No'}</span>
            </div>
            <div className={s.item}>
                {state.lookingForAJob && <div className={s.description}><span className={s.description}><b>Description:</b> {state.lookingForAJobDescription}</span></div>}
            </div>
            {state.contacts && (
                <div className={s.contacts}>
                    <h2>Contacts: </h2>
                    <TextInfo value={state.contacts.github} text={'Github:'} />
                    <TextInfo value={state.contacts.vk} text={'VK:'} />
                    <TextInfo value={state.contacts.youtube} text={'Youtube:'} />
                    <TextInfo value={state.contacts.website} text={'Website:'} />
                    <TextInfo value={state.contacts.instagram} text={'Instagram:'} />
                </div>
            )}
        </div>
    );
};

export default Info;