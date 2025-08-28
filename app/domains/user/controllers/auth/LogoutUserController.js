const knex = require('@config/database');

class LogoutUserController {
  static async logout(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (token) {
        // Delete token from database
        await knex('api_tokens')
          .where('token', token)
          .delete();
      }

      res.json({
        status: true,
        message: 'Logout successful'
      });

    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ status: false, error: 'Server error' });
    }
  }
}

module.exports = LogoutUserController;