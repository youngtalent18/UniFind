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
            const conversation = await Conversation.create({
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

export const getMessages = async(req, res) => {
    try{
        const {id: userToChatId } = req.params;
        const senderId = req.params._id;

        const conversation = await Conversation.create({
            participants: [senderId, receiverId],
        }).populate("messages");

        res.status(200).json(conversation.messages);
    }catch(error){
        console.log("Error in getMessages contoller",error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}