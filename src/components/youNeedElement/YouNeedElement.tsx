import css from './YouNeedElement.module.less';
import React, {useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import {IStateDataCollectible} from "../../store/state_interface_data";
import RaycastManager from "../webGlCanvas/WebGlManagerClasses/events/RaycastManager";
import {IStateDataSceneCollectibleType} from "../../store/state_enums";
import FocusUtils from "../webGlCanvas/WebGlManagerClasses/scenery/FocusUtils";
import Button, {ButtonStyle} from "../button/Button";

interface IProps {
  className?: string
}

/**
 * @name YouNeedElement
 * @desc Petite popup permettant d'indiquer l'élément à pickup
 */
function YouNeedElement (props: IProps) {
  const [showed, toggleShowed] = useState<boolean>(false);
  const [collectible, setCollectible] =  useState<IStateDataCollectible>(null);

  RaycastManager.getInstance().onInteract.add((value: IStateDataCollectible, hasPickupPayload = false) => {
    // On affiche si on clique sur un PRE_PICKUP sinon ignoré ici
    if([IStateDataSceneCollectibleType.PRE_PICKUP].includes(value.type) && !hasPickupPayload) {
      setCollectible(value);
      toggleShowed(true);
    }
  });

  if(!showed)
    return (<></>);

  return <div className={merge([css.root, props.className])}>
    <div className={"popup"}>
      <img src={collectible.asset} alt={"Collectible"} />
      <Button onClick={() => {
        toggleShowed(false);
        FocusUtils.restore();
      }} style={ButtonStyle.PATTERN} label={"Je vais trouver"}/>
    </div>
  </div>
}

export default YouNeedElement
