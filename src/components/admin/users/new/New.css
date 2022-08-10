import "../../styles/admin/news.css";
import Loading from "../LoadingFull";

import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AdminNews() {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [categorySelect, setCategorySelect] = useState("");
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [date, setDate] = useState("");
  const [textLessTag, setTextLessTag] = useState("");
  const [img, setImg] = useState("");
  const [multipleImg, setMultipleImg] = useState([]);

  const [removeLoading, setRemoveLoading] = useState(true); //loading

  //render categorias
  useEffect(() => {
    api.get("/category").then((res) => {
      setCategory(res.data.res);
      //console.log(category)
    });
  }, []);

  useEffect(() => {
    console.log(img);

    const img2 = img || " "; // se imag for undefined, a img2 será uma string vazia

    if (img2 !== " ") {
      const resultType = img2.type.split("/");
      if (resultType[0] === "image") {
        //aceita apenas no formato de imagem
        //se for imagem tá tudo ok
      } else {
        alert("Selecione um arquivo do tipo imagem");
        setImg("");
      }
    } else if (img2 !== undefined) {
      //setImg({'name': 'LOGO.png', 'lastModified': 1652564602649, 'lastModifiedDate': 'Sat May 14 2022 18:43:22 GMT-0300 (Horário Padrão de Brasília)','webkitRelativePath': '', 'size': 47355,})
    }
  }, [img]);
  useEffect(() => {
   
    multipleImg.forEach((file) => {
  
      const img2 = file || " "; // se imagem(file) for undefined, a img2 será uma string vazia

      if (img2 !== " ") {
        const resultType = img2.type.split("/");
        if (resultType[0] === "image") {
          //aceita apenas no formato de imagem
          //se for imagem tá tudo ok
        } else {
          alert("Selecione um arquivo do tipo imagem");
          setMultipleImg([]);
        }
      } 
    });
  }, [multipleImg]);


  //pre-visualização das imagens

  const renderMultiImg = (key) => {
    var result = [];

    for (let j = 0; j < multipleImg.length; j++) {
      result.push(<>
        <a
          href={URL.createObjectURL(multipleImg[j])}
          target="_blank"
          rel="noopener noreferrer"
          title="Visualizar imagem"
          className="link-img-show-select link-select-multiple"
          key={key}
        >
          <img
            src={URL.createObjectURL(multipleImg[j])}
            alt="imagem selecionada"
            className="img-show-select select-multiple"
          />
        </a>
        {/* <div onClick={()=>console.log('remove')} alt='imagem da noticia' className="icon-close-img-news">
          <img src='/icons/closeB.svg' alt="icone remover" title="Remover" className='icon-close-svg'/>
          </div> */}
        </>
      );
    }

    return <>{result}</>;
  };

  //submit formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRemoveLoading(false);

    const dataJson = new FormData();
    if(title !== ""){
      dataJson.append("title", title);
    }else{
      dataJson.append("title", "Nova Notícia");
    }
    dataJson.append("bodyText", bodyText); ///body
    dataJson.append("textLessTag", textLessTag); //.substr(0,300)
    dataJson.append("img", img);
    dataJson.append('date', date )

    if (categorySelect === "") {
      //setar valor padrão para categoria geral
      setCategorySelect(1);
      dataJson.append("category", categorySelect);
    } else {
      dataJson.append("category", categorySelect);
    }

    multipleImg.forEach((file) => {
      dataJson.append("multipleImg", file);
    });

    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
 
    await api
      .post("/news/new/", dataJson, headers)
      .then((res) => {
        if (res.data.err) {
          alert("Ocorreu um erro, tente novamente!!!");
          setRemoveLoading(true);
        } else {
          alert("A notícia foi publicada com Sucesso");
          setRemoveLoading(true);
          navigate("/admin/noticias/painel");
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
          <h3>Nova Notícia</h3>

          <label className="form-news">
            Titulo da notícia:
            <input
              type="text"
              name="title"
              className="form-input-news"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label className="form-news form-file">
            Imagem:
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
            Categoria:
            <select
              className="select select-category form-input-news"
              defaultValue={1} //1== id da categoria geral
              onChange={(e) => setCategorySelect(e.target.value)}
            >
              {category == null
                ? ""
                : category.map((item, i) => (
                    <option value={item.ID} key={i}>
                      {item.NOME}
                    </option>
                  ))}
            </select>
          </label>

          <label className="form-news">
            Data:
            <input
              type="date"
              name="data"
              className="form-input-news"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label className="form-news">
            Notícia:
            <Editor
              name="bodyText"
              onInit={(evt, editor) => (editorRef.current = editor)}
              className="form-input-news"
              init={{
                
                 plugins: "link image lists advlist autolink preview",
                 toolbar:
                   "undo redo | style select | bold italic | alignleft aligncenter alignright alignjustify | link image  | outdent indent|||||| preview",
                 language: "pt_BR",
              }}
              onEditorChange={(newValue, editor) => {
                setBodyText(editor.getContent());
                setTextLessTag(editor.getContent({ format: "text" }));
              }}
            />
          </label>

          <label className="form-news form-file">
            Imagens Secundárias:
            <input
              type="file"
              multiple="multiple"
              name="img-multiple"
              accept="image/*"
              className="form-input-news"
              onChange={(e) => setMultipleImg(Array.from(e.target.files))}
            />
            <div className="form-file-new-box">
              <p>
                {multipleImg.length === 0
                  ? "Selecionar imagens"
                  : "Imagens foram selecionadas"}
              </p>

              <p>Buscar</p>
            </div>
          </label>
          {multipleImg.length !== 0 ? (
            <div className="card-img-viwies-multiple">{renderMultiImg()}</div>
          ) : (
            ""
          )}

          <input type="submit" value="Enviar" className="button-submit" />
        </form>
      </div>
    </>
  );
}
