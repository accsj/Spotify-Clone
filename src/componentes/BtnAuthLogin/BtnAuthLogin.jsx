import '../BtnAuthLogin/BtnAuthLogin.css';
import {useNavigate} from 'react-router-dom';

function BtnAuthLogin ({title}) {
    const navigate = useNavigate();

    const handleClickLogin = (event) => {
        event.preventDefault();
        navigate("/entrar")
    }

    return (
        <button className='btn_login' onClick={handleClickLogin}>
            <div className='btn_login_container'>
                <h3>{title}</h3>
            </div>
        </button>
    )
}

export default BtnAuthLogin;