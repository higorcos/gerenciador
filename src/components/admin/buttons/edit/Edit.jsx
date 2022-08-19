import React, { useEffect, useState } from "react";
import { imagemURL } from "../../../../services/variables";
import Loading from "../../../utils/loading/LoadingFull";
import api from "../../../../services/api";
import { useNavigate } from "react-router-dom";


 
export default function EditButton(props) {
  const idButton = props.id
  const navigate = useNavigate();


  const [removeLoading, setRemoveLoading] = useState(false); //loading

  const [name,setName]= useState("")
  const [img, setImg] = useState("");
  const [imgOld, setImgOld] = useState("");
  const [link, setLink] = useState("");
  const [visible, setVisible] = useState("");

  const [existImg, setExistImg] = useState(true)



useEffect(()=>{
  api.get(`/fakeId/button/show/edit/${idButton}`).then((res)=>{
    const result = res.data
    if(result.err){//erro
      console.log(result)
      setRemoveLoading(true)
    }else{
      console.log(result.res)
      setImgOld(result.res[0].IMG)
      setName(result.res[0].NOME)
      setLink(result.res[0].LINK)
      if(result.res[0].DISPONIVEL == 1){
        setVisible(true) 
      }else{ 
        setVisible(false)
      }
      setRemoveLoading(true)
    }
  }).catch((err)=>{
      setRemoveLoading(true)
  })
},[])

useEffect(() => {
  // console.log(img);

   const img2 = img || " "; // se imag for undefined, a img2 será uma string vazia

   if (img2 !== " ") {
     const resultType = img2.type.split("/");
     if (resultType[1] === "svg+xml") {
      updateImgMain(imgOld)
       //aceita apenas no formato de svg
       //se for imagem tá tudo ok
     } else {
       alert("Selecione uma imagem do tip .svg");
       setImg("");
     }
   } else if (img2 !== undefined) {
     //setImg({'name': 'LOGO.png', 'lastModified': 1652564602649, 'lastModifiedDate': 'Sat May 14 2022 18:43:22 GMT-0300 (Horário Padrão de Brasília)','webkitRelativePath': '', 'size': 47355,})
   }
 }, [img]);


const removeImgMain = () =>{
    setRemoveLoading(false)
     setExistImg(false)
      if(imgOld === 'iconePadrão.jpg'){
        console.log("logo")
        setRemoveLoading(true)
      }else{
        updateImgMain(imgOld)
        }
}
const updateImgMain=(nameRemove)=>{
  setRemoveLoading(false)
  const dataJson = new FormData();
  dataJson.append("icone", img);
  dataJson.append("nameIconeOld", nameRemove);
  console.log(nameRemove)
  console.log(img)
  const headers = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  api.put(`/fakeID/button/update/img/${idButton}`, dataJson, headers).then((response)=>{
    const result = response.data
    if(result.err){
      
    alert('A Imagem não foi substituída')
    setRemoveLoading(true)

    }else{
      setExistImg(true)
      setImg('')
      setImgOld(result.name)
      console.log(result)
      setRemoveLoading(true)
    }
    }).catch((err)=>{console.log(err)
      setRemoveLoading(true)})
}
const handleOnChange = () => {
  setVisible(!visible);

}
const handleSubmit = async (e) => {
  e.preventDefault(); 
  setRemoveLoading(false);

    const headers = {
     headers: {
       "Content-Type": "application/json",
     }, 
   }; 
   var nVisible
   if(visible == true){
    nVisible = 1
  }else if (visible == false){
    nVisible = 0
  }

  const data = ({ 
    name,
    link,
    available: nVisible,
    })
    await api
     .post(`/fakeId/button/update/${idButton}`,data, headers)
     .then((res) => {
       if (res.data.err) {
         alert("Ocorreu um erro, tente novamente!!!");
         setRemoveLoading(true);
       } else {
         //alert("O botão foi criado com Sucesso");
         setRemoveLoading(true);
         navigate("/botoes/mostrar");

       }
     })
     .catch((err) => {
       alert("Ocorreu um erro, tente novamente!!! DB");
       setRemoveLoading(true);
     });
}



  return (
    <>
    {!removeLoading && <Loading />}

    <div className="content-admin-news">
      <form onSubmit={handleSubmit} className="form-admin-news">
        <h3>Editar Botão </h3>
        <label className="form-news form-file">
          Ícone: Formato svg
          <input
            type="file"
            name="imgTop"
            accept="image/*"
            className="form-input-news"
            onChange={(e) => setImg(e.target.files[0])}
          />

        {!existImg ? (
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

        ):(
          <label 
           className="form-news form-file"> 
          Imagem: 
           {imgOld == null ? '': (<>
            <div className="card-img-viwies-multiple">
           <a target="_blank" 
           rel="noopener noreferrer" 
           className="link-img-show-select link-select-multiple"
           href={imgOld === 'iconPadrão.jpg' ? '/icons/Padrão.svg' : imagemURL+imgOld }>  
           <img
           src={imgOld === 'iconPadrão.jpg' ? '/icons/Padrão.svg' : imagemURL+imgOld }
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

        </label>


        <label className="form-news">
          Nome:
          <input
            type="text"
            name="title"
            className="form-input-news"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>


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