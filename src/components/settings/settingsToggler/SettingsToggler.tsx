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
function SettingsToggler (props: IProps) {
  return <svg className={css.root} onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" width="57.427" height="62.615" viewBox="0 0 57.427 62.615">
      <g id="Groupe_304" data-name="Groupe 304" transform="matrix(1, 0.017, -0.017, 1, -1282.017, 302.98)">
          <g id="Groupe_58" data-name="Groupe 58" transform="translate(1278.816 -318.859)">
              <path id="Tracé_236" data-name="Tracé 236" d="M1334.406-290.645l-.839,4.751-.978,4.7-1.869,4.461-3.094,3.71-3.364,3.4-3.8,2.948-4.47,1.766-4.538,1.645-4.827.5-4.852-.355-4.506-1.807-4.275-2.1-4.222-2.336-3.048-3.741-2.949-3.769-2.144-4.309-1.365-4.637-.129-4.825.341-4.788,1.481-4.555,1.961-4.345,2.646-3.985,3.333-3.457,3.9-2.817,4.454-1.8,4.573-1.454,4.8-.1,4.771.239,4.58,1.363,4.53,1.648,4.022,2.708,3.061,3.746,3.052,3.725,1.992,4.4,1.042,4.7Z" transform="translate(-1279.14 317.94)" fill="#111d30"/>
          </g>
          <g id="Groupe_59" data-name="Groupe 59" transform="translate(1278.083 -320.94)">
              <path id="Tracé_237" data-name="Tracé 237" d="M1333.35-293.645l-.839,4.751-.978,4.7-1.869,4.461-3.094,3.71-3.364,3.4-3.8,2.948-4.47,1.766-4.538,1.645-4.827.5-4.852-.355-4.506-1.807-4.276-2.1-4.222-2.336-3.047-3.741-2.95-3.769-2.144-4.309-1.365-4.638-.128-4.825.341-4.788,1.481-4.555,1.961-4.345,2.646-3.985,3.332-3.457,3.9-2.817,4.454-1.8,4.573-1.454,4.8-.1,4.771.239,4.58,1.363,4.53,1.648,4.021,2.708,3.062,3.746,3.052,3.725,1.992,4.4,1.042,4.7Z" transform="translate(-1278.083 320.94)" fill="#fff"/>
              <path id="Tracé_238" data-name="Tracé 238" d="M1333.35-293.645l-.839,4.751-.978,4.7-1.869,4.461-3.094,3.71-3.364,3.4-3.8,2.948-4.47,1.766-4.538,1.645-4.827.5-4.852-.355-4.506-1.807-4.276-2.1-4.222-2.336-3.047-3.741-2.95-3.769-2.144-4.309-1.365-4.638-.128-4.825.341-4.788,1.481-4.555,1.961-4.345,2.646-3.985,3.332-3.457,3.9-2.817,4.454-1.8,4.573-1.454,4.8-.1,4.771.239,4.58,1.363,4.53,1.648,4.021,2.708,3.062,3.746,3.052,3.725,1.992,4.4,1.042,4.7Z" transform="translate(-1278.083 320.94)" fill="none" stroke="#111d30" strokeMiterlimit="10" strokeWidth="1"/>
          </g>
      </g>
      <text id="_" data-name="…" transform="translate(28.968 36)" fill="#111d30" fontSize="36" fontFamily="Fuji-Regular, Fuji" letterSpacing="0.07em"><tspan x="-10.998" y="0">…</tspan></text>
  </svg>
}

export default SettingsToggler
