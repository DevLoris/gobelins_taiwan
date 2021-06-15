import React, {useEffect, useRef, useState} from 'react';
import WebGlCanvas from "../webGlCanvas/WebGlCanvas";
import {gsap} from "gsap";
import InteractedElement from "../interactedElement/InteractedElement";
import Notebook, {NotebookPages} from "../notebook/Notebook";
import NotebookToggler from "../notebook/notebookToggler/NotebookToggler";
import PrePickupElement from "../prePickupElement/PrePickupElement";
import YouNeedElement from "../youNeedElement/YouNeedElement";
import Tutorial from "../tutorial/Tutorial";
import {getState, store, toggleOnMap, tutorial, vlogIntro, vlogOutro} from "../../store/store";
import {selectTutorial, selectUserScene} from "../../store/store_selector";
import NotebookSignal, {NOTEBOOK_SEND} from "../notebook/notebook-signal";
import {SequenceManager} from "../../mainClasses/Sequencer/SequenceManager";
import {EChapterStep} from "../../mainClasses/Sequencer/SequenceChapterStep";
import Vlog from "../vlog/Vlog";
import {TutorialState} from "../../store/state_interface_experience";

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

  const [showVlog, setShowVlog] = useState<boolean>(false);
  const [showWebGl, setShowWebgl] = useState<boolean>(false);


  useEffect(() => {
    NotebookSignal.getInstance().notebookContent.add((type, data) => {
      if(type === NOTEBOOK_SEND.TOGGLE) {
        setMenuOpen(data);
      }
    });

    // Init sequencer
    SequenceManager.instance.onStepUpdated.add(sequenceStepUpdatedHandler);
    SequenceManager.instance.init();

    return () => {
      SequenceManager.instance.onStepUpdated.remove(sequenceStepUpdatedHandler);
    }
  }, []);

  useEffect(() => {
    console.log(showVlog, showWebGl);
  }, [showVlog, showWebGl]);

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

  // -------------------–-------------------–-------------------–--------------- STEP UPDATE HANDLER

  /**
   * On sequence updated
   */
  function sequenceStepUpdatedHandler() {
    // Get current step
    const currentStep = SequenceManager.instance.getCurrentPositionInSequence()[1];

    debug("sequenceStepUpdatedHandler", SequenceManager.instance.getCurrentPositionInSequence());

    const sceneryIdentifier = SequenceManager.instance.getCurrentChapterSceneFromDiorama();
    const vlogsStates = selectUserScene(sceneryIdentifier)(getState().user_data)?.vlog;
    const sceneData = SequenceManager.instance.getCurrentSceneData();

    switch (currentStep) {
      case EChapterStep.MAP_UNLOCK:
        // Add chapter to map
        store.dispatch(toggleOnMap({bool: true, scene: sceneData.sceneId}));
        SequenceManager.instance.increment();
        break;
      case EChapterStep.TUTORIAL:
        // Load tutorial
        store.dispatch(tutorial(sceneData.tutorialState));
        break;
      case EChapterStep.INTRO_VLOG:
        // If vlog hasn't been seen yet
        if (!vlogsStates?.intro) {
          // Set vlog as viewed
          store.dispatch(vlogIntro({bool: true, scene: sceneryIdentifier}));
        } else {
          // Skip the vlog and go to the diorama
          SequenceManager.instance.increment();
          debug(SequenceManager.instance.getCurrentPositionInSequence());
        }
        break;
      case EChapterStep.OUTRO_VLOG:
        // If vlog hasn't been seen yet
        if (!vlogsStates?.outro) {
          // Set vlog as viewed
          store.dispatch(vlogOutro({bool: true, scene: sceneryIdentifier}));
        } else {
          // Skip the vlog and increment the game
          SequenceManager.instance.increment();
          debug(SequenceManager.instance.getCurrentPositionInSequence());
        }
        break;
      default:
        break;
    }
    switchTo(EChapterStep[currentStep]);
  }

  function switchTo(step: EChapterStep) {
    console.log(step);

    setShowVlog(false);
    setShowWebgl(false);

    gsap.delayedCall(.1, () => {
      [EChapterStep.OUTRO_VLOG, EChapterStep.INTRO_VLOG].includes(step) ? setShowVlog(true) : setShowWebgl(true);
    });
  }

  // -------------------–-------------------–-------------------–--------------- RENDER

  return <div ref={rootRef}>
    {
      showWebGl &&
          <>
            <InteractedElement/>
            {![TutorialState.DISABLED, TutorialState.BEFORE_MAP].includes(selectTutorial(getState())) && (
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
          </>
    }
    {
      showVlog && <Vlog videoId={SequenceManager.instance.getCurrentVideoId()}/>
    }
  </div>
}

export default GameContainer
