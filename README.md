# Ecommerce Project Backend

This is the backend service for the Ecommerce Project. It provides RESTful APIs for managing products, users, orders, and authentication.

## Features

- User registration and authentication (JWT)
- Product management (CRUD)
- Order processing
- Cart functionality


## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **JWT** for authentication

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone <repo-url>
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment variables:**
    - Create a `.env` file with:
      ```
      PORT=5000
      MONGO_URI=<your_mongodb_uri>
      JWT_SECRET=<your_jwt_secret>
      ```

4. **Run the server:**
    ```bash
    npm start
    ```

## API Endpoints

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | /auth/register | Register a new user      |
| POST   | /auth/login    | User login               |
| GET    | /products      | List all products        |
   
| POST   | /orders        | Place an order           |
| GET    | /orders        | List user orders         |

## Folder Structure

```
backend/
├── models/
├── routes/
├── middleware/
├── config/
└── server.js
```

