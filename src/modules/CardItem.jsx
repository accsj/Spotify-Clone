import { useState } from "react";
import BtnPlayCard from "../componentes/ButtonPlayCard/BtnPlayCard";

function CardItem({imageUrl, title, subtitle, songUrl, playSongFromCard, isPlaying, setIsPlaying, setIsPlayingIndex, handlePlayPause}) {
    const [isHovered, setIsHovered] = useState(false);
    

    return (
        <button className='playlist_card_container'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    > 
        <div className='playlist_card'>
            {imageUrl ? <img className='card_photo' src={imageUrl} alt='album' /> : <div className="liked_playlist"><i className='bx bxs-heart'></i></div>}
        </div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
        { isHovered && (
            <BtnPlayCard songUrl={songUrl} playSongFromCard={playSongFromCard} imageUrl={imageUrl} title={title} subtitle={subtitle} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setIsPlayingIndex={setIsPlayingIndex} handlePlayPause={handlePlayPause}/>
        )}
    </button>
    )
}

export default CardItem;