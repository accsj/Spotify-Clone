import React, {useEffect, useState} from 'react';
import '../ButtonPlayCard/BtnPlayCard.css';
import Axios from 'axios';

export default function BtnPlayCard({ playSongFromCard, songUrl, imageUrl, title, subtitle, isPlaying, setIsPlaying, setIsPlayingIndex, handlePlayPause, albumId}) {
    const [albumPreview, setAlbumPreview] = useState('');

    useEffect(() => {
        const fetchAlbumPreview = async () => {
            try {
                const response = await Axios.post('http://localhost:5000/tracks', { albumId });
                if (response.data && response.data.length > 0) {
                    setAlbumPreview(response.data[0].preview);
                }
            } catch (error) {
                console.error('Erro ao obter a preview do álbum:', error);
            }
        };

        fetchAlbumPreview();
    }, [albumId]);

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
