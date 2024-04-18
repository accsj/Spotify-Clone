import '../../assets/styles/Home.css';
import Sidebar from '../../componentes/Sidebar/Sidebar';
import PlaylistContent from '../../componentes/PlaylistContent/PlaylistContent';
import Footer from '../../componentes/Footer/Footer';
import { useState, useEffect, useRef } from 'react';
import useCheckAuthentication from '../../modules/Authenticator';
import { toast } from 'react-toastify';
import Axios from 'axios';
import React from 'react';

export default function HomePage () {
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
    const [showSearch, setShowSearch] = React.useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const toggleSearch = () => {
        setShowSearch(true);
    };

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

    const playSongFromCard = (songUrl, image, title, subtitle) => {
        setSongUrl(songUrl);
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
                const response = await Axios.get('http://localhost:5000/checkLikeSongs', {
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
            <Sidebar toggleSearch={toggleSearch}/>
            <PlaylistContent playSongFromCard={playSongFromCard} musics={musics} isPlaying={isPlaying} setIsPlaying={setIsPlaying} handlePlayPause={handlePlayPause} showSearch={showSearch} onSearch={handleSearch} searchResults={searchResults}/>
            <Footer songUrl={songUrl} imageUrl={imageUrl} title={title} subtitle={subtitle} musics={musics} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} duration={duration} isLiked={isLiked} setIsLiked={setIsLiked} handlePlayPause={handlePlayPause}/>
        </main>
        </>
    );
}
