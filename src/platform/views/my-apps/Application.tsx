import { FC, useContext, useEffect } from "react";
import { NavigationContext } from "UIElements/views/navigation/NavigationContext";
import 'platform/assets/my-apps/css/Application.css';

import { AccountModel } from "A1002/models/AccountModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from 'store/store';
import { ApplicationModel } from "platform/models/ApplicationModel";
import { AccountInfoService } from "A1002/api/services/AccountInfoService";
import SystemTime from "UIElements/views/SystemTime/SystemTime";
import { NavLink } from 'react-router-dom';

import * as A1002ReducerActions from 'A1002/actions/A1002Actions'
import ApplicationServiceProvider from "platform/api/services/ApplicationService";
import * as platformReducerActions from 'platform/actions/platformAction'
import { AuthContext } from "UIElements/views/auth/AuthContext";
import HeaderLogged from "UIElements/views/Header/HeaderLogged";

const Application: FC<{ applicationRoot: string, setHeader: any }> = ({ applicationRoot, setHeader }) => {

  const dispatch = useDispatch();
  const navContext = useContext(NavigationContext);
  const authContext = useContext(AuthContext);

  let accountInfo: AccountModel = useSelector((state: RootState) => state.accountInfo)[0];
  let applicationsList: Array<ApplicationModel> = useSelector((state: RootState) => state.applications);
  /// NOTE [YB]: I don't know WTF happens with config reducer, but it returns array of arrays. Need investigation
  let platformConfigs = useSelector((state: RootState) => state.config)[0];
  let platformConfig: any = platformConfigs ? platformConfigs : undefined;


  const setAppInfoData = async () => {
    if (!applicationsList) { }
    ApplicationServiceProvider.GetAppsForCurrentUser().then((apps) => {
      dispatch(platformReducerActions.setApplicationsForUser(apps));
    });
  }


  const setAccountInfoData = async () => {
    if (!accountInfo) {
      let accountInfoService = new AccountInfoService();
      let profileInfo = await accountInfoService.GetAccountInfo();
      let data: Array<AccountModel> = [profileInfo];
      dispatch(A1002ReducerActions.setAccountInfo(data));
    }
  };

  const setBackGroundData = async () => {
  }


  const setData = async () => {
    setAppInfoData();
    setAccountInfoData();
    setBackGroundData();
    setHeader(<HeaderLogged />);
  }

  console.log(platformConfig);
  console.log(accountInfo);
  const handleClick = (e: any) => {
    e.preventDefault()
  }

  useEffect(() => {
    setData()
  }, []);

  if (navContext && platformConfig && accountInfo) {
    return (
      <>
        <div className="application-content dashboard-app">
          <div className="main-view no-sidebar">
            <div className="content">
              <div className="application-dashboard">
                <div className="background">
                  <video id="bg-video" playsInline={false} loop={true} muted={true} autoPlay={true} poster="https://cdn.hywebos.com/apps/myapps/BG.jpg?v0.1.4" src="https://cdn.hywebos.com/apps/myapps/BG.mp4?v0.1.4">
                    <source type="video/mp4" />
                  </video>
                  <div className="bg-overlay"></div>
                </div>
                <div className="dashboard-content" data-view="dashboard" data-content-init="true">
                  <h3 className="user-name">Bonjour <span id="ShortName">{accountInfo['displayName'].split(' ')[0]}</span></h3>
                  <SystemTime locale="en-US" />
                  <div className="apps-list-wrapper">
                    <ul className="apps-list">
                      {applicationsList.map((app, index) =>
                        <li key={index} className={`app-item ${app.blocked ? 'inactive' : ''}`}>
                          <NavLink key={2} to={app.bundle.home} onClick={app.blocked ? handleClick : undefined}>
                            <span className="app-icon" style={{ "backgroundImage": `url(${app.icon})` }}></span>
                            <span className="name-wrapper">
                              <span className="app-name">{app.name}</span>
                            </span>
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="dashboard-footer">
                    <div className="quote-wrapper" id="quote-wrapper">
                      <span className="quote">"Il vient une heure où protester ne suffit plus : après la philosophie, il faut l'action."</span>
                      <span className="author"> - Victor Hugo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}

export { Application };
