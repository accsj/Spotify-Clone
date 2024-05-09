import React, { useState, useEffect } from 'react';
import './PlaylistContent.css';
import PlaylistItemContent from '../PlaylistItem/PlaylistItem';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import CardWouldLike from '../PlaylistCardWL/PlaylistCardWL';
import SearchResultsPage from '../SearchResults/SearchResults';
import Header from '../Header/Header';

export default function PlaylistContent({ playSongFromCard, musics, isPlaying, setIsPlaying, handlePlayPause, showSearch, onSearch, searchResults }) {
    const [hasSearchResults, setHasSearchResults] = useState(searchResults && searchResults.length > 0);

    useEffect(() => {
        setHasSearchResults(searchResults && searchResults.length > 0);
    }, [searchResults]);

    const handlePreviousClick = () => {
        setHasSearchResults(false);
    };

    const handleNextClick = () => {
        setHasSearchResults(searchResults && searchResults.length > 0);
    };

    return (
        <section className='playlist_content'>
            <Header showSearch={showSearch} onSearch={onSearch} searchResults={searchResults} handlePreviousClick={handlePreviousClick} handleNextClick={handleNextClick} />
            {hasSearchResults ? (
                <SearchResultsPage
                    playSongFromCard={playSongFromCard}
                    searchResults={searchResults}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    onSearch={onSearch}
                    handlePlayPause={handlePlayPause}
                />
            ) : (
                <>
                    <PlaylistItemContent playSongFromCard={playSongFromCard} />
                    <CardWouldLike
                        playSongFromCard={playSongFromCard}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        handlePlayPause={handlePlayPause}
                    />
                    <PlaylistCard
                        playSongFromCard={playSongFromCard}
                        musics={musics}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        handlePlayPause={handlePlayPause}
                    />
                </>
            )}
        </section>
    );
}
