import '../Sidebar/Sidebar.css'
import SpotifyLogo from '../../assets/imgs/spotifylogo.svg';
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Sidebar({toggleSearch}) {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/')
    }

    return (
        <aside className="sidebar">
            <div className="sidebar_options">
            <img className='SpotifyLogo' src={SpotifyLogo} alt="Spotify Logo" />
                <div className='menu_options'> 
                    <button className='options' onClick={handleNavigateHome}>
                        <i id='HomeLogo' class='bx bx-home-alt'></i>
                        <p className='textoptions'>Início</p>
                    </button>

                    <button className='options'>
                        <i id='SearchLogo' class='bx bx-search' ></i>
                        <p className='textoptions' onClick={toggleSearch}>Buscar</p>
                    </button>

                    <button className='options'>
                        <i id='LibraryLogo' class='bx bx-library' ></i>
                        <p className='textoptions'>Sua biblioteca</p>
                    </button>
                </div>
            </div>

        <div className="sidebar_middle_options">
            <div className='middle_options'>
                <div className='options_middle'>
                    <a className='PlaylistLink' href="/">
                        <i id='PlaylistLogo' class='bx bx-plus'></i>
                    </a>
                    <a href="/">
                        <p className='textoptions'>Crie a sua playlist</p>
                    </a>
                    <IoIosAdd className='btn_add_playlist'/>
                </div>

                <div className='options_middle'>
                    <a className='LikedLink' href="/">
                        <i id='HeartLogo' class='bx bxs-heart' ></i>
                    </a>
                    <a href="/">
                        <p className='textoptions'>Músicas Curtidas</p>
                    </a>
                </div>

                <div className='options_middle'>
                    <a className='PodcastLogo' href="/">
                        <i class='bx bx-podcast'></i>
                    </a>
                    <a href="/">
                        <p className='textoptions'>Seus episódios</p>
                    </a>
                </div>
            </div>

            <div className='playlists_container_sidebar'>
                <div className='playlists'>
                    <button className='btn_playlist_sidebar' href="/">
                        <p className='textplaylist'>
                            Nostalgic songs
                        </p>
                    </button>
                </div>
                <div className='playlists'>
                    <button className='btn_playlist_sidebar' href="/">
                        <p className='textplaylist'>
                            Playlist accsj
                        </p>
                    </button>
                </div>
                <div className='playlists'>
                    <button className='btn_playlist_sidebar' href="/">
                        <p className='textplaylist'>
                            Curtidas na rádio
                        </p>
                    </button>
                </div>
                <div className='playlists'>
                    <button className='btn_playlist_sidebar' href="/">
                        <p className='textplaylist'>
                            My Playlist
                        </p>
                    </button>
                </div>
                <div className='playlists'>
                    <button className='btn_playlist_sidebar' href="/">
                        <p className='textplaylist'>
                            Festa da Lina
                        </p>
                    </button>
                </div>
            </div>
        </div>    
    </aside>
    )
}

export default Sidebar