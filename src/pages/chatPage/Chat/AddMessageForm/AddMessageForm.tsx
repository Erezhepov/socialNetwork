import React, {useState} from 'react';
import {useTypedSelector} from "../../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {sendMessage} from "../../../../store/actionCreators/chat";
import Loading from "../../../../components/Loading";

const AddMessageForm: React.FC = () => {
    const [value, setValue] = useState('')
    const status = useTypedSelector(state => state.chat.status)
    const dispatch: any = useDispatch()
    const sendMessageHandler = () => {
        if (!value.trim()) return
        dispatch(sendMessage(value))
        setValue('')
    }
    const onKeyPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            if (!value.trim()) return
            dispatch(sendMessage(value))
            setValue('')
        }

    }
    const changeText = (e: any) => setValue(e.target.value)

    return (
        <div style={{marginTop: '1em'}}>
            {status === 'pending' && <Loading/>}
            <div>
                <textarea onKeyPress={onKeyPressEnter} onChange={changeText} value={value}
                          name="addMessageForm"></textarea>
            </div>
            <button disabled={value.length === 0 || status !== 'ready'}
                    onClick={sendMessageHandler}>Send
            </button>
        </div>
    )
}

export default AddMessageForm