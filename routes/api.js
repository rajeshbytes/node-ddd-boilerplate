// routes/api.js
const express = require('express');
const router = express.Router();
const UserController = require('../app/domains/user/controllers/UserController');

router.get('/users',UserController.index);
router.post('/users/create', UserController.store);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.destroy);


module.exports = router;