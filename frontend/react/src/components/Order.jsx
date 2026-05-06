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
        <h1>He</h1>
    )
}

export default Order;