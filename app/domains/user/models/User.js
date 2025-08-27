// app/Domains/User/Models/User.js
const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', maxLength: 255 },
        email: { type: 'string', maxLength: 255 },
        password: { type: 'string', maxLength: 255 },
        status: { type: 'boolean' }
      }
    };
  }
}

module.exports = User;
