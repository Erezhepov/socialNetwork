import React, {Suspense} from "react";
import WithAuth from "./withAuth";


export const withSuspense = (Component: any) => {
    const SuspenceContainer = (props: any) => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props} />
            </Suspense>
        )
    }

    return WithAuth(SuspenceContainer)
}