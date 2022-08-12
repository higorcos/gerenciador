import axios from 'axios'
import {urlApi} from "./variables"

export default axios.create({
  baseURL: `${urlApi}` 
  
  })

  
 