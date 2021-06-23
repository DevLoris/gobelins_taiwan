import css from './InteractedElement.module.less';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import RaycastManager, {RaycastInteractionType} from "../webGlCanvas/WebGlManagerClasses/events/RaycastManager";
import {IStateDataCollectible} from "../../store/state_interface_data";
import FocusUtils from "../webGlCanvas/WebGlManagerClasses/scenery/FocusUtils";
import {IStateDataSceneCollectibleType} from "../../store/state_enums";
import {gsap} from "gsap";
import {SequenceManager} from "../../mainClasses/Sequencer/SequenceManager";
import Button, {ButtonStyle} from "../button/Button";
import NotebookSignal, {NOTEBOOK_SEND} from "../notebook/notebook-signal";
import {NotebookPages} from "../notebook/Notebook";
import ButtonPicto, {ButtonPictoStyle} from "../buttonPicto/ButtonPicto";

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

  const showCollectibleInfoTimeout = useRef(null);

  const hintRootRef = useRef(null);

  useEffect(() => {
    RaycastManager.getInstance().onInteract.add((type: RaycastInteractionType, value: IStateDataCollectible) => {
      debug("value", value)
      // On affiche si on clique sur un HINT sinon ignoré ici
      if(type == RaycastInteractionType.ELEMENTS && [IStateDataSceneCollectibleType.HINT, IStateDataSceneCollectibleType.PICKUP].includes(value.type)) {
        showCollectibleInfoTimeout.current = setTimeout(() => {
          setCollectible(value);
          toggleShowed(true);
          setIsPickup(value.type == IStateDataSceneCollectibleType.PICKUP);
        }, 2000);
      }
    });

    // Clear timeout on unmount
    return () => {
      clearTimeout(showCollectibleInfoTimeout.current);
    }
  }, []);

  useLayoutEffect(() => {
    if(!collectible) return;
    collectible.type === IStateDataSceneCollectibleType.HINT && componentAnimation();
    collectible.type === IStateDataSceneCollectibleType.PICKUP && componentAnimation();
  }, [showed]);

  function componentAnimation(pVisible:boolean = true, pDuration:number = .7) {
    if(hintRootRef.current && collectible.type) {
      gsap.killTweensOf(hintRootRef.current);
      gsap.fromTo(hintRootRef.current, {
        yPercent: pVisible ? 110 : 0
      },{
        yPercent: pVisible ? 0 : 110,
        duration: pDuration,
        ease: "power2.easeOut",
        onComplete: () => {
          // If play out, hide component at end of animation
          !pVisible && toggleShowed(false);
        }
      });
      // If play out, start to move camera after 300ms
      if(!pVisible) {
        gsap.delayedCall(pDuration * .3, () => {
          // Set camera to previous position
          FocusUtils.restore();
        });
      }
    }
  }

  if(showed) {
    switch (collectible.type) {
      case IStateDataSceneCollectibleType.HINT: 
        return <div ref={hintRootRef} className={merge([css.root, props.className])}>
          <div className={css.close}>
            <ButtonPicto disabled={false} picto={ButtonPictoStyle.CROSS} onClick={() => {
              componentAnimation(false);
            }}/>
          </div>

          <div className={css.picture}>
            <img src={collectible.asset} alt={"Asset"}/>
            <img src={collectible.stamp} alt={"Stamp"}/>
          </div>
          <hr/>

          <div className={css.contentBlock}>
            <h1>{ collectible.name }</h1>
            <p className={'bigger'}>{ collectible.text }</p>
            <Button onClick={() => {
              NotebookSignal.getInstance().sendToNotebook(NOTEBOOK_SEND.TOGGLE, true);
              NotebookSignal.getInstance().sendToNotebook(NOTEBOOK_SEND.PAGE, NotebookPages.ELEMENTS);
              NotebookSignal.getInstance().sendToNotebook(NOTEBOOK_SEND.CONTENT, collectible);
              gsap.delayedCall(2, () => {
                toggleShowed(false);
                FocusUtils.restore();
              });
            }} style={ButtonStyle.DEFAULT} label={"En apprendre plus"}/>
          </div>
        </div>
      case IStateDataSceneCollectibleType.PICKUP:
        return <div ref={hintRootRef}  className={merge([css.rootEnigma, props.className])}>

          <div className={css.pictureEnigma}>
            <img src={collectible.vlogger.face} alt={"Face"}/>
            <img src={collectible.stamp} alt={"Stamp"}/>
            <img src={"/public/da/icons/play.svg"} alt={"PLAY VLOG"} onClick={() => {
              toggleShowed(false);
              FocusUtils.restore();
              gsap.delayedCall(2, () => {
                SequenceManager.instance.increment();
              });
            }}/>
          </div>

          <div className={css.contentBlock}>
            <div className={css.phonetic}>
              <div className={css.phoneticMandarin}>做得好</div>
              <div>
                <div className={css.phoneticTitle}>Bravo</div>
                <div className={css.phoneticText}><span>zn.</span> [Zuò dé hâo]</div>
              </div>
            </div>
            <p className={"bigger"}>{ collectible.vlogger.resolution }</p>
          </div>
        </div>
    }
  }
  return <></>
}

export default InteractedElement
