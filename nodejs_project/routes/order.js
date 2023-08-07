const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');

router.post('/add-order', orderController.addOrder);
router.get('/get-order', orderController.getOrder);
router.delete('/delete-order/:id', orderController.deleteOrder);

module.exports = router;