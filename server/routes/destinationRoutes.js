const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllDestinations, createDestination, updateDestination, deleteDestination } = require('../controllers/destinationController');

router.get('/', getAllDestinations);
router.post('/', auth, createDestination);
router.put('/:id', auth, updateDestination);
router.delete('/:id', auth, deleteDestination);

module.exports = router; 