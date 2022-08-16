import "./New.css";
import Loading from "../../../utils/loading/LoadingFull";

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";

export default function NewButton() {
  
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [categorySelect, setCategorySelect] = useState(1);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [link, setLink] = useState("");
  const [visible, setVisible] = useState(true);
  const [box, setbox] = useState(true);
 
  const [removeLoading, setRemoveLoading] = useState(true); //loading


  const [optionPortal,setOptionPortal] = useState(null)
  const [idPortal,setIdPortal] = useState(null)


  //render Tipos de botões E PORTAIS
  useEffect(() => {
   setRemoveLoading(false);
    api.get("/fakeID/button/show/type").then((res) => {
      setCategory(res.data.res);
      api.get(`/fakeID/portal/show/available`).then((res) => {  
        setOptionPortal(res.data.res);
        
        setRemoveLoading(true);
      }).catch((err)=>{
      setRemoveLoading(true);
        
      });

    }).catch((err)=>{
      setRemoveLoading(true);

    });
  }, []);

  useEffect(() => {
    if(categorySelect == 1){
      setbox(true)
    }else{
      setbox(false)

    }
  }, [categorySelect]);

  useEffect(() => {
   // console.log(img);

    const img2 = img || " "; // se imag for undefined, a img2 será uma string vazia

    if (img2 !== " ") {
      const resultType = img2.type.split("/");
      if (resultType[1] === "svg+xml") {
        //aceita apenas no formato de imagem
        //se for imagem tá tudo ok
      } else {
        alert("Selecione uma imagem do tip .svg");
        setImg("");
      }
    } else if (img2 !== undefined) {
      //setImg({'name': 'LOGO.png', 'lastModified': 1652564602649, 'lastModifiedDate': 'Sat May 14 2022 18:43:22 GMT-0300 (Horário Padrão de Brasília)','webkitRelativePath': '', 'size': 47355,})
    }
  }, [img]);




  const handleOnChange = () => {
    setVisible(!visible);
  }
  //submit formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
  
   setRemoveLoading(false);

     const dataJson = new FormData();
     dataJson.append("name", title);


     if(visible === true){
      dataJson.append("available", 1);

    }else{
      dataJson.append("available", 0);
    }
    
    dataJson.append("icone", img);
    dataJson.append("link", link);
    dataJson.append("type", categorySelect);
    console.log(link, categorySelect, title)

     const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      }, 
    }; 
 
     await api
      .post(`/${idPortal}/button/new`, dataJson, headers)
      .then((res) => {
        if (res.data.err) {
          alert("Ocorreu um erro, tente novamente!!!");
          setRemoveLoading(true);
        } else {
          alert("O botão foi criado com Sucesso");
          setRemoveLoading(true);
          navigate("/botoes/mostrar");
        }
      })
      .catch((err) => {
        //setRemoveLoading(true);
        alert("Ocorreu um erro, tente novamente!!!");
      });
  };

  return (
    <>
      {!removeLoading && <Loading />}

      <div className="content-admin-news">
        <form onSubmit={handleSubmit} className="form-admin-news">
          <h3>Novo Botão</h3>

          <label className="form-news">
            Nome:
            <input
              type="text"
              name="title"
              className="form-input-news"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="form-news form-file">
            Icone: Formato svg
            <input
              type="file"
              name="imgTop"
              accept="image/*"
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
                      <img
                        src={URL.createObjectURL(img)}
                        alt="imagem selecionada"
                        className="img-show-select select-top"
                      />
                      Visualizar Imagem
                    </a>
                  </>
                ) : (
                  "Selecionar imagem"
                )}
              </p> 
              <p>Buscar</p>
            </div>
          </label>

          <label className="form-news">
            Tipo Botão:
            <select
              className="select select-category form-input-news"
              defaultValue={1} //1== id da categoria geral
              onChange={(e) => setCategorySelect(e.target.value)}
            >
            {category == null
                ? ""
                : category.map((item, i) => (
                    <option value={item.ID} key={i}>
                      {item.TIPO_NOME}
                    </option>
                  ))} 
            </select>
          </label>
          {box ? (
            <label className="form-news">
            Em qual portal o botão deve ser adicionado:
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
          </label>
          ):<></>}

          <label className="form-news">
            Link
            <input
              type="text"
              name="link-botão"
              className="form-input-news"
              value={link}
               onChange={(e) => setLink(e.target.value)}
            />
          </label>
          <label className="form-news">Selecione a visibilidade do botão:</label>
          <label className="form-ews" htmlFor="html">
          
          <div className="checked-form-button">

          <input type="checkbox" id="html" name="select-visible"
          value="Paneer"
          checked={visible}
          onChange={handleOnChange}/>
          {visible ? 'Botão estará visível': "Botão não estará visível"}
          </div>
          </label><br/>
        
    


         

          <input type="submit" value="Enviar" className="button-submit" />
        </form>
      </div>
    </>
  );
}
