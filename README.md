# Node DDD Boilerplate

A **Domain-Driven Design (DDD)** boilerplate for **Node.js** inspired by **Laravel** architecture.  
Ideal for building scalable, maintainable RESTful APIs with **Express** and **Objection.js**.

---

## Features
app/domains/

- Laravel-style folder structure:
  - `app/Domains/<Domain>` for Controllers, Models, DataObjects
- Request **validation** with [Zod](https://github.com/colinhacks/zod)
- **Database migrations** using [Knex.js](http://knexjs.org/)
- ORM with [Objection.js](https://vincit.github.io/objection.js/)
- Middleware for **request validation** and **error handling**
- Ready-to-use **REST API endpoints**
- Easy integration with **MySQL** or other SQL databases

---

## Folder Structure



## Installation
  Clone the repository:
  https://github.com/rajeshbytes/node-laravel-style.git
  cd node-ddd-boilerplate

npm install

cp .env.example .env
# Edit .env with your database credentials and other settings

npx knex migrate:latest
node server.js

Server runs on http://localhost:3000 by default.

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| GET    | `/api/users`        | List all users    |
| POST   | `/api/users/create` | Create a new user |
| PUT    | `/api/users/:id`    | Update a user     |
| DELETE | `/api/users/:id`    | Delete a user     |

## Validation Error Response

```json
{
  "status": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "password", "message": "Password must be at least 8 characters" }
  ]
}


Key points:  
1. Start with three backticks ``` and optionally put the language (`json` in this case).  
2. Paste your JSON inside.  
3. Close with three backticks ```.  

When you view the README on GitHub, it will show it as a nicely formatted JSON block.  

Do you want me to update your README.md snippet with all your **API responses** properly formatted this way?







