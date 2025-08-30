const UserModel = require('../Models/user');
const VleModel = require('../Models/vle');
const VillageModel = require('../Models/village');

//list all villges
const getAllVillages = async (req, res) => {
    try {
        const villages = await VillageModel.find();
        res.status(200).json(villages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//by id
const getVillageById = async (req, res) => {
    try {
        const village = await VillageModel.findById(req.params.id);
        if (!village) {
            return res.status(404).json({ message: 'Village not found' });
        }
        res.status(200).json(village);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getAllVillages, getVillageById };