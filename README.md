# Delivery and Logistics Subsystem
This system handles the deliveries and delivery state of orders. It takes data
from the Customer and Order Management System, and the Supplier Management
System, combines and updates the information, and sends them back.

## Backend Deployment
https://delivery-and-logistics-subsystem.onrender.com/

# Important Routes
GET /api/deliveries
POST /api/deliveries
PUT /api/deliveries/sync/:order_id


# Backend Modules
* https://github.com/g4wkgawk/Inventory-Subsystem.git
* https://github.com/Ping2023A/supplier-management-system.git
* https://github.com/itsgiandolor/customer-and-order-mgmt-system