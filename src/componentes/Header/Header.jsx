import '../Header/Header.css';
import { useEffect, useState } from 'react';
import BtnAuthLogin from '../BtnAuthLogin/BtnAuthLogin';
import BtnAuthRegister from '../BtnAuthRegister/BtnAuthRegister';
import useCheckAuthentication from '../../api/Authenticator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';


export default function Header () {
    const [menu, setMenu] = useState(false);
    const isAutenticado = useCheckAuthentication();
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token'));
    const [username, setUsername] = useState('');

    const ShowMenu = () => {
        setMenu(!menu);
    };

    const handleLogout = async () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'g_state=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    
        toast.success('Logout realizado com sucesso', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    useEffect (() => {
        const getusername = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/getusername', {withCredentials: true,
                headers: { 'Authorization': `Bearer ${token.split('=')[1]}`}})
                
                if (response.data.success) {
                    setUsername(response.data.username)
                }
                console.log('Erro ao buscar nome do usuário')
            }
            catch (error) {
                console.log(error)
            }
        }
        if (token) {
            getusername();
        }
    }, [token, setUsername])


    return (
        <header className='content'>
            <div className="header_content">
            <div className='arrow_container'>
                <button className='btn_arrow_previous'>
                    <i className='bx bx-chevron-left'></i>
                </button>
                <button className='btn_arrow_next'>
                    <i className='bx bx-chevron-right'></i>
                </button>
            </div>
            {isAutenticado ? (
                <div className='options_container'>
                    <button className='user' onClick={ShowMenu}>
                        <div className='user_container'>
                            <i id='user_photo' className='bx bxs-user-circle'></i>
                            <span className='user_name'>{username}</span>
                            <i id='arrow_profile' className='bx bxs-down-arrow'></i>
                        </div>
                    </button>
                    {menu && (
                        <div className='profile_container'>
                            <a href="/"><h3>Conta</h3></a>
                            <a href="/"><h3>Perfil</h3></a>
                            <a href="/" onClick={handleLogout}><h3>Sair</h3></a>
                        </div>
                    )}
                </div>
            ):(
                <div className='options_container_login'>
                    <BtnAuthRegister title='Inscrever-se'/>
                    <BtnAuthLogin title='Entrar'/>
                </div>
            )}
            </div>
        </header>
    )
}