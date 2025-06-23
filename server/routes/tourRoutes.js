const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllTours, createTour, updateTour, deleteTour } = require('../controllers/tourController');

router.get('/', getAllTours);
router.post('/', auth, createTour);
router.put('/:id', auth, updateTour);
router.delete('/:id', auth, deleteTour);

module.exports = router; 