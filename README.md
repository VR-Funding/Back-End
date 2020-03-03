# VentuRe Backend

#### VR-funding Build Week project | Lambda School 2020

# Deployed Backend

[--->Deployed Site<---](https://venture-backend.herokuapp.com/)
https://venture-backend.herokuapp.com/

# Technologies

#### Production

- Express: fast, unopinionated, minimalist web framework for Node.js
- Bcrypt: hashes passwords and adds security to the database and user information
- JSON Web Tokens: generate and verify web tokens to maintain and add securtiy to database
- Postgres: relational database that uses tables to store data
- Knex: SQL query builder for various relational databases, such as MYSQL, Postgres, etc.
- Cors: package for providing middleware that can be used to enable CORS
- Helmet: package for securely hiding headers

#### Developer

- Nodemon: tool used by developers to restart the server whenever a file changes
- pg: non-blocking PostgresSQL client for Node.js
- sqlite3: compact free database for development

# Table of Contents

- [Auth Routes](#AuthRoutes)

  - Register User
  - Login User
  - Logout User

- [Startup Routes](#StartupRoutes)

  - Get All Startups
  - Get Startup By Startup ID
  - Get Startups By User ID
  - Post Startup
  - Update Startup By Startup ID
  - Delete Startup By Startup ID

# Auth Routes

### /auth/

## Register

---

#### Register a user

##### _Method Url_: `/auth/register`

##### HTTP method: [POST]

### Headers

| Name           |  Type  | Required |       Description        |
| :------------- | :----: | :------: | :----------------------: |
| `Content-Type` | String |   Yes    | Must be application/json |

### Body

| Name       |  Type   | Required |    Description     |
| :--------- | :-----: | :------: | :----------------: |
| `email`    | String  |   Yes    |   Must be unique   |
| `password` | String  |   Yes    |                    |
| `fullName` | String  |   Yes    | Full name of user  |
| `investor` | Boolean |   Yes    | Defaults to 'true' |

#### _example:_

```
{
    "email": "email@email.com",
    "password": "password123",
    "fullName": "First Last",
    "investor": true
}
```

### Response

201 (Created)

If you successfully register a user the endpoint will return an HTTP response with a status code 201 message.

```
  "newUser": {
      "id": "1",
      "email": "email@email.com",
      "fullName": "First Last",
      "investor": true
  }
```

500 (Internal Server Error)

If any of the above data is missing, the registration will not go through. It will produce a 500 error as shown below.

#### _example:_

```
{
    "error": "Server could not register user"
}
```

---

# Login

## Logs a user in

#### _Method Url:_ `/auth/login`

#### HTTP method [POST]

### Headers

| Name           |  Type  | Required |       Description        |
| :------------- | :----: | :------: | :----------------------: |
| `Content-Type` | String |   Yes    | Must be application/json |

### Body

| Name       |  Type  | Required |             Description              |
| :--------- | :----: | :------: | :----------------------------------: |
| `username` | String |   Yes    | Must be the username in the database |
| `password` | String |   Yes    | Must match password in the database  |

##### _example:_

```
{
    "email":"email@email.com",
    "password": "password123"
}
```

### Response

200 (OK)

If you successfully login, the endpoint will return an HTTP response with a status code 200, a message welcoming the user by name and a JWT token, as shown below.

```
{
    "message": "Welcome First Last!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVLbmFwbWFuMTAwIiwiaWQiOjMsImlhdCI6MTU2OTM1ODg2MiwiZXhwIjoxNTY5NDQ1MjYyfQ.sNDjccLyuHWhgkne5Ky0hR1-Pd7QNGr6TyKlJqTDHSk"
}
```

401 (UNAUTHORIZED)

If you fail to login, the endpoint will return an HTTP response with a status code 401 which indicates the username and/or password is not valid.

```
{
    "error": "Invalid Credentials"
}
```

500 (Bad Request)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below. However, this error can also come from a user mistake.

```
{
    "error": "Server could not log user in"
}
```

# Logout

## Logs a user out

#### _Method Url:_ `/auth/logout`

#### HTTP method [GET]

### **Sets `token` to null**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Response

200 (OK)

If you successfully login, the endpoint will return an HTTP response with a status code 200 and body as below.

```
{
    "message": "Successfully logged out"
}
```

# Startup Routes

### /api/

## Get All Startups

#### _Method Url:_ `/api/startups`

##### HTTP method: [GET]

### **Get list of all Startups**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and a body as below.

```
[
  {
      "id": 1,
      "userId": 1,
      "projectName": "Uber JetSki",
      "valuationCap": 5500000,
      "discount": 20,
      "minInvestment": 100,
      "contract": "Crowd SAFE",
      "goalLow": 50000,
      "goalHigh": 850000,
      "city": "Miami Beach",
      "state": "Florida",
      "country": "United States",
      "email": "test@email.com",
      "postDate": "01/25/2020",
      "startDate": "02/11/2020",
      "endDate": "05/18/2020",
      "active": true
  },
  {
      "id": 2,
      "userId": 5,
      "projectName": "Uber Airplane",
      "valuationCap": 7000000,
      "discount": 10,
      "minInvestment": 250,
      "contract": "Crowd SAFE",
      "goalLow": 100000,
      "goalHigh": 1000000,
      "city": "Columbus",
      "state": "Ohio",
      "country": "United States",
      "email": "test1@email.com",
      "postDate": "02/10/2020",
      "startDate": "03/04/2020",
      "endDate": "10/30/2020",
      "active": false
  },
  {
      "id": 3,
      "userId": 3,
      "projectName": "Lambda School: Machine Learning",
      "valuationCap": 10000000,
      "discount": 15,
      "minInvestment": 200,
      "contract": "Crowd IPA",
      "goalLow": 200000,
      "goalHigh": 1000000,
      "city": "San Francisco",
      "state": "California",
      "country": "United States",
      "email": "austen@allred.com",
      "postDate": "03/03/2020",
      "startDate": "04/30/2020",
      "endDate": "07/30/2020",
      "active": false
  }
]
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
{
    error: "Server could not get startups"
}
```

## Get Startup By Startup ID

#### _Method Url:_ `/api/startups/:id`

##### HTTP method: [GET]

### **Get a specific startup by it's ID**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and a body as below.

```
[
  {
      "id": 3,
      "userId": 3,
      "projectName": "Lambda School: Machine Learning",
      "valuationCap": 10000000,
      "discount": 15,
      "minInvestment": 200,
      "contract": "Crowd IPA",
      "goalLow": 200000,
      "goalHigh": 1000000,
      "city": "San Francisco",
      "state": "California",
      "country": "United States",
      "email": "austen@allred.com",
      "postDate": "03/03/2020",
      "startDate": "04/30/2020",
      "endDate": "07/30/2020",
      "active": false
  }
]
```

404(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and a body as below.

```
{
    "error": "Startup with that ID does not exist"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
{
    error: "Server could not get startups"
}
```

## Get All Startups For A Specific User

#### _Method Url:_ `/api/startups/users/:userid`

##### HTTP method: [GET]

### **Get All Startups By User ID**

### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

### Response

200 (OK)

The endpoint will return a HTTP response with a status code and a body as below

```
[
  {
      "id": 1,
      "userId": 1,
      "projectName": "Uber JetSki",
      "valuationCap": 5500000,
      "discount": 20,
      "minInvestment": 100,
      "contract": "Crowd SAFE",
      "goalLow": 50000,
      "goalHigh": 850000,
      "city": "Miami Beach",
      "state": "Florida",
      "country": "United States",
      "email": "test@email.com",
      "postDate": "01/25/2020",
      "startDate": "02/11/2020",
      "endDate": "05/18/2020",
      "active": true
  },
  {
      "id": 2,
      "userId": 5,
      "projectName": "Uber Airplane",
      "valuationCap": 7000000,
      "discount": 10,
      "minInvestment": 250,
      "contract": "Crowd SAFE",
      "goalLow": 100000,
      "goalHigh": 1000000,
      "city": "Columbus",
      "state": "Ohio",
      "country": "United States",
      "email": "test1@email.com",
      "postDate": "02/10/2020",
      "startDate": "03/04/2020",
      "endDate": "10/30/2020",
      "active": false
  }
]
```

404(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and a body as below.

```
{
    "error": "User with that ID does not exist"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
{
    error: "Server could not get startups"
}
```

# Post Startup

#### _Method Url:_ `/api/startups`

##### HTTP method: [POST]

### **All fields required for POST except `discount`**

### Headers

| Name            |  Type   | Required |                 Description                  |
| :-------------- | :-----: | :------: | :------------------------------------------: |
| `Content-Type`  | String  |   Yes    |           Must be application/json           |
| `authorization` | String  |   Yes    |                JSON Web Token                |
| `discount`      | Integer |   Yes    |          Max of two digits. %-based          |
| `active`        | Boolean |   Yes    | Defaults to false, turns true on `startDate` |

### Body

| Name            |  Type   | Required |                           Description                           |
| :-------------- | :-----: | :------: | :-------------------------------------------------------------: |
| `userId`        | Integer |   Yes    |   startups.userId == users.id, ID of the user posting startup   |
| `projectName`   | String  |   Yes    |                     Name of startup/company                     |
| `valuationCap`  | Integer |   Yes    |    Max valuation at which investment converts to shares/cash    |
| `discount`      | Integer |   Yes    |  Percentage-based discount at trigger event. Max of two digits  |
| `minInvestment` | Integer |   Yes    |                   Minimum investment accepted                   |
| `contract`      | String  |   Yes    |               Either 'Crowd SAFE' or 'Crowd IPA'                |
| `goalLow`       | Integer |   Yes    |      Minimum dollar amount for raise to close successfully      |
| `goalHigh`      | Integer |   Yes    |    Max raise amount. Switch to `active: false` when reached     |
| `city`          | String  |   Yes    |                  City where startup is located                  |
| `state`         | String  |   Yes    |                 State where startup is located                  |
| `country`       | String  |   Yes    |                Country where startup is located                 |
| `email`         | String  |   Yes    |                Contact email address for startup                |
| `postDate`      | String  |   Yes    |               Date startup is created. DD/MM/YYYY               |
| `startDate`     | String  |   Yes    | Date startup goes `active: true` and begins raising. DD/MM/YYYY |
| `endDate`       | String  |   Yes    |  Date startup goes `active: false` and ends raise. DD/MM/YYYY   |
| `active`        | Boolean |   Yes    |         Defaults to 'false' till `startDate` is reached         |

### Response

201 (Created)

The endpoint will return a HTTP response with status code 200 and a body as below.

```
[
    {
        "id": 4,
        "userId": 6,
        "projectName": "H3LL0W0RLD",
        "valuationCap": 2000000,
        "discount": 10,
        "minInvestment": 49,
        "contract": "Crowd SAFE",
        "goalLow": 50000,
        "goalHigh": 750000,
        "city": "New York",
        "state": "New York",
        "country": "United States",
        "email": "test2@email.com",
        "postDate": "03/20/2020",
        "startDate": "04/01/2020",
        "endDate": "07/02/2020",
        "active": false
    }
]
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
{
    error: "Server could not post startup"
}
```

# Update Startup

#### _Method Url:_ `/api/startup/:id`

##### HTTP method: [PUT]

### **Need Startup ID to update Startup**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code of 200, message and count, as below.

```
{
    message: "Startup succesfully updated",
    count: 1
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
{
    error: "Server could not update startup"
}
```

# Delete Startup

#### _Method Url:_ `/api/startup/:id`

##### HTTP method: [DELETE]

### **Need Startup ID to delete Startup**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and a body as below.

```
{
    message: "Startup succesfully deleted"
}
```

404(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and a body as below.

```
{
    "error": "Startup with that ID does not exist"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
{
    error: "Server could not delete startup"
}
```
