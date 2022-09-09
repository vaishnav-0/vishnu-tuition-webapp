import React from 'react';
import shaka from 'shaka-player';
import {useSearchParams} from 'react-router-dom';
import aesjs from '../functions/aes';
import {auth} from "../firebase";
import Center from "./Center";
import Plyr from 'plyr';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import style from './SidebarNavigation.module.scss';

export function Video({data, content}: { data?: any, content: any }) {
    const vidRef = React.useRef<HTMLVideoElement>(null);
    let [searchParams, setSearchParams] = useSearchParams();
    const [chapters, setChapters] = React.useState<JSX.Element[]>([]);

    const controllerRef = React.useRef<any>(null);
    const playerRef = React.useRef<any>(null);
    const chapterRef = React.useRef<any>(null);
    const videoContainerRef = React.useRef<any>(null);
    const [playing, setPlaying] = React.useState<boolean>(false);

    const loadVideo = () => {
        const player = controllerRef.current;
        setPlaying(true);
        if (data && auth.currentUser) {
            const eB = aesjs.utils.hex.toBytes(data);

            const key = aesjs.utils.utf8.toBytes(auth.currentUser?.uid + auth.currentUser?.email + "aaaa").slice(0, 32);

            const dT = aesjs.utils.utf8.fromBytes(new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(3)).decrypt(eB));
            const vD = JSON.parse(dT);
            console.log(vD);
            if (vidRef.current) {
                console.log(player);
                if (player) {
                    player.configure({
                        drm: {
                            clearKeys: {
                                [vD.i]: vD.k
                            }
                        }
                    });
                    player
                        .load(vD.url)
                        .then(function () {
                            console.log("The video has now been loaded!");
                        })
                        .catch((err: any) => console.log(err));

                    // Listen for error events.
                    player.addEventListener("error", (err: any) => console.log(err));
                }


                // Load an asset.

            }
        }
    }

    React.useEffect(() => {
        setPlaying(false);
    }, [data])

    React.useEffect(() => {
            shaka.polyfill.installAll();

            if (vidRef.current) {
                controllerRef.current = new shaka.Player(vidRef.current);
                playerRef.current = new Plyr(vidRef.current);
                // playerRef.current.points = [{time: 0, label: "start"}, {time: 60, label: "60"}];
            }

        }
        ,
        []
    )
    ;

    React.useEffect(() => {
        if (chapterRef.current) {
            chapterRef.current.addEventListener("load", (e: any) => {
                    console.log("yyaaasdasday");
                    if (vidRef.current) {
                        const track = vidRef.current.textTracks[0];
                        track.mode = "showing";
                        console.log(track.cues)
                        const seekOnClick = (e: any) => {
                            playerRef.current.currentTime = Math.round(e.target.getAttribute('data-start-time'));
                        }

                        const cues = track.cues;
                        if (cues) {
                            const chapters = [];
                            for (let i = 0; i < cues.length; i++) {
                                const cue: any = cues[i]
                                chapters.push(<p key={i} role="button" tabIndex={0} className={style["cue-point"]}
                                                 data-id={cue.id} data-start-time={cue.startTime}
                                                 data-end-time={cue.endTime}
                                                 onClick={seekOnClick}
                                >{cue.text}</p>);
                            }
                            setChapters(chapters);
                        }

                    }
                }
            )
        }
    }, [chapterRef.current])

    React.useEffect(() => {
        console.log(content?.chapters)
        if (!content?.chapters)
            setChapters([]);
        else {

        }
    }, [content])

    return (
        <div className="App">
            <Center>
                <div ref={videoContainerRef} style={{maxWidth: "80%", maxHeight: "80vh", position: "relative",...playing?{}:{height: "300px", width: "100%"}}}>
                    {
                        <div style={{
                            display: playing ? "none" : "block",
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            backgroundColor: "black",
                            zIndex: "1000"
                        }}>
                            <Center style={{height: "100%"}}>
                                <PlayCircleFilledWhiteIcon onClick={loadVideo} style={{
                                    position: "absolute",
                                    color: "white",
                                    fontSize: "60px"
                                }}/>
                            </Center>
                        </div>
                    }

                    <video
                        hidden={!playing}
                        crossOrigin="cross-origin"
                        ref={vidRef}
                        controls>
                        <track
                            key={content?.chapters}
                            ref={chapterRef}
                            src={content?.chapters}
                            kind="chapters"
                            default/>
                    </video>
                </div>

            </Center>
            {
                chapters
            }
        </div>
    );
}
