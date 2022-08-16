import React,{ createContext} from "react";

export const PortalContext = createContext({})

export const Portal =({children})=> {

    
    const setPortal = (obj)=>{
        localStorage.setItem('NAME_PORTAL',obj.NOME)
        localStorage.setItem('UUID_PORTAL',obj.UUID)

    }
    const showPortal = {
        NOME: localStorage.getItem('NAME_PORTAL'),
        UUID: localStorage.getItem('UUID_PORTAL'),
    }
 
    return(
      <PortalContext.Provider value={{setPortal,showPortal}}>
   {children}
    </PortalContext.Provider>
    )
}