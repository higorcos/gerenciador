import "./Lists.css";
import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../../../services/api";
import Loading from "../../../utils/loading/LoadingFull";
import { PortalContext } from "../../../../contexts/portal";
import { useContext } from "react";
 
function List() {
  const [buttonNULL, setButtonNULL] = useState([]);
  const [button, setButton] = useState([]);
  const [resultDelete, setResultDelete] = useState('')
  const [removeLoading, setRemoveLoading] = useState(false) //loading


  const [boxSelectPortal, setBoxSelectPortal] = useState(false)
  const [idPortal,setIdPortal] = useState(null)
  const [optionPortal,setOptionPortal] = useState(null)
  const [namePortal,setNamePortal] = useState(null)
  const {setPortal, showPortal} = useContext(PortalContext)



  useEffect(() => {
    setRemoveLoading(false)
    const f = async ()=>{
      await api.get(`/fakeID/portal/show/available`).then((res) => {
        
        setOptionPortal(res.data.res);
        console.log(optionPortal)
      }).catch((err)=>{
        console.log('erro')
      });
      setRemoveLoading(true)
    }
    const res = f()

  }, []);

  useEffect(() => {
    setRemoveLoading(false)
    const func = async () =>{
      await api.get(`/${idPortal}/button/show/all`).then((res) => {
        setButtonNULL(res.data.resultNULL);
        setButton(res.data.result); 
      });
      setRemoveLoading(true)
    }
    func()
    if( optionPortal != null)
    optionPortal.map((item)=>{
      if(item.UUID == idPortal){
        setNamePortal(item.NOME)
        setPortal(item)
        }})
  }, [idPortal]);

  const clickLoading = ()=>{
    setRemoveLoading(false)
  }

  useEffect(() => {
    setButton(button.filter((b) => b.ID !== resultDelete));  
  setButtonNULL(buttonNULL.filter((b) => b.ID !== resultDelete));  
  setRemoveLoading(true)
  // eslint-disable-next-line
}, [resultDelete]);

  const deleteButton = (idButton) => {
    const alertConf = window.confirm("Quer deletar o botão ?");
    if (alertConf) {
      setRemoveLoading(false)
      api
        .delete(`${idPortal}/button/delete/${idButton}`)
        .then((res) => {
          const result = res.data;
          if (result.err) {
            alert("Erro ao tentar deletar");
          } else {
            setRemoveLoading(true)
            setResultDelete(idButton);  
            
          }
        })
        .catch((err) => {
          alert("Erro, banco de dados");
        });
    }
  };

  const SubmitSelectPortal = async(e)=>{
    e.preventDefault();
    setBoxSelectPortal(false)

  }

  
  return (
    <>
     {!removeLoading && <Loading/> }
    <div className="container list-ste">
      <div className="Title-list-news-admin">
        <h3>Botões dos Portais</h3>
      </div>
     
    <div className="btn-list-add">
    <Button
        className="btn-success"
        variant="primary"
        href={"/botoes/criar"}
        onClick={() => clickLoading()}

      >
        Criar novo Botão
      </Button>
      <div className="Title-list-news-admin">
        <br/>
        <h6>Botões de Genéricos (Padrão de todos os portais)</h6>
      </div>
     </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Visibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {buttonNULL != undefined && <>
          {buttonNULL.map((button, index) => (
            <tr key={index}>
              <td title={button.NOME}
              className="title-td">{button.NOME.substr(0, 30)}{button.NOME.substr(30).length !== 0 && "..."}</td>
              <td>{button.DISPONIVEL ===1 ? "Visível" : "Invisível"}</td>
              <td>
               
                <Button
                  className="btn-Danger"
                  variant="warning"
                  // href={"/admin/noticias/editar/" + button.ID}
                  onClick={() => alert("Em manutenção")}

                  // onClick={() => clickLoading()}

                >
                  Editar
                </Button>
                <Button
                  className="btn-Danger"
                  variant="danger"
                  onClick={() => deleteButton(button.ID)}
                >
                  Apagar
                </Button>
              </td>
            </tr>
          ))}</>}
        </tbody>
      </Table>
      {buttonNULL != undefined && <>
      {buttonNULL.length === 0 && <p className="resultTxt">Nenhum resultado</p>}
    </>}


    <div className="btn-list-add">
    <label className="form-news">
            Selecione botões de um Portal:
            <select   
              className="select select-category2 form-input-news" 
              onChange={(e) => setIdPortal(e.target.value)}
              defaultValue={idPortal}
            >
              <option disabled selected>Selecione um portal para continuar</option>
              {optionPortal == null
                ? ""
                : <>
                { optionPortal.map((item, i) => (
                    <option value={item.UUID} key={i}> 
                      {item.NOME}
                    </option>
                  ))} 
                </>
                  }
            </select>
          </label>
      <div className="Title-list-news-admin">
        <br/>
        <h6>Botões Unitários (Especifico de um portal)</h6>
        {namePortal != null && <h4 >
            {namePortal}
          </h4>}

      </div>
     </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Visibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
        {button != undefined && <>

        {button.map((button, index) => (
             <tr key={index}>
              <td title={button.NOME}
              className="title-td">{button.NOME.substr(0, 30)}{button.NOME.substr(30).length !== 0 && "..."}</td>
             
             <td>{button.DISPONIVEL ===1 ? "Visível" : "Invisível"}</td>
             <td>
              
               <Button
                 className="btn-Danger"
                 variant="warning"
                //  href={"/admin/noticias/editar/" + button.ID}
                 onClick={() => alert("Em manutenção")}

                //  onClick={() => clickLoading()}

               >
                 Editar
               </Button>
               <Button
                 className="btn-Danger"
                 variant="danger"
                 onClick={() => deleteButton(button.ID)}
               >
                 Apagar
               </Button>
             </td>
           </tr>
         ))}
         </>}
        </tbody>
      </Table>
      {button != undefined && <>
      {button.length === 0 && <p className="resultTxt">Nenhum resultado</p>}
      </>}
      </div>
      



    {boxSelectPortal && (<>
    <div className="card_plus_office-new">
     <div  className="box-office-new">
        <div className="Title_card_plus">
          <h3>Selecione o Portal</h3>
        </div>
       
    </div>
      <form  className="form-admin-office">
          
          <label className="form-office-new ">
          
            <div className="form-news office-select">
            <select   
              className="select select-category2 form-input-news" 
              onChange={(e) => setIdPortal(e.target.value)}
              defaultValue={0}
            >
              <option disabled selected>Selecione um portal para continuar</option>
              {optionPortal == null
                ? ""
                : <>
                { optionPortal.map((item, i) => (
                    <option value={item.UUID} key={i}> 
                      {item.NOME}
                    </option>
                  ))} 
                </>
                  }
            </select>
            </div>
          </label>
          <input type="submit" onClick={(e)=>SubmitSelectPortal(e)} value="Continuar" className="button-submit" />
        </form>
    </div>
      
      </>)}
    
      </>
  );
}

export default List;
