import '../SearchResults/SearchResults.css';
import SearchResultsCardBetter from '../../modules/SearchResultCard';
import SearchResultMusics from '../../modules/SearchResults';
import TitleDivisor from '../Title Divisor/TitleDivisor';
import CardItem from '../../modules/CardItem';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function SearchResultsPage({ searchResults, isPlaying, setIsPlaying, playSongFromCard, handlePlayPause }) {
    const hasResults = Array.isArray(searchResults) && searchResults.length > 0;
    const [playingIndex, setPlayingIndex] = useState(null);
    const [artistAlbums, setArtistAlbums] = useState([]);

    const handleSetIsPlaying = (key) => {
        if (key === playingIndex) {
            setPlayingIndex(null);
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            setPlayingIndex(key);
        }
    };

    useEffect(() => {
        const fetchArtistAlbums = async () => {
            try {
                if (searchResults && searchResults.length > 0) {
                    const firstArtistId = searchResults[0].artistId; // Assume que o ID do primeiro artista é suficiente
                    if (firstArtistId) {
                        const response = await Axios.post('http://localhost:5000/albums', { artistId: firstArtistId });
                        setArtistAlbums(response.data);
                    } else {
                        setArtistAlbums([]);
                    }
                }
            } catch (error) {
                console.log("Ocorreu um erro ao buscar os álbuns do artista", error);
            }
        };

        fetchArtistAlbums();
    }, [searchResults]);

    return (
        <>
            {hasResults && (
                <section className="search_results">
                    <div className="search_results_container">
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
                    </div>
                    <div className="search_results_albums_container">
                        <TitleDivisor title='Álbuns'/>
                        <div className="search_results_albums">
                        {artistAlbums.map((album, index) => (
                            <CardItem
                                key={index} // Use o índice como chave única
                                songUrl={album.preview}
                                imageUrl={album.cover}
                                title={album.title}
                                artist={searchResults[0].artist}
                                release={album.release_year}
                                playSongFromCard={playSongFromCard}
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                                handlePlayPause={handlePlayPause}
                                setIsPlayingIndex={handleSetIsPlaying}
                                albumId={album.albumId} // Passe o ID do álbum
                            />
                        ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default SearchResultsPage;
