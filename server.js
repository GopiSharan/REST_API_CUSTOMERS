const express = require('express');
const app = express();

// Import customer routes
const customersRoutes = require('./Route/customers.routes');

// Middleware to parse JSON
app.use(express.json());

// Mount customer routes
app.use('/api/customers', customersRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
