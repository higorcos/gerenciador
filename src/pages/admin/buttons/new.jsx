
import Navbar from "../../../components/public/Navbar"
import ShowInfor from "../../../components/public/ShowInfor"
import NewButton from "../../../components/admin/buttons/new/New"

export default function newButton(){
    return(<>
    <Navbar/>
    <ShowInfor/>
    <div className="box-horizontal">
    <section className="title-card-margin">
       

        <NewButton/>
    </section>
   
    </div>

    </>)
}


