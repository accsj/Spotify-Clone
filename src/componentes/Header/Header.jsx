import React, { useState, useRef } from 'react';
import './Header.css';
import { useEffect } from 'react';
import BtnAuthLogin from '../BtnAuthLogin/BtnAuthLogin';
import BtnAuthRegister from '../BtnAuthRegister/BtnAuthRegister';
import SearchBox from '../SearchBox/SearchBox';
import useCheckAuthentication from '../../modules/Authenticator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

export default function Header({ showSearch, onSearch, searchResults }) {
    const [menu, setMenu] = useState(false);
    const isAutenticado = useCheckAuthentication();
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token'));
    const [username, setUsername] = useState('');
    const profileRef = useRef(null);

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

    useEffect(() => {
        const getusername = async () => {
            try {
                const response = await Axios.get('http://localhost:5000/getusername', {
                    withCredentials: true,
                    headers: { 'Authorization': `Bearer ${token.split('=')[1]}` }
                });
                
                if (response.data.success) {
                    setUsername(response.data.username)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        if (token) {
            getusername();
        }
    }, [token, setUsername]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileRef]);

    return (
        <header className='content'>
            <div className="header_content">
                <div className='arrow_container'>
                    <button className='btn_arrow_previous' to="#" onClick={() => window.history.back()}>
                        <i className='bx bx-chevron-left'></i>
                    </button>
                    <button className='btn_arrow_next' to="#" onClick={() => window.history.go(1)}>
                        <i className='bx bx-chevron-right'></i>
                    </button>
                </div>
                {showSearch && (
                    <div className="search_box">
                        <SearchBox onSearch={onSearch} searchResults={searchResults}/>
                    </div>
                )}
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
                            <div ref={profileRef} className='profile_container'>
                                <a href="/"><h3>Conta</h3></a>
                                <a href="/"><h3>Perfil</h3></a>
                                <a href="/" onClick={handleLogout}><h3>Sair</h3></a>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='options_container_login'>
                        <BtnAuthRegister title='Inscrever-se'/>
                        <BtnAuthLogin title='Entrar'/>
                    </div>
                )}
            </div>
        </header>
    );
}
