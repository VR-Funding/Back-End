# VR-Funding Backend

#### Backend for AIR BNB build week project

# Deployed Backend

[--->Deployed Site<---](https://www.google.com/search?q=where+is+my+backend&oq=where+is+my+backend&aqs=chrome..69i57.16686j0j1&sourceid=chrome&ie=UTF-8)
Coming soon!

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

| Name       |  Type   | Required |  Description   |
| :--------- | :-----: | :------: | :------------: |
| `username` | String  |   Yes    | Must be unique |
| `password` | String  |   Yes    |                |
| `email`    | String  |   Yes    |                |
| `investor` | Boolean |   Yes    |  Must choose   |

#### _example:_

```
{
    "username": "user1",
    "password": "password123",
    "email": "email@email.com",
    "investor": true
}
```

#### Response

201 (Created)

If you successfully register a user the endpoint will return an HTTP response with a status code 201 message.

```
  "newUser": {
      "id": "1",
      "username": "user1",
      "email": "email@email.com",
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
    "username":"user1",
    "password": "password123"
}
```

#### Response

200 (OK)

If you successfully login, the endpoint will return an HTTP response with a status code 200, message and token, as shown below.

```
{
    "username": "user1",
    "id": 1,
    "email": "email@email.com",
    "message": "Welcome user1!",
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

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below. However, this error can also come from a user mistake as well.

```
{
    "error": "Server could not log user in"
}
```

# Startup Routes

### /api/

## Get All Startups

#### _Method Url:_ `/api/startups`

##### HTTP method: [GET]

## **Get list of all Startups**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and a body as below.

```
[
  {
      "id": 1,
      "userId": 1,
      "valuationCap": "7000000",
      "discount": "20",
      "minInvestment": "100",
      "contract": "Crowd SAFE",
      "goalLow": "25000",
      "goalHigh": "1500000",
      "state": "New York",
      "country": "United States",
      "deadline": "10/30/2020",
      "email": "email@email.com",
      "dateOfPost": "02/10/2020",
      "active": true
  },
  {
      "id": 2,
      "userId": 1,
      "valuationCap": "5500000",
      "discount": "10",
      "minInvestment": "250",
      "contract": "Crowd SAFE",
      "goalLow": "100000",
      "goalHigh": "1250000",
      "state": "San Francisco",
      "country": "United States",
      "deadline": "08/16/2020",
      "email": "bmail@email.com",
      "dateOfPost": "01/25/2020",
      "active": true
  },
  {
      "id": 3,
      "userId": 2,
      "valuationCap": "4000000",
      "discount": "15",
      "minInvestment": "100",
      "contract": "Crowd SAFE",
      "goalLow": "50000",
      "goalHigh": "1000000",
      "state": "Seattle",
      "country": "United States",
      "deadline": "12/31/2020",
      "email": "cmail@email.com",
      "dateOfPost": "02/28/2020",
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

## **Get a specific startup by it's ID**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code 200 and a body as below.

```
[
  {
      "id": 3,
      "userId": 2,
      "valuationCap": "4000000",
      "discount": "15",
      "minInvestment": "100",
      "contract": "Crowd SAFE",
      "goalLow": "50000",
      "goalHigh": "1000000",
      "state": "Seattle",
      "country": "United States",
      "deadline": "12/31/2020",
      "email": "cmail@email.com",
      "dateOfPost": "02/28/2020",
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

## Get All Startups For A Specific User

#### _Method Url:_ `/api/startup/:userid`

##### HTTP method: [GET]

## **Get All Startups By User ID**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code and a body as below

```
[
  {
      "id": 1,
      "userId": 1,
      "valuationCap": "7000000",
      "discount": "20",
      "minInvestment": "100",
      "contract": "Crowd SAFE",
      "goalLow": "25000",
      "goalHigh": "1500000",
      "state": "New York",
      "country": "United States",
      "deadline": "10/30/2020",
      "email": "email@email.com",
      "dateOfPost": "02/10/2020",
      "active": true
  },
  {
      "id": 2,
      "userId": 1,
      "valuationCap": "5500000",
      "discount": "10",
      "minInvestment": "250",
      "contract": "Crowd SAFE",
      "goalLow": "100000",
      "goalHigh": "1250000",
      "state": "San Francisco",
      "country": "United States",
      "deadline": "08/16/2020",
      "email": "bmail@email.com",
      "dateOfPost": "01/25/2020",
      "active": true
  }
]
```

400(CLIENT ERROR)

The endpoint will return a HTTP response with a status code 400 and a body as below.

```
{
    "error": "Cannot find user with that ID"
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

## **Add new startup with POST request**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with status code 200 and the ID of the newly added Startup.

```
[
    5
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

## **Need Startup ID to update Startup**

#### Headers

| Name            |  Type  | Required |       Description        |
| :-------------- | :----: | :------: | :----------------------: |
| `Content-Type`  | String |   Yes    | Must be application/json |
| `authorization` | String |   Yes    |      JSON Web Token      |

#### Response

200 (OK)

The endpoint will return a HTTP response with a status code of 200 and a body showing the amount of startups updated.

```
  updated: 1
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

## **Need Startup ID to delete Startup**

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
    removed: "Startup succesfully deleted"
}
```

500(SERVER ERROR)

If there is a server or database error, the endpoint will return an HTTP response with a status code 500 and a body as below.

```
{
    error: "Server could not delete startup"
}
```
