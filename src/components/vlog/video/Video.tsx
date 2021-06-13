import css from './Video.module.less';
import React from 'react';
import {gsap} from "gsap";
import {SequenceManager} from "../../../mainClasses/Sequencer/SequenceManager";

interface IProps {
  className?: string,
  path: string;
}

/**
 * @name Video
 * @desc Display a youtube video
 */
function Video (props: IProps) {

  /**
   * Once video finished, increment in sequence
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
