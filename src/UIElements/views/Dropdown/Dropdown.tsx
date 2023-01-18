import React, { ChangeEventHandler } from 'react';
import 'UIElements/assets/Dropdown/css/Dropdown.css';
import { FC } from 'react';
import { EComponentColorType } from 'UIElements/models/EComponentType';
import { ElementConfig, IElementConfig } from 'UIElements/models/IElementConfig';
import { NameValue } from 'UIElements/models/NameValue';

export class DropdownConfig extends ElementConfig {
    public selectedItem: any = null;
    public items: NameValue[] = [];
    public title: string = '';
    public name: string = '';
    public onChange: ChangeEventHandler<any> = () => {};
}

const Dropdown: FC<{ config: DropdownConfig }> = ({ config }) => {
    let TitleElement = config.title ?
        <label htmlFor={config.name}>{config.title}</label> :
        null;

    return <div className="input-wrapper">
        {TitleElement}
        <div className="dropdown-menu-platform-dark">
            <select name={config.name} value={config.selectedItem} onChange={config.onChange}>
                { config.items.map(_ => <option className="dropdown-item" value={ _.Value }>{_.Name}</option>) }
            </select>
        </div>
    </div>
}

export default Dropdown;

export function CreateDropdownConfig(name: string, selectedItem: any, items: NameValue[], title?: string, onChange?: ChangeEventHandler<any>): DropdownConfig {
    return { ...new DropdownConfig(), ...{
        selectedItem: selectedItem,
        textColor: EComponentColorType.Default,
        title: title || '',
        items: items,
        onChange: onChange || (() => {}),
        name: name
     } };
}

export function CreateDropdownConfigGeneric(name: string, title: string, selectedItem: any, items: any[], titleProp: string, valueProp: string, onChange?: ChangeEventHandler<any>): DropdownConfig {
    let _items = new Array<NameValue>();

    items.forEach(_ => {
        _items.push({
            Name: _[titleProp],
            Value: _[valueProp]
        });
    });

    return { ...new DropdownConfig(), ...{
        selectedItem: selectedItem,
        textColor: EComponentColorType.Default,
        title: title || '',
        items: _items,
        name: name,
        onChange: onChange || (() => {})
     } };
}