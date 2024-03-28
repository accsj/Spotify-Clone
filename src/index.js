import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';



const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppRouter />
);
