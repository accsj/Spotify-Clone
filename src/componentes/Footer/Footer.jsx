import '../Footer/Footer.css';
import 'react-toastify/dist/ReactToastify.css';
import CurrentSong from '../../assets/imgs/Macdemarcoalbum.png';
import { BsPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { AiFillStepForward, AiFillStepBackward } from "react-icons/ai";
import { useState, useRef, useEffect } from 'react'; 
import ProgressBar from '../ProgressBar/ProgressBar';
import Axios from 'axios';
import { toast } from 'react-toastify';



export default function Footer ({songUrl, imageUrl, title, subtitle }) {
    const [isPlaying , setIsPlaying] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const audioRef = useRef(new Audio());
    const [duration, setDuration] = useState(0); 
    const Icon = isPlaying ? BsPauseCircleFill : BsPlayCircleFill;
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token'));

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
                    checkLikedSong();
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

    const checkLikedSong = async () => {
        try {
            const response = await Axios.get('http://localhost:5000/checkLikeSong', {
                params: {
                    songUrl: songUrl
                },
                    withCredentials: true,
                    headers: { 'Authorization': `Bearer ${token.split('=')[1]}`
                }});
            if (response.data.liked) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        } catch (error) {
            console.error('Erro ao verificar música na playlist:', error);
        }
    };

    const handleLikeSong = async () => {
        try {
            const response = await Axios.post(
                'http://localhost:5000/playlist',
                {
                    songUrl,
                    title,
                    subtitle,
                    imageUrl
                },
                {
                    withCredentials: true,
                    headers: { 'Authorization': `Bearer ${token.split('=')[1]}` }
                }
            );

            if (response.data.success) {
                setIsLiked(true);
            } else {
                console.error('Erro ao adicionar música aos favoritos:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao adicionar música aos favoritos:', error);
        }
    };


    return (
        <footer className='footer'>
            {songUrl && (
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
                    <div className='likesong' onClick={handleLikeSong}>
                    {isLiked ? (
                            <i id='NoLike' className='bx bxs-heart' />
                        ) : (
                            <i id='Liked' className='bx bx-heart' />
                        )}
                    </div>
                </div>
            )}
            {songUrl && (
                <div className='player'>
                    <div className='playerbuttons'>
                        <AiFillStepBackward className='btn_skip_previous'/>
                        <Icon className='btn_play' onClick={handlePlayPause}/>
                        <AiFillStepForward className='btn_skip_next'/>
                    </div>
                    <ProgressBar audioRef={audioRef} duration={duration} onEnded={handleEnded} />
                </div>
            )}
        </footer>
    )
}
