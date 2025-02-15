# E-commerce API

## Project Description
This is a backend API for an e-commerce platform, built using Node.js, Express, and MongoDB.

## Getting Started

### 1. Install Dependencies
Run:
```sh
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory and add:
```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 3. Start the Server
Run:
```sh
npm run dev
```

The API will start at `http://localhost:4000`.

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/me` - Get current user profile (requires authentication)

### Product Routes
- `GET /api/products` - Get all products
- `POST /api/products` - Add a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Order Routes
- `POST /api/orders` - Create an order (requires authentication)
- `GET /api/orders` - Get user orders (requires authentication)



