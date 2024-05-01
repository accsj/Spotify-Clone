import '../Loader/Loader.css';
import React from 'react';
import Loading from '../../assets/imgs/LoaderGreen.svg';

function Loader () {

    return (
        <div className="loader_container">
            <img src={Loading} alt="loading" className="loader" />
        </div>
    )
}

export default Loader;