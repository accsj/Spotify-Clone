import React from 'react';
import '../BtnPlaySearch/BtnPlaySearch.css';

function BtnPlaySearch ({ key, playSongFromCard, songUrl, imageUrl, title, subtitle, isPlaying, setIsPlaying, setIsPlayingIndex, handlePlayPause }) {

    const handlePlayButtonClick = () => {
        if (isPlaying) {
            handlePlayPause();
            setIsPlayingIndex(null);
        } else {
            setIsPlaying(true);
            setIsPlayingIndex(key); 
            playSongFromCard(songUrl, imageUrl, title, subtitle);
        }
    };

    return (
        <button className="btn_play_search_better" onClick={handlePlayButtonClick}>
            {isPlaying ? <i id='btn_play_search_better_icon' class='bx bx-pause'></i> : <i id='btn_play_search_better_icon' className='bx bxs-right-arrow'></i>}
        </button>
    )
}

export default BtnPlaySearch;


