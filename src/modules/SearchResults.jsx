import '../componentes/SearchResults/SearchResults.css';
import {useState} from 'react';
import BtnPlaySearchMusic from '../componentes/BtnPlaySearchMusic/BtnPlaySearchMusic';
import { IoIosMore } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsExplicitFill } from "react-icons/bs";
import Tooltip from '../componentes/ToolTip/Tooltip';


function SearchResultMusics ({searchResults, isPlaying, setIsPlaying, playSongFromCard, setIsPlayingIndex, handlePlayPause, index, title, subtitle, songUrl, imageUrl, duration, isExplicit}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const formatDuration = (durationInSeconds) => {
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    return (
        <div className="search_results_musics_container">
                <div
                    key={index}
                    className="music_item"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <img className="search_results_music_album" src={imageUrl} alt="Album Cover" />
                    {hoveredIndex === index && <BtnPlaySearchMusic className='btn_play_search_music'
                        isPlaying={isPlaying} 
                        setIsPlaying={setIsPlaying} 
                        playSongFromCard={playSongFromCard} 
                        setIsPlayingIndex={setIsPlayingIndex}  
                        searchResults={searchResults}
                        songUrl={songUrl}
                        imageUrl={imageUrl}
                        title={title}
                        subtitle={subtitle}
                        handlePlayPause={handlePlayPause}
                    />}
                    <div className="music_info">
                        {title.length > 30 ? (
                            <Tooltip content={title}>
                                <h3 className="music_title">{title.slice(0, 30) + '...'}</h3>
                            </Tooltip>
                        ) : (
                            <h3 className='music_title'>{title}</h3>
                        )}
                        <p className="music_artist">{isExplicit && <BsExplicitFill />}{subtitle}</p>
                    </div>
                    {hoveredIndex === index && <IoMdAddCircleOutline className='btn_search_result_add' />}
                    <p className="music_duration">{formatDuration(duration)}</p>
                    {hoveredIndex === index && <IoIosMore className='btn_search_result_more'/> }
                </div>
        </div>
    )
}
export default SearchResultMusics;