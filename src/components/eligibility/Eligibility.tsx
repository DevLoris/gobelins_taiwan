import css from './Eligibility.module.less';
import React, {useEffect, useRef, useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import {EligibilityResponseType, IEligibiltyResponse, QUESTIONS} from "./EligibilityUtils";
import EligibilityQuestion from "./eligibilityQuestion/EligibilityQuestion";
import {gsap} from "gsap";
import Button, {ButtonStyle} from "../button/Button";
import ButtonPicto, {ButtonPictoStyle} from "../buttonPicto/ButtonPicto";

interface IProps {
  className?: string,
  show: boolean,
  onClose?: () => void,
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

  const refs = useRef([]);
  const test = useRef();


  const calcEligibility = () =>  {
    if(responses.filter(value => value.correct == EligibilityResponseType.FORBIDDEN).length >= 1)
      setProgression(EligibilityProgression.SUBMITTED_FORBIDDEN);
    else if(responses.filter(value => value.correct == EligibilityResponseType.OK).length >= responses.length)
      setProgression(EligibilityProgression.SUBMITTED_OK);
    else
      setProgression(EligibilityProgression.SUBMITTED_TIP);
  }

  useEffect(() => {
    gsap.to(test.current,  {autoAlpha: 0, duration: 0});
    refs.current.forEach((value, i) => {
      if(i !== 0)
        gsap.to(value, {x: "100vw"});
    })
  }, []);

  useEffect(() => {
    if(props.show)
      gsap.to(test.current,  {autoAlpha: 1});
    else
      gsap.to(test.current,  {autoAlpha: 0});
  }, [props.show]);

  useEffect(() => {
    calcEligibility();
    refs.current.forEach((value, i) => {
      if(i > questionIndex)
        gsap.to(value, {x: "100vw"});
      else
        gsap.to(value, {x: "0%"});
    })
  }, [questionIndex]);

  return (<div ref={test} style={{opacity: 0}} className={merge([css.root, props.className])}>
    <ButtonPicto className={css.close} disabled={false} picto={ButtonPictoStyle.CROSS} onClick={props.onClose}/>
    <div ref={el => refs.current[0] = el} className={merge([css.frame, css.frameCenter])}>
      <div className={css.content}>
        <img src={"/public/da/test-icon.png"} />
        <h2>Peux-tu partir à Taïwan ?</h2>
      </div>
      <hr/>
      <div className={css.buttonMargin}>
        <Button onClick={() => {
          setQuestionIndex(1);
        }} style={ButtonStyle.PATTERN} label={"Faire le test"}/>
      </div>
    </div>
    {QUESTIONS.map((value, key) => {
      return (<div className={css.frame}
                   key={key}
                   ref={el => refs.current[key + 1] = el} >
          <EligibilityQuestion
              max={ QUESTIONS.length}
              index={key + 1}
              onNext={() => {
                setQuestionIndex(key + 2)
              }}
              onPrevious={() => {
                setQuestionIndex(key)
              }}
              key={key}
              onSelectResponse={(resp) => {
                responses[key] = resp;
              }}
              question={value}/>
        </div>)
    })}

    <div ref={el => refs.current[QUESTIONS.length + 1] = el} className={merge([css.frame, css.frameCenter])}>
      <div className={css.content}>
        <img src={"/public/da/test-icon.png"} />
        {progression == EligibilityProgression.SUBMITTED_OK && (<h2 className={css.mb}>Vous remplissez tous les critères pour partir.</h2>)}
        {progression == EligibilityProgression.SUBMITTED_TIP && (<h2 className={css.mb}>Vous remplissez presque tous les critères pour partir.</h2>)}
        {progression == EligibilityProgression.SUBMITTED_FORBIDDEN && (<h2 className={css.mb}>Malheureusement, il est impossible pour vous de faire un PVT à Taiwan.</h2>)}
        {progression == EligibilityProgression.SUBMITTED_TIP && responses.filter(value => value.correct == EligibilityResponseType.TIP).map((value, key) => <p key={key}>{value.tip_final}</p>)}
      </div>
    </div>

  </div>);

  return(<></>);

}

export default Eligibility
