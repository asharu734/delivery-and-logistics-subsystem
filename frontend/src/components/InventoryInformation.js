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
            {orders.map(order => (
                <div key={order._id}>Inventory: {order.customerName}</div>
            ))}
        </div>
    );
}