import { Button, Table } from "react-bootstrap";
import "./list.css";
import { useState, useEffect } from "react";
import api from "../../../../services/api";
import Loading from "../../../utils/loading/LoadingFull";

 
export default function ListOffice() {
  const [Office, setOffice] = useState([]);
  const [OfficeOthers, setOfficeOthers] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false) //loading
    const [resultDelete, setResultDelete] = useState([])

  useEffect(() => {
    api.get("/office/show").then((res) => {
      setOffice(res.data.Gabinete);
      setOfficeOthers(res.data.Outros)
      setRemoveLoading(true)
      
    });
  }, []);
  useEffect(() => {
      setOffice(Office.filter((Office) => Office.ID !== resultDelete));  
    setOfficeOthers(OfficeOthers.filter((Office) => Office.ID !== resultDelete));  
    setRemoveLoading(true)
    // eslint-disable-next-line
  }, [resultDelete]);

  const clickLoading = ()=>{
    setRemoveLoading(false)
  }

  const deleteOffice = (idOffice,nameImg) => {
    const alertConf = window.confirm("Quer deletar ?");
    if (alertConf) {
      setRemoveLoading(false)
      api
        .delete(`/office/delete/${idOffice}`)//${nameImg}
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
      </div>
     
    <div className="btn-list-add">
    <Button
        className="btn-success"
        variant="primary"
        href={"/competencia/criar"}
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
      </>
  );
}


