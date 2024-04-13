import './PlaylistContent.css'
import PlaylistItemContent from '../PlaylistItem/PlaylistItem';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import CardWouldLike from '../CardYouWouldLike/CardYouLike';

export default function PlaylistContent ({playSongFromCard, musics, isPlaying, setIsPlaying }) {

    return (
        <section className='playlist_content'>
            <PlaylistItemContent playSongFromCard={playSongFromCard}/>
            <CardWouldLike playSongFromCard={playSongFromCard} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
            <PlaylistCard playSongFromCard={playSongFromCard} musics={musics} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
        </section>
    )
}

