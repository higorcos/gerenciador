import Loading from "../../../utils/loading/LoadingFull";
import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";

export default function NewOffice() {
  const editorRef = useRef(null);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [atendimento, setAtendimento] = useState("");
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState(null);
  const [categorySelect, setCategorySelect] = useState("");

  const [removeLoading, setRemoveLoading] = useState(true); //loading
  const [boxOffice,setBoxOffice] = useState(false)

  const [nomeType, setNomeType] = useState("");
  const [categoryType, setCategoryType] = useState(null);
  const [categorySelectType, setCategorySelectType] = useState(1);

  const [categoryNew, setCategoryNew] = useState(null)
 

  //render categorias  //render Tipos
  useEffect(() => {
    alert('Configurado apenas para o portal de Raposa no momento')
    const func = async ()=>{
      setRemoveLoading(false)
      await api.get("/office/category/show").then((res) => {
        setCategory(res.data.res);
        //console.log(category)
      });
       await api.get("/office/type/show").then((res) => {
        setCategoryType(res.data.res);
      });
      setRemoveLoading(true)
    }
    func()

  }, []);
//render categorias depois que uma for adicionada
  useEffect(() => {
  api.get("/office/category/show").then((res) => {
    setCategory(res.data.res);
    
  });
  }, [boxOffice]);

  useEffect(() => {

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
    if(categoryNew !== null){
      if(categoryNew.id !== null){
        setCategorySelect(categoryNew.id)
      }
    }
  }, [categoryNew]);

  //submit formulário
  const handleSubmit = async (e) => {

    e.preventDefault();
    setRemoveLoading(false);

    const dataJson = new FormData();
  
    dataJson.append("nome",nome);
    dataJson.append("endereco",endereco);
    dataJson.append("cep", cep );
    dataJson.append("email", email);
    dataJson.append("telefone", telefone);
    dataJson.append("img", img);
    dataJson.append("atendimento", atendimento);
    dataJson.append("txt", txt);

    

    if (categoryNew !== null) {
      setCategorySelect(categoryNew.id);    
      dataJson.append("categoria", categorySelect);

    } else {      
      dataJson.append("categoria", categorySelect);
    } 

    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
 
    await api
      .post("/office/new", dataJson, headers)
      .then((res) => {
        if (res.data.err) {
          alert("Erro, Verifique se foi preenchido corretamente!!!");
          setRemoveLoading(true);
        } else {
          alert("A Competência foi registrada com Sucesso");
          setRemoveLoading(true);
          navigate("/competencia/mostrar");
        }
      })
      .catch((err) => {
        setRemoveLoading(true);
        alert("Ocorreu um erro, tente novamente!!!");
      });
  };
  const SubmitSubForm = async (e)=>{
      e.preventDefault();
      setRemoveLoading(false);
      
      if (categorySelectType === "" || categorySelectType === " ") {
        //setar valor padrão para tipo
        setCategorySelectType(1);        
      } else {      
      } 
      const data = {
      nome: nomeType,
      idTipoCargo: categorySelectType,

      }
      const headers = {
        headers: {
         'Content-Type': 'application/json', 
        },
      };
      await api
        .post("/office/category/new", data, headers)
        .then((res) => {
          if (res.data.err) {
            alert("Ocorreu um erro, tente novamente!!!");
            setRemoveLoading(true);
          } else {
            setRemoveLoading(true);
            alert("O Cargo foi criado com Sucesso");
            setBoxOffice(false)
            setCategoryNew(res.data.return)
            setCategorySelect(categoryNew.id)
          }
        })
        .catch((err) => {
          setRemoveLoading(true);
          //alert("Ocorreu um erro, tente novamente!!!");
      
        });

  }

  return (
    <>
      {!removeLoading && <Loading />}

      <div className="content-admin-news">
        <form onSubmit={handleSubmit} className="form-admin-news">
          <h3>Nova Competência </h3>


          <label className="form-news form-file">
            Foto do representante:
            <input
              type="file"
              name="imgTop"
              accept="image/*"
              className="form-input-news"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <div className="form-img-person">
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
                        className="img-show-select-person select-top-sva"
                      />
                    </a>
                  </>
                ) : (<>
                  <img
                        src='/icons/admin.svg'
                        alt="imagem selecionada"
                        className="img-show-select-person select-top-sva svg-person"
                      /></>
                )}
              </p>
              {img !== "" && img !== undefined ? (<p className="none"></p>):<p className="office-button-form">Buscar</p>}
            </div>
          </label>
          <label className="form-news">
            Nome:
            <input
              type="text"
              name="title"
              className="form-input-news"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label className="form-news ">
            Cargo: (Só é possível adicionar um representante por cargo)
            <div className="form-news office-select">
            <select   
              className="select select-category2 form-input-news"
              defaultValue={0} 
              onChange={(e) => setCategorySelect(e.target.value)}
            >
              <option value="0" disabled >
                {categoryNew === null ? <>
                Selecione um cargo
                </>
                : <> {categoryNew.nome}
                </>}
                </option>
              {category == null
                ? ""
                : category.map((item, i) => (
                  // {item.ID}
                    <option value={item.ID} key={i}> {item.CATEGORIA}</option>
                  ))}
            </select>
            <div className="form-file-new-box">
              <p className="office-button-form"
              onClick={()=>setBoxOffice(true)}
              >Criar Cargo</p>
            </div>
            </div>
          </label>
          <label className="form-news">
            Endereço:
            <input
              type="text"
              name="title"
              className="form-input-news"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </label>
          <label className="form-news">
            Cep:
            <input
              type=""
              name="title"
              className="form-input-news"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </label>
          <label className="form-news">
          Email:
            <input
              type="email"
              name="title"
              className="form-input-news"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="form-news">
          Telefone
            <input
              type="txt"
              name="title"
              className="form-input-news"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </label>

          <label className="form-news">
          Atendimento:
            <input
              type="txt"
              name="title"
              className="form-input-news"
              value={atendimento}
              onChange={(e) => setAtendimento(e.target.value)}
            />
          </label>
          <label className="form-news">
            Texto de Atribuição:
            <Editor
              name="bodyText"
              onInit={(evt, editor) => (editorRef.current = editor)}
              className="form-input-news"
              init={{
                plugins: "lists",
                toolbar:
                  "undo redo | style select | bold italic | alignleft aligncenter alignright alignjustify | outdent indent|||||| preview",
                language: "pt_BR",
              }}
              onEditorChange={(newValue, editor) => {
                setTxt(editor.getContent());
              }}
            />
          </label>

         
         

          <input type="submit" value="Enviar" className="button-submit" />
        </form>
      </div>




      {boxOffice ? (<>
    <div className="card_plus_office-new">
     <div  className="box-office-new">
        <div className="Title_card_plus">
          <h3>Novo Cargo</h3>
        </div>
      <div className="plus_icon_icon" onClick={()=>setBoxOffice(false)}>
        <img src="/icons/close.svg" alt="sair" className="icon_close_plus"/>
        </div>  
    </div>
      <form  className="form-admin-office">
          <label className="form-office-new">
            Nome do Cargo:
            <input
              type="text"
              name="title"
              className="form-input-news"
              value={nomeType}
              onChange={(e) => setNomeType(e.target.value)}
            />
          </label>
          <label className="form-office-new ">
            Tipo de cargo:
            <div className="form-news office-select">
            <select   
              className="select select-category2 form-input-news"
              defaultValue={1} 
              onChange={(e) => setCategorySelectType(e.target.value)}
            >
              {categoryType == null
                ? ""
                : categoryType.map((item, i) => (
                    <option value={item.ID} key={i}> 
                      {item.NOME}
                    </option>
                  ))}
            </select>
            </div>
          </label>
          <input type="submit" onClick={(e)=>SubmitSubForm(e)} value="Criar Cargo" className="button-submit" />
        </form>
    </div>
      </>):<></>}
    </>
  );
}
