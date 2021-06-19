import css from './TooltipMessage.module.less';
import React, {useEffect, useRef, useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import {IStateDataSceneCollectibleType, SceneDataAutoMessageMoment} from "../../store/state_enums";
import {selectCollectiblesOfSceneWithPickup, selectScene, selectUserActiveScene} from "../../store/store_selector";
import {getState} from "../../store/store";
import {IStateDataCollectible, IStateDataScene} from "../../store/state_interface_data";
import {gsap}from "gsap";
import RaycastManager from "../webGlCanvas/WebGlManagerClasses/events/RaycastManager";
import {WebGlManager} from "../webGlCanvas/WebGlManagerClasses/WebGlManager";

interface IProps {
  className?: string,
  scene?: string
}

const componentName = "TooltipMessage";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name TooltipMessage
 */
function TooltipMessage (props: IProps) {
  const [message, setMessage] = useState<string>(null);
  const [messageType, setMessageType] = useState<SceneDataAutoMessageMoment>(SceneDataAutoMessageMoment.BEFORE_PRE_PICKUP);
  const [scene, setScene] = useState<IStateDataScene>(null);

  const ref  = useRef();

  let messagesTimer:gsap.core.Tween[] = [];

  function update() {
    let userScene = selectUserActiveScene(getState());
    let sceneData = selectScene(userScene)(getState().data);

    if(sceneData !== null) {
      setScene(sceneData);

      const collectibles = selectCollectiblesOfSceneWithPickup(userScene)(getState().data, getState().user_data);
      const pre_pickup = collectibles.find(value => {
        return value.type == IStateDataSceneCollectibleType.PRE_PICKUP;
      });
      const pickup = collectibles.find(value => {
        return value.type == IStateDataSceneCollectibleType.PICKUP;
      });

      if (pickup !== undefined && pickup.pickup)
        setMessageType(SceneDataAutoMessageMoment.AFTER_PICKUP)
      else if (pre_pickup !== undefined &&  pre_pickup.pickup)
        setMessageType(SceneDataAutoMessageMoment.AFTER_PRE_PICKUP)
      else
        setMessageType(SceneDataAutoMessageMoment.BEFORE_PRE_PICKUP);


      messagesTimer.forEach(value => value.kill());
      messagesTimer = [];

      sceneData.messages.forEach(value => {
        if (value.moment == messageType) {
          messagesTimer.push(gsap.delayedCall(value.delay, () => setMessage(value.message)))
          messagesTimer.push(gsap.delayedCall(value.delay + 10, () => setMessage(null)))
        }
      });
    }
  }



  useEffect(() => {
    update();
    RaycastManager.getInstance().onInteract.add((value: IStateDataCollectible) => {
      if([IStateDataSceneCollectibleType.PRE_PICKUP, IStateDataSceneCollectibleType.PICKUP].includes(value.type)) {
        update();
      }
    });

    WebGlManager.getInstance().onChangeScenery.add((value: string) => {
      setScene(selectScene(value)(getState().data));
      update();
    });
  }, []);

  useEffect(() => {
    if(message == null)
      gsap.to(ref.current, {autoAlpha: 0});
    else
      gsap.to(ref.current, {autoAlpha: 1});
  }, [message]);

  return <div ref={ref} onClick={() => { gsap.to(ref.current, {autoAlpha: 0}); }} className={merge([css.root, props.className])}>
    <div className={css.content}>
      <p>{message}</p>
    </div>
  </div>
}

export default TooltipMessage
