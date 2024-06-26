import '../SearchBox/SearchBox.css';
import { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";

function SearchBox ({onSearch}) {
    const [searchItem, setSearchItem] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchItem(event.target.value);
        onSearch(value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchItem)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const handleClear = (event) => {
        event.preventDefault();
        setSearchItem(''); 
        onSearch('');
    };

    

    return (
        <>
        <form className="search_box_container" onSubmit={handleSubmit}>
            <button type="submit" className="search_icon_button">
                <IoSearchSharp className='search_icon'/>
            </button>
            <div className="input_box_search">
                <input 
                type="text"
                placeholder="O que você quer ouvir?"
                value={searchItem}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                />
            </div>
            {searchItem && <FaXmark className='search_del_icon' onClick={handleClear}/>}
        </form>
        </>
    )
}

export default SearchBox;