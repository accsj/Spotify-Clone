import { useState } from "react";
import BtnPlayItem from '../componentes/ButtonPlayItem/BtnPlayItem';

function PlaylistItem({ image, title}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className='playlist_container'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='playlist'>
                {image ? <img className='album_photo' src={image} alt="album" /> : <div className="liked_playlist"><i className='bx bxs-heart'></i></div>}
            </div>
            <h3>{title}</h3>
            {isHovered && (
                <BtnPlayItem />
            )}
        </button>
    );
}

export default PlaylistItem;