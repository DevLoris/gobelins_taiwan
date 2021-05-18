import css from './Eligibility.module.less';
import React, {useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";

interface IProps {
  className?: string
}

const componentName = "Eligibility";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name Eligibility
 */
function Eligibility (props: IProps) {
  const [questionIndex, setQuestionIndex] = useState(0);

  return <div className={merge([css.root, props.className])}>
    <h2>Test d'éligibilité</h2>
  </div>
}

export default Eligibility
