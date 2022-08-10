import { Button, Table } from "react-bootstrap";
import "../../styles/lists.css";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Loading from "../LoadingFull";

 
function List() {
  const [news, setNews] = useState([]);

  const [removeLoading, setRemoveLoading] = useState(false) //loading


  useEffect(() => {
    api.get("/news").then((res) => {
      setNews(res.data.res);
      setRemoveLoading(true)
      
    });
  }, []);
  const clickLoading = ()=>{
    setRemoveLoading(false)
  }

  const deleteNews = (idNews,nameImg) => {
    const alertConf = window.confirm("Quer deletar a noticia ?");
    if (alertConf) {
      setRemoveLoading(false)
      api
        .post(`/news/delete/${idNews}/${nameImg}`)
        .then((res) => {
          const result = res.data;
          if (result.err) {
            alert("Erro ao tentar apagar a noticia");
          } else {
            setRemoveLoading(true)
            const resultDelete = news.filter((news) => news.ID !== idNews);
            setNews(resultDelete);  
          }
        })
        .catch((err) => {
          alert("Erro, banco de dados");
        });
    }
  };

  const dateRender = (dateReq) => {
    const date = new Date(dateReq);
    const formatDate =
      date.getDate() + "/" + monthDigit(date) + "/" + date.getFullYear();

    return formatDate;
  };
  const monthDigit = (dateReq) => {
    const dateString = dateReq.getMonth() + 1;
    if (dateString >= 10) {
      return dateString;
    } else {
      return "0" + dateString;
    }
  };

  
  return (
    <>
     {!removeLoading && <Loading/> }
    <div className="container list-ste">
      <div className="Title-list-news-admin">
        <h3>Painel de Notícias</h3>
      </div>
     
    <div className="btn-list-add">
    <Button
        className="btn-success"
        variant="primary"
        href={"/admin/noticias"}
        onClick={() => clickLoading()}

      >
        Criar nova notícia
      </Button>
    </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Data</th>
            <th>Visualizações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {news.map((news, index) => (
            <tr key={index}>
              <td className="title-td">{news.TITULO}</td>

              <td>{dateRender(news.DATA_POST)}</td>
              <td className="views-td">{news.VISUALIZACAO}</td>
              <td>
                <Button
                  className="btn-Danger"
                  variant="primary"
                  href={"/noticia/" + news.ID}
                  onClick={() => clickLoading()}

                >
                  Ver
                </Button>
                <Button
                  className="btn-Danger"
                  variant="warning"
                  href={"/admin/noticias/editar/" + news.ID}
                  onClick={() => clickLoading()}

                >
                  Editar
                </Button>
                <Button
                  className="btn-Danger"
                  variant="danger"
                  onClick={() => deleteNews(news.ID,news.IMG)}
                >
                  Apagar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {news.length === 0 && <p className="resultTxt">Nenhum resultado</p>}
    </div>
      </>
  );
}

export default List;
