import '../LoginForm/LoginForm.css';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function LoginForm () {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleClickLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await Axios.post("http://localhost:5000/login", {
                username,
                password
            });

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
                document.cookie = `token=${response.data.token}; path=/`;
                navigate("/");
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
    };


    return (
        <section className="login_container_form">
            <div className="title_auth">
                <h1>Entrar no Spotify</h1>
            </div>
            <button className="google_login">
                    <h3>Continuar com o google</h3>
            </button>
    
            <form className="loginform" onSubmit={handleClickLogin}>
                <div className='input_box'>
                    <label htmlFor=""><h4>E-mail ou nome de usuário</h4><input type="text" name='username' placeholder='E-mail ou nome de usuário' required onChange={(e) => setUsername(e.target.value)}/></label>
                </div>

                <div className='input_box'>
                    <label htmlFor=""><h4>Senha</h4><input type="password" name='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)}/></label>
                    <button className='hideshow'>
                        <i class='bx bx-show-alt'></i>
                    </button>
                </div>

                <button className='btn_submit'>
                    <h3>Entrar</h3>
                </button>

                <div className="recovery">
                    <a href="recovery">Esqueceu a senha?</a>
                </div>

                <div className="registro_link">
                    <p>Não tem uma conta? <a href="registro">Inscrever-se no Spotify</a></p>
                </div>
            </form>
        </section>
    )
}