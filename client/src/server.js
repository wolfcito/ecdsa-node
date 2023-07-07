import axios from 'axios'

//http://localhost:3042'

const server = axios.create({
  baseURL: 'https://ecdsa-server-wolfcito.vercel.app/',
})

export default server
