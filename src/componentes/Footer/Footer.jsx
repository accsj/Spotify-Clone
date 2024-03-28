import '../Footer/Footer.css';
import CurrentSong from '../../assets/imgs/Macdemarcoalbum.png';

export default function Footer () {
    return (
        <footer className='footer'>
            <div className='CurrentSong'>
                <img className='album' src={CurrentSong} alt="CurrentSong" />
                <div className='info'>
                    <a className='NameSong' href='/'>
                        <h2>Chamber of Reflection</h2>
                    </a>
                    <a className='artist' href='/'>
                        <p>Mac DeMarco</p>
                    </a>
                </div>
                <div className='likesong'>
                    <i class='bx bx-heart' ></i>
                </div>
            </div>
            
            <div className='player'>
                <div className='playerbuttons'>
                <button className='btn_skip_previous'>
                    <i class='bx bx-skip-previous' ></i>
                </button>
                <button className='btn_play'>
                    <i class='bx bx-play'></i>
                </button>
                <button className='btn_skip_next'>
                    <i class='bx bx-skip-next'></i>
                </button>
                </div>
                <span className='currentTime'>0:00<input type="range" className='progressbar' value="0" min='0' max='300'/><span id="duration">0:00</span></span> 
            </div>
        </footer>
    )
}