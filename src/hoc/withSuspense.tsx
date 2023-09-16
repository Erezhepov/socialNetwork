import React, {Suspense} from "react";
import WithAuth from "./withAuth";
import Loading from "../components/Loading";


export const withSuspense = (Component: any) => {
    const SuspenceContainer = (props: any) => {
        return (
            <Suspense fallback={<Loading/>}>
                <Component {...props} />
            </Suspense>
        )
    }

    return WithAuth(SuspenceContainer)
}