import React from 'react';
import '../ButtonPlayCard/BtnPlayCard.css';

export default function BtnPlayCard({ playSongFromCard, songUrl, imageUrl, title, subtitle, isPlaying, setIsPlaying, setIsPlayingIndex, handlePlayPause }) {


    const handlePlayButtonClick = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            playSongFromCard(songUrl, imageUrl, title, subtitle);
        }
        setIsPlayingIndex(isPlaying ? null : true);
    };

    return (
        <button className='btn_play_card' onClick={handlePlayButtonClick}>
            {isPlaying ? <i id='btn_pause_card_i' class='bx bx-pause'></i> : <i id='btn_play_card_i' className='bx bxs-right-arrow'></i>}
        </button>
    );
}
