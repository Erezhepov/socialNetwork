import React, {useState} from 'react';
import s from "../UsersPage.module.css";
import {Link} from "react-router-dom";
import {IUser} from "../../../types/user";

export interface IUserPage {
    user: IUser
    follow: (id: number) => void
    unfollow: (id: number) => void
    authId: number | null
}

const User = (props: IUserPage) => {
    const follow = (id: number) => props.follow(id)
    const unfollow = (id: number) => props.unfollow(id)
    return (
        <div key={props.user.id} className={s.item}>
            <Link to={'/profile/' + props.user.id} className={s.avatar}>
                <img className={s.img} src={props.user.photos?.small || 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt=""/>
            </Link>
            <div className={s.info}>
                <div className={s.name}>{props.user.name}</div>
                <div className={s.status}>{props.user.status}</div>
                {
                    props.user.followed ?
                        <button style={{background: 'rgb(180, 211, 53)'}} onClick={() => unfollow(props.user.id)}>Unfollow</button>
                        : props.user.id !== props.authId && <button onClick={() => follow(props.user.id)}>Follow</button>
                }
            </div>
        </div>
    );
};

export default User;