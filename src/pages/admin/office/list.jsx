
import Navbar from "../../../components/public/Navbar"
import ListOffice from "../../../components/admin/office/list/List"


export default function listOffice(){
    return(<>
    <Navbar/>
    
    <div className="box-horizontal">
    <section className="title-card-margin">
       

      <ListOffice/>
    </section>
   
    </div>

    </>)
}


