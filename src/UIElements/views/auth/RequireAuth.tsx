import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthApplicationConfiguration } from 'A1002/models/AuthConfig';
import React from "react";
import { AuthContext } from "./AuthContext";

interface Props {
    children: React.ReactNode;
}

function RequireAuth({ children, ...rest }: Props) {
    const authContext = useContext(AuthContext);

    return <>
        {authContext?.isAuthenticated === true ? children : <Navigate to={`/${AuthApplicationConfiguration.rootPath}/${AuthApplicationConfiguration.defaultView}`} replace />}
    </>
}

export { RequireAuth };