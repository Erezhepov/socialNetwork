import React, {useState} from 'react';
import {ActionUsersPage} from "../../store/actionCreators/user";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";

interface IPagination {
    page: number
    totalCount: number
}

const Pagination = ({page, totalCount}: IPagination) => {
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const changePage = (page: number) => dispatch(ActionUsersPage(page))
    const dispatch: Dispatch<any> = useDispatch()
    let pageSize = 20
    const portions = 5
    const pages = []
    const portionCount = Math.ceil(totalCount / pageSize)
    for (let i=1; i<portionCount; i++) pages.push(i)
    const prevPortionItems = ((portionNumber - 1) * portions) + 1
    const nextPortionItems = portionNumber * portions
    return (
        <div className='pagination'>
            {portionNumber > 1 &&  <button onClick={() => setPortionNumber(prev => prev - 1)}>Prev</button>}
            {pages.filter(page => prevPortionItems <= page && page <= nextPortionItems)
                .map(p => <button style={{background: page === p ? '#B4D335' : ''}} onClick={() => changePage(p)} >{p}</button>)}
            <button onClick={() => setPortionNumber(prev => prev + 1)}>Next</button>
        </div>
    );
};

export default Pagination;