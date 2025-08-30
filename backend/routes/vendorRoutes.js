const express=require('express');
const router=express.Router();
router.use(express.json());
const {getAllVendors}=require('../controllers/vendorController');

//routes
router.get('/allVendors',getAllVendors);

module.exports=router;