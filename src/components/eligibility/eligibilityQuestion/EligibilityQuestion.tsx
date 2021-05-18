import css from './EligibilityQuestion.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string
}

const componentName = "EligibilityQuestion";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name EligibilityQuestion
 */
function EligibilityQuestion (props: IProps) {
  return <div className={merge([css.root, props.className])}>
      {componentName}
  </div>
}

export default EligibilityQuestion
