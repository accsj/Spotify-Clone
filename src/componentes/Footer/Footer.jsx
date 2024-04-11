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

    const handleLikeSong = async (event) => {
        event.preventDefault();

        try {
            const response = await Axios.post('http://localhost:5000/playlist', {
                songUrl,
                title,
                subtitle,
                imageUrl
            },{ withCredentials: true, headers: {
                'Authorization': `Bearer ${token.split('=')[1]}`
            } });

            if (response.data.success) {
                toast.success('Login realizado com sucesso!', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error('Erro ao realizar o login', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        } catch (error) {
            toast.error('Usuário ou senha inválidos', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

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
                <div className='likesong' onClick={handleLikeSong}>
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
