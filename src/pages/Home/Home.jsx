import '../../assets/styles/Home.css';
import Sidebar from '../../componentes/Sidebar/Sidebar';
import Header from '../../componentes/Header/Header';
import PlaylistContent from '../../componentes/PlaylistContent/PlaylistContent';
import Footer from '../../componentes/Footer/Footer';
import { useState, useEffect } from 'react';
import useCheckAuthentication from '../../api/Authenticator';
import Axios from 'axios';

export default function HomePage () {
    const [songUrl, setSongUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [musics, setMusics] = useState([]);
    const [isPlaying , setIsPlaying] = useState(false);
    const isAutenticado = useCheckAuthentication();
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token'));

    const playSongFromCard = (songUrl, image, title, subtitle) => {
        setSongUrl(songUrl);
        setImageUrl(image)
        setTitle(title)
        setSubtitle(subtitle)
        setIsPlaying(true);
    };

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
                    console.error('Erro ao buscar músicas:', response.data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar músicas:', error);
            }
        };

        fetchMusics();
    }, [isAutenticado, token]);


    return (
        <>
        <main className="main_container">
            <Sidebar />
            <Header />
            <PlaylistContent playSongFromCard={playSongFromCard} musics={musics} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            <Footer songUrl={songUrl} imageUrl={imageUrl} title={title} subtitle={subtitle} musics={musics} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
        </main>
        </>
    );
}
