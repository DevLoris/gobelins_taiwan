import React, {useEffect, useState} from 'react';
import Video from "./video/Video";
import videos from '../../data/video.json';
import {AudioHandler} from "../../lib/audio/AudioHandler";

type VideoElement = {
    id: string,
    path: string
}

interface IProps {
    className?: string;
    videoId: string;
}

/**
 * @name Vlog
 * Gère les vidéos
 */
function Vlog (props: IProps) {
    const [videoPath, setVideoPath] = useState<string>(null);

    useEffect(() => {
        AudioHandler.stopAll();
        let video = videos.find((value: VideoElement) => (props.videoId === value.id));
        if (video !== undefined)
            setVideoPath(video.path);
    }, []);

    return <Video path={videoPath}/>
}

export default Vlog;
