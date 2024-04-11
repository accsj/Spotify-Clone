import '../ButtonPlayCard/BtnPlayCard.css';

export default function BtnPlayCard ({playSongFromCard, songUrl, imageUrl, title, subtitle}) {

    const handlePlayButtonClick = () => {
        playSongFromCard(songUrl, imageUrl, title, subtitle);
    };

    return (
        <button className='btn_play_card' onClick={handlePlayButtonClick} >
            <i className='bx bxs-right-arrow'></i>
        </button>
    )
}