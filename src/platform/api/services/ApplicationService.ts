import { IApplicationConfig } from "UIElements/models/IApplicationConfig";
import { ApplicationModel } from "platform/models/ApplicationModel";
import { BaseAPIService } from "platform/api/services/BaseAPIService";
import { GetActionConfig } from "platform/helpers/UrlHelpers";
import * as Constants from "platform/api/routes/platformRoute";
import { AxiosResponse } from "axios";

export class ApplicationService extends BaseAPIService {
    private _registeredApps: IApplicationConfig[];

    constructor() {
        super();
        this._registeredApps = [];
    }

    public RegisterApp(config: IApplicationConfig) {
        this._registeredApps.push(config);
        console.log('REGISTER APP', config);
    }

    public FindAppByRoute(path: string): IApplicationConfig {
        return this._registeredApps.filter(_ => path.startsWith(`/${_.rootPath}`))[0];
    }

    public PrintAll() {
        this._registeredApps.map(_ => console.log(_));
    }

    public async GetAppsForCurrentUser(): Promise<Array<ApplicationModel>> {

        var actionConfig = GetActionConfig(Constants.URL_APP_GET_LIST);

        var response = await this.sendAPIRequest(actionConfig.Method, actionConfig.Url, null);

        var countries = response as AxiosResponse<Array<ApplicationModel>, any>;
        if (countries) {
            return countries.data;
        }

        return new Array<ApplicationModel>();
    } 
}

const ApplicationServiceProvider = new ApplicationService();

export default ApplicationServiceProvider;