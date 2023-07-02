const customers = require('../customers.json');

// List API with search and pagination
exports.getCustomers = (req, res) => {
  const { first_name, last_name, city, page, limit } = req.query;
  let result = customers;

  // Filter by first_name
  if (first_name) {
    result = result.filter(customer => customer.first_name.toLowerCase().includes(first_name.toLowerCase()));
  }

  // Filter by last_name
  if (last_name) {
    result = result.filter(customer => customer.last_name.toLowerCase().includes(last_name.toLowerCase()));
  }

  // Filter by city
  if (city) {
    result = result.filter(customer => customer.city.toLowerCase().includes(city.toLowerCase()));
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  result = result.slice(startIndex, endIndex);

  res.json(result);
};
// API to list all unique cities with the number of customers from each city
exports.getUniqueCities = (req, res) => {
  const cities = {};

  customers.forEach(customer => {
    const { city } = customer;
    if (cities[city]) {
      cities[city]++;
    } else {
      cities[city] = 1;
    }
  });

  res.json(cities);
};

// API to get single customer data by id
exports.getCustomerById = (req, res) => {
  const { id } = req.params;
  const customer = customers.find(cust => cust.id === Number(id));

  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  res.json(customer);
};

// API to add a customer with validations
exports.addCustomer = (req, res) => {
  const { id, first_name, last_name, city, company } = req.body;

  // Validate required fields
  if (!id || !first_name || !last_name || !city || !company) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if city and company exist
  const existingCustomer = customers.find(cust => cust.id === Number(id));
  if (!existingCustomer) {
    return res.status(400).json({ message: 'Customer does not exist' });
  }

  res.status(201).json({ message: 'Customer added successfully' });
};
