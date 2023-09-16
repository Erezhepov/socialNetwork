import React, {useState} from 'react';
import InputItem from "../InputItem";
import {useDispatch} from "react-redux";
import {ActionUsersTerm, fetchUsers} from "../../store/actionCreators/user";
import s from './SearchInput.module.css'

const SearchInput = () => {
    const dispatch: any = useDispatch()
    const [name, setName] = useState<string>('')
    const getUser = (value: string) => {
        setName(value)
    }
    const findUsers = () => {
        if (name) {
            dispatch(ActionUsersTerm(name))
            dispatch(fetchUsers(1, 20, name))
        }
    }

    return (
        <div className={s.searchInput}>
            <InputItem type={'text'} placeholder={'Find users'} getValue={getUser} required={false}/>
            <button disabled={!name} className={s.btn} onClick={findUsers}>Find</button>
        </div>
    );
};

export default SearchInput;