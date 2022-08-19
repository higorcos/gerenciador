
import Navbar from "../../../components/public/Navbar"
import ShowInfor from "../../../components/public/ShowInfor"
import EditButton from "../../../components/admin/buttons/edit/Edit"
import { useParams } from "react-router-dom"


export default function EditButtonPage(){
    const {idButton} = useParams()
    return(<>
    <Navbar/>
    <div className="box-horizontl">
    <section className="title-card-marsin">
       

    <EditButton id={idButton}/>
    </section>
   
    </div>

    </>)
}

// rgb(237 237 237)
