import '../../assets/styles/Login.css';
import HeaderAuth from '../../componentes/HeaderAuth/HeaderAuth';
import LoginForm from '../../componentes/LoginForm/LoginForm';
import FooterAuth from '../../componentes/FooterAuth/FooterAuth';

export default function LoginPage () {

    return (
        <>
        <main className="main_container">
            <HeaderAuth />
            <LoginForm />
        </main>
            <FooterAuth />
        </>
    )
}