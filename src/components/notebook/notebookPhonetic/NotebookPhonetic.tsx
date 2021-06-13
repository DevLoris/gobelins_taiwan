import css from './NotebookPhonetic.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  chinese?: string,
  english?: string,
  phonetic?: string
}

/**
 * @name NotebookPhonetic
 * @desc Affiche un bloc avec une phonétique
 */
function NotebookPhonetic (props: IProps) {
  return <div className={merge([css.root, props.className])}>
    <div className={css.chinese}>{props.chinese}</div>
    <div className={css.phonetic}>
      <div className={css.phoneticLine}>
        <span>EN.</span> {props.english}
      </div>
      <div className={css.phoneticLine}>
        <span>ZN.</span> [{props.phonetic}]
      </div>
    </div>
  </div>
}

export default NotebookPhonetic
