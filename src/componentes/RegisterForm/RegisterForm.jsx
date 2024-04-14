import '../../componentes/RegisterForm/RegisterForm.css';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';

function RegisterForm () {
    const navigate = useNavigate();

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

    return (
        <section className="register_form_container">
            <div className="register_title">
                <h1>Se inscreva e comece a curtir</h1>
            </div>

            <div className="register_form">
                <form>
                    <div className="input_register_box">
                        <label><h4>Endereço de e-mail</h4><input type="text" name='email' placeholder='Endereço de e-mail' required/></label>
                    </div>
                </form>
                <button className="btn_register_form">
                    <h3>Continuar</h3>
                </button>
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
        </section>
    )
}

export default RegisterForm;