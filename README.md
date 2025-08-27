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

1. Clone the repository:
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



