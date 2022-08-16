
import Loading from "./utils/loading/LoadingFull";

import React, { useState} from "react";
import api from "../services/api";
import { imagemURL } from "../services/variables";

export default function NewButton() {
  

  const [removeLoading, setRemoveLoading] = useState(true)

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
          alert(`Acesse o seu arquivo no link: ${imagemURL +res.data.res }`);
          setRemoveLoading(true);
        
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
    </>
  );
}
