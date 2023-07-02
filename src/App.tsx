import React, {useEffect} from 'react';
import ProfilePage from "./pages/profile/ProfilePage";
import Header from "./pages/header/Header";
import {Routes, Route} from 'react-router-dom'
import Nav from "./pages/navbar/Nav";
import UsersPage from "./pages/users/UsersPage";
import AuthPage from "./pages/authPage/AuthPage";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {fetchAuth} from "./store/actionCreators/auth";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";


function App() {
  const dispatch: Dispatch<any> = useDispatch()
  const authState = useTypedSelector(state => state.auth)
  useEffect(() => {
      dispatch(fetchAuth())
  }, [authState.isAuth, dispatch]);

  return (
    <div className="wrapper">
        <Header />
        <Nav/>
        <div className="content">
            <Routes>
                <Route path={''} element={<ProfilePage />} />
                <Route path={'/profile'} element={<ProfilePage />} />
                <Route path={'/profile/:userId'} element={<ProfilePage />} />
                <Route path={'/users'} element={<UsersPage />} />
                <Route path={'/auth'} element={<AuthPage />} />
                <Route path={'/*'} element={<div><h2>Page not founded</h2></div>} />
            </Routes>
        </div>
    </div>
  );
}

export default App;
