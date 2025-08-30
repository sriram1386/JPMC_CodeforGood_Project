const express = require('express');
const router = express.Router();
const { updateVle, getVlesByDateAndIncome, getAllVles } = require('../controllers/vleController');

router.use(express.json());

// Update VLE by ID
router.put('/:id', updateVle);

// Get VLEs filtered by date range and income
router.get('/filter', getVlesByDateAndIncome);

// Get all VLEs
router.get('/', getAllVles);

module.exports = router;