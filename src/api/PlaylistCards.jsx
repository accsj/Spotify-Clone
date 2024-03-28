import { useState } from "react";
import BtnPlayCard from "../componentes/ButtonPlayCard/BtnPlayCard";

function CardItem({image, title, subtitle }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button className='playlist_card_container'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    > 
        <div className='playlist_card'>
            {image ? <img className='card_photo' src={image} alt='album' /> : <div className="liked_playlist"><i className='bx bxs-heart'></i></div>}
        </div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
        { isHovered && (
            <BtnPlayCard />
        )}
    </button>
    )
}

export default CardItem;