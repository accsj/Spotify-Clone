import '../RecoveryForm/RecoveryForm.css';
import React, {useState} from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function RecoveryForm () {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const handleRecoverySubmit = async (event) => {
        event.preventDefault();
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
        try {
            const response = await Axios.post("http://localhost:5000/recovery", {
                email
            });

            if (response.data.success) {
                toast.success('Link enviado com sucesso', {
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
                toast.error('Erro ao realizar o envio do link', {
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
        <section className="recovery_form_container">
                <div className="recovery_title">
                    <h1>Redefina sua senha</h1>
                    <p>Insira seu e-mail ou nome de usuário pra enviarmos um link pra você acessar sua conta.</p>
                </div>
                <form className="recovery_form" onSubmit={handleRecoverySubmit}>
                    <div className="input_recovery_box">
                        <label><h4>Endereço de e-mail ou nome de usuário</h4></label>
                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <button className="btn_recovery_form">
                        <h3>Enviar link</h3>
                    </button>
                </form>
        </section>
    )
}

export default RecoveryForm;