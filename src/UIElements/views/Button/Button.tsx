import React, { ChangeEventHandler, MouseEventHandler } from 'react';
//import logo from './logo.svg';
import 'UIElements/assets/Button/css/Button.css';
import { FC } from 'react';
import { EComponentColorType } from 'UIElements/models/EComponentType';
import { ElementConfig, IElementConfig } from 'UIElements/models/IElementConfig';
import * as UIHelpers from 'UIElements/helpers/UIElementHelpers';

export class ButtonConfig extends ElementConfig {
    public title: string = '';
    public disabled: boolean = false;
    public onClick: MouseEventHandler<any> = () => {};
}

const Button: FC<{ config: ButtonConfig }> = ({ config }) => {
    const buttonType = UIHelpers.GetComponentColorSchema(config.backgroundColor);
    return <button type="button" className={ `btn btn-${buttonType} ${config.className || ''}` } onClick={config.onClick}>{config.title}</button>
}

export default Button;

export function CreateButtonConfig(title: string, type: EComponentColorType, disabled: boolean, onClick: MouseEventHandler<any>, className?: string): ButtonConfig {
    return { ...new ButtonConfig(), ...{
        textColor: EComponentColorType.Default,
        backgroundColor: type,
        title: title || '',
        className: className || '',
        disabled: disabled,
        onClick: onClick || (() => {})
     } };
}