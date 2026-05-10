import axios from "axios";

const ORDER_API =
  "https://customer-and-order-mgmt-system.vercel.app/api/orders";

export const getOrders = () => axios.get(ORDER_API);