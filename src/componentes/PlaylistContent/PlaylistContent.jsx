import './PlaylistContent.css'
import PlaylistItemContent from '../PlaylistItem/PlaylistItem';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import CardWouldLike from '../CardYouWouldLike/CardYouLike';
import Header from '../Header/Header';

export default function PlaylistContent ({playSongFromCard, musics, isPlaying, setIsPlaying }) {

    return (
        <section className='playlist_content'>
            <Header/>
            <PlaylistItemContent playSongFromCard={playSongFromCard}/>
            <CardWouldLike playSongFromCard={playSongFromCard} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
            <PlaylistCard playSongFromCard={playSongFromCard} musics={musics} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
        </section>
    )
}

