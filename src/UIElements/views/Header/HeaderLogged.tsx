import React, { useContext } from 'react';
import 'UIElements/assets/Header/css/Header.css';
import { NavLink } from 'react-router-dom';
import { MyAppsApplicationConfiguration } from 'platform/models/MyAppsApplicationConfig'
import { deleteCookie } from 'platform/helpers/CookieHelpers';
import { AuthContext } from 'UIElements/views/auth/AuthContext';

function HeaderLogged() {
    const authContext = useContext(AuthContext);

    const logoutClick = async () => {
        deleteCookie("auth");
        authContext?.setIsAuthenticated(false);
    };

    return (<div className="Header">
        <header className="d-flex flex-row align-items-center menuBar-logout">
            <h1 className="logo bg-image" data-app-icon="" id="LogoPlatform" style={{ "background": "url('https://cdn.hywebos.com/core/global/logo/logo.svg?v0.1.4')" }}></h1>
            <input className="search-input border-radius" type="search" defaultValue="" data-autocomplete="off" placeholder="Search" />
            <ul className="icon-menu my-0 d-flex flex-row ml-auto">
                <li className="item">
                    <NavLink key={1} to={`${MyAppsApplicationConfiguration.rootPath}`} className="fa-grid-2 itemTarget fa-solid" />
                </li>
                <li className="item">
                    <span className="fa-light fa-bell itemTarget" onClick={logoutClick} />
                </li>
                <li className="item">
                    <div className="application-menu-actions d-flex flex-row h-100 align-items-center menuAvatar">
                        <div className="avatar-icon outline-border round">
                            <img className="imgAvatar imgAvatar-icon" src="https://cdn.account.hywebos.com/users/57633f103ad2936fe1388f70178945b132d4190e43977eb66b4e202ba9bd384c/avatar/avatar.jpeg?1670058741973" />
                        </div>
                    </div>
                </li>
            </ul>
        </header>
    </div>)
}

export default HeaderLogged;