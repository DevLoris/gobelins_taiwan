import css from './Tutorial.module.less';
import React, {useEffect, useRef, useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import Button, {ButtonStyle} from "../button/Button";
import {useTranslation} from "react-i18next";
import {gsap} from "gsap";
import {store, tutorial} from "../../store/store";

interface IProps {
  className?: string
}

/**
 * @name Tutorial
 */
function Tutorial (props: IProps) {
  const  { t }  = useTranslation();
  const [step, setStep] = useState<number>(0);

  // refs
  const tutorialElement =  useRef();
  const notebookTutorial = useRef();
  const popupTutorial = useRef();
  const popupTutorialResolve = useRef();
  const popupTutorialMove = useRef();

  useEffect(() => {
    setStep(0);
  }, [])

  /**
   * animation des morceaux du tutorial
   */
  useEffect(() =>  {
    if(step == 0) {
      gsap.fromTo(popupTutorial.current, {autoAlpha:  0}, {autoAlpha: 1});
      gsap.to(notebookTutorial.current, {autoAlpha:  0, duration: 0});
      gsap.to(popupTutorialMove.current, {left:  -300, autoAlpha: 0, duration: 0});
    }
    else if(step == 1)  {
      gsap.fromTo(popupTutorialMove.current, {left:  -300, autoAlpha: 0}, {left: "50%", autoAlpha: 1});
    }
    else if(step == 2)  {
      gsap.to(popupTutorialMove.current, {left:  "100%", autoAlpha: 0});
      gsap.to(popupTutorialResolve.current, {left:  "100%", autoAlpha: 0});
      gsap.to(notebookTutorial.current, {autoAlpha:  1});
      gsap.to(popupTutorial.current, {autoAlpha: 0});
    }
    else if(step == 3) {
      gsap.to(tutorialElement.current, {autoAlpha: 0, onComplete: () => {
          // @ts-ignore
          //tutorialElement.current !== undefined && tutorialElement.current.remove();
          store.dispatch(tutorial(true));
      }})
    }
  }, [step]);

  return <div ref={tutorialElement} className={merge([css.root, props.className])}>
    <div ref={popupTutorial} className={css.blue}>
      <div className={"popupList"}>
        <div ref={popupTutorialResolve} className={"popup"}>
          <p className={"bigger"}>{t('onboard__resolve')}</p>
          <div className={"buttonGroup"}>
            <Button onClick={() => {
              setStep(1);
            }} style={ButtonStyle.PATTERN} label={t('onboard__resolve__button')}/>
          </div>
        </div>
        <div ref={popupTutorialMove} className={"popup"}>
          <p className={"center"}>{t('onboard__move')}</p>
          <div className={css.tutorialIconList}>
            <img src={"/public/da/icons/move.png"} alt={"Move"} className={css.tutorialIcon}/>
            <img src={"/public/da/icons/scale.png"} alt={"Scale"} className={css.tutorialIcon}/>
          </div>
          <div className={"buttonGroup"}>
            <Button onClick={() => {
              setStep(2);
            }} style={ButtonStyle.PATTERN} label={t('onboard__move__button')}/>
          </div>
        </div>
      </div>
    </div>
    <div ref={notebookTutorial} onClick={() => {  setStep(3); }} style={{opacity:0}} className={css.tutorialGradient}>
      <div className={css.content}>
        <p>{t('onboard__notebook')}</p>
      </div>
    </div>
  </div>
}

export default Tutorial
