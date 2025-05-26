import axios from 'axios'

const HTTP = axios.create({
  // baseURL: 'http://localhost:5257/api', .NET Dev server
  baseURL: import.meta.env.PROD ? "/api" : "https://odipost.ayoubbakalem.be/api",
  timeout: 5000,
})

export default HTTP