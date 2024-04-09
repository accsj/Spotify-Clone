import '../Footer/Footer.css';
import CurrentSong from '../../assets/imgs/Macdemarcoalbum.png';
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { AiFillStepForward, AiFillStepBackward } from "react-icons/ai";
import { useState, useRef, useEffect } from 'react'; 
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Footer ({songUrl, imageUrl, title, subtitle }) {
    const [isPlaying , setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());
    const [duration, setDuration] = useState(0); 

    const Icon = isPlaying ? BsPauseCircleFill : BsPlayCircleFill;
    
    useEffect(() => {
        const audio = audioRef.current;

        audio.src = songUrl;
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });

        if (songUrl) {
            audio.play()
                .then(() => {
                    console.log('Reprodução iniciada');
                    setIsPlaying(true);
                })
                .catch(error => console.error('Erro ao reproduzir áudio:', error));
        } 

        return () => {
            audio.removeEventListener('loadedmetadata', () => {});
        };
    }, [songUrl]);

    useEffect(() => {
        const audio = audioRef.current;

        if (isPlaying) {
            audio.play()
                .catch(error => {
                    console.error('Erro ao reproduzir áudio:', error);
                });
        } else {
            audio.pause();
        }
    }, [isPlaying]);


    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleEnded = () => {
        setIsPlaying(false); 
    };

    return (
        <footer className='footer'>
            <div className='CurrentSong'>
                <img className='album' src={imageUrl || CurrentSong} alt="CurrentSong" />
                <div className='info'>
                    <a className='NameSong' href='/'>
                        <h2>{title}</h2>
                    </a>
                    <a className='artist' href='/'>
                        <p>{subtitle}</p>
                    </a>
                </div>
                <div className='likesong'>
                    <i className='bx bx-heart' ></i>
                </div>
            </div>
            
            <div className='player'>
                <div className='playerbuttons'>
                    <AiFillStepBackward className='btn_skip_previous'/>
                    <Icon className='btn_play' onClick={handlePlayPause}/>
                    <AiFillStepForward className='btn_skip_next'/>
                </div>
                <ProgressBar audioRef={audioRef} duration={duration} onEnded={handleEnded} />
            </div>
        </footer>
    )
}
