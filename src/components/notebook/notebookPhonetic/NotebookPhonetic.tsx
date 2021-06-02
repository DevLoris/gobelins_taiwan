import css from './NotebookPhonetic.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string
}

const componentName = "NotebookPhonetic";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookPhonetic
 */
function NotebookPhonetic (props: IProps) {
  return <div className={merge([css.root, props.className])}>
    <div className={css.chinese}>便利店</div>
    <div className={css.phonetic}>
      <div className={css.phoneticLine}>
        <span>EN.</span> Convenience store
      </div>
      <div className={css.phoneticLine}>
        <span>ZN.</span> [Biànlì diàn]
      </div>
    </div>
  </div>
}

export default NotebookPhonetic
