import React from 'react';
import {Link} from "react-router-dom";
import s from './Nav.module.css';
import {useTypedSelector} from "../../hooks/useTypedSelector";

const Nav = () => {
    const authState = useTypedSelector(state => state.auth)
    return (
        <nav className={s.nav}>
            <Link to={'/profile' + (authState.userId ? `/${authState.userId}` : '')}>profile</Link>
            <Link to={'/users'}>Users</Link>
        </nav>
    );
};

export default Nav;