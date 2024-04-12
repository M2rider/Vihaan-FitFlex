import userModel from "../models/userModel.js";
import enrollModel from "../models/enrollModel.js";

export const userDetailsController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.user._id });
        await enrollModel.deleteMany({ expiryDate: { $lt: Date.now() } });
        const plans = await enrollModel.find({ user: req.user._id })
            .populate('plan')
        console.log(plans);
        res.status(200).send({
            success: true,
            message: 'Success',
            plans,
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Some error occured',
            error
        })
    }
    // console.log(user);

}