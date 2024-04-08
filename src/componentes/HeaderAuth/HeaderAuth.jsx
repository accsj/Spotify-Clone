import '../HeaderAuth/HeaderAuth.css';
import SpotifyLogo from '../../assets/imgs/Spotifylogo.png';

export default function HeaderAuth () {

    return (
        <header className='content_login'>
            <div className='spotifylogo'>
                <img id='SpotifyLogo' src={SpotifyLogo} alt="Logo do Spotify"/>
            </div>
        </header>
    )
}