import React, { ChangeEvent, useEffect } from 'react';
import 'A1002/assets/language-region/css/LanguageRegionPage.css';
import Heading, { CreateHeadingConfig } from 'UIElements/views/Heading/Heading';
import Dropdown, { CreateDropdownConfig, CreateDropdownConfigGeneric } from 'UIElements/views/Dropdown/Dropdown';
import { CountryModel } from 'A1002/models/CountryModel';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageModel } from 'A1002/models/LanguageModel';
import { TimeZoneModel } from 'A1002/models/TimeZoneModel';
import { DateFormatModel } from 'A1002/models/DateFormatModel';
import { AccountModel } from 'A1002/models/AccountModel';
import { AccountInfoService } from 'A1002/api/services/AccountInfoService';
import * as A1002ReducerActions from 'A1002/actions/A1002Actions';
import { AuthService } from 'A1002/api/services/AuthService';

function LanguageRegionPage() {
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

    let countries: Array<CountryModel> = useSelector((state: RootState) => state.countries);
    let languages: Array<LanguageModel> = useSelector((state: RootState) => state.languages);
    let timeZones: Array<TimeZoneModel> = useSelector((state: RootState) => state.timeZones);
    let dateFormats: Array<DateFormatModel> = useSelector((state: RootState) => state.dateFormats);

    console.log(accountInfo);
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

    const onCountryUpdated = async (event: ChangeEvent<HTMLSelectElement>) => {
        await updateInfo('codeCountry', event.target.value);
    }

    const onLanguageUpdated = async (event: ChangeEvent<HTMLSelectElement>) => {
        await updateInfo('codeLanguage', event.target.value);
    }

    const onTimeZoneUpdated = async (event: ChangeEvent<HTMLSelectElement>) => {
        await updateInfo('timeZoneId', event.target.value);
    }

    const onDateFormatUpdated = async (event: ChangeEvent<HTMLSelectElement>) => {
        await updateInfo('dateFormatId', event.target.value);
    }
    if (accountInfo) {
        return (
            <div className='scroll-wrapper'>
                <div className='account-view-inner'>
                    <div className='content-block'>
                        <div className="title1">Update the language, time and date format</div>
                        <div className="separator20"></div>
                        <Heading config={CreateHeadingConfig(1, 'Language & region')}></Heading>
                        <div className="langueRegionBlock">
                            <Dropdown config={CreateDropdownConfigGeneric('Language', 'Language:', accountInfo.codeLanguage, languages, 'name', 'code', onLanguageUpdated)}></Dropdown>
                        </div>
                        <Dropdown config={CreateDropdownConfigGeneric('Country', 'Location:', accountInfo.codeCountry, countries, 'name', 'code', onCountryUpdated)}></Dropdown>
                        <div className="separator14"></div>
                        <Heading config={CreateHeadingConfig(1, 'Date & time')}></Heading>
                        <div className="langueRegionBlock">
                            <Dropdown config={CreateDropdownConfigGeneric('TimeZone', 'Time Zone', accountInfo.timeZoneId, timeZones, 'name', 'code', onTimeZoneUpdated)}></Dropdown>
                        </div>
                        <Dropdown config={CreateDropdownConfigGeneric('DateFormat', 'Date Format', accountInfo.dateFormatId, dateFormats, 'name', 'code', onDateFormatUpdated)}></Dropdown>

                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default LanguageRegionPage;