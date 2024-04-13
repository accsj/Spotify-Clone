import '../PlaylistCard/PlaylistCard.css';
import { useState, useEffect } from 'react';
import CardItem from '../../api/PlaylistCards';
import TitleDivisor from '../Title Divisor/TitleDivisor';
import useCheckAuthentication from '../../api/Authenticator.jsx';


export default function PlaylistCard ({ playSongFromCard, musics}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [visibleMusics, setVisibleMusics] = useState(4);
    const isAutenticado = useCheckAuthentication();
    const [songs, setSongs] = useState([]);


    const toggleMoreMusics = () => {
        if (visibleMusics === 4) {
            setVisibleMusics(prevVisibleMusics => prevVisibleMusics + 4);
        } else {
            setVisibleMusics(4);
        }
    };

    return (
    <>
        {isAutenticado ? (
            <TitleDivisor 
                title="Suas músicas curtidas"
                showMore={musics.length > visibleMusics ? toggleMoreMusics : toggleMoreMusics}
            />
        ) : (
            <TitleDivisor 
            title="Descubra novas músicas"
            showMore={musics.length > visibleMusics ? toggleMoreMusics : toggleMoreMusics}
        />
        )}
        
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
    )
}

