
import Navbar from "../../../components/public/Navbar"
import ShowInfor from "../../../components/public/ShowInfor"
import ListButton from "../../../components/admin/buttons/list/Lists"

export default function newButton(){
    return(<>
    <Navbar/>
    <ShowInfor/>
    <div className="box-horizontal2">
    <section className="title-card-margin2">
       

    <ListButton/>
    </section>
   
    </div>

    </>)
}


