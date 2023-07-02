const express = require('express');
const router = express.Router();

// Import customer controller
const customersController = require('../Controller/customersController');

// List API with search and pagination
router.get('/getCustomers', customersController.getCustomers);
// API to list all unique cities with the number of customers from each city
router.get('/cities', customersController.getUniqueCities);

// API to get single customer data by id
router.get('/getCustomerById/:id', customersController.getCustomerById);

// API to add a customer with validations
router.post('/addcustomer', customersController.addCustomer);

module.exports = router;
