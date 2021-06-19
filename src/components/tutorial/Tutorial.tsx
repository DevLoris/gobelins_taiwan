import css from './Tutorial.module.less';
import React, {useEffect, useRef, useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import Button, {ButtonStyle} from "../button/Button";
import {useTranslation} from "react-i18next";
import {gsap} from "gsap";
import {getState, store, tutorial} from "../../store/store";
import {selectTutorial} from "../../store/store_selector";
import {TutorialState} from "../../store/state_interface_experience";

interface IProps {
  className?: string
}

/**
 * @name Tutorial
 */
function Tutorial (props: IProps) {
  switch (selectTutorial(getState())) {
    case TutorialState.INTRODUCTION:
      let t = useTranslation().t;
      let [step, setStep] = useState<number>(0);

      // refs
      useEffect(() => {
        setStep(0);
      }, []);


      const tutorialElement = useRef();
      const notebookTutorial = useRef();
      const popupTutorial = useRef();
      const popupTutorialResolve = useRef();
      const popupTutorialPins = useRef();
      const popupTutorialMove = useRef();

      /**
       * animation des morceaux du tutorial
       */
      useEffect(() => {
        console.log(step);
        if (step == 0) {
          gsap.fromTo(popupTutorial.current, {autoAlpha: 0}, {autoAlpha: 1});
          gsap.to(notebookTutorial.current, {autoAlpha: 0, duration: 0});
          gsap.to(popupTutorialMove.current, {left: -300, autoAlpha: 0, duration: 0});
          gsap.to(popupTutorialPins.current, {left: -300, autoAlpha: 0, duration: 0});
        } else if (step == 1) {
          gsap.fromTo(popupTutorialPins.current, {left: -300, autoAlpha: 0}, {left: "50%", autoAlpha: 1});
        } else if (step == 2) {
          gsap.fromTo(popupTutorialMove.current, {left: -300, autoAlpha: 0}, {left: "50%", autoAlpha: 1});
        } else if (step == 3) {
          gsap.to(popupTutorialMove.current, {left: "100%", autoAlpha: 0});
          gsap.to(popupTutorialPins.current, {left: "100%", autoAlpha: 0});
          gsap.to(popupTutorialResolve.current, {left: "100%", autoAlpha: 0});
          gsap.to(notebookTutorial.current, {autoAlpha: 1});
          gsap.to(popupTutorial.current, {autoAlpha: 0});
        } else if (step == 4) {
          gsap.to(tutorialElement.current, {
            autoAlpha: 0, onComplete: () => {
              store.dispatch(tutorial(TutorialState.BEFORE_MAP));
            }
          })
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
            <div ref={popupTutorialPins} className={"popup"}>
              <p className={"bigger"}>{t('onboard__pins')}</p>
              <div className={"buttonGroup"}>
                <Button onClick={() => {
                  setStep(2);
                }} style={ButtonStyle.PATTERN} label={t('onboard__pins__button')}/>
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
                  setStep(3);
                }} style={ButtonStyle.PATTERN} label={t('onboard__move__button')}/>
              </div>
            </div>
          </div>
        </div>
        <div ref={notebookTutorial} onClick={() => {
          setStep(4);
        }} style={{opacity: 0}} className={css.tutorialGradient}>
          <div className={css.content}>
            <p>{t('onboard__notebook')}</p>
            <svg   width="19.08" height="10.268" viewBox="0 0 19.08 10.268">
              <path d="M16.576,5.86,13.422,9.013l-.034.037a.644.644,0,0,0-.061.08.765.765,0,0,0,.3,1.066.728.728,0,0,0,.241.067.538.538,0,0,0,.15,0,.784.784,0,0,0,.369-.145.8.8,0,0,0,.076-.066l4.407-4.407a.809.809,0,0,0,.066-.076.752.752,0,0,0,0-.888.808.808,0,0,0-.066-.076L14.461.2a.8.8,0,0,0-.076-.066.761.761,0,0,0-1.168.461.743.743,0,0,0,.138.568.721.721,0,0,0,.066.076L16.576,4.39H.718a1.553,1.553,0,0,0-.175.021A.755.755,0,0,0,.231,5.675a.734.734,0,0,0,.312.164,1.553,1.553,0,0,0,.175.021Z" fill="#fff"/>
            </svg>

          </div>
        </div>
      </div>;
    case TutorialState.MAP:
      let translate = useTranslation().t;
      let [mapStep, setMapStep] = useState<number>(0);

      // refs
      useEffect(() => {
        setMapStep(0);
      }, []);


      const tutorialMapElement = useRef();
      const popupTutorialMap = useRef();

      useEffect(() => {
        if (mapStep == 0) {
          gsap.fromTo(tutorialMapElement.current, {autoAlpha: 0}, {autoAlpha: 1});
        } else if (mapStep == 1) {
          gsap.to(tutorialMapElement.current, {
            autoAlpha: 0, onComplete: () => {
              store.dispatch(tutorial(TutorialState.DISABLED));
            }
          })
        }
      }, [step]);

      return <div ref={tutorialMapElement} className={merge([css.root, props.className])}>
        <div ref={popupTutorialMap} className={css.blue}>
            <div className={"popup popup_big"}>
              <img src={"public/da/compass.svg"} alt={"compass"} className={css.compass}/>
              <div className={"popup-big-text"}  dangerouslySetInnerHTML={{__html: translate('onboard__map')}}/>
                <Button onClick={() => {
                  setMapStep(1);
                }} style={ButtonStyle.PATTERN} label={translate('onboard__map__button')}/>
          </div>
        </div>
      </div>;
    default:
      return (<></>);
  }
}

export default Tutorial
