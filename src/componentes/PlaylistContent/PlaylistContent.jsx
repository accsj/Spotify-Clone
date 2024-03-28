import './PlaylistContent.css'
import PlaylistItemContent from '../PlaylistItem/PlaylistItem';
import PlaylistCard from '../PlaylistCard/PlaylistCard';

export default function PlaylistContent () {


    return (
        <section className='playlist_content'>
            <PlaylistItemContent />
            <PlaylistCard />
        </section>
    )
}

