import '../HeaderAuth/HeaderAuth.css';
import SpotifyLogo from '../../assets/imgs/spotifylogo.svg';
import { useNavigate } from 'react-router-dom';

export default function HeaderAuth () {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <header className='content_login'>
            <div className='spotifylogo'>
                <img id='SpotifyLogo' src={SpotifyLogo} alt="Logo do Spotify" onClick={handleNavigate}/>
            </div>
        </header>
    )
}