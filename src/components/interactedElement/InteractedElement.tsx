import css from './InteractedElement.module.less';
import React, {useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import RaycastManager from "../webGlCanvas/WebGlManagerClasses/events/RaycastManager";
import {IStateDataCollectible} from "../../store/state_interface_data";
import FocusUtils from "../webGlCanvas/WebGlManagerClasses/scenery/FocusUtils";
import {IStateDataSceneCollectibleType} from "../../store/state_enums";
import {gsap} from "gsap";
import {SequenceManager} from "../../mainClasses/Sequencer/SequenceManager";
import Button, {ButtonStyle} from "../button/Button";

interface IProps {
  className?: string
}

const componentName = "InteractedElement";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name InteractedElement
 */
function InteractedElement (props: IProps) {
  const [showed, toggleShowed] = useState(false);
  const [collectible, setCollectible] = useState<IStateDataCollectible>(null);

  const [isPickup, setIsPickup] = useState(false);

  RaycastManager.getInstance().onInteract.add((value: IStateDataCollectible) => {
    debug("value", value)
    // On affiche si on clique sur un HINT sinon ignoré ici
    if([IStateDataSceneCollectibleType.HINT, IStateDataSceneCollectibleType.PICKUP].includes(value.type)) {
      setTimeout(() => {
        setCollectible(value);
        toggleShowed(true);
        setIsPickup(true);
      }, 2000);
    }
  });

  if(showed) {
    return <div className={merge([css.root, props.className])}>
      <button onClick={() => {
        toggleShowed(false);
        FocusUtils.restore();
        if(isPickup) {
          // Using gsap.delayedcall because it uses animation frame
          gsap.delayedCall(2, () => {
            SequenceManager.instance.increment();
          });
        }
      }}>
        <img src={"/public/da/close.png"} alt={"Close"}/>
      </button>

      <div className={css.picture}>
        <img src={collectible.asset} alt={"Asset"}/>
        <img src={collectible.stamp} alt={"Stamp"}/>
      </div>

      <div className={css.contentBlock}>
        <h1>{ collectible.name }</h1>
        <p>{ collectible.text }</p>
        <Button onClick={() => {}} style={ButtonStyle.DEFAULT} label={"En apprendre plus"}></Button>
      </div>

    </div>
  }
  else {
    return <></>
  }
}

export default InteractedElement
