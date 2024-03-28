import '../../assets/styles/Home.css';
import Sidebar from '../../componentes/Sidebar/Sidebar';
import Header from '../../componentes/Header/Header';
import PlaylistContent from '../../componentes/PlaylistContent/PlaylistContent';
import Footer from '../../componentes/Footer/Footer';


export default function HomePage () {

    return (
        <>
        <main className="main_container">
            <Sidebar />
            <Header />
            <PlaylistContent />
            <Footer />
        </main>
        </>
    )
}


