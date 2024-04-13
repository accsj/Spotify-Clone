import './PlaylistContent.css'
import PlaylistItemContent from '../PlaylistItem/PlaylistItem';
import PlaylistCard from '../PlaylistCard/PlaylistCard';
import CardWouldLike from '../CardYouWouldLike/CardYouLike';

export default function PlaylistContent ({playSongFromCard, musics }) {

    return (
        <section className='playlist_content'>
            <PlaylistItemContent playSongFromCard={playSongFromCard}/>
            <CardWouldLike playSongFromCard={playSongFromCard}/>
            <PlaylistCard playSongFromCard={playSongFromCard} musics={musics}/>
        </section>
    )
}

