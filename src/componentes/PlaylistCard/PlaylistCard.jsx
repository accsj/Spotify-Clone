import '../PlaylistCard/PlaylistCard.css';
import { useState } from 'react';
import TheWeeknd from '../../assets/imgs/theweeknd.jpg';
import Dayseeker from '../../assets/imgs/dayseeker.jpeg';
import BrunoMars from '../../assets/imgs/brunomars.jpeg';
import CharliePuth from '../../assets/imgs/charlieputh.jpg';
import BritneySpears from '../../assets/imgs/BritneySpears.jpeg';
import EarthWindAndFire from '../../assets/imgs/earthwindandfire.jpeg';
import SabrinaCarpenter from '../../assets/imgs/sabrinacarpenter.webp';
import Macdemarco from '../../assets/imgs/Album_macdemarco.jpg';
import CardItem from '../../api/PlaylistCards';
import TitleDivisor from '../Title Divisor/TitleDivisor';
import WeDont from '../../assets/songs/CharliePuth.mp3';
import GimmeMore from '../../assets/songs/Britney Spears.mp3';
import Axios from 'axios';
import { useEffect } from 'react';


export default function PlaylistCard ({ playSongFromCard }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [musics, setMusics] = useState([]);

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/musics', {withCredentials: true});
                if (response.data.success) {
                    setMusics(response.data.data);
                } else {
                    console.error('Erro ao buscar músicas:', response.data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar músicas:', error);
            }
        };

        fetchMusics();
    }, []);


    return (
    <>
        <TitleDivisor 
            title="Você pode gostar"
        />
        
        <div className="main_card_container">
            <CardItem
                image={Macdemarco}
                title="Salad Days"
                subtitle="Mac DeMarco"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
            />

            <CardItem 
                image={TheWeeknd}
                title="After Hours"
                subtitle="The Weeknd"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
            />

            <CardItem
                image={Dayseeker}
                title="Dark Sun"
                subtitle="Dayseeker"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
            />

            <CardItem 
                image={BrunoMars}
                title="Unorthodox Jukebox"
                subtitle="Bruno Mars"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
            />
        </div>

        <TitleDivisor 
            title="Seus mixes mais ouvidos"
        />
        
        <div className="main_card_container">
                {musics.map((music, index) => (
                    <CardItem
                        key={index}
                        songUrl={music.songurl}
                        image={music.imageurl}
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

