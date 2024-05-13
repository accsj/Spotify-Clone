import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import RecoveryPage from './pages/Recovery/Recovery';
import RecoveryPass from './pages/RecoveryPass/RecoveryPass';
import { ToastContainer } from 'react-toastify';
import SearchPage from './pages/Search/SearchPage';
import useCheckAuthentication from './modules/Authenticator';
import { Navigate } from 'react-router-dom';

const AppRouter = () => {
    const isAutenticado = useCheckAuthentication();

    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path='/entrar' element={isAutenticado ? <Navigate to='/'/> : <LoginPage/>} />
                <Route path='/registro' element={isAutenticado ? <Navigate to='/'/> : <RegisterPage/>} />
                <Route path='/redefinir-senha' element={isAutenticado ? <Navigate to='/'/> : <RecoveryPage />} />
                <Route path='/atualizar-senha/:token' element={isAutenticado ? <Navigate to='/'/> : <RecoveryPass />} />
                <Route path='/search' element={<SearchPage/>}/>
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppRouter />
);
