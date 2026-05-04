import axios from 'axios';
import { useEffect, useState } from 'react';

function InventoryList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('https://inventory-subsystem-api.onrender.com/api/inventory')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Inventory</h1>
            {orders.map(inventory => (
                <div key={inventory._id}>Inventory: {order.inventoryName}</div>
            ))}
        </div>
    );
}