# Traveling-Recommendation
Membuat website untuk memberikan rekomendasi tempat makan, informasi covid, dan weather di daerah yang ingin dikunjungi. This app has:

* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
`- POST /register`
`- POST /login`

`- GET /recommendation`

`- GET /food`
`- POST /food`
`- PATCH /food/:id`
`- DELETE /food/:id`

### GET /recommendation

> Get all assets

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Response (200)_
```json
[
  {
    "id": 1,
    "covid": {},
    "food": {},
    "weather": {}
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```

### GET /food

> Get all assets

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Response (200)_
```json
[
  {
    "id": 1,
    "name": "",
    "imageUrl": "",
    "lokasi": ""
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```


### POST /food

> Create new asset

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
    "name": "",
    "imageUrl": "",
    "lokasi": "",
    "userId":1
}
```

_Response (201 - Created)_
```json
{
    "id": 1,
    "name": "",
    "imageUrl": "",
    "lokasi": "",
    "userId":1
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Input"
}
```

### PATCH /food/:id

> Put asset fancy-todo by Id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id": 1,
}
```


_Request Body_
```json
{
    "name": "",
    "imageUrl": "",
    "lokasi": "",
    "userId":1
}
```

_Response (200 - OK)_
```json
{
    "id": 1,
    "name": "",
    "imageUrl": "",
    "lokasi": "",
    "userId":1
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Request"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```

### DELETE /food/:id

> Delete asset by Id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
  "id": 1
}
```

_Response (200 - OK)_
```json
{
  "message": "Data success to delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Server error"
}
```

### POST /register

> Create new asset

_Request Body_
```json
{
  "email": "admin@mail.com",
  "password": "rahasia",
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "email": "admin@mail.com"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Input"
}
```

### POST /login

> Create new asset


_Request Body_
```json
{
  "email": "admin@mail.com",
  "password": "<your hash password from bcrypt>"
}
```

_Response (200 - AccessToken)_
```json
{
  "access_token": "<your token from jwt>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid Input"
}
```