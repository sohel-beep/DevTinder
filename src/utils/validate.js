const validator = require("validator");

const validate = (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
      throw new Error("First name and last name are required");
    } else if (firstName.length < 4) {
      throw new Error("First name should be at least 4 characters long");
    } else if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough");
    }

    // ✅ Everything passed
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports =  validate ;
