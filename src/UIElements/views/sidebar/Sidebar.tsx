import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { FC } from 'react';
import 'UIElements/assets/Sidebar/css/Sidebar.css';

import { Link, NavLink, useLocation } from 'react-router-dom';
import { IMenuItemModel } from 'UIElements/models/IMenutItemModel';

const Sidebar: FC<{ items: IMenuItemModel[], applicationRoot: string }> = ({ items, applicationRoot }) => {

    const location = useLocation();

    //console.log(location);
    const currentViewName = location.pathname.split('/').reverse()[0];
    items.forEach((item) => {
        item.isActive = currentViewName === item.viewName
    });

    return (
        <Navbar expand="lg" className="app-menu navbar-expand-lg flex-row flex-lg-column fixed-bottom justify-content-center justify-content-lg-start p-0">
            <div className="application-name" data-app-name="" data-db="nameApp">Account</div>
                <Nav
                    className="flex-row flex-lg-column"
                >
                    {items.map((item) => <MenuItem model={item} applicationRoot={applicationRoot} />)}
                </Nav>
        </Navbar>
    );
}

// const MenuItem: FC<{ model: IMenuItemModel }> = ({ model }) => {
//     const className = `nav-item ${model.isActive ? 'active' : ''}`;
//     return <div className={className} data-target-view={model.viewName} data-highlight-view={model.viewName}>
//         <NavLink key={ model.index } to={ `account/${model.viewName}` } className="nav-link">
//             <i className={`icon icon-${model.icon}`}></i>
//             <span>{model.title}</span>
//         </NavLink>
//     </div>
// }

class MenuItem extends React.Component<{ model: IMenuItemModel, applicationRoot: string }> {
    render() {
        const className = `nav-item ${this.props.model.isActive ? 'active' : ''}`;
        return <div className={className} data-target-view={this.props.model.viewName} data-highlight-view={this.props.model.viewName}>
            <NavLink key={this.props.model.index} to={`${this.props.model.viewName}`} className="nav-link">
                <i className={`icon ${this.props.model.icon}`}></i>
                <span>{this.props.model.title}</span>
            </NavLink>
        </div>
    }
}

export default Sidebar;