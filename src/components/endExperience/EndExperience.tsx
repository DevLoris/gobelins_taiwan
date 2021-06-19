import css from './EndExperience.module.less';
import React, {useEffect, useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import Eligibility from "../eligibility/Eligibility";
import RaycastManager, {RaycastInteractionType} from "../webGlCanvas/WebGlManagerClasses/events/RaycastManager";
import {Object3D} from "three";

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

  useEffect(() =>{
    RaycastManager.getInstance().onInteract.add((type: RaycastInteractionType, data: Object3D) => {
      if(type == RaycastInteractionType.ITEMS) {
        switch (data.name) {
          case "docs":
            setEndExperienceStep(EndExperienceStep.ELIGIBILITY);
            break;
          case "computer":
            setEndExperienceStep(EndExperienceStep.ELIGIBILITY);
            break;
          case "crayon": {
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
    });
  }, []);

  return <div className={merge([css.root, props.className])}>
    <Eligibility show={step == EndExperienceStep.ELIGIBILITY} onClose={()  => setEndExperienceStep(null) }/>
  </div>
}

export default EndExperience
