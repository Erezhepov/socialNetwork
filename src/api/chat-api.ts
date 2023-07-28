export type TStatusChat = 'pending' | 'ready' | 'error'
export interface IMessage {
    userId: number,
    photo: string,
    message: string,
    userName: string
}

type TEventsNames = 'message-received' | 'status-changed'

type TMessagesReceivedSubscriber = (messages: IMessage[]) => void
type TStatusChangedSubscriber = (status: TStatusChat) => void
interface ISubscribers {
    'message-received' : TMessagesReceivedSubscriber[]
    'status-changed' : TStatusChangedSubscriber[]
}

const subscribers: ISubscribers = {
    'message-received' : [],
    'status-changed' : []
}

let messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers['message-received'].forEach(s => s(newMessages))
};
let wsChannel: WebSocket | null
function closeHandler() {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000);
}
function errorHandler(){
    notifySubscribersAboutStatus('error')
}
function cleanUp(){
    wsChannel?.removeEventListener('close', closeHandler)
    wsChannel?.removeEventListener('message', closeHandler)
    wsChannel?.removeEventListener('open', openHandler)
    wsChannel?.removeEventListener('error', errorHandler)
}

function openHandler(){
    notifySubscribersAboutStatus('ready')
}

function notifySubscribersAboutStatus(status: TStatusChat){
    subscribers["status-changed"].forEach(s => s(status))
}

function createChannel(){
    cleanUp()
    wsChannel?.close()
    wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    wsChannel?.addEventListener('close', closeHandler)
    wsChannel?.addEventListener('message', messageHandler)
    wsChannel?.addEventListener('open', openHandler)
    wsChannel?.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start(){
        createChannel()
    },
    stop(){
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        wsChannel?.close()
    },
    subscribe(eventName: TEventsNames, callback: TMessagesReceivedSubscriber | TStatusChangedSubscriber){
        // @ts-ignore
        subscribers[eventName].push(callback)
    },
    unsubscribe(eventName: TEventsNames, callback: TMessagesReceivedSubscriber | TStatusChangedSubscriber){
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string){
        wsChannel?.send(message)
    }
}

