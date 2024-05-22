import '../ButtonPlayItem/BtnPlayItem.css';
import React, {useState} from 'react';
import Axios from 'axios';

export default function BtnPlayItem ({isPlaying, setIsPlaying, handlePlayPause, playSongFromCard, setIsPlayingIndex, albumId, imageUrl, title}) {
    const [songUrl, setSongUrl] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [duration, setDuration] = useState('');

    const fetchAlbumPreview = async () => {
        try {
            const response = await Axios.post('http://localhost:5000/tracks', { albumId: albumId });
            if (response.data && response.data.length > 0) {
                setSongUrl(response.data[0].preview);
                setSubtitle(response.data[0].artist);
                setDuration(response.data[0].duration);
            }   
        } catch (error) {
            console.error('Erro ao obter a preview do álbum:', error);
        } 
    };

    const handlePlayButtonClick = () => {
        if (!isPlaying) {
            if (!songUrl) {
                fetchAlbumPreview();
            } else if (songUrl) {
                setIsPlaying(true);
                playSongFromCard(songUrl, imageUrl, title, subtitle, duration);
                setIsPlayingIndex(true);
            }
        } else {
            setIsPlaying(false);
            setIsPlayingIndex(null);
        }
    };

    return (
        <button className="btn_play_item" onClick={handlePlayButtonClick}>
            {isPlaying ? <i id='btn_pause_card_i' class='bx bx-pause'></i> : <i className='bx bxs-right-arrow'></i>}
        </button>
    )
}