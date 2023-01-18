import { IMenuItemModel } from "UIElements/models/IMenutItemModel";

export interface IApplicationConfig {
    rootPath: string;
    menuItems: IMenuItemModel[];
    defaultView: string;
}