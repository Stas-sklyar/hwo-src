import { combineReducers } from 'redux'
import { countriesReducer } from './countriesReducer'
import { dateFormatsReducer } from './dateFormatsReducer'
import { languagesReducer } from './languagesReducer'
import { timeZonesReducer } from './timeZonesReducer'
import { userAccountReducer } from './userAccountReducer'

export const A1002Reducer = {
    countries: countriesReducer,
    languages: languagesReducer,
    timeZones: timeZonesReducer,
    dateFormats: dateFormatsReducer,
    accountInfo: userAccountReducer,
}