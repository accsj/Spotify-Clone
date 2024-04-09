import '../../assets/styles/Home.css';
import Sidebar from '../../componentes/Sidebar/Sidebar';
import Header from '../../componentes/Header/Header';
import PlaylistContent from '../../componentes/PlaylistContent/PlaylistContent';
import Footer from '../../componentes/Footer/Footer';
import { useState } from 'react';

export default function HomePage () {
    const [songUrl, setSongUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    const playSongFromCard = (url, image, title, subtitle) => {
        setSongUrl(url);
        setImageUrl(image)
        setTitle(title)
        setSubtitle(subtitle)
    };

    return (
        <>
        <main className="main_container">
            <Sidebar />
            <Header />
            <PlaylistContent playSongFromCard={playSongFromCard} />
            <Footer songUrl={songUrl} imageUrl={imageUrl} title={title} subtitle={subtitle} />
        </main>
        </>
    );
}
