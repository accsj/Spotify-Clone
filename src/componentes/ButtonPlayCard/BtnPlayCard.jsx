import '../ButtonPlayCard/BtnPlayCard.css';

export default function BtnPlayCard ({playSongFromCard, songUrl, imageUrl, currentTitle, currentSubtitle}) {

    const handlePlayButtonClick = () => {
        playSongFromCard(songUrl, imageUrl, currentTitle, currentSubtitle);
    };

    return (
        <button className='btn_play_card' onClick={handlePlayButtonClick} >
            <i className='bx bxs-right-arrow'></i>
        </button>
    )
}