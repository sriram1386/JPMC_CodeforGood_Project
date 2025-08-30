const express=require('express');
const router=express.Router();
router.use(express.json());
const {updateProblem, deleteProblem, createMachine, updateMachine, deleteMachine, addVendor, updateVendor, deleteVendor}=require('../controllers/adminController');
const Userauth=require('../middleware/auth');

//routes
router.put('/problem/:id',Userauth,updateProblem);
router.delete('/problem/:id',Userauth,deleteProblem);
router.post('/machine',Userauth,createMachine);
router.put('/machine/:id',Userauth,updateMachine);
router.delete('/machine/:id',Userauth,deleteMachine);
router.post('/vendor',Userauth,addVendor);
router.put('/vendor/:id',Userauth,updateVendor);
router.delete('/vendor/:id',Userauth,deleteVendor);
module.exports=router;