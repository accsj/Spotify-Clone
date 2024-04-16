import React from 'react';
import '../BtnPlaySearch/BtnPlaySearch.css';

export default function BtnPlaySearch({ playSongFromCard, songUrl, imageUrl, title, subtitle, isPlaying, setIsPlaying, setIsPlayingIndex, handlePlayPause }) {

    const handlePlayButtonClick = () => {
        if (isPlaying) {
            setIsPlaying(false);
            setIsPlayingIndex(null); 
        } else {
            setIsPlaying(true);
            setIsPlayingIndex(true); 
            playSongFromCard(songUrl, imageUrl, title, subtitle);
        }
    };

    console.log(isPlaying)

    return (
        <button className='btn_play_search_better' onClick={handlePlayButtonClick}>
            {isPlaying ? <i id='btn_pause_search_better_icon' class='bx bx-pause'></i> : <i id='btn_play_search_better_icon' className='bx bxs-right-arrow'></i>}
        </button>
    );
}
