import css from './WebGlCanvas.module.less';
import React, {useEffect, useRef} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {WebGlManager} from "./WebGlManager/WebGlManager";

interface IProps {
  className?: string
  show: boolean
}

WebGlCanvas.defaultProps = {
  show: true
}

const componentName = "WebGlCanvas";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name WebGlCanvas
 */
function WebGlCanvas (props: IProps) {

  const rootRef = useRef<HTMLDivElement>(null);

  const webGlManagerRef = useRef<WebGlManager>();

  // -------------------–-------------------–-------------------–--------------- EFFECTS

  /**
   * On component build
   */
  useEffect(() => {
    webGlManagerRef.current = new WebGlManager();
    webGlManagerRef.current.initAndStart(rootRef.current);

    // On component destroy
    return () => {
      webGlManagerRef.current.destroy();
    }
  }, []);

  /**
   * On show prop update
   */
  useEffect(() => {
    componentReveal(props.show);
  }, [props.show]);

  // -------------------–-------------------–-------------------–--------------- ANIMATION

  /**
   * Play in / out animation
   * @param pShow
   * @param pDuration
   */
  function componentReveal(pShow, pDuration = 1) {
    // gsap.to(rootRef.current, { duration: pDuration });
  }

  // -------------------–-------------------–-------------------–--------------- RENDER

  return <div ref={rootRef} className={merge([css.root, props.className])} />
}

export default WebGlCanvas
