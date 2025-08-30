const vleModel = require("../Models/vle");

const updateVle = async (req, res) => {
    try {
        const { id } = req.params;
        const { fromDate, toDate, incomeBetween } = req.body;
        
        const updateData = {};
        
        if (fromDate) updateData.fromDate = new Date(fromDate);
        if (toDate) updateData.toDate = new Date(toDate);
        if (incomeBetween !== undefined) updateData.incomeBetween = incomeBetween;

        const vle = await vleModel.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!vle) {
            return res.status(404).json({ message: "VLE not found" });
        }
        
        res.status(200).json(vle);
    } catch (error) {
        console.error("Error updating VLE:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { updateVle };