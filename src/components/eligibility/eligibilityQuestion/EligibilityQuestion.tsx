import css from './EligibilityQuestion.module.less';
import React from 'react';
import {merge} from "../../../lib/utils/arrayUtils";
import {EligibilityQuestionType, IEligibilityQuestion, IEligibiltyResponse} from "../EligibilityUtils";

interface IProps {
  className?: string,
  question: IEligibilityQuestion,
  onSelectResponse: (resp: IEligibiltyResponse) => void;
}

/**
 * @name EligibilityQuestion
 * @desc Question du test l'éligibilité
 */
function EligibilityQuestion (props: IProps) {
  return <div className={merge([css.root, props.className])}>
    <h3>{props.question.question}</h3>
    {props.question.helper && (<div>{props.question.helper}</div>)}

    {props.question.type == EligibilityQuestionType.RADIO &&
        props.question.response.map((v ,i)=>  {
          return (<label onClick={() => { props.onSelectResponse(v); }} key={i}><input name={props.question.id} id={"resp-"  + i} value={i} type={"radio"} /> {v.response}</label>)
        })
    }
  </div>
}

export default EligibilityQuestion
