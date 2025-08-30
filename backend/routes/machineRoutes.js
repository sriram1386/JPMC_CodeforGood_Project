const express=require('express');
const router=express.Router();
router.use(express.json());
const {getAllMachines,getMachineById}=require('../controllers/machineController');

//routes
router.get('/allMachines',getAllMachines);
router.get('/machine/:id',getMachineById);

module.exports=router;