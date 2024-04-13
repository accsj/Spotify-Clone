import React, { useState } from 'react';
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";

const VolumeSlider = ({ audioRef }) => {
    const [volume, setVolume] = useState(1);
    const VolumeIcon = volume ? HiSpeakerWave : HiSpeakerXMark;

    const handleVolumeChange = (event) => {
        const newValue = parseFloat(event.target.value);
        setVolume(newValue);
        if (audioRef.current) {
            audioRef.current.volume = newValue;
        }
    };

    const handleMuteToggle = () => {
        if (volume === 0) {
            setVolume(1);
            if (audioRef.current) {
                audioRef.current.volume = 1;
            }
        } else {
            setVolume(0);
            if (audioRef.current) {
                audioRef.current.volume = 0;
            }
        }
    };

    return (
        <div className='volume-slider'>
            <VolumeIcon className='btn_volume' onClick={handleMuteToggle} />
            <input
                type='range'
                className='sliderprogress'
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                style={{background: `linear-gradient(to right, #1db954 0%, #1db954 ${(volume * 100)}%, #f4f4f4 ${(volume * 100)}%, #f4f4f4 100%)`}}
            />
        </div>
    );
};

export default VolumeSlider;
