import '../Title Divisor/TitleDivisor.css';
import BtnShowall from "../ButtonShowAll/BtnShowAll";

function TitleDivisor({ title, showMore}) {
    return (
        <div className='title'>
            <h2>{title}</h2>
            {showMore && <BtnShowall showMore={showMore} />} 
        </div>
    );
}

export default TitleDivisor;