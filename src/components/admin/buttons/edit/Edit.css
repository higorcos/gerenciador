import "../../styles/admin/news.css";

import React, { useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate} from 'react-router-dom'
import api from "../../services/api";
import { useEffect } from "react";

import {imagemURL} from "../../services/variables"
import Loading from "../LoadingFull";


 
export default function AdminNews(props) {
  const idNoticias = props.id
  const editorRef = useRef(null);
  const navigate = useNavigate(); 

  const [category, setCategory] = useState(null);

  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("")
  const [textLessTag, setTextLessTag] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [existImg, setExistImg] = useState(true)
  const [imgDB, setImgDB] = useState("")
  const [img, setImg] = useState("")
  const [multipleImg, setMultipleImg] = useState([]);
  const [newMultipleImg, setNewMultipleImg] = useState([]);


  const [removeLoading, setRemoveLoading] = useState(false); //loading

  //render categorias
  useEffect(() => {
    api.get("/category").then((res) => {
      setCategory(res.data.res);
      setRemoveLoading(true)
    });
  }, []);
  useEffect(() => {
    console.log(img);

    const img2 = img || " "; // se imag for undefined, a img2 será uma string vazia

    if (img2 !== " ") {
      const resultType = img2.type.split("/");
      if (resultType[0] === "image") {
        updateImgMain(imgDB)
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
   
    newMultipleImg.forEach((file) => {
  
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
  }, [newMultipleImg]);
  useEffect(() =>{
  api.get(`/news/edit/show/${idNoticias}/`).then((response)=>{
    const result = response.data
    if(result.err){
      console.log("ERRO")
    }else{
      setTitle(result.res[0].TITULO)
      setBodyText(result.res[0].CORPO_TEXTO) 
      setImgDB(result.res[0].IMG)
      setCategorySelect(result.res[0].ID_CATEGORIA)
      setMultipleImg(result.res[0].MULTIPLE_IMG)
    }
    }).catch((err)=>{console.log(err)})
  },[idNoticias])
 
  const updateImgMain=(nameRemove)=>{
    setRemoveLoading(false)

    const dataJson = new FormData();
    dataJson.append("img", img);
    dataJson.append("nameImgOld", nameRemove);
    console.log(nameRemove)
    console.log(img)
    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    api.post(`/news/update/img/${idNoticias}`, dataJson, headers).then((response)=>{
      const result = response.data
      if(result.err){
        console.log("ERRO")
      alert('A Imagem não foi substituída')
      setRemoveLoading(true)

      }else{
        setExistImg(true)
        setImg('')
        setImgDB(result.name)
        //console.log(result)
        setRemoveLoading(true)
      }
      }).catch((err)=>{console.log(err)
        setRemoveLoading(true)})
  }
  const removeImgMain = () =>{
    setRemoveLoading(false)
     setExistImg(false)
      if(imgDB === 'logo.jpg'){
        console.log("logo")
      }else{
        updateImgMain(imgDB)
        }
        setRemoveLoading(true)
      }
  
  const deleteMulImg=(j,item)=>{
  setRemoveLoading(false)
  multipleImg.splice(j, 1); 
  setMultipleImg(multipleImg) 

  api.get(`/news/edit/img/${idNoticias}/${item}`).then((response)=>{
    const result = response.data
    if(result.err){
      console.log("ERRO")
    alert('Imagem não foi apagada')

    setRemoveLoading(true)

    }else{
      console.log("SUCESSO")
     

      api.get(`/news/edit/show/${idNoticias}/`).then((response)=>{
        const result = response.data
        if(result.err){
        }else{
          setMultipleImg(result.res[0].MULTIPLE_IMG)
        setRemoveLoading(true)
  
        }
        }).catch((err)=>{console.log(err)})

      //setMultipleImg(result.res[0].MULTIPLE_IMG)
    }
    }).catch((err)=>{console.log(err)})
  }
   const textNews = () => {
    if (editorRef.current) {
      setBodyText(editorRef.current.getContent())
    }
  }
  //pre-visualização novas imagens

  const newRenderMultiImg = (key) => {
    var result = [];

    for (let j = 0; j < newMultipleImg.length; j++) {
      result.push(<>
        <a
          href={URL.createObjectURL(newMultipleImg[j])}
          target="_blank"
          rel="noopener noreferrer"
          title="Visualizar imagem"
          className="link-img-show-select link-select-multiple"
          key={j}
        >
          <img
            src={URL.createObjectURL(newMultipleImg[j])}
            alt="imagem selecionada"
            className="img-show-select select-multiple"
          />
        </a>
        {/* <div onClick={()=>removeImg(j)} className="icon-close-img-news">
          <img src='/icons/closeB.svg'  alt="icone remover" title="Remover" className='icon-close-svg'/>
          </div> */}
        </>
      );
    }

    return <>{result}</>;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataJson = new FormData();
    if(title !== ""){
      dataJson.append("title", title);
    }else{
      dataJson.append("title", "Nova Notícia");
    }
    dataJson.append("bodyText", bodyText); ///body
    dataJson.append("textLessTag", textLessTag);//.substr(0,300)
    dataJson.append("img", imgDB);
    if (categorySelect === "") {
      //setar valor padrão para categoria geral
      setCategorySelect(1);
      dataJson.append("category", categorySelect);
    } else {
      dataJson.append("category", categorySelect);
    }
    newMultipleImg.forEach((file) => {
      dataJson.append("multipleImg", file);
    });

    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    
  await api.post(`/news/update/${idNoticias}`,dataJson, headers).then((res)=>{
    alert('Atualizado')
    navigate('/admin/noticias/painel')
  }).catch((err) =>{
    alert('Ocorreu um erro, tente novamente!!!')     
    })
 
};  

  return (
    <>
    {!removeLoading && (<Loading/>)}
      <div className="content-admin-news">
        <form onSubmit={handleSubmit} className="form-admin-news">
          <h3>Editar Notícia</h3>

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

          {!existImg ?(
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
                      href={URL.createObjectURL(img) }
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visualizar imagem"
                    >
                      <img
                        src={URL.createObjectURL(img) }
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
        ) : (
           <label 
           className="form-news form-file"> 
          Imagem: 
           {imgDB == null ? '': (<>
            <div className="card-img-viwies-multiple">
           <a target="_blank" 
           rel="noopener noreferrer" 
           className="link-img-show-select link-select-multiple"
           href={imgDB === 'logo.jpg' ? '/imagens/logo.jpg' : imagemURL+imgDB }>  
           <img
           src={imgDB === 'logo.jpg' ? '/imagens/logo.jpg' : imagemURL+imgDB }
           alt="imagem selecionada"
           className="img-show-select select-multiple"
         /></a>
          <div onClick={()=> removeImgMain() } className="icon-close-img-news">
                <img src='/icons/closeB.svg' alt="icone remover" title="Remover" className='icon-close-svg'/>
                </div>
           </div>   
         </>)}
        </label >
       )}
        <label className="form-news">

        Categoria:

        {category==null ? '' : 
        <select name="select form-input-news" 
        defaultValue={categorySelect}  
        onChange={(e) => setCategorySelect(e.target.value)}>
          {category.map((item,i)=>(
            <option value={item.ID} key={i}>{item.NOME}</option>
          ))}
        </select>
        }
        </label>
        
        
        <label className="form-news"> 
          Notícia:
         <Editor name="bodyText"
         onInit={(evt, editor) => editorRef.current = editor}
         className="form-input-news" 
         initialValue={bodyText}
         init={{
          
          plugins: "link lists advlist autolink preview directionality",
          toolbar:
            "undo redo | style select | bold italic | alignleft aligncenter alignright alignjustify | link  | outdent indent|||||| preview",
          language: "pt_BR",
        }}
        onEditorChange={(newValue, editor) => {
         //setBodyText(editor.getContent())
         setTextLessTag(editor.getContent({format: 'text'}))
         ;}} 
        />
        </label > 


        <label className="form-news form-file">
            Imagens Secundárias:
            <input
              type="file"
              multiple="multiple"
              name="img-multiple"
              accept="image/*"
              className="form-input-news"
              onChange={(e) => setNewMultipleImg(Array.from(e.target.files))}
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

          {newMultipleImg.length !== 0 ? (<>
      
            <div className="card-img-viwies-multiple">{newRenderMultiImg()}</div>
            </>) : (
            ""
          )}
{/* pre-visualização das imagens já cadastradas */}
          {multipleImg[0] !== null  ? (<>  
            
            <div className="card-img-viwies-multiple">
            
            {multipleImg.map((item , j)=>{
              return(
                <>
                
              <a
                href={imagemURL+item}
                target="_blank"
                rel="noopener noreferrer"
                title="Visualizar imagem"
                className="link-img-show-select link-select-multiple"
                key={j}
              >
                <img
                  src={imagemURL+item}
                  alt="imagem selecionada"
                  className="img-show-select select-multiple"
                />
              </a>
              <div onClick={()=>deleteMulImg(j,item) } className="icon-close-img-news">
                <img src='/icons/closeB.svg' alt="icone remover" title="Remover" className='icon-close-svg'/>
                </div>
              </>
              )
            })}
            </div> </>) : (
            ""
          )}
          <input type="submit" onClick={textNews} value="Enviar" className="button-submit" />
        </form>
      </div>
      
    </>
  );
}
