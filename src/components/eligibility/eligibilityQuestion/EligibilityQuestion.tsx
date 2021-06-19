import css from './EligibilityQuestion.module.less';
import React, {useState} from 'react';
import {merge} from "../../../lib/utils/arrayUtils";
import {EligibilityQuestionType, IEligibilityQuestion, IEligibiltyResponse} from "../EligibilityUtils";
import ButtonPicto, {ButtonPictoStyle} from "../../buttonPicto/ButtonPicto";
import Checkbox from "../../checkbox/Checkbox";

interface IProps {
  className?: string,
  question: IEligibilityQuestion,
  onSelectResponse: (resp: IEligibiltyResponse) => void;
  onNext: () => void,
  onPrevious: () => void,
  index: number,
  max: number
}

/**
 * @name EligibilityQuestion
 * @desc Question du test l'éligibilité
 */
function EligibilityQuestion (props: IProps) {
  const [response, setResponse] = useState<IEligibiltyResponse>();

  return <div className={merge([css.root, props.className])}>
    <div className={css.question}>
      <p>{props.question.helper && (props.question.helper)}</p>
      <h2>{props.question.question}</h2>
    </div>

    <div className={css.response}>
    {props.question.type == EligibilityQuestionType.RADIO &&
        props.question.response.map((v ,i)=>  {
          return (<label onClick={() => { props.onSelectResponse(v); setResponse(v); }} key={i}>
            <Checkbox isChecked={ response == v }/> {v.response}</label>)
        })
    }
    </div>

    <hr/>

    {response !== undefined  && (
        <div className={merge([css.information, css["information_" + response.correct.toString()]])}>
          <p>{response.tip}</p>
        </div>
    )}

    <div className={css.navigation}>
      <ButtonPicto disabled={false} picto={ButtonPictoStyle.PREVIOUS} onClick={props.onPrevious}/>
      <div>{props.index} / {props.max}</div>
      <ButtonPicto disabled={response == undefined} picto={ButtonPictoStyle.NEXT} onClick={props.onNext}/>
    </div>
  </div>
}

export default EligibilityQuestion
