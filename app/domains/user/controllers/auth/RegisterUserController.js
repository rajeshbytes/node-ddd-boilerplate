const User = require('@domains/user/models/User');
const UserData = require('@domains/user/validations/UserRequest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('@config/database');

class RegisterUserController {
  static async register(req, res) {
    try {
      const schema = UserData.storeSchema();
      const validatedData = schema.parse(req.body);
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      const newUser = await User.query().insert({
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Store token in user_tokens table
      await knex('api_tokens').insert({
        user_id: newUser.id,
        token,
        device_info: req.headers['user-agent'],
        expires_at: new Date(Date.now() + 60 * 60 * 1000)
      });
      
      res.status(201).json({
        status: true,
        message: 'User registered successfully',
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        token
      });
      
    } catch (error) {
      // Handle Zod validation errors
      if (error.name === 'ZodError') {
        const issues = error.issues || [];
        
        return res.status(422).json({
          status: false,
          message: 'Validation failed',
          errors: issues.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }

      // Handle duplicate email error
      if (error.code === 'ER_DUP_ENTRY' || error.nativeError?.errno === 1062) {
        return res.status(409).json({ 
          status: false, 
          error: 'Email already exists',
          message: 'This email address is already registered. Please use a different email or try logging in.'
        });
      }

      console.error('Registration error:', error);
      res.status(500).json({ status: false, error: 'Server error' });
    }
  }
}

module.exports = RegisterUserController;