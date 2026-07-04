const { validationResult } = require('express-validator');

// Runs after express-validator's checks If any check failed, stop here
// and send a structured 422 response instead of reaching the controller
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      status: 'fail',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = validateRequest;