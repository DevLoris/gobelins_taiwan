import css from './Eligibility.module.less';
import React, {useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import {EligibilityResponseType, IEligibiltyResponse, QUESTIONS} from "./EligibilityUtils";
import EligibilityQuestion from "./eligibilityQuestion/EligibilityQuestion";

interface IProps {
  className?: string
}

enum EligibilityProgression {
  FILLING,
  SUBMITTED_OK,
  SUBMITTED_TIP,
  SUBMITTED_FORBIDDEN,
}

/**
 * @name Eligibility
 * @desc Test éligiblité
 */
function Eligibility (props: IProps) {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [progression, setProgression] = useState<EligibilityProgression>(EligibilityProgression.FILLING);
  const [responses] = useState<IEligibiltyResponse[]>([]);

  const calcEligibility = () =>  {
    if(responses.filter(value => value.correct == EligibilityResponseType.FORBIDDEN).length >= 1)
      setProgression(EligibilityProgression.SUBMITTED_FORBIDDEN);
    else if(responses.filter(value => value.correct == EligibilityResponseType.OK).length >= responses.length)
      setProgression(EligibilityProgression.SUBMITTED_OK);
    else
      setProgression(EligibilityProgression.SUBMITTED_TIP);
  }

  switch (progression) {
    case EligibilityProgression.FILLING:
      return (<div className={merge([css.root, props.className])}>
        <h2>Test d'éligibilité</h2>
        {QUESTIONS.map((value, key) => {
          return (<EligibilityQuestion
              key={key}
              onSelectResponse={(resp) => {
                setQuestionIndex(key);
                responses[key] = resp;
              }}
              question={value}/>)
        })}
        {QUESTIONS.length == responses.length &&
        <button onClick={calcEligibility}>Envoyer</button>}
      </div>)
    case EligibilityProgression.SUBMITTED_FORBIDDEN:
      return (<div>Malheureusement, tu ne rentres pas dans les conditions...</div>)
    case EligibilityProgression.SUBMITTED_OK:
      return (<div>Tout est bon, plus qu'à prendre ton assurance PVT et ton billet d'avion</div>)
    case EligibilityProgression.SUBMITTED_TIP:
      return (<div>Tu ne rentres pas dans les conditions, mais tu pourrais !!</div>)
  }

  return(<></>);

}

export default Eligibility
