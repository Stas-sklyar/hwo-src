import { FC, useContext, useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { PageTransition } from "UIElements/views/transition/PageTransition";
import { NavigationContext } from "UIElements/views/navigation/NavigationContext";
import { AuthApplicationConfiguration } from "A1002/models/AuthConfig";

/*import 'A1002/assets/auth/css/Application.css';*/
import 'A1002/assets/auth/css/style.css';
import 'A1002/assets/auth/css/desktop-large.css';
import 'A1002/assets/auth/css/desktop.css';
import 'A1002/assets/auth/css/tablet.css';
import 'A1002/assets/auth/css/mobile.css';

import LoginPage from "./login/LoginPage";
import ResetPassword, { IAuthPageProps } from "./reset-password/ResetPassword";
import HeaderLogout from "UIElements/views/Header/HeaderLogout";

const Application: FC<{ applicationRoot: string, setHeader: any }> = ({ applicationRoot, setHeader }) => {
  const location = useLocation();
  const navContext = useContext(NavigationContext);

  //console.log(applicationRoot, location);

  const defaultView = AuthApplicationConfiguration.defaultView;

  //navContext?.setPreset('cubeToTop');

  const testHandler = ($event: any) => {
    console.log('testHander', $event);
  }

  // React.useEffect(() => {
  //   // runs on location, i.e. route, change
  //   console.log('handle route change here', location)
  // }, [location]);

  const resetPasswordConfig: IAuthPageProps = {
    HandleCancelClick: () => {
      console.log('CANCEL CLICK');
      //navContext?.setPreset('cubeToBottom');
    }
  }

  useEffect(() => {
    setHeader(<HeaderLogout />);
  }, []);


  if (navContext) {
    return (
      <div className="application-content auth-app">
        <div className="main-view no-sidebar">
          <div className="content">
            <div className="content-wrapper">
              <div className="form-wrapper">
                <div className="login-window">
                  <PageTransition preset={navContext.preset}
                    transitionKey={location.pathname}
                    enterAnimation={navContext.enterAnimation || ""}
                    exitAnimation={navContext.exitAnimation || ""}
                  >
                    <Routes location={location}>
                      <Route key="0" path={`/login`} element={<LoginPage />} />
                      <Route key="1" path={`/reset-password`} element={<ResetPassword config={resetPasswordConfig} />} />
                      <Route path={`*`} element={<Navigate to={`${location.pathname}/${defaultView}`} replace />} />
                    </Routes>
                  </PageTransition>
                </div>
                <ul className="form-footer">
                  <li>© 2022 HyWebOS Technologies,  a <a href="https://harmonygroup.net" target="_blank">Harmony Group</a> company</li>
                  <li>
                    <i className="globe"></i>
                    <span className="currentLangue">English (Ukraine)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export { Application };
