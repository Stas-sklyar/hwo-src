import { FC, useContext, useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { PageTransition } from "UIElements/views/transition/PageTransition";
import { NavigationContext, NavigationContextProvider } from "UIElements/views/navigation/NavigationContext";
import { IMenuItemModel } from "UIElements/models/IMenutItemModel";
import Sidebar from "UIElements/views/sidebar/Sidebar";
import { A1010ApplicationConfiguration } from "A1010/models/A1010ApplicationConfig";
import { LogoutPage } from "UIElements/views/LogoutPage/LogoutPage";
import HeaderLogged from "UIElements/views/Header/HeaderLogged";
import { AuthContext } from "UIElements/views/auth/AuthContext";

const Application: FC<{ applicationRoot: string, setHeader: any }> = ({ applicationRoot, setHeader }) => {
  const location = useLocation();
  const navContext = useContext(NavigationContext);
  const authContext = useContext(AuthContext);

  const defaultView = A1010ApplicationConfiguration.defaultView;

  const applicationMenuItems: IMenuItemModel[] = [
    {
      isActive: true,
      viewName: "home",
      title: "Home",
      icon: "profile",
      index: 0
    },
    {
      isActive: false,
      viewName: "explore",
      title: "Explore",
      icon: "language",
      index: 1
    },
    {
      isActive: false,
      viewName: "my_courses",
      title: "My Courses",
      icon: "password",
      index: 2
    },
    {
      isActive: false,
      viewName: "settings",
      title: "Settings",
      icon: "parameters",
      index: 3
    }
  ];

  useEffect(() => {
    setHeader(<HeaderLogged />);
  }, []);

  if (navContext) {
    return (
      <>
        <div className="application-content">
          <Sidebar items={applicationMenuItems} applicationRoot={applicationRoot}></Sidebar>
          <div className="main-view">
            <div className="content">
              <PageTransition preset={navContext.preset}
                transitionKey={location.pathname}
                enterAnimation={navContext.enterAnimation || ""}
                exitAnimation={navContext.exitAnimation || ""}
              >
                <Routes location={location}>
                  {applicationMenuItems.map((item, index) => <Route key={index} path={`/${item.viewName}`} element={<LogoutPage pageName={item.title} />} />)}
                  <Route path={`*`} element={<Navigate to={`${location.pathname}/${defaultView}`} replace />} />
                </Routes>
              </PageTransition>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export { Application };
