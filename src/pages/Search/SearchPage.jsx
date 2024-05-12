import '../../assets/styles/Search.css';
import Sidebar from "../../componentes/Sidebar/Sidebar";
import SearchResultsPage from "../../componentes/SearchResults/SearchResults";
import Footer from "../../componentes/Footer/Footer";
import React, {useState, useEffect, useRef} from "react";
import { toast } from "react-toastify";
import Axios from "axios";
import useCheckAuthentication from "../../modules/Authenticator";
import PlaylistCard from "../../componentes/PlaylistCard/PlaylistCard";
import PlaylistItemContent from "../../componentes/PlaylistItem/PlaylistItem";
import CardWouldLike from '../../componentes/PlaylistCardWL/PlaylistCardWL';
import Header from "../../componentes/Header/Header";

function SearchPage () {

    const [songUrl, setSongUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [musics, setMusics] = useState([]);
    const [isPlaying , setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());
    const isAutenticado = useCheckAuthentication();
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token'));
    const [isLiked, setIsLiked] = useState(false);
    const [duration, setDuration] = useState(0); 
    const showSearch = true;
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearchResults, setHasSearchResults] = useState(searchResults && searchResults.length > 0);
    
    const handleSearch = async (searchItem) => {
        try {
            if (searchItem.trim() !== '') {
                const response = await Axios.post("http://localhost:5000/search", {
                    searchItem: searchItem
                }, { withCredentials: true });
                setSearchResults(response.data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.log("Ocorreu um erro ao pesquisar a música", error);
        }
    };

    const playSongFromCard = (songUrl, image, title, subtitle, albumPreview) => {
        setSongUrl(songUrl || albumPreview);
        setImageUrl(image);
        setTitle(title);
        setSubtitle(subtitle);
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        const checkLikedSong = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/checkLikeSong', {
                    params: {
                        songUrl: songUrl
                    },
                    withCredentials: true,
                    headers: { 'Authorization': `Bearer ${token.split('=')[1]}`
                    }
                });
                if (response.data.liked) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }
            } catch (error) {
                toast.error('Erro ao verificar música na playlist.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        };

        const audio = audioRef.current;
        audio.src = songUrl;
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });

        if (songUrl) {
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    checkLikedSong();
                })
                .catch(error => console.error('Erro ao reproduzir áudio:', error));
        } 

        return () => {
            audio.removeEventListener('loadedmetadata', () => {});
        };
    }, [songUrl, setIsPlaying, token]);

    useEffect(() => {
        const audio = audioRef.current;

        if (isPlaying) {
            audio.play()
                .catch(error => {
                    console.error('Erro ao reproduzir áudio:', error);
                });
        } else {
            audio.pause();
        }
    }, [isPlaying]);


    useEffect(() => {
        setHasSearchResults(searchResults && searchResults.length > 0);
    }, [searchResults]);

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                let response;
                if (isAutenticado) {
                    response = await Axios.get('http://localhost:5000/listyoursongs', {
                        withCredentials: true,
                        headers: { 'Authorization': `Bearer ${token.split('=')[1]}` }
                    });
                } else {
                    response = await Axios.get('http://localhost:5000/musics');
                }
                if (response.data.success) {
                    const shuffledMusics = response.data.data.sort(() => Math.random() - 0.5);
                    setMusics(shuffledMusics);
                } else {
                    toast.error('Erro ao buscar músicas.', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            } catch (error) {
                toast.error('Erro ao buscar músicas.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        };

        fetchMusics();
    }, [isAutenticado, token]);


    return (
        <>
        <main className="main_container">
            <Sidebar />
            <section className='search_page'>
            <Header showSearch={showSearch} onSearch={handleSearch} />
            {hasSearchResults ? (
                <SearchResultsPage
                    playSongFromCard={playSongFromCard}
                    searchResults={searchResults}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    onSearch={handleSearch}
                    handlePlayPause={handlePlayPause}
                    showSearch={showSearch}
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
            <Footer songUrl={songUrl} imageUrl={imageUrl} title={title} subtitle={subtitle} musics={musics} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} duration={duration} isLiked={isLiked} setIsLiked={setIsLiked} handlePlayPause={handlePlayPause}/>
        </main>
        </>
    )
}

export default SearchPage;