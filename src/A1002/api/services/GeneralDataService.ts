import { AxiosError, AxiosResponse } from "axios";
import { CountryModel } from "A1002/models/CountryModel";
import { DateFormatModel } from "A1002/models/DateFormatModel";
import { LanguageModel } from "A1002/models/LanguageModel";
import { TimeZoneModel } from "A1002/models/TimeZoneModel";
import { BaseAPIService } from "platform/api/services/BaseAPIService";
import * as routes from "A1002/api/routes/A1002Routes";
import * as env from "platform/config/env";

import { GetActionConfig } from "platform/helpers/UrlHelpers";

export class GeneralDataService extends BaseAPIService {
    public async GetCountries(): Promise<Array<CountryModel>> {

        var actionConfig = GetActionConfig(routes.URL_DATA_COUNTRIES);

        let data = env.IS_DEVELOPMENT_ENVIRONMENT ? null :
        {
            "language": "en"
        };
        
        var response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, data);

        var countries = response as AxiosResponse<Array<CountryModel>, any>;
        if (countries) {
            return countries.data;
        }

        return new Array<CountryModel>();
    }

    public async GetLanguages(): Promise<Array<LanguageModel>> {

        var actionConfig = GetActionConfig(routes.URL_DATA_LANGUAGES);

        var response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, null);
        var languages = response as AxiosResponse<Array<LanguageModel>, any>;
        if (languages) {
            return languages.data;
        }

        return new Array<LanguageModel>();
    }

    public async GetTimeZones(): Promise<Array<TimeZoneModel>> {


        var actionConfig = GetActionConfig(routes.URL_DATA_TIMEZONES);

        let data = env.IS_DEVELOPMENT_ENVIRONMENT ? null :
        {
            "language": "en"
        };
        
        var response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, data);

        var timeZones = response as AxiosResponse<Array<TimeZoneModel>, any>;
        if (timeZones) {
            return timeZones.data;
        }

        return new Array<TimeZoneModel>();
    }

    public async GetDateFormats(): Promise<Array<DateFormatModel>> {

        var actionConfig = GetActionConfig(routes.URL_DATA_DATE_FORMATS);

        var response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, null);

        var dateFormats = response as AxiosResponse<Array<DateFormatModel>, any>;

        if (dateFormats) {
            return dateFormats.data;
        }

        return new Array<DateFormatModel>();
    }
}