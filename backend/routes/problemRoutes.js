const express=require('express');
const router=express.Router();
router.use(express.json());
const {submitProblem}=require('../controllers/problemController');

//routes
router.post('/submitProblem',submitProblem);

module.exports=router;