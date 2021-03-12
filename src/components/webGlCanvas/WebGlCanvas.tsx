import css from './WebGlCanvas.module.less';
import React, {useEffect, useRef} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {Game} from "../../demo/Game";

interface IProps {
  className?: string
}

const componentName = "WebGlCanvas";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name WebGlCanvas
 */
function WebGlCanvas (props: IProps) {

  const rootRef = useRef(null);

  // -------------------–-------------------–-------------------–--------------- EFFECTS

  useEffect(() => {

    Game.instance.init(rootRef.current);
    Game.instance.start();

  }, []);

  // -------------------–-------------------–-------------------–--------------- RENDER

  return <div ref={rootRef} className={merge([css.root, props.className])} />
}

export default WebGlCanvas
