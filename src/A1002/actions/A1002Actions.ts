
import { CountryModel } from "A1002/models/CountryModel"
import { TimeZoneModel } from "A1002/models/TimeZoneModel"
import { LanguageModel } from "A1002/models/LanguageModel"
import { DateFormatModel } from "A1002/models/DateFormatModel"
import { AccountModel } from "A1002/models/AccountModel"

export const ACTION_SET_ALL_COUNTRIES_TO_STORE = 'SET_ALL_COUNTRIES_TO_STORE';
export const ACTION_SET_ALL_TIME_ZONES_TO_STORE = 'SET_ALL_TIME_ZONES_TO_STORE';
export const ACTION_SET_ALL_LANGUAGES_TO_STORE = 'SET_ALL_LANGUAGES_TO_STORE';
export const ACTION_SET_ALL_DATE_FORMATS_TO_STORE = 'SET_ALL_DATE_FORMATS_TO_STORE';
export const ACTION_SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
export const ACTION_EDIT_ACCOUNT_INFO = 'EDIT_ACCOUNT_INFO';


export const setAllCountriesToStore = (countries: Array<CountryModel>) => ({
    type: ACTION_SET_ALL_COUNTRIES_TO_STORE,
    payload: countries
})

export const setAllTimeZonesToStore = (timeZones: Array<TimeZoneModel>) => ({
    type: ACTION_SET_ALL_TIME_ZONES_TO_STORE,
    payload: timeZones
})

export const setAllLanguagesToStore = (languages: Array<LanguageModel>) => ({
    type: ACTION_SET_ALL_LANGUAGES_TO_STORE,
    payload: languages
})

export const setAllDateFormatsToStore = (dateFormats: Array<DateFormatModel>) => ({
    type: ACTION_SET_ALL_DATE_FORMATS_TO_STORE,
    payload: dateFormats
})

export const setAccountInfo = (accountData: Array<AccountModel>) => ({
    type: ACTION_SET_ACCOUNT_INFO,
    payload: accountData
})

export type EditAccountInfoAction = {
    type: string,
    payload: any
}

export const editAccountInfo = (property: string, value: any): EditAccountInfoAction => ({
    type: ACTION_EDIT_ACCOUNT_INFO,
    payload: { property, value }
})

export type ActionsTypes =
    ReturnType<typeof setAllCountriesToStore> |
    ReturnType<typeof setAllCountriesToStore> |
    ReturnType<typeof setAllDateFormatsToStore> |
    ReturnType<typeof setAllLanguagesToStore> |
    ReturnType<typeof setAllTimeZonesToStore> |
    ReturnType<typeof setAccountInfo> |
    ReturnType<typeof editAccountInfo>

   



