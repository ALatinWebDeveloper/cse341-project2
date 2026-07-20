const validator = require('../helper/validator');

const validateCategory = (req, res, next) => {
    const categoryValidationRules = {
        name: 'required|string|max:100',
        description: 'required|string',
    };

    // Directly call the validator, no inner function needed
    validator(req.body, categoryValidationRules, {}, (err, status) => {
        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }
        next();
    });
};

module.exports = validateCategory;