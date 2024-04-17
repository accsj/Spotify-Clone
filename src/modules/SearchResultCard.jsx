import '../componentes/SearchResults/SearchResults.css';
import BtnPlaySearch from '../componentes/BtnPlaySearch/BtnPlaySearch';
import { useState } from 'react';

function SearchResultsCardBetter ({searchResults, isPlaying, setIsPlaying, playSongFromCard, setIsPlayingIndex}) {
    const firstResult = searchResults.length > 0 ? searchResults[0] : null;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="search_results_better_container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        {firstResult && (
                <div className='search_results_better_content'>
                    <img className='album_better_results' src={firstResult.albumCover} alt="" />
                    <div className="artistInfo">
                        <img className='album_better_results_artist' src={firstResult.artistPic} alt="" />
                        <h4 className='album_better_results_artist_name'>{firstResult.artist}</h4>
                    </div>
                    <div className="search_results_better_about">
                        <h1>{firstResult.title}</h1>
                        <h4>Música<li>{firstResult.artist}</li></h4>
                    </div>
                </div>
            )}
        { isHovered && (
            <BtnPlaySearch isPlaying={isPlaying} setIsPlaying={setIsPlaying} playSongFromCard={playSongFromCard} setIsPlayingIndex={setIsPlayingIndex} songUrl={firstResult.preview} imageUrl={firstResult.albumCover} title={firstResult.title} subtitle={firstResult.artist}/>
        )}
        </div>
    )
}

export default SearchResultsCardBetter;