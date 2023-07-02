import React from 'react';
import {Link} from "react-router-dom";
import s from './Header.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchAuthDelete} from "../../store/actionCreators/auth";

const Header = () => {
    const authState = useTypedSelector(state => state.auth)
    const dispatch: any = useDispatch()
    const logout = () => {
        dispatch(fetchAuthDelete())
    }
    return (
        <header className={s.header}>
            <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/7/7f/Wayne_at_work.webp" alt=""/></div>
            { authState.isAuth
                ? (
                    <div className={s.successAuthedItem}>
                        <Link to={'/profile/' + authState.userId}>{authState.login}</Link>
                        <button onClick={logout} className={s.btn}>Sign out</button>
                    </div>
                )
                : <Link to='/auth'>Auth</Link> }
        </header>
    );
};

export default Header;