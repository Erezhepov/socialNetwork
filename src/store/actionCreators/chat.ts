import {chatAPI, IMessage, TStatusChat} from "../../api/chat-api";
import {Dispatch} from "redux";
import {IAMessage, IAStatusChat, SET_MESSAGES, SET_STATUS_CHAT} from "../reducers/chatReducer";


let _newMessageHandler: ((messages: IMessage[]) => void) | null = null
const newMessageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null){
        _newMessageHandler = (messages) => {
            dispatch(getMessagesAC(messages))
        }
    }
    return _newMessageHandler
};

let _statusChatHandler: ((status: TStatusChat) => void) | null = null
const statusChangedHandler = (dispatch: Dispatch) => {
    if (_statusChatHandler === null){
        _statusChatHandler = (status) => {
            dispatch(getStatusAC(status))
        }
    }
    return _statusChatHandler
};

export const startMessagesListening = () => {
    return async (dispatch: Dispatch) => {
        chatAPI.start()
        chatAPI.subscribe('message-received', newMessageHandler(dispatch))
        chatAPI.subscribe('status-changed', statusChangedHandler(dispatch))
    }
}

export const stopMessagesListening = () => {
    return async (dispatch: Dispatch) => {
        chatAPI.unsubscribe('message-received', newMessageHandler(dispatch))
        chatAPI.unsubscribe('status-changed', newMessageHandler(dispatch))
        chatAPI.stop()
    }
}

export const sendMessage = (message: string) => {
    return async (dispatch: Dispatch) => {
        chatAPI.sendMessage(message)
    }
}

export const getMessagesAC = (messages: IMessage[]): IAMessage => {
    return {type: SET_MESSAGES, payload: messages}
}

export const getStatusAC = (status: TStatusChat): IAStatusChat => {
    return {type: SET_STATUS_CHAT, payload: status}
}
