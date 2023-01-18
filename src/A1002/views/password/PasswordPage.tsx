import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import 'A1002/assets/password/css/PasswordPage.css';
import Heading, { CreateHeadingConfig } from 'UIElements/views/Heading/Heading';
import Input, { CreateInputConfig } from 'UIElements/views/Input/Input';
import { EInputType } from 'UIElements/models/EInputType';
import RadioGroup, { CreateRadioConfig } from 'UIElements/views/RadioGroup/RadioGroup';
import { NameValue } from 'UIElements/models/NameValue';
import { AuthContext } from 'UIElements/views/auth/AuthContext';
import Button, { CreateButtonConfig } from 'UIElements/views/Button/Button';
import { EComponentColorType } from 'UIElements/models/EComponentType';
import { AuthService } from 'A1002/api/services/AuthService';
import { AccountModel } from 'A1002/models/AccountModel';
import { AccountInfoService } from 'A1002/api/services/AccountInfoService';
import * as A1002ReducerActions from 'A1002/actions/A1002Actions';

function PasswordPage() {
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

    const changePasswordClick = async () => {

    };

    const rbText = 'Re-chiffrement de toutes mes données cryptées avec ma nouvelle clef privée. Cette opération peut durer plusieurs minutes.';
    if (accountInfo) {
        return (
            <div className='scroll-wrapper'>
                <div className='account-view-inner'>
                    <div className='content-block'>
                        <div className='text-center my-4'>
                            <div className="title2">Modifier votre mot de passe</div>
                            <p className='subTitle2'>Ne choisissez pas un mot de passe que vous utilisez déjà sur un autre site ni un mot de passe qui soit trop évident.</p>
                        </div>
                        <div className="passwordBlock">
                            <Input config={CreateInputConfig(EInputType.Password, 'actualPassword', 'Mot de passe actuel', 'actualPassword eye2', 'Votre mot de passe', '', '')}></Input>
                        </div>
                        <div className="passwordBlock">
                            <Input config={CreateInputConfig(EInputType.Password, 'newPassword', 'Nouveau mot de passe', 'newPassword eye2', 'Nouveau mot de passe', '', '')}></Input>
                        </div>
                        <div className="passwordBlock">
                            <Input config={CreateInputConfig(EInputType.Password, 'confirmPassword', 'Répéter le nouveau mot de passe', 'confirmPassword eye2', 'Répéter le nouveau mot de passe', '', '')}></Input>
                            <Heading config={CreateHeadingConfig(4, 'Re-chiffrement')}></Heading>
                        </div>
                        <div className="separator-1"></div>
                        <RadioGroup config={CreateRadioConfig('pwd_rb', [new NameValue('', '1')], '1', 'pwd_rb', false, true)}></RadioGroup>
                        <div className="contentCheckBoxPassword colorDescription">Re-chiffrement de toutes mes données cryptées avec ma nouvelle clef privée. Cette opération peut durer plusieurs minutes.</div>
                        <Button config={CreateButtonConfig('Modifier le mot de passe', EComponentColorType.Quaternary, false, changePasswordClick, 'buttonPassword')}></Button>
                    </div>
                </div>
            </div >
        );
    }
    return null;
}

export default PasswordPage;