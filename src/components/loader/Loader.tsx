import css from './Loader.module.less';
import React, {LegacyRef, useEffect, useRef} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {AssetMemory} from "../webGlCanvas/WebGlManagerClasses/assets/AssetMemory";
import {selectModels} from "../../store/store_selector";
import {getState} from "../../store/store";
import {gsap} from "gsap";

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

    // -------------------–-------------------–-------------------–--------------- EFFECTS

  useEffect(() => {
    AssetMemory.instance.loadAll(selectModels(getState()))
        .then((models) => {
          debug("hahaha", models);
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
              rootRef.current.style.display = "none";
            }
          }
        });
    }

    // -------------------–-------------------–-------------------–--------------- RENDER

  return <div ref={rootRef} className={merge([css.root, props.className])}>
      {componentName}
  </div>
}

export default Loader
