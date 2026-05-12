import axios from "axios";

const API = axios.create({
  baseURL: "https://delivery-and-logistics-subsystem.onrender.com/api/deliveries",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;