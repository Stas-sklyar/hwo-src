import { IApplicationConfig } from "UIElements/models/IApplicationConfig";
import { IMenuItemModel } from "UIElements/models/IMenutItemModel";
import ApplicationServiceProvider from "platform/api/services/ApplicationService";

class AuthApplicationConfig implements IApplicationConfig {
  rootPath: string;
  menuItems: IMenuItemModel[];
  defaultView: string;
  
  constructor(_root: string, _menu: IMenuItemModel[], _default: string) {
    this.rootPath = _root;
    this.menuItems = _menu;
    this.defaultView = _default;
  }
}

export const AuthApplicationConfiguration = new AuthApplicationConfig(
  'auth',
  [],
  'login'
);

ApplicationServiceProvider.RegisterApp(AuthApplicationConfiguration);