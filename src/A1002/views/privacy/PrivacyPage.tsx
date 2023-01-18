import React, { ChangeEvent, useEffect } from 'react';
import 'A1002/assets/privacy/css/PrivacyPage.css';
import Heading, { CreateHeadingConfig } from 'UIElements/views/Heading/Heading';
import CheckBox, { CreateCheckBoxConfig } from 'UIElements/views/CheckBox/CheckBox';
import { ECheckBoxType } from 'UIElements/models/ECheckBoxType';
import { AccountModel } from 'A1002/models/AccountModel';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { AccountInfoService } from 'A1002/api/services/AccountInfoService';
import * as A1002ReducerActions from 'A1002/actions/A1002Actions';
import { AuthService } from 'A1002/api/services/AuthService';

function PrivacyPage() {
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

    const updateInfo = async (prop: string, value: any) => {
        if (!accountInfo.hasOwnProperty(prop)) {
            return;
        }

        if (accountInfo[prop] == value) {
            return;
        }

        let accountInfoService = new AccountInfoService();
        let updatedAccount = await accountInfoService.UpdateAccountInfo(prop, value);
        if (!updatedAccount) {
            debugger;
            return;
        }
        let data: Array<AccountModel> = [updatedAccount];
        dispatch(A1002ReducerActions.setAccountInfo(data));
    }

    const onTFAChange = async (value: any) => {
        console.log('TFA', value);
        await updateInfo('twostepAuth', value);
    };

    const onMultipleSessionsChange = async (value: any) => {
        console.log('OnlyOneSession', value);
        await updateInfo('multipleSessions', value);
    };

    const onAnonymousChange = async (value: any) => {
        console.log('Anonyme', value);
        await updateInfo('noPersonalInfo', value);
    };

    const onEndToEndChange = async (value: any) => {
        console.log('E2E', value);
        await updateInfo('endToEndEncryption', value);
    };

    const onZeroAccessChange = async (value: any) => {
        console.log('ZeroAccess', value);
        await updateInfo('zeroAccess', value);
    };

    if (accountInfo) {
        return (
            <div className='scroll-wrapper'>
                <div className='account-view-inner'>
                    <div className='content-block'>
                        <div className='text-center my-4'>
                            <div className="title2">Paramètres de confidentialité</div>
                            <p className='subTitle2'>Choisissez les paramètres adaptés à vos besoins pour protéger votre compte.</p>
                        </div>
                        <div className="separator36"></div>
                        <Heading config={CreateHeadingConfig(2, 'Options de sécurité')}></Heading>
                        <h2 className="titleSectionConfidentiality">Authentification</h2>
                        <label className="sectionConfidentiality">Authentification en deux étapes</label>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'tfa', '', 'tfa', false, undefined, accountInfo.twostepAuth, onTFAChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Activer l'authentification en deux étapes.</span>
                        <div className="separatorMin5"></div>
                        <h2 className="titleSectionConfidentiality">Sessions</h2>
                        <label className="sectionConfidentiality">Gestionnaire de sessions</label>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'multi_session', '', 'multi_session', false, undefined, accountInfo.multipleSessions, onMultipleSessionsChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Autoriser maximum une seule session simultanée pour empêcher un accès non autorisé à mon compte. Si vous activez cette option, cela va révoquer toutes les autres sessions.</span>
                        <div className="separatorMin5"></div>
                        <Heading config={CreateHeadingConfig(2, 'Privacy 3.0')}></Heading>
                        <h2 className="sectionConfidentiality">Chiffrement de bout en bout (E2E)</h2>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'e2e', "", 'e2e', true, undefined, true, onEndToEndChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Par défaut, nous utilisons un chiffrement de bout en bout pour sécuriser toutes vos conversations et données sensibles. Notre protocole de sécurité a été mis au point à partir du même protocole que celui de l'application Open Wisper Systems Signal, avec nos propres implémentations propriétaires et ajouts.</span>
                        <div className="separatorMin14"></div>
                        <h2 className="sectionConfidentiality">Architecture "zéro accès"</h2>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'zero_access', '', 'zero_access', true, undefined, true, onZeroAccessChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Notre architecture "zéro accès" signifie que vos données sont chiffrées côté client de manière à les rendre inaccessibles pour nous. Nous n'avons pas accès aux clés de chiffrement, donc nous n'avons pas la capacité technique de décrypter vos messages ou données sensibles.</span>
                        <div className="separatorMin14"></div>
                        <h2 className="sectionConfidentiality">Anonyme</h2>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'anonyme', "", 'anonyme', true, undefined, true, onAnonymousChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Aucune information personnelle n'est requise pour créer votre compte. Par défaut, nous ne faisons aucun suivi ou journalisation des informations personnelles identifiables et nous ne gardons pas les logs d'IP qui peuvent être liés à votre compte. Votre vie privée prévaut.</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default PrivacyPage;