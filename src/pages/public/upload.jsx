
import Navbar from "../../components/public/Navbar"
import ShowInfor from "../../components/public/ShowInfor"
import Uploads from "../../components/utils/Upload"

export default function Home(){
    return(<>
    <Navbar/>
    <ShowInfor/>
    <div className="box-horizontal">
    <section className="title-card-margin">
        <h6>Funções</h6>
    <Uploads/>
    </section>
    </div>

    </>)
}


