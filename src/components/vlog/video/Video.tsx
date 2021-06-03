import css from './Video.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {gsap} from "gsap";
import {SequenceManager} from "../../../mainClasses/Sequencer/SequenceManager";

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

  /**
   * On video finished, increment in sequence
   */
  function videoFinishedHandler() {
    gsap.delayedCall(.1, () => {
      SequenceManager.instance.increment();
    });
  }


  return <div className={css.wrapper}>
    <video onEnded={videoFinishedHandler} controls={true} autoPlay><source src={ props.path } type="video/mp4" /></video>
  </div>
}

export default Video;
