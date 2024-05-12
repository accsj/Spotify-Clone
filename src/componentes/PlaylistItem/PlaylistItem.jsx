import '../PlaylistItem/PlaylistItem.css'
import Macdemarco from '../../assets/imgs/Album_macdemarco.jpg';
import Nbhd from '../../assets/imgs/nbhd.jpeg';
import TameImpala from '../../assets/imgs/tameimpala.jpg';
import Bmth from '../../assets/imgs/bmth.png';
import PlaylistItem from '../../modules/PlaylistItems';
import { useState } from 'react';

export default function PlaylistItemContent () {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    
    return (
        <>
        <h1 className='morning_title'>Good Morning</h1>
            <div className='main_playlists'>
                <PlaylistItem
                    image={null}
                    title="Músicas Curtidas"
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                />

                <PlaylistItem
                    image={Macdemarco}
                    title="Mac DeMarco"
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                />

                <PlaylistItem
                    image={Nbhd}
                    title="The Neighbourhood"
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                />

                <PlaylistItem
                    image={TameImpala}
                    title="Tame Imapala"
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                />

                <PlaylistItem
                    image={Bmth}
                    title="Bring me the horizon"
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                />
            </div>
        </>
    )
}
