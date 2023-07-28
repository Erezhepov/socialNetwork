import React, {useState} from 'react';
import {Link} from "react-router-dom";
import s from './Header.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchAuthDelete} from "../../store/actionCreators/auth";
import {Container} from "@mui/material";
import SureBtn from "../../components/sureBtn/sureBtn";
import ModalMUI from "../../components/ModalMUI";

const Header = () => {
    const authState = useTypedSelector(state => state.auth)
    const dispatch: any = useDispatch()
    const [sureBtn, setSureBtn] = useState(false)
    const logout = () => {
        dispatch(fetchAuthDelete())
        setSureBtn(false)
    }
    const closeModal = () => setSureBtn(false)
    const sureFn = () => setSureBtn(true)

    return (
        <header className={s.header}>
            <Container className={s.container} maxWidth={false} sx={{maxWidth: 1250}}>
                <div className="logo"><img src={require('../../assets/images/logo.jpg')} alt="logo"/></div>
                { authState.isAuth
                    ? (
                        <div className={s.successAuthedItem}>
                            <Link to={'/profile/' + authState.userId}>{authState.login}</Link>
                            <button onClick={sureFn} className={s.btn}>Sign out</button>
                                {sureBtn && <ModalMUI handleBtn={sureBtn} closeModal={closeModal}>
                                <SureBtn title={'Are you sure?'} do={logout} setSureBtn={setSureBtn} />
                            </ModalMUI>}
                        </div>
                    )
                    : <Link to='/auth'>Auth</Link> }
            </Container>
        </header>
    );
};

export default Header;