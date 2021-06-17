import css from './Video.module.less';
import React, {useEffect, useRef} from 'react';
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

  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Once video finished, increment in sequence
   */
  function videoFinishedHandler() {
    gsap.delayedCall(.1, () => {
      SequenceManager.instance.increment();
    });
  }

  function customPlayButtonClickHandler() {
      videoRef.current.play();
  }

  return <div className={css.wrapper}>
    <video ref={videoRef} onEnded={videoFinishedHandler} controls={true}><source src={ props.path } type="video/mp4" /></video>
  </div>
}

export default Video;
