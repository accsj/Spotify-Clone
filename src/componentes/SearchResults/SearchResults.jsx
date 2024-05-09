import '../SearchResults/SearchResults.css';
import SearchResultsCardBetter from '../../modules/SearchResultCard';
import SearchResultMusics from '../../modules/SearchResults';
import { useState } from 'react';

function SearchResultsPage({ searchResults, isPlaying, setIsPlaying, playSongFromCard, handlePlayPause }) {
    const hasResults = Array.isArray(searchResults) && searchResults.length > 0;
    const [playingIndex, setPlayingIndex] = useState(null);

    const handleSetIsPlaying = (key) => {
        if (key === playingIndex) {
            setPlayingIndex(null);
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            setPlayingIndex(key);
        }
    };


    return (
        <>
        { hasResults &&  ( 
            <section className="search_results_container">
                <div className="search_results_better">
                    <div className="search_results_better_title">
                        <h2>Melhor resultado</h2>
                    </div>
                        <SearchResultsCardBetter
                            searchResults={searchResults}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            playSongFromCard={playSongFromCard}
                            setIsPlayingIndex={handleSetIsPlaying}
                            handlePlayPause={handlePlayPause}
                        />
                </div>
                <div className="search_results_musics">
                    <div className="search_results_musics_title">
                        <h2>Músicas</h2>
                    </div>
                        <SearchResultMusics
                            searchResults={searchResults}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            playSongFromCard={playSongFromCard}
                            setIsPlayingIndex={handleSetIsPlaying}
                            handlePlayPause={handlePlayPause}
                        />
                </div>
            </section>
        )}
        </>
    )
}

export default SearchResultsPage;
