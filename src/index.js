import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';



const AppRouter = () => {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path='entrar' element={<LoginPage/>} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppRouter />
);
