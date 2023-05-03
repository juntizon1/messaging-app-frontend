import axios from 'axios'

const instance = axios.create({
    baseURL:"https://messaging-app-backend-p62p.onrender.com"
})
export default instance