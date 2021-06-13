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

enum QUALITY_LEVEL {
    HIGH_QUALITY,
    LOW_QUALITY
}

/**
 * @name SettingsForm
 */
function SettingsForm(props: IProps) {
    const {t} = useTranslation();
    // On récupère les paramètres antialiasing et outlineeffect
    const states = {...store.getState().user_data.settings};

    return <div className={merge([css.root, props.className])}>
        <form>
            <label>
                {t("settings__label__select")}
                <select onChange={(e) => {
                    for (const prop in states) {
                        if (Object.prototype.hasOwnProperty.call(states, prop)) {
                            states[prop] = e.target.value === QUALITY_LEVEL.HIGH_QUALITY.toString();
                        }
                    }
                }}
                defaultValue={states.outline && states.antialiasing ? QUALITY_LEVEL.HIGH_QUALITY : QUALITY_LEVEL.LOW_QUALITY}>
                    <option value={QUALITY_LEVEL.HIGH_QUALITY}>{t("settings__label__highq")}</option>
                    <option value={QUALITY_LEVEL.LOW_QUALITY}>{t("settings__label__lowq")}</option>
                </select>
            </label>
            <div className={"buttonGroup"}>
                <Button onClick={() => { // Ferme la fenêtre et sauvegarde les options du jeu dans le store
                    props.onClose();
                    store.dispatch(toggleOutlineEffect(states.outline));
                    store.dispatch(toggleAntiAliasing(states.antialiasing));
                }} style={ButtonStyle.PATTERN} label={t("settings__button__save")}/>
            </div>
        </form>
    </div>
}

export default SettingsForm
