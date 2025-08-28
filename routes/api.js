const express = require('express');
const router = express.Router();
const UserController = require('@domains/user/controllers/UserController');
const RegisterUserController = require('@domains/user/controllers/auth/RegisterUserController');
const LoginUserController = require('@domains/user/controllers/auth/LoginUserController'); 
const LogoutUserController = require('@domains/user/controllers/auth/LogoutUserController'); 
const auth = require('@middleware/auth'); 

// Public routes (no authentication required)
router.post('/register', RegisterUserController.register);
router.post('/login', LoginUserController.login); 

// Protected routes (authentication required)
router.get('/users', auth, UserController.index);
router.post('/users/create',auth, UserController.store);
router.put('/users/:id', auth, UserController.update);
router.delete('/users/:id', auth, UserController.destroy);
router.post('/users/logout', auth, LogoutUserController.logout);


module.exports = router;