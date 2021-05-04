import css from './WebGlCanvas.module.less';
import React, {useEffect, useRef} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {gsap} from "gsap";
import {WebGlManager} from "./WebGlManagerClasses/WebGlManager";

interface IProps {
  className?: string
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
    webGlManagerRef.current = WebGlManager.getInstance();
    webGlManagerRef.current.initAndStart(rootRef.current);

    // On component destroy
    return () => {
      webGlManagerRef.current.destroy();
    }
  }, []);



  // -------------------–-------------------–-------------------–--------------- RENDER

  return <div ref={rootRef} className={merge([css.root, props.className])} />
}

export default WebGlCanvas
