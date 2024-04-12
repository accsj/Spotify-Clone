import '../PlaylistCard/PlaylistCard.css';
import { useState } from 'react';
import CardItem from '../../api/PlaylistCards';
import TitleDivisor from '../Title Divisor/TitleDivisor';
import Axios from 'axios';
import { useEffect } from 'react';
import useCheckAuthentication from '../../api/Authenticator.jsx';


export default function PlaylistCard ({ playSongFromCard }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [musics, setMusics] = useState([]);
    const [visibleMusics, setVisibleMusics] = useState(4);
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token'));
    const isAutenticado = useCheckAuthentication();


    useEffect(() => {
        const fetchMusics = async () => {
            try {
                let response;
                if (isAutenticado) {
                    response = await Axios.get('http://localhost:5000/listyoursongs', {
                        withCredentials: true,
                        headers: { 'Authorization': `Bearer ${token.split('=')[1]}` }
                    });
                } else {
                    response = await Axios.get('http://localhost:5000/musics');
                    console.log(response.data)
                }
                if (response.data.success) {
                    const shuffledMusics = response.data.data.sort(() => Math.random() - 0.5);
                    setMusics(shuffledMusics);
                } else {
                    console.error('Erro ao buscar músicas:', response.data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar músicas:', error);
            }
        };

        fetchMusics();
    }, [isAutenticado, token]);

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

