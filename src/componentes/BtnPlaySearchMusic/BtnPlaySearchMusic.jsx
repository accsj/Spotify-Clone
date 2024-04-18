import '../BtnPlaySearchMusic/BtnPlaySearchMusic.css';


function BtnPlaySearchMusic ({ key, playSongFromCard, songUrl, imageUrl, title, subtitle, isPlaying, setIsPlaying, setIsPlayingIndex, handlePlayPause }) {

    const handlePlayButtonClick = () => {
        if (isPlaying) {
            handlePlayPause();
            setIsPlayingIndex(null);
        } else {
            setIsPlaying(true);
            setIsPlayingIndex(key); 
            playSongFromCard(songUrl, imageUrl, title, subtitle);
        }
    };


    return (
        <button className="btn_play_search_music" onClick={handlePlayButtonClick}>
            {isPlaying ? <i id='btn_pause_search_icon' class='bx bx-pause'></i> : <i id='btn_play_search_icon' className='bx bxs-right-arrow'></i>}
        </button>
    )
}

export default BtnPlaySearchMusic;
