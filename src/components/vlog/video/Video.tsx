import css from './Video.module.less';
import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";
import {SequenceManager} from "../../../mainClasses/Sequencer/SequenceManager";
import ButtonPicto, {ButtonPictoStyle} from "../../buttonPicto/ButtonPicto";
import {isLocal} from "../../../helpers/DebugHelpers";

interface IProps {
    className?: string,
    path: string;
}

/**
 * @name Video
 * @desc Display a youtube video
 */
function Video(props: IProps) {

    const videoRef = useRef<HTMLVideoElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        videoRef.current.play().then(() => {
            // Autoplay works
        }).catch(() => {
            if(buttonRef !== null && buttonRef.current !== null)
                buttonRef.current.style.display = 'block';
        });
    });

    /**
     * Once video finished, increment in sequence
     */
    function videoFinishedHandler() {
        gsap.delayedCall(.1, () => {
            SequenceManager.instance.increment();
        });
    }

    function customPlayButtonClickHandler() {
        videoRef.current.play().then(() => {
            if(buttonRef !== null && buttonRef.current !== null)
                buttonRef.current.style.display = 'none';
        });
    }

    return <div className={css.wrapper}>
        <div ref={buttonRef} className={css.play}>
            <img src={"/public/da/icons/play.svg"} alt={"PLAY VLOG"} onClick={customPlayButtonClickHandler}/>
        </div>
        {
            isLocal() &&
            <ButtonPicto className={css.skipButton} picto={ButtonPictoStyle.NEXT} disabled={false} onClick={() => {
            videoRef.current.pause();
            SequenceManager.instance.increment();
            }} />
        }
        <video playsInline={false} muted={false}  ref={videoRef} onEnded={videoFinishedHandler} controls={false}>
            <source src={props.path} type="video/mp4"/>
        </video>
    </div>
}

export default Video;
