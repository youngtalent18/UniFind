import Conversation from "../models/conversationModel";
import Message from "../models/messagesModel";

export const sendMessage = async(req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if(!conversation){
            const converstaion = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        //this is a parallel execution compared to the above
        await Promise.all([await conversation.save(), await newMessage.save()]);

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessage contoller",error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}