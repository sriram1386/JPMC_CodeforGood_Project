const machine=require('../Models/machine');

//list all machines
const getAllMachines = async (req, res) => {
    try {
        const machines = await machine.find();
        res.status(200).json(machines);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

//by id
const getMachineById = async (req, res) => {
    try {
        const Machine = await machine.findById(req.params.id);
        if (!Machine) {
            return res.status(404).json({ message: 'Machine not found' });
        }
        res.status(200).json(Machine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
module.exports={getAllMachines,getMachineById};