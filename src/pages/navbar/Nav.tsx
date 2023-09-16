import React, {useState} from 'react';
import {Link} from "react-router-dom";
import s from './Nav.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {MenuItem, MenuList} from "@mui/material";

const Nav = () => {
    const authState = useTypedSelector(state => state.auth)
    const [selectedList, setSelectedList] = useState<boolean[]>([])
    const selectHandle = (index: number) => {
        let notSelectedList = [false, false, false, false]
        notSelectedList[index] = true
        setSelectedList(notSelectedList)
    }
    return (
        <nav className={s.nav}>
            <MenuList>
                <Link to={'/profile' + (authState.userId ? `/${authState.userId}` : '')}>
                    <MenuItem
                        selected={selectedList[0]}
                        onClick={() => selectHandle(0)}>

                        Profile
                    </MenuItem>
                </Link>
                <Link to={'/users'}>
                    <MenuItem selected={selectedList[1]} onClick={() => selectHandle(1)}>Users</MenuItem>
                </Link>
                <Link to={'/friends'}>
                    <MenuItem selected={selectedList[2]} onClick={() => selectHandle(2)}>Friends</MenuItem>
                </Link>
                <Link to={'/chat'}>
                    <MenuItem selected={selectedList[3]} onClick={() => selectHandle(3)}>Chat</MenuItem>
                </Link>
            </MenuList>
        </nav>
    );
};

export default Nav;