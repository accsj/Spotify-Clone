import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../PlaylistItem/PlaylistItem.css';
import PlaylistItem from '../../modules/PlaylistItems';

export default function PlaylistItemContent({isPlaying, setIsPlaying, handlePlayPause, playSongFromCard}) {
    const [playlists, setPlaylists] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [playingIndex, setPlayingIndex] = useState(null);
    const artistsIds = [296861];
    const [artistAlbums, setArtistAlbums] = useState([]);

    useEffect(() => {
        const fetchArtistAlbums = async () => {
            try {
                let allArtistAlbums = [];
    
                for (const artistId of artistsIds) {
                    const response = await Axios.post('http://localhost:5000/albums', { artistId });
                    allArtistAlbums = [...allArtistAlbums, ...response.data];
                }
    
                setArtistAlbums(allArtistAlbums);
            } catch (error) {
                console.log("Ocorreu um erro ao buscar os álbuns dos artistas", error);
            }
        };

        fetchArtistAlbums();
    }, [artistsIds]); 
    const handleSetIsPlaying = (index) => {
        if (index === playingIndex) {
            setPlayingIndex(null);
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            setPlayingIndex(index);
        }
    };
    
    return (
        <>
            <h1 className='morning_title'>Good Morning</h1>
            <div className='main_playlists'>
                {artistAlbums.map((playlist, index) => (
                    <PlaylistItem
                        key={index}
                        imageUrl={playlist.cover}
                        title={playlist.title}
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        setIsPlayingIndex={handleSetIsPlaying}
                        handlePlayPause={handlePlayPause}
                        playSongFromCard={playSongFromCard}
                        albumId={playlist.albumId}
                    />
                ))}
            </div>
        </>
    );
}
