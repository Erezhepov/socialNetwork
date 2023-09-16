import React, {lazy, useEffect} from 'react';
import ProfilePage from "./pages/profile/ProfilePage";
import Header from "./pages/header/Header";
import {Route, Routes} from 'react-router-dom'
import Nav from "./pages/navbar/Nav";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {withSuspense} from "./hoc/withSuspense";
import withAuth from "./hoc/withAuth";
import {Container} from '@mui/material';
import {fetchAuth} from "./store/actionCreators/auth";

export const UsersPageLazy = lazy(() => import("./pages/users/UsersPage"))
export const AuthPageLazy = lazy(() => import("./pages/authPage/AuthPage"))
export const FriendsPageLazy = lazy(() => import("./pages/friends/FriendsPage"))
export const ChatPageLazy = lazy(() => import("./pages/chatPage/ChatPage"))


function App() {
    const dispatch: Dispatch<any> = useDispatch()
    const authState = useTypedSelector(state => state.auth)
    useEffect(() => {
        if (!authState.isAuth) {
            dispatch(fetchAuth())
        }
    }, [authState.isAuth, dispatch]);

    return (
        <div className="wrapper">
            <Header/>
            <Container maxWidth={false} sx={{maxWidth: 1250}} className={'mainContainer'}>
                <Nav/>
                <div className="content">
                    <Routes>
                        <Route path={''} element={withAuth(ProfilePage)}/>
                        <Route path={'/profile'} element={withAuth(ProfilePage)}/>
                        <Route path={'/profile/:userId'} element={withAuth(ProfilePage)}/>
                        <Route path={'/users'} element={withSuspense(UsersPageLazy)}/>
                        <Route path={'/auth'} element={withSuspense(AuthPageLazy)}/>
                        <Route path={'/friends'} element={withSuspense(FriendsPageLazy)}/>
                        <Route path={'/chat'} element={withSuspense(ChatPageLazy)}/>
                        <Route path={'/*'} element={<div><h2>Page not founded</h2></div>}/>
                    </Routes>
                </div>
            </Container>
        </div>
    );
}

export default App;
