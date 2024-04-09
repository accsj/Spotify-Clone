import '../LoginForm/LoginForm.css';

export default function LoginForm () {


    return (
        <section className="login_container_form">
            <div className="title_auth">
                <h1>Entrar no Spotify</h1>
            </div>
            <button className="google_login">
                    <h3>Continuar com o google</h3>
            </button>
    
            <form action="" className="loginform">
                <div className='input_box'>
                    <label htmlFor=""><h4>E-mail ou nome de usuário</h4><input type="text" name='login' placeholder='E-mail ou nome de usuário' required/></label>
                </div>

                <div className='input_box'>
                    <label htmlFor=""><h4>Senha</h4><input type="password" name='senha' placeholder='Senha' required/></label>
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