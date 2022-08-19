
import Loading from "./loading/LoadingFull";

import React, { useState} from "react";
import api from "../../services/api";
import { imagemURL } from "../../services/variables";

export default function NewButton() {
  

  const [removeLoading, setRemoveLoading] = useState(true)
  const [boxResult, setBoxResult] = useState(false)
  const [res, setRes] = useState([])

  const [img, setImg] = useState("");

 


  //submit formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
  
   setRemoveLoading(false);

     const dataJson = new FormData();
    dataJson.append("up", img);
     const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      }, 
    }; 
 
     await api
      .post(`/fakeid/upload`, dataJson, headers)
      .then((res) => {
        if (res.data.err) {
          alert("Ocorreu um erro, tente novamente!!!");
          setRemoveLoading(true);
        } else {
          setRemoveLoading(true);
          const result = imagemURL +res.data.res
          setRes(result)
          console.log('sucesso')
          setBoxResult(true)
        }
      })
      .catch((err) => {
        setRemoveLoading(true);
        alert("Ocorreu um erro, tente novamente!!!");
      });
  };

  return (
    <>
      {!removeLoading && <Loading />}

      <div className="content-admin-news">
        <form onSubmit={handleSubmit} className="form-admin-news">
          <h3>Upload de arquivo</h3>

          

          <label className="form-news form-file">
            Arquivo
            <input
              type="file"
              name="imgTop"
              
              className="form-input-news"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <div className="form-file-new-box">
             <p>
                {img !== "" && img !== undefined ? (
                  <>
                    <a
                      href={URL.createObjectURL(img)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visualizar imagem"
                    >
                    
                      Visualizar 
                    </a>
                  </>
                ) : (
                  "Selecionar um arquivo"
                )}
              </p> 
              <p>Buscar</p>
            </div>
          </label>
          <input type="submit" value="Fazer Upload" className="button-submit" />
        </form>
      </div>

      {boxResult && (<>
      <div className="fundo">
    <div className="card_plus_office-new upload-card-res">
     <div  className="box-office-new">
        <div className="Title_card_plus card-text-resutl">
          <h3>Link do arquivo</h3>
          <a href={res != undefined ? res : '#'} 
          target="_blank" rel="noopener noreferrer"
          >Abrir arquivo</a>
          
        </div>
       
    <img  onClick={(e)=>( setBoxResult(false))} src='icons/close.svg' className="button-close-icons" />
        </div>
     
    </div>
    </div>
      </>)}
    </>
  );
}
