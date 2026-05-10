import axios from "axios";

const API =
  "https://customer-and-order-mgmt-system.vercel.app/api/deliveries";

export const getDeliveries = () => axios.get(API);