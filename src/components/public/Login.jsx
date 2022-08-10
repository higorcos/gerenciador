// import '../../styles/admin/login.css'
// import { useState, useContext } from 'react';

// import Loading from "../LoadingFull";
// import { AuthContext } from '../../contexts/auth';



// export default function Login() {

  
//     const { login} = useContext(AuthContext)

//     const [emailUser, setEmailUser] = useState('') //email
//     const [password, setPassword] = useState('') //senha

//     const [removeLoading, setRemoveLoading] = useState(true) //loading


//     const handleSubmit = (e) => {
//     e.preventDefault();
//     setRemoveLoading(false)
//     login(emailUser,password) 
//     }
 
// return(
//     <>
    
//     <div className="container-admin-login">
//     {!removeLoading && <Loading/> }

//         <form onSubmit={handleSubmit} className="form-admin-login">
//             <div className='form-container'>
//           <h3 className='title-login'>Faça seu login</h3>
//                 <div className='img-login'>
//                 <img src="/imagens/logo-work.png" alt="" />         
//                 <img src="/imagens/logo.jpg" alt="" />         
//                 </div>
//           <label className="form-login">
           
//             <input
//               type="email"
//               name="title"
//               className="form-input-login"
//               value={emailUser}
//               onChange={(e) =>  setEmailUser(e.target.value)}
//               placeholder='Digite seu email'
//             />
//           <div className='underline'></div>
//           </label>
//           <label className="form-login">
            
//             <input
//               type="password"
//               name="title"
//               className="form-input-login"
//               placeholder='Digite sua senha'
              
//               onChange={(e) =>  setPassword(e.target.value)}
               
//             />
//           <div className='underline'></div>

//           </label>
//           <input type="submit" value="Entrar" className="button-submit-login" />
//           <a href='/admin/login/created' className='link-user-login'>Ainda não tenho uma conta</a>
//           </div>

//         </form>
//       </div> 
     

//     </>
// )

// }