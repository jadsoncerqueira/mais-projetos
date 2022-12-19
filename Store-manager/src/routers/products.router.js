const express = require('express');
const { productsController } = require('../controllers');
const { valInput } = require('../middlewares');

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/search', productsController.getProductName);
router.get('/:id', productsController.getProductsById);
router.post('/', valInput.validateInputs, productsController.insertProducts);
router.put('/:id', valInput.validateProductName, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;