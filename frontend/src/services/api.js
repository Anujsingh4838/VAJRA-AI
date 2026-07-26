import axios from "axios";

const api = axios.create({
  baseURL: "https://vajra-api-gh6g.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;