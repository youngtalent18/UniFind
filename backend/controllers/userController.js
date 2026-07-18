import User from "../models/userModel";

export const getUserForASidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });


    } catch (error) {
        console.log("Error in getUserForASidebar", error);
        res.status(500).json("Internal Server Error");
    }
}