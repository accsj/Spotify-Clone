import React from 'react';
import '../ButtonPlayCard/BtnPlayCard.css';

export default function BtnPlayCard({ playSongFromCard, songUrl, imageUrl, title, subtitle, isPlaying, setIsPlaying, setIsPlayingIndex, handlePlayPause, albumPreview}) {

    const handlePlayButtonClick = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            playSongFromCard(songUrl, imageUrl, title, subtitle, albumPreview);
            setIsPlayingIndex(true);
        } else {
            setIsPlaying(false);
            setIsPlayingIndex(null);
        }
    };
    console.log(albumPreview)

    return (
        <button className='btn_play_card' onClick={handlePlayButtonClick}>
            {isPlaying ? <i id='btn_pause_card_i' class='bx bx-pause'></i> : <i id='btn_play_card_i' className='bx bxs-right-arrow'></i>}
        </button>
    );
}
