import React, { useState } from 'react';
import CardItem from '../../api/CardItem.jsx';
import TitleDivisor from '../Title Divisor/TitleDivisor.jsx';
import useCheckAuthentication from '../../api/Authenticator.jsx';

export default function PlaylistCard({ playSongFromCard, musics, isPlaying, setIsPlaying, handlePlayPause }) {
    const [visibleMusics, setVisibleMusics] = useState(4);
    const [playingIndex, setPlayingIndex] = useState(null);
    const isAutenticado = useCheckAuthentication();

    const toggleMoreMusics = () => {
        setVisibleMusics(prevVisibleMusics => prevVisibleMusics === 4 ? 8 : 4);
    };

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
            <TitleDivisor 
                title={isAutenticado ? "Suas músicas curtidas" : "Descubra novas músicas"}
                showMore={musics.length > visibleMusics ? toggleMoreMusics : toggleMoreMusics}
            />
            
            <div className="main_card_container">
                {musics.slice(0, visibleMusics).map((music, index) => (
                    <CardItem
                        key={index}
                        songUrl={music.songurl}
                        imageUrl={music.imageurl}
                        title={music.title}
                        subtitle={music.subtitle}
                        isPlaying={index === playingIndex && isPlaying}
                        setIsPlayingIndex={() => handleSetIsPlaying(index)}
                        playSongFromCard={playSongFromCard}
                        setIsPlaying={setIsPlaying}
                        handlePlayPause={handlePlayPause}

                    />
                ))}
            </div>
        </>
    );
}
