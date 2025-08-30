const problem=require('../Models/problemreport');

//submit a problem
const submitProblem = async (req, res) => {
    try {
        const problemData = req.body;
        const newProblem = new problem(problemData);
        const savedProblem = await newProblem.save();
        res.status(201).json(savedProblem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
module.exports={submitProblem};