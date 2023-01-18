import React, { ChangeEvent, useEffect } from 'react';

import 'A1002/assets/account/css/AccountPage.css';
import Heading, { CreateHeadingConfig } from 'UIElements/views/Heading/Heading';
import Input, { CreateInputConfig } from 'UIElements/views/Input/Input';
import { EInputType } from 'UIElements/models/EInputType';
import Dropdown, { CreateDropdownConfig } from 'UIElements/views/Dropdown/Dropdown';
import { NumberRange } from 'platform/helpers/GeneralHelpers';
import RadioGroup, { CreateRadioConfig } from 'UIElements/views/RadioGroup/RadioGroup';

import { NameValue } from 'UIElements/models/NameValue';
import { AuthService } from 'A1002/api/services/AuthService';
import { AccountModel } from 'A1002/models/AccountModel';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { AccountInfoService } from 'A1002/api/services/AccountInfoService';
import * as A1002ReducerActions from 'A1002/actions/A1002Actions'

function AccountPage() {
    const checkAuthClick = async () => {
        let service = new AuthService();
        //debugger;
        return await service.IsLoggedIn();
    };

    const dispatch = useDispatch();

    let accountInfo: AccountModel = useSelector((state: RootState) => state.accountInfo)[0];

    const setAccountInfoData = async () => {
        if (!accountInfo) {
            let accountInfoService = new AccountInfoService();
            let profileInfo = await accountInfoService.GetAccountInfo();
            let data: Array<AccountModel> = [profileInfo];
            dispatch(A1002ReducerActions.setAccountInfo(data));
        }
    };

    const setData = async () => {
        checkAuthClick();
        setAccountInfoData();
    }

    useEffect(() => {
        setData()
    }, []);

    const accountService = new AccountInfoService();
    const updateInfo = async (prop: string, value: any) => {

        if (!accountInfo.hasOwnProperty(prop)) {
            return;
        }

        if (accountInfo[prop] == value) {
            return;
        }

        let updatedAccount = await accountService.UpdateAccountInfo(prop, value);
        if (!updatedAccount) {
            debugger;
            return;
        }
        let data: Array<AccountModel> = [updatedAccount];
        dispatch(A1002ReducerActions.setAccountInfo(data));
    }

    const onDisplayNameChange = async (event: React.FocusEvent<HTMLInputElement, any>) => {
        console.log(event);
        await updateInfo('displayName', event.target.value);
    };

    const onBirthYearChange = async (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event);
        await updateInfo('birthYear', event.target.value);
    };

    const onGenderChange = async (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        await updateInfo('sex', event.target.value);
    };

    if (accountInfo) {
        return (
            <div className='scroll-wrapper'>
                <div className='account-view-inner'>
                    <div className='content-block'>
                        <div className='avatar-block-wrapper'>
                            <div id="avatar" className="avatar">
                                <div>
                                    <img className="imgAvatar" src={accountInfo.avatar} style={{ visibility: "visible" }} />
                                </div>
                            </div>
                            <div className="display-name">
                                <span className="regular">Welcome, </span>
                                <span className="regular displayName">{accountInfo.displayName}</span>
                            </div>
                            <p className="subtitle1">Manage your info, privacy and security to make HyWebOS work better for you.</p>
                        </div>
                        <Heading config={CreateHeadingConfig(1, 'General settings')}></Heading>
                        <Input config={CreateInputConfig(EInputType.Text, 'name', 'Display name', 'name', 'Display name', '', accountInfo.displayName, undefined, onDisplayNameChange)}></Input>
                        <div className="input-wrapper">
                            <label>Personal ID <em className="text-tertiary">(PID)</em></label>
                            <input id="pid" readOnly type="text" className="transparent mt-n2" value={accountInfo.pid.toString().replace(/(.{3})(?=.)/g, "$1 ")}></input>
                        </div>
                        <div className="mt-2">
                            <Heading config={CreateHeadingConfig(2, 'HyWebOS Account email')}></Heading>
                            <Input config={CreateInputConfig(EInputType.Email, 'email', 'Current email', 'mail', 'your current hywebos email', "mt-n1", accountInfo.mail, undefined, undefined, true)}></Input>
                        </div>
                        <div className="mt-3">
                            <Heading config={CreateHeadingConfig(2, 'Personal info')}></Heading>
                            <div className="separator-4"></div>
                            <Dropdown config={CreateDropdownConfig('BirthYear', accountInfo.birthYear, NumberRange(1922, 2009).reverse().map(_ => new NameValue(_.toString(), _)), 'Year of birth', onBirthYearChange)}></Dropdown>
                            <Heading config={CreateHeadingConfig(4, 'Gender')}></Heading>
                            <RadioGroup config={CreateRadioConfig('gender', [new NameValue('Male', 'm'), new NameValue('Female', 'f'), new NameValue('Rather not say', " ")], accountInfo.sex, 'gender_rb', false, true, undefined, undefined, onGenderChange)}></RadioGroup>
                        </div>
                        {/* <div className='mt-3'>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'test', 'Test toggle', 'testtoggle', false)}></CheckBox>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.CheckBox, 'test2', 'Test checkbox', 'testcheckbox', false)}></CheckBox>
                    </div>
                    <div className='mt-3'>
                        <button className='btn btn-primary' onClick={loginClick}>Login</button>
                    </div>
                    <div className='mt-3'>
                        <button className='btn btn-primary' onClick={checkAuthClick}>Is Logged In</button>
                    </div> */}
                    </div>
                </div>
            </div>
        );
    }
    return null;

}

export default AccountPage;