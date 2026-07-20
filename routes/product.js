const express = require('express');
const router = express.Router();

const productsController = require('../controllers/product.js');
const productValidator = require('../middleware/validate.js');
const validator = require('../helper/validator.js');

router.get('/', productsController.getAll);
router.get('/:id', productsController.getSingle);

router.post('/', productValidator, productsController.createProduct);

router.put('/:id', productValidator, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;