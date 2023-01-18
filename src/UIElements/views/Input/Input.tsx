import React, { ChangeEventHandler, FocusEventHandler, LegacyRef, useState } from 'react';
import 'UIElements/assets/Input/css/Input.css';
import { FC } from 'react';
import { EComponentColorType } from 'UIElements/models/EComponentType';
import { ElementConfig } from 'UIElements/models/IElementConfig';
import { EInputType } from 'UIElements/models/EInputType';
import eyeIcon from 'UIElements/assets/Input/img/visibility.svg';

import eyeCrossIcon from 'UIElements/assets/Input/img/no-visibility.svg';

export class InputConfig extends ElementConfig {
    public type: EInputType = EInputType.Text;
    public id: string = '';
    public title: string = '';
    public placeholder: string = '';
    public name: string = '';
    public value: any = null;
    public disabled: boolean = false;
    public readonly: boolean = false;
    public onChange: ChangeEventHandler<any> = () => { };
    public onBlur: FocusEventHandler<any> = () => { };
    public inputRef: LegacyRef<HTMLInputElement> | undefined = undefined;
}

const InputElement: FC<{ config: InputConfig }> = ({ config }) => {
    return <input id={config.id} name={config.name} className={`${config.readonly ? 'transparent' : ''}`} type={config.type.toString()} data-placeholdertranslate="" placeholder={config.placeholder} defaultValue={config.value} onChange={config.onChange} onBlur={config.onBlur} disabled={config.disabled} readOnly={config.readonly} ref={config.inputRef} />
}

const Input: FC<{ config: InputConfig }> = ({ config }) => {

    let InputElementControl;

    const [showPassword, setShowPassword] = useState(false);

    const toggleState = () => {
        setShowPassword(!showPassword);
    };

    if (config.type == EInputType.Password) {
        let newConfig: InputConfig = { ...config, ...{ type: showPassword ? EInputType.Text : EInputType.Password } };
        InputElementControl = <span className="eyed" id={config.id}>
            <InputElement config={newConfig}></InputElement>
            <img className={`eye ${showPassword ? '' : 'visible'}`} src={showPassword ? eyeCrossIcon : eyeIcon} onClick={toggleState} />
        </span>;
    } else {
        InputElementControl = <InputElement config={config}></InputElement>;
    }

    let TitleElement = config.title ?
        <label htmlFor={config.name}>{config.title}</label> :
        null;

    return <div className={`input-wrapper ${config.className}`}>
        {TitleElement}
        {InputElementControl}

        {/* <span className="message" id="messageErrorEmail"></span>
        <input type="hidden" id="TextErrorEmail" value="This field is required" /> */}
    </div>
}

export default Input;

export function CreateInputConfig(type: EInputType, name: string, title: string, id: string, placeholder?: string, className?: string, value?: any, onChange?: ChangeEventHandler<any>, onBlur?: FocusEventHandler<any>, disabled?: boolean, readonly?: boolean, inputRef?: LegacyRef<HTMLInputElement> | undefined): InputConfig {
    const config: InputConfig = {
        className: className || '',
        id: id,
        name: name,
        type: type,
        placeholder: placeholder || '',
        title: title,
        value: value,
        disabled: disabled || false,
        readonly: readonly || false,
        onChange: onChange || (() => { }),
        onBlur: onBlur || (() => { }),
        inputRef: inputRef || undefined,
        textColor: EComponentColorType.Default,
        backgroundColor: EComponentColorType.Default,
    };

    return config;
}