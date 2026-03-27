# User Registration Endpoint Documentation

## Endpoint: `/register`

### Method: `POST`

### Description:
This endpoint allows users to register by providing their details. The endpoint validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, a JSON Web Token (JWT) is generated and returned along with the user details.

### Request Body:
The following fields are required in the request body:

```json
{
  "fullname": {
    "firstname": "string (min length: 3)",
    "lastname": "string (optional, min length: 3)"//lastname is optional
  },
  "email": "string (valid email format, min length: 3)",
  "password": "string (min length: 8)"
}
```

### Validation Rules:
- `fullname.firstname`: Must be at least 3 characters long.
- `fullname.lastname`: Optional, but if provided, must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 8 characters long.

### Response:
#### Success Response:
- **Status Code:** `201 Created`
- **Body:**

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string (optional)"
  }
}
```

#### Error Response:
- **Status Code:** `400 Bad Request`
- **Body:**

```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (location of the error, e.g., body)"
    }
  ]
}
```

### Example Request:
```bash
curl -X POST \
  http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Example Success Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6429f1e8e4b0f1a2b3c4d5e6",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Example Error Response:
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

## Endpoint: `/login`

### Method: `POST`

### Description:
This endpoint allows users to log in by providing their email and password. The endpoint validates the input data, checks the credentials against the database, and generates a JSON Web Token (JWT) upon successful authentication.

### Request Body:
The following fields are required in the request body:

```json
{
  "email": "string (valid email format)",
  "password": "string (min length: 8)"
}
```

### Validation Rules:
- `email`: Must be a valid email address.
- `password`: Must be at least 8 characters long.

### Response:
#### Success Response:
- **Status Code:** `200 OK`
- **Body:**

```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string (optional)"
  }
}
```

#### Error Response:
- **Status Code:** `400 Bad Request`
- **Body:**

```json
{
  "errors": [
    {
      "msg": "string (error message)",
      "param": "string (field name)",
      "location": "string (location of the error, e.g., body)"
    }
  ]
}
```

- **Status Code:** `401 Unauthorized`
- **Body:**

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Example Request:
```bash
curl -X POST \
  http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Example Success Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6429f1e8e4b0f1a2b3c4d5e6",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Example Error Response:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```