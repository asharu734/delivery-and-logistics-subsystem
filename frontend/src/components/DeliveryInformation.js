import axios from 'axios';
import { useEffect, useState } from 'react';

function DeliveryList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('https://customer-and-order-mgmt-system.vercel.app/api/orders')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Deliveries</h1>
            {orders.map(order => (
                <div key={order._id}>Customer: {order.customerName}</div>
            ))}
        </div>
    );
}