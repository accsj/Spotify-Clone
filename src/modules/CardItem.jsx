import { useState } from "react";
import BtnPlayCard from "../componentes/ButtonPlayCard/BtnPlayCard"; 
import Tooltip from "../componentes/ToolTip/Tooltip";


function CardItem({imageUrl, title, subtitle, release, songUrl, playSongFromCard, isPlaying, setIsPlaying, setIsPlayingIndex, handlePlayPause, artist, albumId, albumPreview}) {
    const [isHovered, setIsHovered] = useState(false);


    return (
        <button
            className='playlist_card_container'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        > 
            <div className='playlist_card'>
                {imageUrl ? <img className='card_photo' src={imageUrl} alt='album' /> : <div className="liked_playlist"><i className='bx bxs-heart'></i></div>}
            </div>
            {title.length > 20 ? (
                <Tooltip content={title}>
                <h3>{title.slice(0, 20) + "..."}</h3>
                </Tooltip>
                ) : (
                    <h3>{title}</h3>
                )}
            {release ? (
                    <h4>{artist.length > 20 ? artist.slice(0, 20) + '...' : artist}<li>{release}</li></h4>
                ) : (
                    <p>{subtitle}</p>
                )}
            { isHovered && (
                <BtnPlayCard 
                    songUrl={songUrl} 
                    playSongFromCard={playSongFromCard} 
                    imageUrl={imageUrl} 
                    title={title} 
                    subtitle={subtitle} 
                    isPlaying={isPlaying} 
                    setIsPlaying={setIsPlaying} 
                    setIsPlayingIndex={setIsPlayingIndex} 
                    handlePlayPause={handlePlayPause} 
                    albumId={albumId}
                    albumPreview={albumPreview}
                />
            )}
        </button>
    );
}

export default CardItem;
