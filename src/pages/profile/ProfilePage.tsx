import React, {useEffect} from 'react';
import s from './Profile.module.css'
import {useDispatch} from "react-redux";
import {GetStatusAC, ProfileAC} from "../../store/actionCreators/profileAC";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useParams} from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {useNavigate} from "react-router-dom";
import {Dispatch} from "redux";

const ProfilePage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const authState = useTypedSelector(state => state.auth)
    const state = useTypedSelector(state => state.profile)
    const {userId} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if(authState.userId){
            if (Number(userId)){
                dispatch(ProfileAC(Number(userId)))
                dispatch(GetStatusAC(Number(userId)))
            }else{
                dispatch(ProfileAC(Number(authState.userId)))
                dispatch(GetStatusAC(Number(authState.userId)))
                navigate('/profile/' + authState.userId)
            }
        }
    }, [authState.userId, userId, dispatch, navigate])
    if (!authState.isAuth) return <div><h2>You need to login</h2></div>

    return (
        <div className={s.profilePage}>
            {authState.loading && <div>Loading...</div>}
            <ProfileInfo dispatch={dispatch} userId={userId} authId={authState.userId} state={state} />
        </div>
    );
};

export default ProfilePage;