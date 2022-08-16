import ButtonHome from "../../components/public/ButtonHome"
import Navbar from "../../components/public/Navbar"
import ShowInfor from "../../components/public/ShowInfor"
import Uploas from "../../components/upload"

export default function Home(){
    return(<>
    <Navbar/>
    <ShowInfor/>
    <div className="box-horizontal">
    <section className="title-card-margin">
        <h6>Funções</h6>
    <Uploas/>
    </section>
    </div>

    </>)
}


