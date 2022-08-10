import ButtonHome from "../../components/public/ButtonHome"
import Navbar from "../../components/public/Navbar"
import ShowInfor from "../../components/public/ShowInfor"
import {buttons as buttonsSpeed} from "../../variables/buttonHome"

export default function Home(){
    return(<>
    <Navbar/>
    <ShowInfor/>
    <div className="box-horizontal">
    <section className="title-card-margin">
        <h6>Funções</h6>
    <ButtonHome names={buttonsSpeed} filter={[]}/>
    </section>
    <section className="title-card-margin">
        <h6>Avisos</h6>
        <div className="Danger-card">
            <ul>
                <li>Finalizar Gerenciador</li>
                <li>Backend Button Transparência</li>
                <li>Noticias OK</li>
                <li>Competências OK</li>
                <li>VIEWS OK</li>
            </ul>
        </div>
    </section>
    </div>

    </>)
}


