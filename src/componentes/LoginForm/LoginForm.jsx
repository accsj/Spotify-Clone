import '../LoginForm/LoginForm.css';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Loader from '../Loader/Loader';


export default function LoginForm () {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleNavigateRecovery = (event) => {
        event.preventDefault();
        navigate('/recuperar-senha')
    }

    const handleNavigateRegister = (event) => {
        event.preventDefault();
        navigate('/registro')
    }

    const handleClickLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

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
        } finally {
            setLoading(false);
        }
    };


    const handleClickLoginRegister = async(username, email, sub) => {

        
        try {
            const response = await Axios.post("http://localhost:5000/googleloginregister", {
                username,
                email,
                sub
            });

            if (response.data.success) {
                toast.success('Login realizado com sucesso!', {
                    position: "top-left",
                    autoClose: 2000,
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
                toast.error('Erro ao realizar o login com google', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        } catch (error) {
            toast.error('Erro ao realizar o login com google', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    };
    
    const responseGoogle = (credentialResponse) => { 
        const data = jwtDecode(credentialResponse.credential)
        const username = data.given_name;
        const email = data.email;
        const sub = data.sub;
        handleClickLoginRegister(username, email, sub);
    } 

    const togglePasswordVisibility = (event) => {
        event.preventDefault(); 
        setShowPassword(!showPassword);
    };

    return (
        <section className="login_container_form">
            {loading && <div className="loading_overlay">
                <Loader />
            </div>}
            <div className="login_content" style={{ opacity: loading ? 0.5 : 1 }}>
                <div className="title_auth">
                    <h1>Entrar no Spotify</h1>
                </div>
                <div className="GoogleLogin" onClick={handleClickLoginRegister}>
                    <GoogleOAuthProvider clientId={'457811923207-lchllp9jusgpmnb98r0en5p6vh7m56n3.apps.googleusercontent.com'}>
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                        />
                    </GoogleOAuthProvider>
                </div>
                <form className="loginform" onSubmit={handleClickLogin}>
                    <div className='input_box'>
                        <label htmlFor=""><h4>E-mail ou nome de usuário</h4><input type="text" name='username' placeholder='E-mail ou nome de usuário' required onChange={(e) => setUsername(e.target.value)}/></label>
                    </div>

                    <div className='input_box'>
                        <label htmlFor=""><h4>Senha</h4><input type={showPassword ? "text" : "password"} name='password' placeholder='Senha' required onChange={(e) => setPassword(e.target.value)}/></label>
                        <div className='hideshow' onClick={togglePasswordVisibility}>
                            <i className={showPassword ? 'bx bx-hide' : 'bx bx-show-alt'}></i>
                        </div>
                    </div>

                    <div className="login_buttons">
                        <button className='btn_login_form' disabled={loading}>
                            <h3>Entrar</h3>
                        </button>

                        <div className="recovery">
                            <button className='btn_recovery_link' onClick={handleNavigateRecovery}>Esqueceu a senha?</button>
                        </div>

                        <div className="registro_link">
                            <p>Não tem uma conta? <button className='btn_registro_link' onClick={handleNavigateRegister}>Inscrever-se no Spotify</button></p>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}