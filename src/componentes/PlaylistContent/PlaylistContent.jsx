import './PlaylistContent.css'
import PlaylistItemContent from '../PlaylistItem/PlaylistItem';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import CardWouldLike from '../PlaylistCardWL/PlaylistCardWL';
import Header from '../Header/Header';

export default function PlaylistContent ({playSongFromCard, musics, isPlaying, setIsPlaying, handlePlayPause }) {

    return (
        <section className='playlist_content'>
            <Header/>
            <PlaylistItemContent playSongFromCard={playSongFromCard}/>
            <CardWouldLike playSongFromCard={playSongFromCard} isPlaying={isPlaying} setIsPlaying={setIsPlaying} handlePlayPause={handlePlayPause}/>
            <PlaylistCard playSongFromCard={playSongFromCard} musics={musics} isPlaying={isPlaying} setIsPlaying={setIsPlaying} handlePlayPause={handlePlayPause}/>
        </section>
    )
}

