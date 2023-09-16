import React, {useState} from 'react';
import {ActionUsersPage, fetchUsers} from "../../store/actionCreators/user";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import s from './Pagination.module.css'
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface IPagination {
    page: number
    totalCount: number
}

const PaginationCustom: React.FC<IPagination> = ({page, totalCount}) => {
    const users = useTypedSelector(state => state.users)
    const [portionNumber, setPortionNumber] = useState(1)
    const changePage = (page: number) => {
        dispatch(ActionUsersPage(page))
        dispatch(fetchUsers(page, 20, users.filter.term))
    }
    const dispatch: Dispatch<any> = useDispatch()
    let pageSize: number = 20
    const portions: number = 5
    const pages: number[] = []
    const portionCount: number = Math.ceil(totalCount / pageSize)
    for (let i = 1; i < portionCount; i++) pages.push(i)
    const prevPortionItems: number = ((portionNumber - 1) * portions) + 1
    const nextPortionItems: number = portionNumber * portions
    if (users.totalCount <= 20) return <></>
    return (
        <div className={s.pagination}>
            {portionNumber > 1 &&
              <button className={s.btn} onClick={() => setPortionNumber(prev => prev - 1)}>Prev</button>}
            {pages.filter(page => prevPortionItems <= page && page <= nextPortionItems)
                .map(p => <button className={s.btn} key={p} style={{background: page === p ? '#B4D335' : ''}}
                                  onClick={() => changePage(p)}>{p}</button>)}
            <button className={s.btn} onClick={() => setPortionNumber(prev => prev + 1)}>Next</button>
        </div>
    );
};

export default PaginationCustom;