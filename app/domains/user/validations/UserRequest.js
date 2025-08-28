// dataObjects/UserData.js
const { z } = require('zod');

class UserData {
  static storeSchema() {
    return z.object({
      name: z.string().min(1, "Name is required").max(255, "Name too long"),
      email: z.string().email("Invalid email format").max(255, "Email too long"),
      password: z.string().min(6, "Password must be at least 6 characters").max(255),
      password_confirmation: z.string().min(6, "Password confirmation must be at least 6 characters")
    }).refine(data => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ["password_confirmation"]
    });
  }

  static updateSchema() {
    return z.object({
      name: z.string().min(1, "Name is required").max(255, "Name too long").optional(),
      email: z.string().email("Invalid email format").max(255, "Email too long").optional(),
      password: z.string().min(6, "Password must be at least 6 characters").max(255).optional(),
      password_confirmation: z.string().min(6, "Password confirmation must be at least 6 characters").optional()
    }).refine(data => {
      // Only validate password confirmation if password is provided
      if (data.password) {
        return data.password === data.password_confirmation;
      }
      return true;
    }, {
      message: "Passwords don't match",
      path: ["password_confirmation"]
    });
  }

  static loginSchema() {
    return z.object({
      email: z.string().email(),
      password: z.string().min(1, 'Password is required')
    });
  }
}

module.exports = UserData;