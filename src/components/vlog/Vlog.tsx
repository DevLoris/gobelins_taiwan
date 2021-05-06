import css from './Vlog.module.less';
import React, {useEffect, useState} from 'react';
import { merge } from "../../lib/utils/arrayUtils";
import {useTranslation} from "react-i18next";
import video from '../../data/video.json';
import Video from "./video/Video";
import {SequenceManager} from "../../mainClasses/Sequencer/SequenceManager";
import {EChapterStep} from "../../mainClasses/Sequencer/SequenceChapterStep";

interface IProps {
    className?: string;
    videoId: string;
  }


const componentName = "Vlog";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name Vlog
 */
function Vlog (props: IProps) {
    let path: string = '';
    video.forEach((value: {id: string, path: string}) => {
        if (props.videoId === value.id) {
            path = value.path;
        }
    });

    const { t } = useTranslation();

    useEffect(() => {
        SequenceManager.instance.onStepUpdated.add(sequenceStepUpdatedHandler);
        return () => {
            SequenceManager.instance.onStepUpdated.remove(sequenceStepUpdatedHandler);
        }
    }, []);

    function sequenceStepUpdatedHandler() {
        const currentStep = SequenceManager.instance.getCurrentPositionInSequence()[1];
        const currentStepIsVlog = (currentStep === EChapterStep.INTRO_VLOG || currentStep === EChapterStep.OUTRO_VLOG);
        if(currentStepIsVlog) {
            // TODO set path
        }
    }

    return <Video path={path}/>
}

export default Vlog;
