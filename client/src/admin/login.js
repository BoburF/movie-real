import axios from 'axios'
import { BASE_URL } from "../constants/const"

const login = async (email, password) => {
    return await axios.post(BASE_URL + '/admin/movies/auth/login', {email, password})
}

export default login