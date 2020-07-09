import axios from "axios";

let token;
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  token = user.token;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
