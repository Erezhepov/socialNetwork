import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {fetchFollow, fetchUnfollow, fetchUsers} from "../../store/actionCreators/user";
import {useDispatch} from "react-redux";
import s from './UsersPage.module.css'
import User from "./user/User";
import {Dispatch} from "redux";
import Pagination from "../../components/pagination/Pagination";

const UsersPage = () => {
    const {users, loading, error, page, totalCount} = useTypedSelector(state => state.users)
    const authState = useTypedSelector(state => state.auth)
    const dispatch: Dispatch<any> = useDispatch()
    useEffect(() => {
        dispatch(fetchUsers(page, 20))
    }, [page, dispatch])
    const follow = (userId: number) => dispatch(fetchFollow(userId))
    const unfollow = (userId: number) => dispatch(fetchUnfollow(userId))
    if (!authState.isAuth) return <div><h2>You need to login</h2></div>
    if (error) return <div>{error}</div>
    return (
        <div>
            {loading && <div>Loading...</div>}
            <div className={s.users}>
                {users.map(user => <User authId={authState.userId} key={user.id} user={user} follow={follow} unfollow={unfollow} />)}
            </div>
            <Pagination page={page} totalCount={totalCount} />
        </div>
    );
};

export default UsersPage;