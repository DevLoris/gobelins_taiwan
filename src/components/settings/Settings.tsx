import css from './Settings.module.less';
import React from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import SettingsClose from "./settingsClose/SettingsClose";
import SettingsForm from "./settingsForm/SettingsForm";

interface IProps {
    className?: string,
    show?: boolean,
    onClose: () => void,
}

Settings.defaultProps = {
    show: false,
    onClose: () => {}
}

const componentName = "Settings";
const debug = require("debug")(`front:${componentName}`);

/**
 * Options de qualité du jeu
 * @name Settings
 */
function Settings(props: IProps) {
    return <div className={merge([css.root, props.className, props.show ? css.open : null])}>
        <div className={css.menu}>
            <SettingsClose onClick={props.onClose}/>
        </div>
        <SettingsForm onClose={props.onClose}/>
    </div>
}

export default Settings
