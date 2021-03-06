import css from './ButtonPicto.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {randomTo} from "../../lib/utils/mathUtils";

export enum ButtonPictoStyle {
  CROSS,
  PREVIOUS,
  NEXT
}

interface IProps {
  className?: string,
  disabled: boolean,
  picto: ButtonPictoStyle,
  hidden?: boolean
  onClick: () => void
}

const componentName = "ButtonPicto";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name ButtonPicto
 */
function ButtonPicto (props: IProps) {
  const randId = randomTo(10000);

  return <div  onClick={props.onClick} className={merge([css.root, props.className, props.disabled ? css.disabled : null, props.hidden ? css.hidden : null])}>
    <svg  width="63.633" height="41.446" viewBox="0 0 63.633 41.446">
      <defs>
        <clipPath id={"clip-path_" + randId}>
          <path id="Tracé_471" data-name="Tracé 471" d="M2342.23-2875.818l4.8.544,4.8-.571,4.8.594,4.8-.5,4.8.321,4.679,1.033,4.55,1.475,3.867,2.89,2.574,4.049,2.681,4.129.3,4.917h-.373l-.131,4.862-1.851,4.545-3.507,3.379-3.513,3.276-4.6,1.374-4.673.732-4.8.767-4.8-.083-4.8-.614-4.8.385-4.8-.561-4.855.056-4.228-2.385-3.835-2.815-3.184-3.622-2.043-4.434.085-4.862h-.692l.931-4.776,1.526-4.633,3.426-3.461,3.708-3,4.409-1.865Z" transform="translate(-2080.179 3312.77)" fill="#fff" stroke="#111d30" strokeWidth="1"/>
        </clipPath>
      </defs>
      <g id="Groupe_2277" data-name="Groupe 2277" transform="matrix(1, 0.017, -0.017, 1, -155.133, -424.28)">
        <g id="Groupe_312" data-name="Groupe 312" transform="translate(-79.5 -14.925)">
          <path id="Tracé_470" data-name="Tracé 470" d="M2342.23-2875.818l4.8.544,4.8-.571,4.8.594,4.8-.5,4.8.321,4.679,1.033,4.55,1.475,3.867,2.89,2.574,4.049,2.681,4.129.3,4.917h-.373l-.131,4.862-1.851,4.545-3.507,3.379-3.513,3.276-4.6,1.374-4.673.732-4.8.767-4.8-.083-4.8-.614-4.8.385-4.8-.561-4.855.056-4.228-2.385-3.835-2.815-3.184-3.622-2.043-4.434.085-4.862h-.692l.931-4.776,1.526-4.633,3.426-3.461,3.708-3,4.409-1.865Z" transform="translate(-2079.179 3314.77)" fill="#111d30"/>
          <path id="Tracé_469" data-name="Tracé 469" d="M2342.23-2875.818l4.8.544,4.8-.571,4.8.594,4.8-.5,4.8.321,4.679,1.033,4.55,1.475,3.867,2.89,2.574,4.049,2.681,4.129.3,4.917h-.373l-.131,4.862-1.851,4.545-3.507,3.379-3.513,3.276-4.6,1.374-4.673.732-4.8.767-4.8-.083-4.8-.614-4.8.385-4.8-.561-4.855.056-4.228-2.385-3.835-2.815-3.184-3.622-2.043-4.434.085-4.862h-.692l.931-4.776,1.526-4.633,3.426-3.461,3.708-3,4.409-1.865Z" transform="translate(-2080.179 3312.77)" fill="#fff" stroke="#111d30" strokeWidth="1"/>
          <g id="Groupe_de_masques_29" data-name="Groupe de masques 29" clipPath={"url(#clip-path_" + randId + ")"}>
            <image href="/public/da/pattern_white_beige.png" x="0" y="0"  width="837" height="837"  />
          </g>
          <path id="Tracé_2392" data-name="Tracé 2392" d="M2342.23-2875.818l4.8.544,4.8-.571,4.8.594,4.8-.5,4.8.321,4.679,1.033,4.55,1.475,3.867,2.89,2.574,4.049,2.681,4.129.3,4.917h-.373l-.131,4.862-1.851,4.545-3.507,3.379-3.513,3.276-4.6,1.374-4.673.732-4.8.767-4.8-.083-4.8-.614-4.8.385-4.8-.561-4.855.056-4.228-2.385-3.835-2.815-3.184-3.622-2.043-4.434.085-4.862h-.692l.931-4.776,1.526-4.633,3.426-3.461,3.708-3,4.409-1.865Z" transform="translate(-2080.179 3312.77)" fill="none" stroke="#111d30" strokeWidth="1"/>
        </g>
        {props.picto == ButtonPictoStyle.CROSS && (
            <text id="_" data-name="+" transform="translate(184.394 441) rotate(45)" fill="#121d30" fontSize="20" fontFamily="MFeltPenHK-SemiBold, MFeltPen HK" fontWeight="600"><tspan x="0" y="0">+</tspan></text>
        )}
        {props.picto == ButtonPictoStyle.PREVIOUS && (
            <path id="Tracé_268" data-name="Tracé 268" d="M16.576,5.86,13.422,9.013l-.034.037a.644.644,0,0,0-.061.08.765.765,0,0,0,.3,1.066.728.728,0,0,0,.241.067.538.538,0,0,0,.15,0,.784.784,0,0,0,.369-.145.8.8,0,0,0,.076-.066l4.407-4.407a.809.809,0,0,0,.066-.076.752.752,0,0,0,0-.888.808.808,0,0,0-.066-.076L14.461.2a.8.8,0,0,0-.076-.066.761.761,0,0,0-1.168.461.743.743,0,0,0,.138.568.721.721,0,0,0,.066.076L16.576,4.39H.718a1.553,1.553,0,0,0-.175.021A.755.755,0,0,0,.231,5.675a.734.734,0,0,0,.312.164,1.553,1.553,0,0,0,.175.021Z" transform="matrix(-1, -0.017, 0.017, -1, 204.449, 446.3)" fill="#111d30"/>
        )}
        {props.picto == ButtonPictoStyle.NEXT && (
            <path id="Tracé_268" data-name="Tracé 268" d="M16.576,5.86,13.422,9.013l-.034.037a.644.644,0,0,0-.061.08.765.765,0,0,0,.3,1.066.728.728,0,0,0,.241.067.538.538,0,0,0,.15,0,.784.784,0,0,0,.369-.145.8.8,0,0,0,.076-.066l4.407-4.407a.809.809,0,0,0,.066-.076.752.752,0,0,0,0-.888.808.808,0,0,0-.066-.076L14.461.2a.8.8,0,0,0-.076-.066.761.761,0,0,0-1.168.461.743.743,0,0,0,.138.568.721.721,0,0,0,.066.076L16.576,4.39H.718a1.553,1.553,0,0,0-.175.021A.755.755,0,0,0,.231,5.675a.734.734,0,0,0,.312.164,1.553,1.553,0,0,0,.175.021Z" transform="translate(185.46 435.866)" fill="#111d30"/>
        )}
      </g>
    </svg>

  </div>
}

export default ButtonPicto


