import React, { ChangeEventHandler, useState } from 'react';
import 'UIElements/assets/RadioGroup/css/RadioGroup.css';
import { FC } from 'react';
import { EComponentColorType } from 'UIElements/models/EComponentType';
import { ElementConfig, IElementConfig } from 'UIElements/models/IElementConfig';
import { NameValue } from 'UIElements/models/NameValue';
import Heading, { CreateHeadingConfig } from '../Heading/Heading';

export class RadioConfig extends ElementConfig {
    public id: string = '';
    public title: string = '';
    public name: string = '';
    public value: any = undefined;
    public options: NameValue[] = [];
    public disabled: boolean = false;
    public isInline: boolean = false;
    public onChange: ChangeEventHandler<any> = () => {};
}

const RadioGroup: FC<{ config: RadioConfig }> = ({ config }) => {
    const [value, setValue] = useState(config.value);

    const toggleValue = (_event: any) => {
        setValue(_event.target.value);
        config.onChange(_event);
    };

    let TitleElement = config.title ?
        <Heading config={CreateHeadingConfig(3, config.title)}></Heading> :
        null;

    return <div className={`${config.isInline ? 'input-group' : ''} radios`}>
        { config.options.map((item, index) =>
        <label htmlFor={`${config.id}_${index}`} className="radio">
            <input type="radio" id={`${config.id}_${index}`} name={config.name} value={item.Value} onChange={toggleValue} checked={item.Value == value} />
            <span className="mark"></span>
            <span className='label'>{item.Name}</span>
        </label>
        ) }
    </div>
}

export default RadioGroup;

export function CreateRadioConfig(name: string, options: NameValue[], value: any, id: string, disabled: boolean, isInline?: boolean, title?: string, className?: string, onChange?: ChangeEventHandler<any>): RadioConfig
{
    const config: RadioConfig = {
        className: className || '',
        id: id,
        name: name,
        disabled: disabled,
        title: title || '',
        options: options,
        value: value,
        isInline: isInline || false,
        onChange: onChange || (() => {}),
        textColor: EComponentColorType.Default,
        backgroundColor: EComponentColorType.Default
    };

    return config;
}