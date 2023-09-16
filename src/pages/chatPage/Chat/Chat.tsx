import React, {useEffect} from 'react';
import {Messages} from "./Messages/Messages";
import {useDispatch} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../../store/actionCreators/chat";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import AddMessageForm from './AddMessageForm/AddMessageForm';

const Chat: React.FC = () => {
    const status = useTypedSelector(state => state.chat.status)
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])
    if (status === 'error') return <div>Some error has occurred. Please refresh the page.</div>
    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    );
};

export default Chat;



