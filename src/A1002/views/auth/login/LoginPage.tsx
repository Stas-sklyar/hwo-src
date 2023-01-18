import React, { RefObject, useContext, useRef, useState } from 'react';
import Input, { CreateInputConfig } from 'UIElements/views/Input/Input';
import { EInputType } from 'UIElements/models/EInputType';
import { Navigate, NavLink } from 'react-router-dom';
import { AuthContext } from 'UIElements/views/auth/AuthContext';
import { AxiosResponse } from 'axios';
import { AuthService } from 'A1002/api/services/AuthService';
import { deleteCookie } from 'platform/helpers/CookieHelpers';
import { useDispatch, useSelector } from "react-redux";
import { ConfigModel } from 'platform/models/ConfigModel';
import { RootState } from 'store/store';
import ApplicationServiceProvider from 'platform/api/services/ApplicationService';
import * as platformReducerActions from 'platform/actions/platformAction';
import { NavTransitionLink } from 'UIElements/views/transition/NavTransitionLink';
import { setAuthCookies } from 'platform/helpers/CookieHelpers';

function LoginPageInner() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const emailInputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const passwordInputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();

    const authContext = useContext(AuthContext);
    const authService = new AuthService();

    const config: ConfigModel = useSelector((state: RootState) => state.config)[1];

    const onEmailChange = (event: React.FocusEvent<HTMLInputElement, any>) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event: React.FocusEvent<HTMLInputElement, any>) => {
        setPassword(event.target.value);
    };

    const loginClickHandler = async () => {
        const [validEmail, validPassword] = formAutofillCheck();

        const result = await authService.Login(validEmail, validPassword);
        const positiveResponse = result as AxiosResponse<any, any>;
        if (positiveResponse) {
            setAuthCookies(positiveResponse, 'Approved');
            authContext?.setIsAuthenticated(true);
            const apps = await ApplicationServiceProvider.GetAppsForCurrentUser();
            dispatch(platformReducerActions.setApplicationsForUser(apps));
        } else {
            deleteCookie("auth");
            authContext?.setIsAuthenticated(false);
        }
    };

    const formAutofillCheck = (): [validEmail: string, validPassword: string] => {
        let validEmail = email;
        let validPassword = password;

        const emailInputRefValue: string | undefined = emailInputRef.current?.value;
        const posswordInputRefValue: string | undefined = passwordInputRef.current?.value;

        if (emailInputRefValue && emailInputRefValue !== email) {
            validEmail = emailInputRefValue;
        }
        if (posswordInputRefValue && posswordInputRefValue !== password) {
            validPassword = posswordInputRefValue;
        }

        return [validEmail, validPassword];
    }

    if (config) {
        return (

            <div className='view'>
                <div className="window-inner login">
                    <div className="login-form">
                        <img className="logo bg-image logoLogin" src={config.LogoHome} width={config.loginHomeLogoWidth} height={config.loginHomeLogoHeight} />
                        <h2>HyWebOS</h2>
                        <h3>The first web-based operating system bringing together secure collaboration and knowledge sharing into one place.</h3>
                        <Input config={CreateInputConfig(EInputType.Email, 'email', 'Email address', 'email', 'john.doe@website.com', 'input-wrapper-login', '', undefined, onEmailChange, undefined, undefined, emailInputRef)}></Input>
                        {/* <div className="input-wrapper input-wrapper-login">
                        <label htmlFor="email">Email address</label>
                        <input id="email" name="email" className="" type="email" value="" data-placeholdertranslate="placeholderMail" placeholder="john.doe@website.com" />
                        <span className="message" id="messageErrorEmail"></span>
                        <input type="hidden" id="TextErrorEmail" value="This field is required" />
                    </div> */}
                        <Input config={CreateInputConfig(EInputType.Password, 'password', 'Password', 'password', 'Your password', 'input-wrapper-login', '', undefined, onPasswordChange, undefined, undefined, passwordInputRef)}></Input>
                        {/* <div className="input-wrapper input-wrapper-login">
                        <label htmlFor="password">Password</label>
                        <span className="eyed w_100" id="password">
                            <input className="w_100" name="password" type="password" value="" data-placeholdertranslate="placeHolderPassword" data-autocomplete="new-password" placeholder="Your password" aria-autocomplete="list" />
                            <img className="eye" src="/img/Harmony/Login/visibility.svg" />
                        </span>
                        <span className="message" id="messageErrorPassword"></span>
                        <input type="hidden" id="TextErrorPassword" value="This field is required" />
                        <input type="hidden" id="TextErrorAuthentification" value="Sorry, you entered an incorrect email address or password." />
                        <input type="hidden" id="TooManyFailedConnectionAttempts" value="Problem: Too many failed connection attempts were made from your network. Please try again in a few moments." />
                    </div> */}
                        <div className="actions-wrapper">
                            <NavTransitionLink transition="scaleUpScaleUp">
                                <button className="btn-regular btnDB noVisible loginBt" id="login" style={{ "backgroundColor": "rgb(60, 60, 60)" }} onClick={loginClickHandler}>Log in</button>
                            </NavTransitionLink>
                            <NavTransitionLink transition="cubeToTop">
                                <a className="register-link" href="/signup">Create an account</a>
                            </NavTransitionLink>
                        </div>

                        <NavTransitionLink transition="cubeToBottom">
                            <NavLink to={`/auth/reset-password`} className="reset-password-link">Reset password</NavLink>
                        </NavTransitionLink>
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
                    <img className="login-image bg-image" src={config.urlCDN + '/core/global/login/login-intro.png'} />
                    <input type="hidden" id="connectionFailed" value="Connection Failed" />
                    <input type="hidden" id="incorrectLoginCredentials" value="Incorrect login credentials. Please try again." />
                    <input type="hidden" id="reInitPasswordTitle" value="Connection Failed" />
                    <input type="hidden" id="reInitPasswordSubTitle" value="Incorrect login credentials. Please try again." />
                </div>
            </div>
        );
    }
    return null;
}

function LoginPage() {
    const authContext = useContext(AuthContext);

    return (authContext?.isAuthenticated == true ? <Navigate to={`/${authContext.defaultApp?.rootPath}/${authContext.defaultApp?.defaultView}`} replace></Navigate> : LoginPageInner());
}

export default LoginPage;