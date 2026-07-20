import Conversation from "../models/conversationModel.js";
import Message from "../models/messagesModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!message) {
            return res.status(400).json({ error: "Message content is required" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Parallel execution
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({ participants: req.user._id })
            .populate({ path: "participants", select: "fullname email faculty level profilePic isVerified" })
            .populate({ path: "messages", options: { sort: { createdAt: -1 }, limit: 1 } })
            .sort({ updatedAt: -1 });

        const data = conversations.map((conversation) => ({
            id: conversation._id,
            partner: conversation.participants.find((user) => user._id.toString() !== req.user._id.toString()),
            lastMessage: conversation.messages[0] || null,
            updatedAt: conversation.updatedAt,
        }));

        res.status(200).json(data);
    } catch (error) {
        console.log("Error in getConversations controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
