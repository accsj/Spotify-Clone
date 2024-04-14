import HeaderAuth from '../../componentes/HeaderAuth/HeaderAuth';
import RegisterForm from '../../componentes/RegisterForm/RegisterForm';
import FooterAuth from '../../componentes/FooterAuth/FooterAuth';

function RegisterPage () {


    return (
        <>
        <main className="register_container_form">
            <HeaderAuth />
            <RegisterForm />
        </main>
        <FooterAuth />
        </>
    )

}


export default RegisterPage;