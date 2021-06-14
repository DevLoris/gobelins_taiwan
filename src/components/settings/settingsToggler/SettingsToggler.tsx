import css from './SettingsToggler.module.less';
import React, {useEffect} from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  onClick: () => void,
}

const componentName = "SettingsToggler";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name SettingsToggler
 */
function SettingsToggler (props: IProps) { // TODO: Design & Intégration
  return <div onClick={props.onClick} className={merge([css.root, props.className])}>
      Paramètres
  </div>
}

export default SettingsToggler
