import "./Lists.css";
import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../../../services/api";
import Loading from "../../../utils/loading/LoadingFull";

 
function List() {
  const [buttonNULL, setButtonNULL] = useState([]);
  const [button, setButton] = useState([]);
  const [resultDelete, setResultDelete] = useState('')
  const [removeLoading, setRemoveLoading] = useState(false) //loading


  useEffect(() => {
    setRemoveLoading(false)
    const func = async () =>{
      await api.get("/button/show/all").then((res) => {
        setButtonNULL(res.data.resultNULL);
        setButton(res.data.result); 
      });
    }
    func()
    setRemoveLoading(true)
  }, []);
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
        .delete(`/button/delete/${idButton}`)
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
          ))}
        </tbody>
      </Table>
      {buttonNULL.length === 0 && <p className="resultTxt">Nenhum resultado</p>}
    


    <div className="btn-list-add">
    <label className="form-news">
            Selecione botões de um Portal:
            <select
              className="select select-category form-input-news"
              defaultValue={1} //1== id da categoria geral
              // onChange={(e) => setCategorySelect(e.target.value)}
            >
            {/* {category == null
                ? ""
                : category.map((item, i) => (
                    <option value={item.ID} key={i}>
                      {item.TIPO_NOME}
                    </option>
                  ))}  */}
                  <option value="1" >
                      Portal de Raposa
                    </option>
            </select>
          </label>
      <div className="Title-list-news-admin">
        <br/>
        <h6>Botões Unitários (Especifico de um portal)</h6>
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
        </tbody>
      </Table>
      </div>
      
    
      </>
  );
}

export default List;
