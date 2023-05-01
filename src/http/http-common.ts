import axios from 'axios'

// екземпляр axios
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // import базового URL з .env
  headers: { // вказування заголовків до запитів
    "Content-type": "application/json"
  }
})

export default http