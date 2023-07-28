import {IMessage, TStatusChat} from "../../api/chat-api";
export const SET_MESSAGES = 'SET_MESSAGES'
export const SET_STATUS_CHAT = 'chat/SET_STATUS'


interface IChatState {
    messages: IMessage[]
    status: TStatusChat
}

const initialState: IChatState = {
    messages: [],
    status: 'pending'
}

export interface IAMessage {
    type: typeof SET_MESSAGES,
    payload: IMessage[]
}
export interface IAStatusChat {
    type: typeof SET_STATUS_CHAT
    payload: TStatusChat
}

type TChatAction = IAMessage | IAStatusChat

export const ChatReducer = (state=initialState, action: TChatAction): IChatState  => {
    switch (action.type){
        case SET_MESSAGES:
            return {...state, messages: [...state.messages, ...action.payload]
                    .filter((m, index, array) => array.length - 50 < index)}
        case SET_STATUS_CHAT:
            return {...state, status: action.payload}
        default: return {...state}
    }
}