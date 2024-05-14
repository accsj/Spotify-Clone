import { useState } from "react";
import BtnPlayItem from '../componentes/ButtonPlayItem/BtnPlayItem';
import Tooltip from "../componentes/ToolTip/Tooltip";

function PlaylistItem({ image, title }) {
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
            {title.length > 20 ? (
                <Tooltip content={title}>
                <h3>{title.slice(0, 20) + '...'}</h3>
                </Tooltip>
            ): (
                <h3>{title}</h3>
            )}
            {isHovered && (
                <BtnPlayItem />
            )}
        </button>
    );
}

export default PlaylistItem;