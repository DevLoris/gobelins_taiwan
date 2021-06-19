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


  const calcEligibility = () =>  {
    if(responses.filter(value => value.correct == EligibilityResponseType.FORBIDDEN).length >= 1)
      setProgression(EligibilityProgression.SUBMITTED_FORBIDDEN);
    else if(responses.filter(value => value.correct == EligibilityResponseType.OK).length >= responses.length)
      setProgression(EligibilityProgression.SUBMITTED_OK);
    else
      setProgression(EligibilityProgression.SUBMITTED_TIP);
  }

  useEffect(() => {
    refs.current.forEach((value, i) => {
      if(i !== 0)
        gsap.to(value, {x: "100vw"});
    })
  }, []);

  useEffect(() => {
    calcEligibility();
    refs.current.forEach((value, i) => {
      if(i > questionIndex)
        gsap.to(value, {x: "100vw"});
      else
        gsap.to(value, {x: "0%"});
    })
  }, [questionIndex]);

  return (<div className={merge([css.root, props.className])}>
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
        {progression == EligibilityProgression.SUBMITTED_OK && (<h2>Vous remplissez tous les critères pour partir.</h2>)}
        {progression == EligibilityProgression.SUBMITTED_TIP && (<h2>Vous remplissez presque tous les critères pour partir.</h2>)}
        {progression == EligibilityProgression.SUBMITTED_FORBIDDEN && (<h2>Malheureusement, il est impossible pour vous de faire un PVT à Taiwan.</h2>)}
      </div>
    </div>

    <svg className={css.svg}>
      <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
        <path
            d="M0.003,0.002 L0.014,0 L0.026,0.001,0.039,0,0.051,0,0.064,0,0.076,0.002,0.089,0.001,0.101,0,0.114,0.001,0.126,0.002,0.139,0.001,0.151,0.001,0.164,0.001,0.176,0,0.188,0.002,0.201,0.001,0.213,0,0.226,0.002,0.238,0.002,0.251,0.002,0.263,0,0.276,0.001,0.288,0,0.301,0.001,0.313,0.001,0.325,0.001,0.338,0.001,0.35,0,0.363,0.002,0.375,0,0.388,0,0.4,0,0.413,0.001,0.425,0.002,0.438,0,0.45,0.001,0.463,0.001,0.475,0.002,0.487,0.002,0.5,0.002,0.512,0.001,0.525,0.002,0.537,0,0.55,0.002,0.562,0.002,0.575,0.001,0.587,0.002,0.6,0,0.612,0.001,0.625,0,0.637,0.002,0.649,0.001,0.662,0,0.674,0.001,0.687,0,0.699,0.001,0.712,0.001,0.724,0.002,0.737,0.001,0.749,0.001,0.762,0.001,0.774,0.001,0.786,0.002,0.799,0,0.811,0.001,0.824,0,0.836,0.002,0.849,0.001,0.861,0.002,0.874,0.001 H0.886 L0.899,0.001,0.911,0,0.924,0.001,0.936,0.001,0.948,0,0.961,0.001,0.973,0,0.986,0.001,0.998,0.001,0.998,0.01,1,0.02,0.998,0.029,0.997,0.038,0.999,0.047 V0.057 L0.998,0.066,0.999,0.075,0.998,0.084,0.999,0.093,0.997,0.103,0.999,0.112,1,0.121,0.999,0.13,0.997,0.14,0.998,0.149,0.999,0.158,0.998,0.167,0.999,0.177,0.998,0.186,0.998,0.195,1,0.204,0.997,0.213,0.997,0.223,0.997,0.232,0.997,0.241,0.998,0.25,0.997,0.26,0.999,0.269,0.998,0.278,1,0.287,0.998,0.297,0.998,0.306,0.997,0.315,1,0.324,0.999,0.334,1,0.343,0.999,0.352,0.998,0.361,0.998,0.37,0.997,0.38,0.998,0.389,0.999,0.398,1,0.407,0.997,0.417,0.998,0.426,0.997,0.435,0.998,0.444,0.999,0.454,1,0.463,0.999,0.472,0.997,0.481,0.998,0.491,0.997,0.5,0.999,0.509,0.997,0.518,0.998,0.528,0.999,0.537,0.997,0.546,0.999,0.555,0.999,0.564,1,0.574,0.998,0.583,0.998,0.592,0.999,0.601,1,0.611,0.999,0.62,0.998,0.629,0.997,0.638,0.998,0.648,0.999,0.657,0.999,0.666,0.998,0.675,1,0.685,0.999,0.694,0.999,0.703,0.998,0.712,0.998,0.721,0.999,0.731,0.998,0.74,0.999,0.749,1,0.758,1,0.768,0.999,0.777,0.998,0.786,0.999,0.795,0.998,0.805,0.998,0.814,0.999,0.823,1,0.832,0.999,0.842,0.998,0.851,0.998,0.86,0.998,0.869,1,0.879,0.998,0.888,0.997,0.897,0.998,0.906,0.999,0.916,0.999,0.925,0.998,0.934,0.999,0.943,0.999,0.953,0.998,0.962,0.999,0.971,0.997,0.98,0.998,0.99,0.998,0.998,0.986,0.999,0.974,0.998,0.961,0.998,0.949,1,0.936,0.998,0.924,0.998,0.911,0.998,0.899,0.999,0.886,0.999,0.874,0.998,0.861,0.998,0.849,1,0.836,0.999,0.824,1,0.812,0.998,0.799,0.999,0.787,0.999,0.774,0.998,0.762,1,0.749,1,0.737,1,0.724,0.998,0.712,1,0.699,1,0.687,0.998,0.674,0.998,0.662,0.998,0.65,0.999,0.637,0.998,0.625,0.998 H0.612 L0.6,0.998,0.587,1,0.575,0.998,0.562,0.998,0.55,0.999,0.537,0.999,0.525,0.999,0.513,0.999,0.5,0.998,0.488,0.998,0.475,0.998,0.463,1,0.45,0.998,0.438,0.999,0.425,1,0.413,0.998,0.4,0.998,0.388,0.999,0.375,1,0.363,0.999 H0.351 L0.338,0.998,0.326,1,0.313,0.998,0.301,0.998,0.288,0.999,0.276,1,0.263,0.998,0.251,0.998,0.238,0.998,0.226,1,0.213,0.999,0.201,1,0.189,0.999,0.176,0.999,0.164,1,0.151,0.998,0.139,1,0.126,0.999,0.114,0.998,0.101,0.999,0.089,0.998,0.076,0.999,0.064,0.998,0.051,1,0.039,0.999,0.027,0.999,0.014,1,0.001,1,0.003,0.99,0.001,0.98,0.001,0.971,0.001,0.962,0.001,0.953,0.002,0.943,0.003,0.934,0.003,0.925,0,0.916,0.002,0.907,0.001,0.897,0.001,0.888,0.001,0.879,0.001,0.87,0.002,0.86,0.003,0.851,0.002,0.842,0.001,0.833,0.003,0.823,0,0.814,0.001,0.805,0.001,0.796,0.003,0.787,0.001,0.777,0.001,0.768,0.001,0.759,0.002,0.75,0.002,0.74,0.001,0.731,0,0.722,0,0.713,0.001,0.703,0.001,0.694,0.001,0.685 V0.676 L0.002,0.666,0,0.657,0.001,0.648,0.002,0.639,0,0.629,0.001,0.62,0.003,0.611,0.001,0.602,0,0.593,0.002,0.583,0.001,0.574,0.001,0.565,0.002,0.556,0,0.546,0,0.537,0.002,0.528,0.001,0.519,0.002,0.509,0.001,0.5,0.002,0.491,0.002,0.482,0.003,0.472,0.003,0.463,0.002,0.454,0.002,0.445,0.002,0.436,0.001,0.426,0.002,0.417,0.002,0.408,0,0.399,0.002,0.389,0,0.38,0,0.371,0.001,0.362,0.001,0.352,0.001,0.343,0.001,0.334,0.002,0.325,0.001,0.315,0.001,0.306,0.002,0.297,0,0.288,0.002,0.279,0.001,0.269,0.001,0.26,0.002,0.251 V0.242 L0,0.232 L0.002,0.223,0.002,0.214,0,0.205,0.003,0.195,0,0.186,0.001,0.177,0.002,0.168,0.003,0.158,0.002,0.149,0.002,0.14,0.002,0.131,0.002,0.121,0.002,0.112,0,0.103,0.002,0.094,0.001,0.084,0.002,0.075,0.003,0.066,0.001,0.057,0.003,0.047,0.001,0.038,0.003,0.029,0.001,0.02,0.001,0.01 L0.003,0.002"></path>
      </clipPath>
    </svg>
  </div>);

  return(<></>);

}

export default Eligibility
