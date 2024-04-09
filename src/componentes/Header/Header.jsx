import '../Header/Header.css';
import { useState } from 'react';
import BtnAuthLogin from '../BtnAuthLogin/BtnAuthLogin';
import BtnAuthRegister from '../BtnAuthRegister/BtnAuthRegister';


export default function Header () {
    const [menu, setMenu] = useState(false);

    const ShowMenu = () => {
        setMenu(!menu);
    };

    const [auth] = useState(false); // Caso o usuário não esteja autenticado irá mostrar os botões de login e registro

    return (
        <header className='content'>
            <div className='arrow_container'>
                <button className='btn_arrow_previous'>
                    <i className='bx bx-chevron-left'></i>
                </button>
                <button className='btn_arrow_next'>
                    <i className='bx bx-chevron-right'></i>
                </button>
            </div>
            {auth ? (
                <div className='options_container'>
                    <button className='user' onClick={ShowMenu}>
                        <div className='user_container'>
                            <i id='user_photo' className='bx bxs-user-circle'></i>
                            <span className='user_name'>Accsj</span>
                            <i id='arrow_profile' className='bx bxs-down-arrow'></i>
                        </div>
                    </button>
                    {menu && (
                        <div className='profile_container'>
                            <a href="/"><h3>Conta</h3></a>
                            <a href="/"><h3>Perfil</h3></a>
                            <a href="/"><h3>Sair</h3></a>
                        </div>
                    )}
                </div>
            ):(
                <div className='options_container_login'>
                    <BtnAuthRegister title='Inscrever-se'/>
                    <BtnAuthLogin title='Entrar'/>
                </div>
            )}
        </header>
    )
}