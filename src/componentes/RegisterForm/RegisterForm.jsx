import '../../componentes/RegisterForm/RegisterForm.css';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import React, {useState} from 'react';
import { FaChevronLeft } from "react-icons/fa6";

function RegisterForm () {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleClickNext = () => {
        setStep(step + 1);
    };

    const handleClickBack = () => {
        setStep(step - 1);
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
                toast.error('Erro ao realizar o login com google', {
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
            toast.error('Erro ao realizar o login com google', {
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
    const responseGoogle = (credentialResponse) => { 
        const data = jwtDecode(credentialResponse.credential)
        const username = data.given_name;
        const email = data.email;
        const sub = data.sub;
        handleClickLoginRegister(username, email, sub);
    } 

    const handleClickRegister = async (event) => {
        event.preventDefault(); 
        
        if (username.length < 5) {
            toast.info('O login deve ter no mínimo 5 caracteres.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.info('Por favor, insira um email válido.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
        if (password.length < 8) {
            toast.info('A senha deve ter no mínimo 8 caracteres.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
        if (password !== confirmPassword) {
            toast.info('As senhas não coincidem.', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            return;
        }
        try {
            const response = await Axios.post("http://localhost:5000/register", {
                username,
                email,
                password
            });

            if (response.data.success) {
                toast.success('Usuário cadastrado com sucesso', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate("/entrar");
            } else {
                toast.error('Erro ao realizar o cadastro', {
                    position: "top-left",
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
            toast.info('Ocorreu um erro, tente novamente mais tarde', {
                position: "top-left",
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
        <section className="register_form_container">
            <div className="register_title">
                <h1>Se inscreva e comece a curtir</h1>
            </div>
            {step > 1 && (
            <div className="register_button_back">
                <FaChevronLeft onClick={handleClickBack} />
            </div>
            )}

            <div className="register_form">
                {step === 1 && (
                    <div className="input_register_box">
                        <label><h4>Endereço de e-mail</h4>
                            <input
                                type="email"
                                name='email'
                                placeholder='Endereço de e-mail'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                )}

                {step === 2 && (
                    <div className="input_register_box">
                        <label><h4>Nome de usuário</h4>
                            <input
                                type="text"
                                name='username'
                                placeholder='Nome de usuário'
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                )}

                {step === 3 && (
                    <div className="input_register_box">
                        <div className="input_password_register">
                        <label><h4>Senha</h4>
                            <input
                                type="password"
                                name='password'
                                placeholder='Senha'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <label><h4>Confirmar Senha</h4>
                            <input
                                type="password"
                                name='confirmPassword'
                                placeholder='Confirmar Senha'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </label>
                        </div>
                    </div>
                )}

            <div className="register_buttons">
                {step < 3 && (
                    <button className="btn_register_form" onClick={handleClickNext}>
                        <h3>Avançar</h3>
                    </button>
                    )}
                    {step === 3 && (
                    <button className="btn_register_form" onClick={handleClickRegister}>
                        <h3>Registrar</h3>
                    </button>
                    )}
                    
                    {step === 1 && (
                    <div className="GoogleLogin">
                        <GoogleOAuthProvider clientId={'457811923207-lchllp9jusgpmnb98r0en5p6vh7m56n3.apps.googleusercontent.com'}>
                            <GoogleLogin
                                onSuccess={responseGoogle}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                                onClick={handleClickLoginRegister}
                            />
                        </GoogleOAuthProvider>
                    </div>
                )}
                </div>
                
            </div>
        </section>
    )
}

export default RegisterForm;