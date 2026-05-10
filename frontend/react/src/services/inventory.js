import axios from "axios";

const INVENTORY_API =
  "https://inventory-subsystem-api.onrender.com";

export const getInventory = () =>
  axios.get(`${INVENTORY_API}/items`);
