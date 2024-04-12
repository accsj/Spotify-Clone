import '../../componentes/PlaylistCard/PlaylistCard.css';
import React, { useState, useEffect, useMemo } from 'react';
import Axios from 'axios';
import TitleDivisor from '../Title Divisor/TitleDivisor';
import CardItem from '../../api/PlaylistCards';


export default function PlaylistCard1({ playSongFromCard }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [musics, setMusics] = useState([]);
    const [visibleMusics, setVisibleMusics] = useState(4);

    const searchQueries = useMemo(() => ['The Less I Know The Better', 'Let It Happen', 'The Beach', 'Reminder', 'Borderline', 'Softcore'], []);

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
                        hoveredIndex={hoveredIndex}
                        setHoveredIndex={setHoveredIndex}
                        playSongFromCard={playSongFromCard}
                    />
                ))}
            </div>
        </>
    );
}
