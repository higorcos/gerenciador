import '../../styles/buttonHome.css'

export default function ButtonHome(prop) {

  var button = prop.names;
  var linkFilter = prop.linkFilter;
  
 // console.log(linkFilter)

  if(linkFilter !== undefined){ // vai identificar se o parâmetro responsável por filter um botão que não queremos foi passado
    linkFilter.map((linkRemove)=>{
      button = button.filter((array)=>{// filter o item do array que corresponde ao botão que não queremos na pagina
        if( array.name !== linkRemove){ //verifica se o array é o que não queremos remover
          return array
        }else{ // vai cair que se o for achado o link do botão que não queremos na página
          return'' //nada será passado para o novo array
        }
      })  
    })
}




function modLinkOpen(button){

  if(button.slice(0,1) === "/"){
    return true
  }else{
    //console.log("")
    return false
  }
}

const showButtons = button.map((button,i) =>{ //vai renderizar o array dos botões

  return(
   
      <a 
      key={i}
      href={`${button.link}`}
      target={ "_self" } 
      rel="noreferrer"
      className="link-button">
      <div className="card-button">
        <img
          
          src={`/icons/${button.img}.svg`}
          alt="ícones"
          className="svg-button"
          />
        <p className="text-card-button">
          {button.name}
        </p>
      </div>
    </a>

  )
  });
  return (
    <div className="App">
      <div className="container-card">
            {showButtons}
      </div>
    </div>
  );
}
  