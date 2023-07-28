import React, {useState} from 'react';
import {ActionUsersPage} from "../../store/actionCreators/user";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";

interface IPagination {
    page: number
    totalCount: number
}

const Pagination: React.FC<IPagination> = ({page, totalCount}) => {
    const [portionNumber, setPortionNumber] = useState(1)
    const changePage = (page: number) => dispatch(ActionUsersPage(page))
    const dispatch: Dispatch<any> = useDispatch()
    let pageSize: number = 20
    const portions: number = 5
    const pages: number[] = []
    const portionCount: number = Math.ceil(totalCount / pageSize)
    for (let i=1; i<portionCount; i++) pages.push(i)
    const prevPortionItems: number = ((portionNumber - 1) * portions) + 1
    const nextPortionItems: number = portionNumber * portions
    return (
        <div className='pagination'>
            {portionNumber > 1 &&  <button onClick={() => setPortionNumber(prev => prev - 1)}>Prev</button>}
            {pages.filter(page => prevPortionItems <= page && page <= nextPortionItems)
                .map(p => <button key={p} style={{background: page === p ? '#B4D335' : ''}} onClick={() => changePage(p)} >{p}</button>)}
            <button onClick={() => setPortionNumber(prev => prev + 1)}>Next</button>
        </div>
    );
};

export default Pagination;