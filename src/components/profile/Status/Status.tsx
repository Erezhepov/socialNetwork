import React, {useMemo, useState} from 'react';
import s from "./Status.module.css";
import {useDispatch} from "react-redux";
import {PutStatusAC} from "../../../store/actionCreators/profileAC";
import {Dispatch} from "redux";

interface IStatus {
    textStatus: string
    id: number | null
    userId: number | null
}

const Status = ({textStatus, id, userId}: IStatus) => {
    const dispatch: Dispatch<any> = useDispatch()
    const [status, setStatus] = useState<boolean>(false)
    const [statusText, setStatusText] = useState(textStatus)
    useMemo(() => {
        setStatusText(textStatus)
    }, [textStatus])
    const changeStatus = () => id === userId && setStatus(true)
    const saveStatus = () => {
        setStatus(false)
        setStatusText(statusText)
        dispatch(PutStatusAC(statusText))
    }
    const changeStatusText = (e:  React.ChangeEvent<HTMLInputElement>) => setStatusText(e.target.value)
    const pressEnter = (e:  React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') saveStatus()
    }

    return (
        <div className={s.statusItem}>
            {status ?
                <input value={statusText} onKeyPress={pressEnter}
                       onChange={changeStatusText} autoFocus onBlur={saveStatus} type="text"/>
                : <div onDoubleClick={changeStatus}
                       title={'double click for changing status'}
                       style={{opacity: statusText ? '1' : '.6', cursor: 'pointer'}}
                       className={s.status}>{statusText || 'empty status'}</div>}
        </div>
    );
};

export default Status;