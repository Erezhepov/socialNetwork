import React from 'react';
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";

const WithAuth = (Component: any) => {
    const ComponentContainer = (props: any) => {
        return <Component {...props} />
    }

    return <ComponentContainer />
};

export default WithAuth;