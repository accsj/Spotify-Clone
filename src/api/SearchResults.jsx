import '../componentes/SearchResults/SearchResults.css';
import { useState } from 'react';
import BtnPlaySearchMusic from '../componentes/BtnPlaySearchMusic/BtnPlaySearchMusic';
import { IoIosMore } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";


function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function SearchResultMusics ({searchResults, isPlaying, setIsPlaying, playSongFromCard, setIsPlayingIndex}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    return (
        <div className="search_results_musics_container">
            {searchResults.map((music, index) => (
                <div
                    key={index}
                    className="music_item"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <img className="search_results_music_album" src={music.albumCover} alt="Album Cover" />
                    {hoveredIndex === index && <BtnPlaySearchMusic className='btn_play_search_music'
                    isPlaying={isPlaying} 
                    setIsPlaying={setIsPlaying} 
                    playSongFromCard={playSongFromCard} 
                    setIsPlayingIndex={setIsPlayingIndex}  
                    searchResults={searchResults}
                    songUrl={music.preview}
                    imageUrl={music.albumCover}
                    title={music.title}
                    subtitle={music.artist}
                    />}
                    <div className="music_info">
                        <h3 className="music_title">{music.title}</h3>
                        <p className="music_artist">{music.artist}</p>
                    </div>
                    {hoveredIndex === index && <IoMdAddCircleOutline className='btn_search_result_add' />}
                    <p className="music_duration">{formatDuration(music.duration)}</p>
                    {hoveredIndex === index && <IoIosMore className='btn_search_result_more'/> }
                </div>
            ))}
        </div>
    )
}
export default SearchResultMusics;