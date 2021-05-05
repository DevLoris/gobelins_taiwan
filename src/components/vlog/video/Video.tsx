import css from './Video.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";

interface IProps {
  className?: string,
  path: string;
}

const componentName = "Video";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name Video
 */
function Video (props: IProps) {
  return <div className={css.wrapper}>
    <video controls autoPlay><source src={ props.path }type="video/mp4" /></video>
  </div>
}

export default Video;
