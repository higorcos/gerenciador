const idPortalApi = '1fea43fec0ccd7f2b0cbf55804aca8182177ab79'

module.exports = {
    idPortalApi: `${idPortalApi}`,
    urlApi: `http://ec2-54-207-215-247.sa-east-1.compute.amazonaws.com:8004/${idPortalApi}`,
    //ou
   //urlApi: `http://localhost:8004/${idPortalApi}`,
 
    //config bubões e imagens
    link: "http://www.transparenciadministrativa.com.br", //Onde o token abaixo ser[a utilizado]
    tokenLink: '1fea43fec0ccd7f2b0cbf55804aca8182177ab79', //Token para acessar o WWW.transparência
    imagemURL: 'https://api-s3-tss.s3.amazonaws.com/', //link para a imagem 
    //imagemURL: 'http://localhost:8004/uploads/', //link para a imagem 
    urlEmDeploy: 'http://ec2-54-207-215-247.sa-east-1.compute.amazonaws.com:8000' //usada para link de compartilhamento
}
 