import { useDispatch } from "react-redux";
import { FC, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { Application as A1002 } from 'A1002/routes/A1002Routes';
import { A1002ApplicationConfiguration } from 'A1002/models/A1002ApplicationConfig';
import { Application as AuthApplication } from 'A1002/views/auth/Application';
import { AuthApplicationConfiguration } from 'A1002/models/AuthConfig';
import { AuthService } from "A1002/api/services/AuthService";

import { Application as A1010 } from 'A1010/routes/A1010routes';
import { A1010ApplicationConfiguration } from 'A1010/models/A1010ApplicationConfig';

import { Application as MyAppsApplication } from 'platform/views/my-apps/Application';
import { MyAppsApplicationConfiguration } from "platform/models/MyAppsApplicationConfig";

import { NavigationContext } from "UIElements/views/navigation/NavigationContext";
import { PageTransition } from "UIElements/views/transition/PageTransition";
import { RequireAuth } from "UIElements/views/auth/RequireAuth";
import { AuthContext } from "UIElements/views/auth/AuthContext";

import HeaderLogged from "UIElements/views/Header/HeaderLogged";
import HeaderLogout from "UIElements/views/Header/HeaderLogout";


const PlatformRoutes: FC<{}> = () => {

    const defaultApp = MyAppsApplicationConfiguration;
    const location = useLocation();
    const navContext = useContext(NavigationContext);
    const authService = new AuthService();

    const [authCheckPerformed, setAuthCheckPerformed] = useState(false);
    const [header, setHeader] = useState(<></>);
    const authContext = useContext(AuthContext);

    const checkAuthentified = async () => {
        if (!authCheckPerformed) {
            let isLoggedIn = await authService.IsLoggedIn();
            authContext?.setDefaultApp(defaultApp);
            setAuthCheckPerformed(true);
            console.log('Auth checks', isLoggedIn);
            authContext?.setIsAuthenticated(isLoggedIn || false);


        }
    }

    useEffect(() => {
        checkAuthentified();
    });

    return authCheckPerformed ? (
        <>
            { header }
            <PageTransition preset={navContext!.preset}
                transitionKey={location.pathname.split('/').filter(_ => _)[0]}
                enterAnimation={navContext!.enterAnimation || ""}
                exitAnimation={navContext!.exitAnimation || ""}
            >
                <Routes>
                    <Route path={`/`} element={<RequireAuth><Navigate to={`/${defaultApp.rootPath}/${defaultApp.defaultView}`} /></RequireAuth>} />
                    <Route path={`/${AuthApplicationConfiguration.rootPath}/*`} element={<AuthApplication applicationRoot={AuthApplicationConfiguration.rootPath} setHeader={setHeader} />} />
                    <Route path={`/${A1002ApplicationConfiguration.rootPath}/*`} element={<RequireAuth><A1002 applicationRoot={A1002ApplicationConfiguration.rootPath} setHeader={setHeader} /> </RequireAuth>} />
                    <Route path={`/${A1010ApplicationConfiguration.rootPath}/*`} element={<RequireAuth><A1010 applicationRoot={A1010ApplicationConfiguration.rootPath} setHeader={setHeader} /></RequireAuth>} />
                    <Route path={`/${MyAppsApplicationConfiguration.rootPath}`} element={<RequireAuth><MyAppsApplication applicationRoot={MyAppsApplicationConfiguration.rootPath} setHeader={setHeader} /></RequireAuth>} />
                </Routes>
            </PageTransition>
        </>
    ) : <></>;
}

export default PlatformRoutes;