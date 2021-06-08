import css from "./HomePage.module.less";
import React, {useRef, useState} from "react";
import { usePageRegister } from "../../lib/router/usePageRegister";
import WebGlCanvas from "../../components/webGlCanvas/WebGlCanvas";
import Loader from "../../components/loader/Loader";
import InteractedElement from "../../components/interactedElement/InteractedElement";
import GameContainer from "../../components/gameContainer/GameContainer";
import HomeSplash from "../../components/homeSplash/HomeSplash";
import {SequenceManager} from "../../mainClasses/Sequencer/SequenceManager";

interface IProps {}

const componentName = "HomePage";
const debug = require("debug")(`front:${componentName}`);


enum PLAYING_STATE {
  HOME,
  LOADING,
  GAME
}

/**
 * @name HomePage
 */
const HomePage = (props: IProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const [playingState, setPlayingState] = useState<PLAYING_STATE>(PLAYING_STATE.HOME);


  // -------------------–-------------------–-------------------–--------------- REGISTER PAGE

  /**
   * playIn page transition
   * (remove this example if not use)
   */
  const playIn = (): Promise<void> => {
    return Promise.resolve();
  };

  /**
   * playOut page transition
   * (remove this example if not use)
   */
  const playOut = (): Promise<void> => {
    return Promise.resolve();
  };

  /**
   * Register page for ViewStack
   * NOTE: each page of ViewStack need to be register to work.
   * Minimal register should be: usePageRegister({ componentName, rootRef });
   * (remove playIn and playOut if not use)
   */
  usePageRegister({ componentName, rootRef, playIn, playOut });

  function onModelsLoaded() {
    SequenceManager.instance.init();
    setPlayingState(PLAYING_STATE.GAME);
  }

  // -------------------–-------------------–-------------------–--------------- RENDER

  return (
    <div className={css.root} ref={rootRef}>
      {playingState == PLAYING_STATE.HOME && (
          <HomeSplash startCallback={() =>  {
            setPlayingState(PLAYING_STATE.LOADING);
          }}/>
      )}
      {playingState == PLAYING_STATE.LOADING && (
          <Loader modelsLoadedCallback={onModelsLoaded} />
      )}
      {playingState == PLAYING_STATE.GAME && (
          <GameContainer show={true} />
      )}
    </div>
  );
}

export default HomePage;
