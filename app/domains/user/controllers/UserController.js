const User = require("../models/User");
const UserRequest = require("../validations/UserRequest");

class UserController {

  static async index(req, res) {
    try {
      const users = await User.query();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }

  static async show(req, res) {
    try {
      const user = await User.query().findById(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found", status: false });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }

  static async store(req, res) {
    try {

      
      const schema = UserRequest.storeSchema();
      const validatedData = schema.parse(req.body);

      const existingUser = await User.query().findOne({ email: validatedData.email });
      if (existingUser) {
        return res.status(422).json({
          status: false,
          message: "Validation failed",
          errors: [{
            field: "email",
            message: "Email already exists",
            code: "unique"
          }]
        });
      }

      const userData = {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password
      };

      const result = await User.query().insert(userData);
      res.status(201).json({ message: "User created", status: true, id: result.id });
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(422).json({
          status: false,
          message: "Validation failed",
          errors: error.errors.map(e => ({
            field: e.path.join("."),
            message: e.message,
            code: e.code
          }))
        });
      }
      res.status(500).json({ error: error.message, status: false });
    }
  }

  static async update(req, res) {
    try {
  
      const schema = UserRequest.updateSchema();
      const validatedData = schema.parse(req.body);

      if (validatedData.email) {
        const existingUser = await User.query()
          .findOne({ email: validatedData.email })
          .whereNot('id', req.params.id);
        
        if (existingUser) {
          return res.status(422).json({
            status: false,
            message: "Validation failed",
            errors: [{
              field: "email",
              message: "Email already exists",
              code: "unique"
            }]
          });
        }
      }

      const updateData = { ...validatedData };
      delete updateData.password_confirmation; 

      const user = await User.query().patchAndFetchById(req.params.id, updateData);
      if (!user) return res.status(404).json({ error: "User not found", status: false });

      res.json({ message: "User updated", status: true, user });
    } catch (error) {
      if (error.name === 'ZodError') {
        return res.status(422).json({
          status: false,
          message: "Validation failed",
          errors: error.errors.map(e => ({
            field: e.path.join("."),
            message: e.message,
            code: e.code
          }))
        });
      }
      res.status(500).json({ error: error.message, status: false });
    }
  }

  static async destroy(req, res) {
    try {
      const deleted = await User.query().deleteById(req.params.id);
      if (!deleted) return res.status(404).json({ error: "User not found", status: false });
      res.json({ message: "User deleted", status: true });
    } catch (error) {
      res.status(500).json({ error: error.message, status: false });
    }
  }
}

module.exports = UserController;