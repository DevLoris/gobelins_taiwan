import css from './Checkbox.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  isChecked: boolean
}

const componentName = "Checkbox";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name Checkbox
 */
function Checkbox (props: IProps) {
  return <div className={merge([css.root, props.className])}>
    <svg xmlns="http://www.w3.org/2000/svg" width="27.384" height="27.137" viewBox="0 0 27.384 27.137">
      <g id="Groupe_2729" data-name="Groupe 2729" transform="translate(-174.499 -375.5)">
        <g id="Groupe_2704" data-name="Groupe 2704" transform="translate(1028.102 4497.661)">
          <g id="Rectangle_1415" data-name="Rectangle 1415">
            <g id="Groupe_2699" data-name="Groupe 2699">
              <path id="Tracé_2569" data-name="Tracé 2569" d="M-848.708-4121.05l6.211.273,6.215-.333,6.215.156,3.749,3.518.1,6.21-.407,6.215.2,6.215-3.639,3.424-6.211.347-6.215-.268-6.215.238-3.742-3.74.281-6.21-.385-6.215.19-6.215Z" fill="#111d30"/>
            </g>
          </g>
          <g id="Rectangle_1415-2" data-name="Rectangle 1415">
            <g id="Groupe_2700" data-name="Groupe 2700">
              <path id="Tracé_2570" data-name="Tracé 2570" d="M-849.388-4121.6l6,.263,6-.321,6,.151,3.62,3.4.1,6-.393,6,.19,6-3.514,3.306-6,.335-6-.259-6,.23-3.613-3.612.271-6-.372-6,.184-6Z" fill={props.isChecked ? "#ece4d5": "#ffffff"} stroke="#111d30" strokeWidth="1"/>
            </g>
          </g>
        </g>
        {props.isChecked && (
            <g id="Groupe_2442" data-name="Groupe 2442" transform="matrix(0.996, -0.087, 0.087, 0.996, 181.745, 385.038)">
              <g id="Groupe_2441" data-name="Groupe 2441" transform="translate(0 0)">
                <g id="Groupe_2440" data-name="Groupe 2440">
                  <g id="Groupe_2439" data-name="Groupe 2439">
                    <path id="Tracé_2523" data-name="Tracé 2523" d="M48.238,62.141c-3.276.946-5.841,4.083-7.6,7.054l-1.961-2.652c-.695-.94-2.289-.025-1.585.927l2.861,3.87a.93.93,0,0,0,1.585,0,24.416,24.416,0,0,1,2.117-3.255c1.3-1.7,2.952-3.559,5.074-4.172A.919.919,0,0,0,48.238,62.141Z" transform="translate(-36.913 -62.101)" fill="#111d30"/>
                  </g>
                </g>
              </g>
            </g>
        )}
      </g>
    </svg>
  </div>
}

export default Checkbox
