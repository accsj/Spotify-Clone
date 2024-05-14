import '../componentes/SearchResults/SearchResults.css';
import BtnPlaySearch from '../componentes/BtnPlaySearch/BtnPlaySearch';
import { useState } from 'react';
import { BsExplicitFill } from "react-icons/bs";
import Tooltip from '../componentes/ToolTip/Tooltip';


function SearchResultsCardBetter ({ searchResults, isPlaying, setIsPlaying, playSongFromCard, setIsPlayingIndex, handlePlayPause}) {
    const firstResult = searchResults.length > 0 ? searchResults[0] : null;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="search_results_better_container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        {firstResult && (
                <div className='search_results_better_content'>
                    <img className='album_better_results' src={firstResult.albumCover} alt="album_cover" />
                    <div className="artistInfo">
                        <img className='album_better_results_artist' src={firstResult.artistPic} alt="artist_image" />
                        <h4 className='album_better_results_artist_name'>{firstResult.artist}</h4>
                    </div>
                    <div className="search_results_better_about">
                        {firstResult.title.length > 20 ? (
                            <Tooltip content={firstResult.title}>
                            <h1>{firstResult.title.slice(0, 20) + '...'}</h1>
                            </Tooltip>
                        ) : (
                            <h1>{firstResult.title}</h1>
                        )}
                        <h4>{firstResult.isExplicit && <BsExplicitFill />}Música<li>{firstResult.artist}</li></h4>
                    </div>
                </div>
            )}
        { isHovered && (
            <BtnPlaySearch 
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying} 
            playSongFromCard={playSongFromCard} 
            setIsPlayingIndex={setIsPlayingIndex} 
            songUrl={firstResult.preview} 
            imageUrl={firstResult.albumCover} 
            title={firstResult.title} 
            subtitle={firstResult.artist} 
            handlePlayPause={handlePlayPause}/>
        )}
        </div>
    )
}

export default SearchResultsCardBetter;