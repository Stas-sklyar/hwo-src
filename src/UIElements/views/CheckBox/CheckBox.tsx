import React, { ChangeEventHandler, EventHandler, ReactEventHandler, useState } from 'react';
import 'UIElements/assets/CheckBox/css/CheckBox.css';
import { FC } from 'react';
import { EComponentColorType } from 'UIElements/models/EComponentType';
import { ElementConfig, IElementConfig } from 'UIElements/models/IElementConfig';
import { ECheckBoxType } from 'UIElements/models/ECheckBoxType';

export class CheckBoxConfig extends ElementConfig {
    public id: string = '';
    public title: string = '';
    public name: string = '';
    public type: ECheckBoxType = ECheckBoxType.CheckBox;
    public value: boolean = false;
    public disabled: boolean = false;
    public onChange: Function = () => {};
}

const CheckBox: FC<{ config: CheckBoxConfig }> = ({ config }) => {
    const [value, setValue] = useState(config.value);

    const toggleValue = () => {
        let newValue = !value;
        setValue(newValue);
        config.onChange(newValue);
    };

    let TitleElement = config.title ?
        <span className='label'>{config.title}</span> :
        null;

    return <label htmlFor={config.id} className={config.type}>
        <input type="checkbox" name={config.name} id={config.id} checked={value} onChange={toggleValue} disabled={config.disabled} />
        <span className="mark"></span>
        {TitleElement}
    </label>
}

export default CheckBox;

export function CreateCheckBoxConfig(type: ECheckBoxType, name: string, title: string, id: string, disabled: boolean, className?: string, value?: any, onChange?: Function): CheckBoxConfig
{
    const config: CheckBoxConfig = {
        className: className || '',
        id: id,
        name: name,
        disabled: disabled,
        title: title,
        value: value,
        type: type,
        textColor: EComponentColorType.Default,
        backgroundColor: EComponentColorType.Default,
        onChange: onChange || (() => {})
    };

    return config;
}