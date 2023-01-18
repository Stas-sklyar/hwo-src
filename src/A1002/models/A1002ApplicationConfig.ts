import { IApplicationConfig } from "UIElements/models/IApplicationConfig";
import { IMenuItemModel } from "UIElements/models/IMenutItemModel";
import ApplicationServiceProvider from "platform/api/services/ApplicationService";

class A1002ApplicationConfig implements IApplicationConfig {
  rootPath: string;
  menuItems: IMenuItemModel[];
  defaultView: string;
  
  constructor(_root: string, _menu: IMenuItemModel[], _default: string) {
    this.rootPath = _root;
    this.menuItems = _menu;
    this.defaultView = _default;
  }
}

export const A1002ApplicationConfiguration = new A1002ApplicationConfig(
  'myaccount',
  [],
  'overview'
);

ApplicationServiceProvider.RegisterApp(A1002ApplicationConfiguration);