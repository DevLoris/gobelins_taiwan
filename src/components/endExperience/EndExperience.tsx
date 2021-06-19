import css from './EndExperience.module.less';
import React, {useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import Eligibility from "../eligibility/Eligibility";
import {RaycastEvent} from "../webGlCanvas/WebGlManagerClasses/events/RaycastEvent";
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

  RaycastManager.getInstance().onInteract.add((type: RaycastInteractionType, data: Object3D) => {
    switch (data.name) {
      case "Black_car001":
        setEndExperienceStep(EndExperienceStep.ELIGIBILITY);
        break;
    }
    console.log(type, data);
  });
  return <div className={merge([css.root, props.className])}>
    <Eligibility show={step == EndExperienceStep.ELIGIBILITY}/>
  </div>
}

export default EndExperience
