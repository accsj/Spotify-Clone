import '../Sidebar/Sidebar.css'
import SpotifyLogo from '../../assets/imgs/spotifylogo.svg';
import { IoIosAdd } from "react-icons/io";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar_options">
            <img className='SpotifyLogo' src={SpotifyLogo} alt="Spotify Logo" />
                <div className='menu_options'> 
                    <div className='options'>
                        <a className='HomeLink' href="/">
                            <i id='HomeLogo' class='bx bx-home-alt'></i>
                        </a>
                        <a href="/">
                            <p className='textoptions'>Início</p>
                        </a>
                    </div>

                    <div className='options'>
                        <a className='SearchLink' href="/">
                            <i id='SearchLogo' class='bx bx-search' ></i>
                        </a>
                        <a href="/">
                            <p className='textoptions'>Buscar</p>
                        </a>
                    </div>

                    <div className='options'>
                        <a className='LibraryLink' href="/">
                            <i id='LibraryLogo' class='bx bx-library' ></i>
                        </a>
                        <a href="/">
                            <p className='textoptions'>Sua biblioteca</p>
                        </a>
                    </div>
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

            <div className="divisor"></div>

            <div className='playlists'>
                <div className='options2'>
                    <a className='PlaylistOptions' href="/">
                        <p className='textplaylist'>
                            Nostalgic songs
                        </p>
                    </a>
                </div>
                <div className='options2'>
                    <a className='PlaylistOptions' href="/">
                        <p className='textplaylist'>
                            Playlist accsj
                        </p>
                    </a>
                </div>
                <div className='options2'>
                    <a className='PlaylistOptions' href="/">
                        <p className='textplaylist'>
                            Curtidas na rádio
                        </p>
                    </a>
                </div>
                <div className='options2'>
                    <a className='PlaylistOptions' href="/">
                        <p className='textplaylist'>
                            My Playlist
                        </p>
                    </a>
                </div>
                <div className='options2'>
                    <a className='PlaylistOptions' href="/">
                        <p className='textplaylist'>
                            Festa da Lina
                        </p>
                    </a>
                </div>
            </div>
        </div>    
    </aside>
    )
}

export default Sidebar