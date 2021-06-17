import css from './TooltipMessage.module.less';
import React from 'react';
import { merge } from "../../lib/utils/arrayUtils";

interface IProps {
  className?: string
}

const componentName = "TooltipMessage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name TooltipMessage
 */
function TooltipMessage (props: IProps) {
  return <div className={merge([css.root, props.className])}>
      {componentName}
  </div>
}

export default TooltipMessage
