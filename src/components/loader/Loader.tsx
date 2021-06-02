import css from './Loader.module.less';
import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {AssetMemory} from "../webGlCanvas/WebGlManagerClasses/assets/AssetMemory";
import {selectAudios, selectModels} from "../../store/store_selector";
import {getState} from "../../store/store";
import {gsap} from "gsap";
import {AudioHandler} from "../../lib/audio/AudioHandler";
import LoaderSignal from "./LoaderSignal";

interface IProps {
  className?: string
  modelsLoadedCallback: () => any
}

const componentName = "Loader";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name Loader
 */
function Loader (props: IProps) {

  const rootRef = useRef(null);

  const [loading] = useState<string[]>([]);

    // -------------------–-------------------–-------------------–--------------- EFFECTS

  useEffect(() => {
      LoaderSignal.getInstance().beforeLoad.add((value: string) => {
          !loading.includes(value) && loading.push(value);
          console.log(loading);
      })

      // audio
    AudioHandler.loadAll(selectAudios(getState()));

    AssetMemory.instance.loadAll(selectModels(getState()))
        .then((models) => {
          debug("Models loaded", models);
            componentReveal(false);
            props.modelsLoadedCallback();
        });
  }, []);

    // -------------------–-------------------–-------------------–--------------- ANIMATION

    /**
     * Play in / out animation
     * @param pShow
     * @param pDuration
     */
    function componentReveal(pShow, pDuration = 1) {
        gsap.to(rootRef.current, {
          duration: pDuration,
          autoAlpha: pShow ? 1 : 0,
          onComplete: () => {
            if(!pShow) {
              if (rootRef.current?.style?.display) rootRef.current.style.display = "none";
            }
          }
        });
    }

    // -------------------–-------------------–-------------------–--------------- RENDER

  return <div ref={rootRef} className={merge([css.root, props.className])}>
      assets : { loading.length } - {loading.concat(" / ")}
  </div>
}

export default Loader
