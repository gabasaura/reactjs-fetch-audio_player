import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

const MP3Player = () => {

    const songRef = useRef(null)
    const [music, setMusic] = useState([])
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    // FETCH AUDIOS

    useEffect(() => {
        songList()
    }, [])

    const songList = async () => {

        try {
            const resp = await fetch('https://playground.4geeks.com/sound/songs')
            const data = resp.json()
            setMusic(await data)
            console.log(data)

        } catch (error) {
            console.log("error", error)
        }
    }

    // CONTROLS
    const handlePlayPause = () => {
        if (isPlaying) {
            songRef.current.pause()
        } else {
            songRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleGoBack = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : songs.length - 1))
    }

    const handleGoFF = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex < songs.length - 1 ? prevIndex + 1 : 0))
    }


    return (

        <div>
            {/* TITLE */}
            <div className="d-flex justify-content-center mx-5">
                <div className="d-row w-75 bg-dark text-white border-light border">
                    <div className="m-0 p-0">
                        <div className="text-center p-4">
                            <h1 className="title">Play Like Spotify</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* SONG LIST */}
            <div className="d-flex justify-content-center mx-5">
                <div className="d-row w-75 bg-dark text-white border-light border">
                    <div className="m-0 p-4">
                        <ul className="list-group">
                            {
                                music.songs?.map((mp3, index) => <li key={index}>{mp3.name}</li> )
                            }
                        </ul>
                    </div>
                </div>
            </div>

            {/* NAVBAR FOOTER FIXED */}
            <div className="w-100 fixed-bottom">
                <div className="bg-dark text-white border-light border p-4 justify-content-center d-flex">
                    <div className="btnPlayer bg-light rounded-5 p-4 mx-2 text-dark" onClick={handleGoBack}>
                        <FaStepBackward />
                    </div>
                    <div className="btnPlayer bg-light rounded-5 p-4 mx-2 text-dark" onClick={handlePlayPause}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </div>
                    <div className="btnPlayer bg-light rounded-5 p-4 mx-2 text-dark" onClick={handleGoFF}>
                        <FaStepForward />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MP3Player