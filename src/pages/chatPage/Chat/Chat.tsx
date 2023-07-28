import React, {useEffect, useState} from 'react';
import {Messages} from "./Messages/Messages";
import {useDispatch} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../store/actionCreators/chat";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

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
            <Messages />
            <AddMessageForm />
        </div>
    );
};

export default Chat;

const AddMessageForm: React.FC = () => {
    const [value, setValue] = useState('')
    const status = useTypedSelector(state => state.chat.status)
    const dispatch: any = useDispatch()
    const sendMessageHandler = () => {
        if (!value) return
        dispatch(sendMessage(value))
        setValue('')
    }
    const changeText = (e:  any) => setValue(e.target.value)

    return (
        <div>
            {status === 'pending' && <div>Loading...</div>}
            <div>
                <textarea onChange={changeText} value={value} name="addMessageForm"></textarea>
            </div>
            <button disabled={value.length === 0 || status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    )
}

