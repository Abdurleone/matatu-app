const express = require('express');
const router = express.Router();
const tripHistoryController = require('../controllers/tripHistoryController');

router.post('/', tripHistoryController.createTripHistory);
router.get('/', tripHistoryController.getTripHistories);
router.get('/:id', tripHistoryController.getTripHistoryById);
router.delete('/:id', tripHistoryController.deleteTripHistoryById);

module.exports = router;