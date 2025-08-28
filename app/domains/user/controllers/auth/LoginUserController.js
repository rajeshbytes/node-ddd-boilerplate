const User = require('@domains/user/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('@config/database');
const UserData = require('@domains/user/validations/UserRequest');


class LoginUserController {
    static async login(req, res) {
      try {
        const schema = UserData.loginSchema();
        const validatedData = schema.parse(req.body);

        const { email, password } = validatedData;
        const user = await User.query().findOne({ email: email.toLowerCase().trim() });
        
        if (!user) {
          return res.status(401).json({
            status: false,
            error: 'Invalid email or password'
          });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
          return res.status(401).json({
            status: false,
            error: 'Invalid email or password'
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          { 
            id: user.id, 
            email: user.email,
            name: user.name 
          },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        await knex('api_tokens').insert({
          user_id: user.id,
          token,
          device_info: req.headers['user-agent'] || 'Unknown device',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        res.json({
          status: true,
          message: 'Login successful',
          user: { 
            id: user.id, 
            name: user.name, 
            email: user.email,
            created_at: user.created_at
          },
          token,
          expires_in: '24 hours'
        });

      } catch (error) {      
        if (error.name === 'ZodError') {
          const issues = error.issues || error.errors || [];
          
          return res.status(422).json({
            status: false,
            message: "Validation failed",
            errors: issues.map(e => ({
              field: e.path ? e.path.join(".") : "",
              message: e.message || "Validation error",
              code: e.code || "invalid_type"
            }))
          });
        }
        
        if (error.code === 'ECONNREFUSED') {
          return res.status(500).json({
            status: false,
            error: 'Database connection failed'
          });
        }

        res.status(500).json({ 
          status: false, 
          error: 'Server error',
          message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
      }
    }
}

module.exports = LoginUserController;