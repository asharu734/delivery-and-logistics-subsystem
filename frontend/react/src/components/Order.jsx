import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Order() {
    // This is just the main link
    const DELIVERIES_URI = 'https://customer-and-order-mgmt-system.vercel.app/';

    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const res = await axios.get(`DELIVERIES_URI${/api/deliveries}`);
                setDeliveries(res.data);
                setLoading(false);
            }
            catch (err) {
                console.error("Error loading deliveries: ", err);
                setLoading(false);
            }
        };
        fetchDeliveries();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            // Gotta put the proper link
            const res = await axios.put(`link`, {
                status: newStatus
            });
        }
        catch (err) {
            alert("Error updating status.");
        }
    };

    if (loading) return <p>Loading deliveries...</p>;

    return (
        <div style={{ padding: '20px' }}>
        <h2>Logistics Dashboard</h2>
        <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
            <tr>
                <th>Order ID</th>
                <th>Tracking Number</th>
                <th>Current Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {deliveries.map((delivery) => (
                <tr key={delivery._id}>
                <td>{delivery.orderId}</td>
                <td>{delivery.trackingNumber}</td>
                <td>
                    <strong>{delivery.status}</strong>
                </td>
                <td>
                    <select 
                    value={delivery.status} 
                    onChange={(e) => handleStatusUpdate(delivery._id, e.target.value)}
                    >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    </select>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default Order;