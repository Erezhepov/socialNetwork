import React from "react";
import {Avatar} from "@mui/material";
import s from './Message.module.css'
import {Link} from "react-router-dom";
import {IMessage} from "../../../../../api/chat-api";
import {useTypedSelector} from "../../../../../hooks/useTypedSelector";


export const Message: React.FC<IMessage> = React.memo((props) => {
    const authState = useTypedSelector(state => state.auth)
    if (props.userId === authState.userId) {
        return <>
            <div className={s.itemOwn} style={{display: 'flex', columnGap: 10}}>
                <div className={s.messageOwn}>
                    <div>{props?.message}</div>
                </div>
            </div>
        </>
    }
    return (
        <>
            <div className={s.item} style={{display: 'flex', columnGap: 10}}>
                <div className={s.user}>
                    <Link to={'/profile/' + props.userId}>
                        <Avatar style={{width: '50px', height: '50px'}}
                                src={props.photo || 'https://img.freepik.com/free-icon/user_318-159711.jpg'}></Avatar>
                    </Link>
                </div>
                <div className={s.message}>
                    <h2>{props?.userName}</h2>
                    <div>{props?.message}</div>
                </div>
            </div>
        </>
    )
})