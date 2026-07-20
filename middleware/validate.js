const validator = require('../helper/validator');

const validateProduct = (req, res, next) => {

    const dataValidation = {
        name: 'required|string',
        description: 'required|string',
        price: 'required|numeric',
        category: 'required|string',
        quantity: 'required|integer',
        manufacturer: 'required|string'
    };

    validator(req.body, dataValidation, {}, (err, status) => {
        if (!status) {
            res.status(400)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = validateProduct;