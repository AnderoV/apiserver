# apiserver

API endpoint: https://anderoapiserver.herokuapp.com/

## API calls

```
POST    /users/register       Create user
POST    /users/login          Login user (gives a token)
GET     /user                 Gets user info
PUT     /user                 Updates user info
POST    /tasks                Creates a task
GET     /tasks                Gets all tasks
GET     /tasks/{id}           Gets task by id
PUT     /tasks/{id}           Updates task by id
DELETE  /tasks/{id}           Deletes task by id
```

## API call examples

POST /users/register

Body:
```
{
	"username": "test",
	"firstname": "test",
	"lastname": "test",
	"password": "test123"
}
```

POST /users/login (gives token)

Body:
```
{
	"username": "test",
	"password": "test123"
}
```

GET /user

Body:
```

```

PUT /user

Body:
```
{
	"password": "test1234"
}
```

POST /tasks

Body:
```
{
	"title": "test",
	"description": "test"
}
```

GET /tasks

Body:
```

```

GET /tasks/{id}

Body:
```

```

PUT /tasks/{id}

Body:
```
{
	"title": "test123",
	"description": "test123",
	"markedasdone": true
}
```

DELETE /tasks/{id}

Body:
```

```
