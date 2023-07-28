import React, {useEffect, useRef, useState} from "react";
import s from './Messages.module.css'
import {Message} from "./Message/Message";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";


export const Messages: React.FC = () => {
    const messages = useTypedSelector(state => state.chat.messages)
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: any) => {
        const element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 200) {
            !isAutoScroll && setIsAutoScroll(true)
        }else{
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        if (isAutoScroll){
            messageAnchorRef.current?.scrollIntoView({block: 'end'})
        }
    }, [messages])
    return (
        <div className={s.messages} onScroll={scrollHandler}>
            { messages.map((m, index) => <Message key={index} message={m.message} userId={m.userId} userName={m.userName} photo={m.photo} /> ) }
            <div ref={messageAnchorRef}></div>
        </div>
    )
}