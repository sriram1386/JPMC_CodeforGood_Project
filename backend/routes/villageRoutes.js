const express=require('express');
const router=express.Router();
router.use(express.json());
const {getAllVillages,getVillageById}=require('../controllers/villageController');

//routes
router.get('/allVillages',getAllVillages);
router.get('/village/:id',getVillageById);

module.exports=router;