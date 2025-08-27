// Middleware/validate.js - Debug version
const Log = require('../storage/logs/log');
function validate(schemaClass, methodName) {
    return (req, res, next) => {
        try {
            if (!req.body || typeof req.body !== "object") req.body = {};

            // Call the class method to get Zod schema
            const schema = schemaClass[methodName](req);

            // Use safeParse instead of parse
            const result = schema.safeParse(req.body);

            console.log("Validation result:", JSON.stringify(result, null, 2));

            if (result.success) {
                next();
            } else {
                console.log("Zod error object:", JSON.stringify(result.error, null, 2));
                
                // Handle different possible error structures
                let errors = [];
                
                if (result.error.errors && Array.isArray(result.error.errors)) {
                    errors = result.error.errors.map(e => ({
                        field: e.path && Array.isArray(e.path) ? e.path.join(".") : "unknown",
                        message: e.message || "Validation error",
                        code: e.code || "invalid_type"
                    }));
                } else if (result.error.issues && Array.isArray(result.error.issues)) {
                    // Some Zod versions use 'issues' instead of 'errors'
                    errors = result.error.issues.map(e => ({
                        field: e.path && Array.isArray(e.path) ? e.path.join(".") : "unknown",
                        message: e.message || "Validation error",
                        code: e.code || "invalid_type"
                    }));
                } else {
                    errors = [{ field: "unknown", message: "Validation error occurred" }];
                }

                return res.status(422).json({
                    status:true,
                    message: "Validation failed",
                    errors: errors
                });
            }
        } catch (error) {
            // console.error("Unexpected validation middleware error:", error);

            Log.error('Unexpected validation middleware error', {
                method: req.method,
                url: req.url,
                schema: methodName,
                error: error.message,
                stack: error.stack,
                requestBody: req.body 
            });
            
            return res.status(500).json({
                error: "Unexpected validation error",
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    };
}

module.exports = validate;