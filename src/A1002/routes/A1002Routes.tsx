import { FC, useContext, useEffect } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { PageTransition } from "UIElements/views/transition/PageTransition";
import { NavigationContext } from "UIElements/views/navigation/NavigationContext";
import AccountPage from "A1002/views/account/AccountPage";
import { IMenuItemModel } from "UIElements/models/IMenutItemModel";
import Sidebar from "UIElements/views/sidebar/Sidebar";
import 'A1002/assets/A1002/css/Application.css';
import LanguageRegionPage from "A1002/views/language-region/LanguageRegionPage";
import SettingsPage from "A1002/views/settings/SettingsPage";
import PasswordPage from "A1002/views/password/PasswordPage";
import PrivacyPage from "A1002/views/privacy/PrivacyPage";
import { A1002ApplicationConfiguration } from "A1002/models/A1002ApplicationConfig";
import { AuthContext } from "UIElements/views/auth/AuthContext";
import HeaderLogged from "UIElements/views/Header/HeaderLogged";

const Application: FC<{ applicationRoot: string, setHeader: any }> = ({ applicationRoot, setHeader }) => {
  const location = useLocation();
  const navContext = useContext(NavigationContext);
  const authContext = useContext(AuthContext);

  const applicationMenuItems: IMenuItemModel[] = [
    {
      isActive: true,
      viewName: "overview",
      title: "Overview",
      icon: "fa-light fa-address-card",
      index: 0
    },
    {
      isActive: false,
      viewName: "language_region",
      title: "Language & region",
      icon: "fa-light fa-earth-europe",
      index: 1
    },
    {
      isActive: false,
      viewName: "password",
      title: "Password",
      icon: "fa-light fa-lock-keyhole",
      index: 2
    },
    {
      isActive: false,
      viewName: "confidentiality",
      title: "Confidentiality",
      icon: "fa-light fa-shield-check",
      index: 3
    },
    {
      isActive: false,
      viewName: "advanced",
      title: "Advanced settings",
      icon: "fa-light fa-sliders",
      index: 4
    }
  ];

  useEffect(() => {
    setHeader(<HeaderLogged />);
  }, []);

  if (navContext) {
    return (
      <div className="application-content account-app">
        <Sidebar items={applicationMenuItems} applicationRoot={applicationRoot}></Sidebar>
        <div className="main-view">
          <div className="content">
            <PageTransition preset={navContext.preset}
              transitionKey={location.pathname}
              enterAnimation={navContext.enterAnimation || ""}
              exitAnimation={navContext.exitAnimation || ""}
            >
              <Routes location={location}>
                <Route key="0" path={`/overview`} element={<AccountPage />} />
                <Route key="1" path={`/language_region`} element={<LanguageRegionPage />} />
                <Route key="2" path={`/password`} element={<PasswordPage />} />
                <Route key="3" path={`/advanced`} element={<SettingsPage />} />
                <Route key="4" path={`/confidentiality`} element={<PrivacyPage />} />
                <Route key="5" path={`*`} element={<Navigate to={`${location.pathname}/${A1002ApplicationConfiguration.defaultView}`} replace />} />
              </Routes>
            </PageTransition>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export { Application };
