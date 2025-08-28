const jwt = require("jsonwebtoken");
const knex = require("@config/database");

async function auth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        error: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const validToken = await knex("api_tokens")
    .where("user_id", decoded.id)
    .where("token", token)
    .whereNotNull("expires_at")
    .where("expires_at", ">", new Date())
    .first();

    if (!validToken) {
      return res.status(401).json({
        status: false,
        error: "Token expired or invalid",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        error: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: false,
        error: "Invalid token",
      });
    }

    console.error("Auth middleware error:", error);
    res.status(500).json({ status: false, error: "Server error" });
  }
}

module.exports = auth;
