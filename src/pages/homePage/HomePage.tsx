import css from "./HomePage.module.less";
import React, {useEffect, useRef, useState} from "react";
import {usePageRegister} from "../../lib/router/usePageRegister";
import Loader from "../../components/loader/Loader";
import GameContainer from "../../components/gameContainer/GameContainer";
import HomeSplash, {EHomeSplashMode} from "../../components/homeSplash/HomeSplash";
import {EDeviceType, EnvUtils} from "../../lib/utils/EnvUtils";

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

  const [playingState, setPlayingState] = useState<PLAYING_STATE>(PLAYING_STATE.LOADING);

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
    setPlayingState(PLAYING_STATE.HOME);
  }

  useEffect(() => {
    window.addEventListener("resize", onOrientationChange);
    onOrientationChange();
    return () => {
      window.removeEventListener("resize", onOrientationChange);
    }
  }, []);

  const [showLandscapemobileWarning, setShowLandscapemobileWarning] = useState(false);

  function onOrientationChange() {
    setShowLandscapemobileWarning(EnvUtils.getDeviceType() === EDeviceType.HANDHELD && EnvUtils.isOrientationLandscape())
  }

  // -------------------–-------------------–-------------------–--------------- RENDER

  return (
    <div className={css.root} ref={rootRef}>
      {
        // Mobile landscape = message
        showLandscapemobileWarning &&
            <div className={css.mobileLandscapeScreen}>
              <div className={css.mobileLandscapeScreenMessage}>
                Retourne ton écran pour profiter pleinement de l'expérience !
              </div>
            </div>
      }
      {
        // Desktop = message + QR code
        EnvUtils.getDeviceType() === EDeviceType.DESKTOP && <HomeSplash startCallback={null} mode={EHomeSplashMode.DESKTOP} />
      }

      {/* On mobile, enable experience */}
      {EnvUtils.getDeviceType() === EDeviceType.HANDHELD && playingState == PLAYING_STATE.HOME && (
          <HomeSplash startCallback={() =>  {
            setPlayingState(PLAYING_STATE.GAME);
          }}
          mode={EHomeSplashMode.MOBILE}/>
      )}
      {EnvUtils.getDeviceType() === EDeviceType.HANDHELD && playingState == PLAYING_STATE.LOADING && (
          <Loader modelsLoadedCallback={onModelsLoaded} />
      )}
      {EnvUtils.getDeviceType() === EDeviceType.HANDHELD && playingState == PLAYING_STATE.GAME && (
          <GameContainer show={true} />
      )}
    </div>
  );
}

export default HomePage;
