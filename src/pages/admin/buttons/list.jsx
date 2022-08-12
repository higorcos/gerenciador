
import Navbar from "../../../components/public/Navbar"
import ShowInfor from "../../../components/public/ShowInfor"
import ListButton from "../../../components/admin/buttons/list/Lists"

export default function newButton(){
    return(<>
    <Navbar/>
    <ShowInfor/>
    <div className="box-horizontal">
    <section className="title-card-margin">
       

    <ListButton/>
    </section>
   
    </div>

    </>)
}


