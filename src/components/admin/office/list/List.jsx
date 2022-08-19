import { Button, Table } from "react-bootstrap";
import "./list.css";
import { useState, useEffect } from "react";
import api from "../../../../services/api";
import Loading from "../../../utils/loading/LoadingFull";

import { PortalContext } from "../../../../contexts/portal";
import { useContext } from "react";
 
export default function ListOffice() {
  const [Office, setOffice] = useState([]);
  const [OfficeOthers, setOfficeOthers] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false) //loading
  const [resultDelete, setResultDelete] = useState([])
  const [filterOption, setFilterOption] = useState([])
  const [resultFilterOption, setResultFilterOption] = useState([])
  
 
  const [boxSelectPortal, setBoxSelectPortal] = useState(true)
  const [idPortal,setIdPortal] = useState(null)
  const [optionPortal,setOptionPortal] = useState(null)
  const [namePortal,setNamePortal] = useState(null)
  const {setPortal} = useContext(PortalContext)


  
  useEffect(() => {
    setRemoveLoading(false)
    
      api.get(`/fakeID/portal/show/available`).then((res) => {       
        setOptionPortal(res.data.res);
        setResultFilterOption(res.data.res);
        
      }).catch((err)=>{
        console.log('erro')
      });
      setRemoveLoading(true)

  }, []);

  useEffect(() => {
    setRemoveLoading(false)

    api.get(`/${idPortal}/office/show`).then((res) => {
      setOffice(res.data.Gabinete);
      setOfficeOthers(res.data.Outros)
      setRemoveLoading(true)
      
    });
    if( resultFilterOption != null)
    resultFilterOption.map((item)=>{
      if(item.UUID == idPortal){
        setNamePortal(item.NOME)
        setPortal(item)
        }})
  }, [idPortal]);
  
  useEffect(() => {
      setOffice(Office.filter((Office) => Office.ID !== resultDelete));  
    setOfficeOthers(OfficeOthers.filter((Office) => Office.ID !== resultDelete));  
    setRemoveLoading(true)
    // eslint-disable-next-line
  }, [resultDelete]);
  useEffect(()=>{
    if(filterOption != null && filterOption != undefined){
      if(optionPortal != null && optionPortal != undefined){

    setResultFilterOption(optionPortal.filter((item,index)=>{
      const nameCase = (item.NOME).toLowerCase()
      if(nameCase.includes(filterOption.toString().toLowerCase())){
       // console.log(nameCase)
        return item
      }
    }))
    }} 
   // console.log(resultFilterOption)   
  // eslint-disable-next-line                  
  },[filterOption])

  const clickLoading = ()=>{
    setRemoveLoading(false)
  }
  const SubmitSelectPortal = async(e)=>{
    e.preventDefault();
    setBoxSelectPortal(false)

  }

  const deleteOffice = (idOffice,nameImg) => {
    const alertConf = window.confirm("Quer deletar ?");
    if (alertConf) {
      setRemoveLoading(false)
      api
        .delete(`/${idPortal}/office/delete/${idOffice}`)//${nameImg}
        .then((res) => {
          const result = res.data;
          if (result.err) {
            alert("Erro ao tentar apagar a noticia");
          } else {
              ///const result = Office.filter((Office) => Office.ID !== idOffice);
              setResultDelete(idOffice)
          }
        })
        .catch((err) => {
          alert("Erro, banco de dados");
          setRemoveLoading(true)

        });
    }
  };


  return (
    <>
     {!removeLoading && <Loading/> }
    <div className="container list-ste">
      <div className="Title-list-news-admin">
        <h3>Painel das Competências</h3>
          {namePortal != null && <h6 >
            {namePortal}
          </h6>}
      </div>
     
    <div className="btn-list-add">
    <Button
        className="btn-success"
        variant="primary"
        href={`/competencia/criar`}
        onClick={() => clickLoading()}

      >
        Adicionar Representante
      </Button>
    </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Area</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Office.map((Office, index) => (
            <tr key={index}>
              <td className="title-t">{Office.NOME}</td>

              <td className="views-t">{Office.CATEGORIA}</td>
              <td className="views-t">{Office.TIPOAREA}</td>
              <td>
                {/* <Button
                  className="btn-Danger"
                  variant="warning"
                  href={"/admin/competencias/editar/" + Office.ID}
                  onClick={() => clickLoading()}

                >
                  Editar
                </Button> */}
                <Button
                  className="btn-Danger"
                  variant="danger"
                  onClick={() => deleteOffice(Office.ID,Office.IMG)}
                >
                  Apagar
                </Button>
              </td>
            </tr>
          ))}
           {OfficeOthers.map((Office, index) => (
            <tr key={index}>
              <td className="title-t">{Office.NOME}</td>

              <td className="views-t">{Office.CATEGORIA}</td>
              <td className="views-t">{Office.TIPOAREA}</td>
              <td>
                {/* <Button
                  className="btn-Danger"
                  variant="warning"
                  href={"/admin/competencias/editar/" + Office.ID}
                  onClick={() => clickLoading()}

                >
                  Editar
                </Button> */}
                <Button
                  className="btn-Danger"
                  variant="danger"
                  onClick={() => deleteOffice(Office.ID,Office.IMG)}
                >
                  Apagar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {(Office.length === 0 && OfficeOthers.length ===0) && <p className="resultTxt">Nenhum resultado</p>}
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
            <input
              type="text"
              name="title"
              placeholder="Filtrar Opções"
              className="form-input-news"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
            />
          
            <div className="form-news office-select">
            <select   
              className="select select-category2 form-input-news" 
              onChange={(e) => setIdPortal(e.target.value)}
              defaultValue={0}
            >
              <option disabled selected>Selecione um portal para continuar</option>
              {resultFilterOption == null
                ? ""
                : <>
                { resultFilterOption.map((item, i) => (
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


