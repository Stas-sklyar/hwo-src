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
                            <div className="title2">Param??tres de confidentialit??</div>
                            <p className='subTitle2'>Choisissez les param??tres adapt??s ?? vos besoins pour prot??ger votre compte.</p>
                        </div>
                        <div className="separator36"></div>
                        <Heading config={CreateHeadingConfig(2, 'Options de s??curit??')}></Heading>
                        <h2 className="titleSectionConfidentiality">Authentification</h2>
                        <label className="sectionConfidentiality">Authentification en deux ??tapes</label>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'tfa', '', 'tfa', false, undefined, accountInfo.twostepAuth, onTFAChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Activer l'authentification en deux ??tapes.</span>
                        <div className="separatorMin5"></div>
                        <h2 className="titleSectionConfidentiality">Sessions</h2>
                        <label className="sectionConfidentiality">Gestionnaire de sessions</label>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'multi_session', '', 'multi_session', false, undefined, accountInfo.multipleSessions, onMultipleSessionsChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Autoriser maximum une seule session simultan??e pour emp??cher un acc??s non autoris?? ?? mon compte. Si vous activez cette option, cela va r??voquer toutes les autres sessions.</span>
                        <div className="separatorMin5"></div>
                        <Heading config={CreateHeadingConfig(2, 'Privacy 3.0')}></Heading>
                        <h2 className="sectionConfidentiality">Chiffrement de bout en bout (E2E)</h2>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'e2e', "", 'e2e', true, undefined, true, onEndToEndChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Par d??faut, nous utilisons un chiffrement de bout en bout pour s??curiser toutes vos conversations et donn??es sensibles. Notre protocole de s??curit?? a ??t?? mis au point ?? partir du m??me protocole que celui de l'application Open Wisper Systems Signal, avec nos propres impl??mentations propri??taires et ajouts.</span>
                        <div className="separatorMin14"></div>
                        <h2 className="sectionConfidentiality">Architecture "z??ro acc??s"</h2>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'zero_access', '', 'zero_access', true, undefined, true, onZeroAccessChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Notre architecture "z??ro acc??s" signifie que vos donn??es sont chiffr??es c??t?? client de mani??re ?? les rendre inaccessibles pour nous. Nous n'avons pas acc??s aux cl??s de chiffrement, donc nous n'avons pas la capacit?? technique de d??crypter vos messages ou donn??es sensibles.</span>
                        <div className="separatorMin14"></div>
                        <h2 className="sectionConfidentiality">Anonyme</h2>
                        <CheckBox config={CreateCheckBoxConfig(ECheckBoxType.Toggle, 'anonyme', "", 'anonyme', true, undefined, true, onAnonymousChange)}></CheckBox>
                        <span className="descriptionLabelConfidentiality colorDescription">Aucune information personnelle n'est requise pour cr??er votre compte. Par d??faut, nous ne faisons aucun suivi ou journalisation des informations personnelles identifiables et nous ne gardons pas les logs d'IP qui peuvent ??tre li??s ?? votre compte. Votre vie priv??e pr??vaut.</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default PrivacyPage;