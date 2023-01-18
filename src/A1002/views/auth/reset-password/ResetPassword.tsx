import { FC } from 'react';
import Input, { CreateInputConfig, InputConfig } from 'UIElements/views/Input/Input';
import { EInputType } from 'UIElements/models/EInputType';
import { NavLink } from 'react-router-dom';
import { NavTransitionLink } from 'UIElements/views/transition/NavTransitionLink';


export interface IAuthPageProps {
    HandleCancelClick: () => void;
}

const ResetPassword: FC<{ config: IAuthPageProps }> = ({ config }) => {

    //const navContext = useContext(NavigationContext);

    const onCancelClick = () => {
        config.HandleCancelClick();
    };

    return (
        <div className='view'>
            <div className="window-inner login">
                <div className="login-form">
                    <div className="logo bg-image logoLogin" style={{ "backgroundImage": "url('https://cdn.hywebos.com/core/global/login/home-logo.svg?v0.1.4')", "width": "70px", "height": "73px" }}></div>
                    <h2>Réinitialiser le mot de passe</h2>
                    <h3>Saisissez l'adresse éléctronique de votre compte</h3>
                    <Input config={CreateInputConfig(EInputType.Email, 'email', 'Email address', 'email', 'john.doe@website.com', 'input-wrapper-login')}></Input>

                    <div className="actions-wrapper">
                        <button className="btn-regular btnDB noVisible loginBt" id="reset-password" style={{ "backgroundColor": "rgb(60, 60, 60)" }}>Next</button>
                        <NavTransitionLink transition="cubeToTop">
                            <NavLink to={`/auth/login`} id="login_link_reset" className="login-link">Cancel</NavLink>
                        </NavTransitionLink>
                    </div>
                    <ul className="inner-footer">
                        <li>
                            <a href="https://hywebos.com/privacy">Confidentiality Agreement</a>
                        </li>
                        <li>
                            <a href="https://hywebos.com/terms-and-conditions">Terms &amp; Conditions</a>
                        </li>
                        <li>
                            <span>Powered by <a href="https://hywebos.com">HyWebOS</a></span>
                        </li>
                    </ul>
                </div>
                <div className="login-image bg-image" style={{ "backgroundImage": "url('https://cdn.hywebos.com/core/global/login/login-intro.png?v0.1.4')" }}>

                </div>
            </div>
        </div>
    );
}

export default ResetPassword;