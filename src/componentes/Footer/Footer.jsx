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
        audioRef.current.src = songUrl;
        audioRef.current.addEventListener('loadedmetadata', () => {
            setDuration(audioRef.current.duration);
        });

        if (songUrl) {
            audioRef.current.play()
                .then(() => console.log('Reprodução iniciada'))
                .catch(error => console.error('Erro ao reproduzir áudio:', error));
                setIsPlaying(true)
        } 

        return () => {
            audioRef.current.removeEventListener('loadedmetadata', () => {});
        };
    }, [songUrl]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
                .catch(error => {
                    console.error('Erro ao reproduzir áudio:', error);
                });
        } else {
            audioRef.current.pause();
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