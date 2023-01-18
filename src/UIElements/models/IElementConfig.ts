import { EComponentColorType } from "UIElements/models/EComponentType";

export interface IElementConfig {
    className: string,
    textColor: EComponentColorType,
    backgroundColor: EComponentColorType
}

export class ElementConfig implements IElementConfig {
    public className: string = '';
    public textColor: EComponentColorType = EComponentColorType.Default;
    public backgroundColor: EComponentColorType = EComponentColorType.Default;
}