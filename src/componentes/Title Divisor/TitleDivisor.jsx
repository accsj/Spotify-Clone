import '../Title Divisor/TitleDivisor.css'
import BtnShowall from "../ButtonShowAll/BtnShowAll";


function TitleDivisor({title}) {
    return (
        <div className='title'>
            <h2>{title}</h2>
            <BtnShowall />
        </div>
    )
}

export default TitleDivisor;