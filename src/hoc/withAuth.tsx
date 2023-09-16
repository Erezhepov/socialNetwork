import React from 'react';

const WithAuth = (Component: any) => {
    const ComponentContainer = (props: any) => {
        return <Component {...props} />
    }

    return <ComponentContainer />
};

export default WithAuth;