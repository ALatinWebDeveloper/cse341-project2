const express = require('express')
const router = express.Router();

const categoriesController = require('../controllers/categories');
const categoryValidator = require('../middleware/validateCategory');
const validator = require('../helper/validator.js');

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getSingle);

router.post('/', categoryValidator, categoriesController.createCategory);

router.put('/:id', categoryValidator, categoriesController.updateCategory);

router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;