import React, {useEffect} from 'react';
import s from './Friends.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {FriendsAC} from "../../store/actionCreators/friendsAC";
import User from "../users/user/User";
import {fetchFollow, fetchUnfollow} from "../../store/actionCreators/user";
import Loading from "../../components/Loading";

const FriendsPage = () => {
    const dispatch: any = useDispatch()
    const {friends, loading, error} = useTypedSelector(state => state.friends)
    const authState = useTypedSelector(state => state.auth)
    const follow = (userId: number) => dispatch(fetchFollow(userId))
    const unfollow = (userId: number) => dispatch(fetchUnfollow(userId))
    useEffect(() => {
        dispatch(FriendsAC(true))
    }, [dispatch])
    if (error) return <div>{error}</div>
    if (!authState.isAuth) return <div><h2>You need to login</h2></div>
    return (
        <div className={s.friendsPage}>
            <h2 className={s.title}>Friends</h2>
            {loading && <Loading/>}
            <div className={s.items}>
                {friends.map(friend => {
                    return (
                        <User key={friend.id} user={friend} follow={follow} unfollow={unfollow}
                              authId={authState.userId}/>
                    )
                })}
            </div>
        </div>
    );
};

export default FriendsPage;