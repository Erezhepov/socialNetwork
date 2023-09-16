import React, {useEffect} from 'react';
import s from './Profile.module.css'
import {useDispatch} from "react-redux";
import {profileAC} from "../../store/actionCreators/profileAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useNavigate, useParams} from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {Dispatch} from "redux";
import Loading from "../../components/Loading";

const ProfilePage: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const authState = useTypedSelector(state => state.auth)
    const state = useTypedSelector(state => state.profile)
    const {userId} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (authState.isAuth || authState.userId) {
            if (Number(userId)) {
                dispatch(profileAC(Number(userId)))
            } else {
                dispatch(profileAC(Number(authState.userId)))
                navigate('/profile/' + authState.userId)
            }
        }
    }, [authState.userId, userId, dispatch, navigate])
    if (!authState.isAuth) return <div><h2>You need to login</h2></div>

    return (
        <div className={s.profilePage}>
            {authState.loading && <Loading/>}
            <ProfileInfo dispatch={dispatch} userId={userId} authId={authState.userId} state={state}/>
        </div>
    );
};

export default ProfilePage;