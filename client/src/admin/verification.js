import axios from 'axios'
import { BASE_URL } from "../constants/const"

const verification = async (token, email) => {
   return axios.post(BASE_URL + '/admin/movies/auth/verification', {token, email})
}

export default verification