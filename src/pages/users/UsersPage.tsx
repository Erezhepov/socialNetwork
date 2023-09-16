import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ActionUsersPage, fetchFollow, fetchUnfollow, fetchUsers} from "../../store/actionCreators/user";
import {useDispatch} from "react-redux";
import s from './UsersPage.module.css'
import User from "./user/User";
import {Dispatch} from "redux";
import PaginationCustom from "../../components/pagination/Pagination";
import SearchInput from "../../components/users/SearchInput";
import {useLocation, useNavigate} from "react-router-dom";
import Loading from '../../components/Loading';

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
        if (queryPage) {
            dispatch(fetchUsers(Number(queryPage), 20, filter.term))
            dispatch(ActionUsersPage(+queryPage))
        }
    }, [])
    useEffect(() => {
        navigate(`/users?page=${page}`)
    }, [filter, page])
    useEffect(() => {
        if (!Number(queryPage)) {
            dispatch(fetchUsers(page, 20, filter.term))
        }
    }, [authState.isAuth, page, dispatch, filter.term])
    const follow = (userId: number) => dispatch(fetchFollow(userId))
    const unfollow = (userId: number) => dispatch(fetchUnfollow(userId))
    if (error) return <div>{error}</div>
    if (!authState.isAuth) return <div><h2>You need to login</h2></div>
    return (
        <>
            {loading && <Loading/>}
            <div>
                <SearchInput/>
                <PaginationCustom page={page} totalCount={totalCount}/>
                <div className={s.users}>
                    {users.map(user => <User authId={authState.userId} key={user.id} user={user} follow={follow}
                                             unfollow={unfollow}/>)}
                </div>
            </div>
        </>
    );
};

export default UsersPage;