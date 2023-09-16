import React, {useState} from 'react';
import s from './AuthPage.module.css'
import InputItem from "../../components/InputItem";
import {fetchPostAuth} from "../../store/actionCreators/auth";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Dispatch} from "redux";
import {Alert} from '@mui/material';
import Loading from "../../components/Loading";

const AuthPage = () => {
    const authState = useTypedSelector(state => state.auth)
    const [isError, setIsError] = useState(false)
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const dispatch: Dispatch<any> = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const getEmail = (value: string) => setEmail(value)
    const getPassword = (value: string) => setPassword(value)
    const auth = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email || password || rememberMe) {
            setIsError(true)
            dispatch(fetchPostAuth({email, password, rememberMe}))
        }
    }
    const rememberFn = () => setRememberMe(!rememberMe)
    if (authState.isAuth) return <div><h2>You have signed in</h2></div>

    return (
        <div className={s.auth}>
            <Alert severity="info">
                <div>
                    <h3>You can sign in with test email</h3>
                    <div>Email: free@samuraijs.com</div>
                    <div>Password: free</div>
                </div>
            </Alert>
            <h2>Sign in:</h2>
            {authState.loading && <Loading/>}
            {authState.error && <div className={'error-text'}>{authState.error}</div>}
            <form onSubmit={auth} className={s.form} action="">
                <InputItem required={true} getValue={getEmail} placeholder={'Email'} type={'email'}/>
                <InputItem required={true} getValue={getPassword} placeholder={'Password'} type={'password'}/>
                <div className={s.rememberMeBlock}>
                    <span>Remember me</span><input onClick={rememberFn} className={s.checkbox} type={'checkbox'}/>
                </div>
                <button className={s.btn}>Sign in</button>
                {isError && authState.message && <div className='error-text'>{authState.message}</div>}
            </form>
        </div>
    );
};

export default AuthPage;