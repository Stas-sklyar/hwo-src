import React from 'react';
import 'UIElements/assets/Header/css/Header.css';
import { NavLink } from 'react-router-dom';

function HeaderLogout() {
    return (<header className="d-flex flex-row align-items-center menuBar-logout">
        <div className="bg-image logoLogin" data-app-icon="" id="LogoPlatform" style={{ "backgroundImage": "url('https://cdn.hywebos.com/core/global/logo/logo-vector.svg')", "width": "150px" }}></div>
        <ul className="icon-menu my-0 d-flex flex-row ml-auto">
            <li className="item item-account">
                <a href="/login" className="bg-image"></a>
            </li>
        </ul>
    </header>)
}

export default HeaderLogout;