import css from './EndExperience.module.less';
import React, {useEffect, useRef, useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import Eligibility from "../eligibility/Eligibility";
import RaycastManager, {RaycastInteractionType} from "../webGlCanvas/WebGlManagerClasses/events/RaycastManager";
import {Object3D} from "three";
import Button, {ButtonStyle} from "../button/Button";
import {gsap} from "gsap";
import ButtonPicto, {ButtonPictoStyle} from "../buttonPicto/ButtonPicto";

interface IProps {
  className?: string
}

enum EndExperienceStep {
  ELIGIBILITY,
  PVTISTES_NET,
  VLOGGERS,
  SHARE,
}

const componentName = "EndExperience";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name EndExperience
 */
function EndExperience (props: IProps) {
  const [step, setEndExperienceStep] = useState<EndExperienceStep>(null);

  const pvtisteRef = useRef();

  useEffect(() =>{
    RaycastManager.getInstance().onInteract.add((type: RaycastInteractionType, data: Object3D) => {
      if(data !== undefined && data.userData && data instanceof Object3D) {
        if (type == RaycastInteractionType.ITEMS) {
          switch (data.userData.name) {
            case "test":
              setEndExperienceStep(EndExperienceStep.ELIGIBILITY);
              break;
            case "pvtiste":
              setEndExperienceStep(EndExperienceStep.PVTISTES_NET);
              break;
            case "vlog":
              setEndExperienceStep(EndExperienceStep.PVTISTES_NET);
              break;
            case "share": {
              if (window.navigator.share) {
                window.navigator.share({
                  title: 'Départ pour Taïwan',
                  text: '« Départ pour Taïwan » est une expérience interactive et ludique présentant le visa vacances travail appliqué à Taïwan. Un pays méconnu à la croisée de la culture chinoise, japonaise et américaine d’une richesse insoupçonnée pour sa taille.',
                  url: 'https://taiwan.lorispinna.com',
                }).then(value => {
                });
                break;
              }
            }
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    if(step == EndExperienceStep.PVTISTES_NET) {
      gsap.to(pvtisteRef.current, {autoAlpha: 1});
    }
    else
      gsap.to(pvtisteRef.current, {autoAlpha:0 });
  }, [step])

  return <div className={merge([css.root, props.className])}>
    <Eligibility show={step == EndExperienceStep.ELIGIBILITY} onClose={()  => setEndExperienceStep(null) }/>
    <div style={{opacity: 0, visibility: "hidden"}} ref={pvtisteRef} className={'popup popup-big-padding'}>
      <ButtonPicto disabled={false} picto={ButtonPictoStyle.CROSS} onClick={()  => setEndExperienceStep(null)}/>
      <p className={''}>Vous allez être redirigé vers le site PVTistes.net</p>
      <div className={"buttonGroup"}>
        <Button onClick={() => {
          window.open('https://pvtistes.net/le-pvt/taiwan/', '_blank').focus();
        }} label={"Let's go"} style={ButtonStyle.PATTERN}/>
      </div>
    </div>
  </div>
}

export default EndExperience
