const User=require('../Models/user');
const VleModel = require('../Models/vle');
const VillageModel = require('../Models/village');
const machineModel=require('../Models/machine');
const vendor=require('../Models/vendor');
const problemreport=require('../Models/problemreport');
const bcrypt=require('bcryptjs');

//create new village
const createVillage = async (req, res) => {
    try {
        const { village, district, subdistrict, population, farmers } = req.body;
        const newVillage = new VillageModel({ village, district, subdistrict, population, farmers });
        await newVillage.save();
        res.status(201).json(newVillage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//update village
const updateVillage = async (req, res) => {
    try {
        const { id } = req.params;
        const { village, district, subdistrict, population, farmers } = req.body;
        const updatedVillage = await VillageModel.findByIdAndUpdate(id, { village, district, subdistrict, population, farmers }, { new: true });
        if (!updatedVillage) {
            return res.status(404).json({ message: 'Village not found' });
        }
        res.status(200).json(updatedVillage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


//delete village
const deleteVillage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVillage = await VillageModel.findByIdAndDelete(id);
        if (!deletedVillage) {
            return res.status(404).json({ message: 'Village not found' });
        }
        res.status(200).json({ message: 'Village deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


//list all vles
const getAllVles = async (req, res) => {
    try {
        const vles = await VleModel.find();
        res.status(200).json(vles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//new vle
const createVle = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newVle = new VleModel({ name, email, password: hashedPassword });
        await newVle.save();
        res.status(201).json(newVle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//update vle
const updateVle = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedVle = await VleModel.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true });
        if (!updatedVle) {
            return res.status(404).json({ message: 'VLE not found' });
        }
        res.status(200).json(updatedVle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//delete vle
const deleteVle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVle = await VleModel.findByIdAndDelete(id);
        if (!deletedVle) {
            return res.status(404).json({ message: 'VLE not found' });
        }
        res.status(200).json({ message: 'VLE deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};



//list all problems
const getAllProblems = async (req, res) => {
    try {
        const problems = await problemreport.find();
        res.status(200).json(problems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//get problem with id
const getProblemById = async (req, res) => {
    try {
        const problem = await problemreport.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//update problem
const updateProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const updatedProblem = await problemreport.findByIdAndUpdate(id, { title, description, status }, { new: true });
        if (!updatedProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json(updatedProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
//delete problem
const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProblem = await problemreport.findByIdAndDelete(id);
        if (!deletedProblem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json({ message: 'Problem deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//create new machine
const createMachine = async (req, res) => {
    try {
        const { name,acquisitionDate } = req.body;
        const newMachine = new machineModel({  name,acquisitionDate});
        await newMachine.save();
        res.status(201).json(newMachine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//update
const updateMachine = async (req, res) => {
    try {
        const { id } = req.params;
        const { machine, village } = req.body;
        const updatedMachine = await machineModel.findByIdAndUpdate(id, { machine, village }, { new: true });
        if (!updatedMachine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.status(200).json(updatedMachine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//delete machine
const deleteMachine = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMachine = await machineModel.findByIdAndDelete(id);
        if (!deletedMachine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.status(200).json({ message: 'Machine deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//add vendor
const addVendor = async (req, res) => {
    try {
        const { name,contact,address,machinesSupplied } = req.body;
        const newVendor = new vendor({ name, contact, address, machinesSupplied: machinesSupplied});
        await newVendor.save();
        res.status(201).json(newVendor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


//update vendor
const updateVendor = async (req, res) => {
    try {
        const {id}=req.params
        const { name,contact,address,machinesSupplied  } = req.body;
        const updatedVendor = await vendor.findByIdAndUpdate(id,{ name, contact, address, machinesSupplied }, { new: true });
        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(updatedVendor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//delete vendor
const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVendor = await vendor.findByIdAndDelete(id);
        if (!deletedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { updateProblem, deleteProblem, createMachine, updateMachine, deleteMachine, addVendor, updateVendor, deleteVendor };