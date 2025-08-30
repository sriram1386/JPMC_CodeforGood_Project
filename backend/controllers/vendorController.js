const vendor=require('../Models/vendor');

//list all vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await vendor.find();
        res.status(200).json(vendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
module.exports={getAllVendors};