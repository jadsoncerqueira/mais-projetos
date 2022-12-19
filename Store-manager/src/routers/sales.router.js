const express = require('express');
const { salesController } = require('../controllers');
const { valInput } = require('../middlewares');

const router = express.Router();

router.post('/', valInput.validateInputsSales, salesController.insertSales);
router.get('/', salesController.getSales);
router.put('/:id', valInput.validateInputsSales, salesController.updateSales);
router.get('/:id', salesController.getByIdSales);
router.delete('/:id', salesController.deleteSales);

module.exports = router;