import React from 'react';
import {Link} from "react-router-dom";
import s from './Nav.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {MenuItem, MenuList} from "@mui/material";

const Nav = () => {
    const authState = useTypedSelector(state => state.auth)
    return (
        <nav className={s.nav}>
            <MenuList>
                <Link to={'/profile' + (authState.userId ? `/${authState.userId}` : '')}>
                    <MenuItem>Profile</MenuItem>
                </Link>
                <Link to={'/users'}>
                    <MenuItem>Users</MenuItem>
                </Link>
                <Link to={'/friends'}>
                    <MenuItem>Friends</MenuItem>
                </Link>
                <Link to={'/chat'}>
                    <MenuItem>Chat</MenuItem>
                </Link>
            </MenuList>
        </nav>
    );
};

export default Nav;