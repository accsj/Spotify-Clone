import '../ButtonShowAll/BtnShowAll.css'

export default function BtnShowall ({showMore}) {

    return (
        <button className="showall" onClick={showMore}>
            <p>Mostrar tudo</p>
        </button>
    )
}