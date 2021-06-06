import css from './GameContainer.module.less';
import React, {useEffect, useRef, useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import WebGlCanvas from "../webGlCanvas/WebGlCanvas";
import {gsap} from "gsap";
import InteractedElement from "../interactedElement/InteractedElement";
import Notebook, {NotebookPages} from "../notebook/Notebook";
import NotebookToggler from "../notebook/notebookToggler/NotebookToggler";
import {bool} from "prop-types";
import PrePickupElement from "../prePickupElement/PrePickupElement";
import YouNeedElement from "../youNeedElement/YouNeedElement";
import {WebGlManager} from "../webGlCanvas/WebGlManagerClasses/WebGlManager";
import Tutorial from "../tutorial/Tutorial";
import {getState} from "../../store/store";
import {selectTutorial} from "../../store/store_selector";
import NotebookSignal, {NOTEBOOK_SEND} from "../notebook/notebook-signal";

interface IProps {
  className?: string
  show: boolean
}

GameContainer.defaultProps = {
  show: true
}

const componentName = "GameContainer";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name GameContainer
 */
function GameContainer (props: IProps) {

  const rootRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  NotebookSignal.getInstance().notebookContent.add((type, data) => {
    if(type === NOTEBOOK_SEND.TOGGLE)
      setMenuOpen(data);
  })

  /**
   * On show prop update
   */
  useEffect(() => {
    props.show && componentReveal(props.show);
  }, [props.show]);

  // -------------------–-------------------–-------------------–--------------- ANIMATION

  /**
   * Play in / out animation
   * @param pShow
   * @param pDuration
   */
  function componentReveal(pShow, pDuration = 1) {
    gsap.to(rootRef.current, {
      duration: pDuration,
      autoAlpha: pShow ? 1 : 0
    });
  }

  return <div ref={rootRef}>
    <InteractedElement/>
    {!selectTutorial(getState()) && (
        <Tutorial/>
    )}
    <Notebook show={menuOpen} onClose={() => {
      setMenuOpen(false);
    }}/>
    <NotebookToggler onClick={() => {
      setMenuOpen(!menuOpen);
      if(!menuOpen)
        NotebookSignal.getInstance().sendToNotebook(NOTEBOOK_SEND.PAGE, NotebookPages.HINT);
    }} />
    <PrePickupElement/>
    <YouNeedElement/>
    <WebGlCanvas />
  </div>
}

export default GameContainer
