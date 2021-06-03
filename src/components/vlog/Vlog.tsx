import css from './Vlog.module.less';
import React, {useEffect, useState} from 'react';
import Video from "./video/Video";
import video from '../../data/video.json';

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

    const [videoPath, setVideoPath] = useState("");

    useEffect(() => {

        video.forEach((value: {id: string, path: string}) => {
            if (props.videoId === value.id) {
                setVideoPath(value.path);
            }
        });

    }, []);

    return <Video path={videoPath}/>
}

export default Vlog;
