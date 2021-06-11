import css from './PrePickupElement.module.less';
import React, {useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {IStateDataCollectible} from "../../store/state_interface_data";
import RaycastManager from "../webGlCanvas/WebGlManagerClasses/events/RaycastManager";
import {IStateDataSceneCollectibleType} from "../../store/state_enums";

interface IProps {
  className?: string
}

/**
 * @name PrePickupElement
 * @desc Overlay en haut à gauche de l'écran permettant d'afficher l'élément récupéré
 */
function PrePickupElement (props: IProps) {
  const [showed, toggleShowed] = useState<boolean>(false);
  const [hasPickup, toggleHasPickup] = useState<boolean>(false);
  const [collectible, setCollectible] =  useState<IStateDataCollectible>(null);

  RaycastManager.getInstance().onInteract.add((value: IStateDataCollectible, hasPickupPayload = false) => {
    // On affiche si on clique sur un PRE_PICKUP sinon ignoré ici
    if([IStateDataSceneCollectibleType.PRE_PICKUP].includes(value.type)) {
        setCollectible(value);
        toggleHasPickup(hasPickupPayload);
        toggleShowed(true);
    }
  });

  if(!showed)
    return (<></>);

  return <div className={merge([css.root, props.className])}>
      <img src={collectible.asset} /><span>{ (hasPickup ? 'Ramassé': 'A trouver') }</span>
  </div>
}

export default PrePickupElement
