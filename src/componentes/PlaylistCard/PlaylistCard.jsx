import '../PlaylistCard/PlaylistCard.css';
import { useState } from 'react';
import TheWeeknd from '../../assets/imgs/theweeknd.jpg';
import Dayseeker from '../../assets/imgs/dayseeker.jpeg';
import BrunoMars from '../../assets/imgs/brunomars.jpeg';
import CharliePuth from '../../assets/imgs/charlieputh.jpg';
import BritneySpears from '../../assets/imgs/BritneySpears.jpeg';
import EarthWindAndFire from '../../assets/imgs/earthwindandfire.jpeg';
import SabrinaCarpenter from '../../assets/imgs/sabrinacarpenter.webp';
import WhenIWasYourMan from '../../assets/imgs/wheniwasyourman.jpg';
import Macdemarco from '../../assets/imgs/Album_macdemarco.jpg';
import CardItem from '../../api/PlaylistCards';
import TitleDivisor from '../Title Divisor/TitleDivisor';
import WeDont from '../../assets/songs/CharliePuth.mp3';
import GimmeMore from '../../assets/songs/Britney Spears.mp3';


export default function PlaylistCard ({ playSongFromCard }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

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
            <CardItem 
                id={1}
                songUrl={WeDont}
                image={CharliePuth}
                title="We Don't Talk Anymore"
                subtitle="Charlie Puth"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                playSongFromCard={playSongFromCard}
                imageUrl={CharliePuth}
                currentTitle="We Don't Talk Anymore"
                currentSubtitle="Charlie Puth"
            />

            <CardItem
                id={2}
                songUrl={GimmeMore}
                image={BritneySpears}
                title="Gimme More"
                subtitle="Britney Spears"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                playSongFromCard={playSongFromCard}
                imageUrl={BritneySpears}
                currentTitle="Gimme More"
                currentSubtitle="Britney Spears"
            />

            <CardItem 
                image={SabrinaCarpenter}
                title="Feather"
                subtitle="Sabrina Carpenter"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                playSongFromCard={playSongFromCard}
            />

            <CardItem 
                image={EarthWindAndFire}
                title="Boogie Wonderland"
                subtitle="Earth, Wind & Fire, The Emotions"
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
            />
        </div>
    </>
    )
}

