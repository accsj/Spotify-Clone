import '../PlaylistCard/PlaylistCard.css';
import React, { useState, useEffect, useMemo } from 'react';
import Axios from 'axios';
import TitleDivisor from '../Title Divisor/TitleDivisor';
import CardItem from '../../api/CardItem';


export default function PlaylistCard1({ playSongFromCard, isPlaying, setIsPlaying, handlePlayPause }) {
    const [musics, setMusics] = useState([]);
    const [playingIndex, setPlayingIndex] = useState(null);
    const [visibleMusics, setVisibleMusics] = useState(4);

    const searchQueries = useMemo(() => ['The Less I Know The Better', 'End of Beginning', 'The Beach', 'Telephones','Softcore'], []);

    useEffect (() => {
        const fetchSpecificMusics = async () => {
            try {
                const specificMusics = [];
                for (const query of searchQueries) {
                    const response = await Axios.get('http://localhost:5000/specifymusics', {
                        params: {
                            title: query
                        }
                    });
    
                    if (response.data.success) {
                        specificMusics.push(...response.data.data);
                    } else {
                        console.error('Erro ao buscar músicas:', response.data.message);
                    }
                }
                setMusics(specificMusics);
            } catch (error) {
                console.error('Erro ao buscar músicas:', error);
            }
        };

        fetchSpecificMusics();

    }, [searchQueries]);

    const toggleMoreMusics = () => {
        if (visibleMusics === 4) {
            setVisibleMusics(prevVisibleMusics => prevVisibleMusics + 4);
        } else {
            setVisibleMusics(4);
        }
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
                title="Você pode gostar"
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
