import '../RecoveryPassForm/RecoveryPassForm.css';
import React, {useState} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import Loader from '../Loader/Loader';

function RecoveryPassForm () {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClickPassRecovery = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (password.length < 8) {
            toast.info('O senha deve conter no mínimo 8 caracteres.', {
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
            toast.info('As senhas não coincidem', {
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
            const response = await Axios.post('http://localhost:5000/recovery-pass', {
                password,
                token: token
            })
            if (response.data.success) {
                toast.success('Senha redefinida com sucesso', {
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
                toast.error('Erro ao registrar nova senha', {
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
        }
        catch (error) {
            toast.error('Senha já em uso, insira outra', {
                position: "top-left",
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
    }

    const togglePasswordVisibility = (event) => {
        event.preventDefault(); 
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = (event) => {
        event.preventDefault(); 
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <section className="recovery_pass_form_container">
            {loading && <div className="loading_overlay">
                <Loader />
            </div>}
            <div className="recovery_pass_form_content">
                <div className="recovery_pass_title">
                    <h1>Redefina sua senha</h1>
                    <p>Por favor insira sua nova senha abaixo.</p>
                </div>
                <form className="recovery_pass_form" onSubmit={handleClickPassRecovery}>
                    <div className="input_recovery_pass_box">
                        <label><h4>Nova Senha</h4></label>
                        <input type={showPassword ? "text" : "password"} name="password" onChange={(e) => setPassword(e.target.value)} required/>
                        <div className="hideshowResetPassword" onClick={togglePasswordVisibility}>
                            <i className={showPassword ? 'bx bx-hide' : 'bx bx-show-alt'}></i>
                        </div>
                    </div>
                    <div className="input_recovery_pass_box">
                        <label><h4>Confirme a nova senha</h4></label>
                        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        <div className="hideshowResetPassword" onClick={toggleConfirmPasswordVisibility}>
                            <i className={showConfirmPassword ? 'bx bx-hide' : 'bx bx-show-alt'}></i>
                        </div>
                    </div>
                    <button className="btn_recovery_pass_form">
                        <h3>Redefinir senha</h3>
                    </button>
                </form>
            </div>
        </section>
    )
}

export default RecoveryPassForm;