import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ActionUsersPage, fetchFindUsers, fetchFollow, fetchUnfollow, fetchUsers} from "../../store/actionCreators/user";
import {useDispatch} from "react-redux";
import s from './UsersPage.module.css'
import User from "./user/User";
import {Dispatch} from "redux";
import Pagination from "../../components/pagination/Pagination";
import SearchInput from "../../components/users/SearchInput";
import {useLocation, useNavigate} from "react-router-dom";

const UsersPage = () => {
    const {users, loading, error, page, totalCount, filter} = useTypedSelector(state => state.users)
    const authState = useTypedSelector(state => state.auth)
    const dispatch: Dispatch<any> = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)
    let queryPage: string | null;
    useEffect(() => {
        queryPage = params.get('page')
        if (queryPage){
            dispatch(fetchUsers(Number(queryPage), 20))
            dispatch(ActionUsersPage(+queryPage))
        }
    }, [])
    useEffect(() => {
        navigate(`/users?page=${page}`)
    }, [filter, page])
    useEffect(() => {
        if (!Number(queryPage)){
            dispatch(fetchUsers(page, 20))
        }
    }, [authState.isAuth, page, dispatch])
    const follow = (userId: number) => dispatch(fetchFollow(userId))
    const unfollow = (userId: number) => dispatch(fetchUnfollow(userId))
    if (error) return <div>{error}</div>
    if (!authState.isAuth) return <div><h2>You need to login</h2></div>
    return (
        <div>
            {loading && <div>Loading...</div>}
            <SearchInput />
            <Pagination page={page} totalCount={totalCount} />
            <div className={s.users}>
                {users.map(user => <User authId={authState.userId} key={user.id} user={user} follow={follow} unfollow={unfollow} />)}
            </div>
        </div>
    );
};

export default UsersPage;