import css from './SettingsForm.module.less';
import React from 'react';
import {merge} from "../../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import Button, {ButtonStyle} from "../../button/Button";
import {store, toggleAntiAliasing, toggleOutlineEffect} from "../../../store/store";

interface IProps {
    className?: string,
    onClose: () => void,
}

const componentName = "SettingsForm";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name SettingsForm
 */
function SettingsForm(props: IProps) {
    const {t} = useTranslation();
    const states = {...store.getState().user_data.settings};

    return <div className={merge([css.root, props.className])}>
        <form>
            <label>
                {t("settings__label__select")}
                <select onChange={(e) => {
                    for (const prop in states) {
                        if (Object.prototype.hasOwnProperty.call(states, prop)) {
                            states[prop] = e.target.value === 'highq';
                        }
                    }
                }}
                defaultValue={states.outline && states.antialiasing ? 'highq' : 'lowq'}>
                    <option value="highq">{t("settings__label__high_q")}</option>
                    <option value="lowq">{t("settings__label__low_q")}</option>
                </select>
            </label>
            <div className={"buttonGroup"}>
                <Button onClick={() => {
                    props.onClose();
                    store.dispatch(toggleOutlineEffect(states.outline));
                    store.dispatch(toggleAntiAliasing(states.antialiasing));
                }} style={ButtonStyle.PATTERN} label={t("settings__button__save")}/>
            </div>
        </form>
    </div>
}

export default SettingsForm
