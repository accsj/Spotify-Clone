import '../BtnAuthRegister/BtnAuthRegister.css';
import {useNavigate} from 'react-router-dom';

function BtnAuthRegister ({title}) {

    const navigate = useNavigate();

    const handleClickRegistro = (event) => {
        event.preventDefault();
        navigate("/registro")
    }

    return (
        <button className="btn_registro" onClick={handleClickRegistro}>
            <div className="registro_container">
                <h3>{title}</h3>
            </div>
        </button>
    )
}

export default BtnAuthRegister;