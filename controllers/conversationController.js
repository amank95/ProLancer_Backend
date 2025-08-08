
import Conversation from "../models/conversational_model.js";

export const createConversation = async (req, res) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    res.status(500).send({ message: "Failed to create conversation", error: err.message });
    console.error("Error creating conversation:", err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    res.status( 500).send({ message: "Failed to update conversation", error: err.message });
    console.error("Error updating conversation:", err);
  }
};

export const getSingleConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return res.status(404).send({ message: "Conversation not found" });
    res.status(200).send(conversation);
  } catch (err) {
    res.status(500).send({ message: "Failed to retrieve conversation", error: err.message });
    console.error("Error retrieving conversation:", err);
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    res.status(500).send({ message: "Failed to retrieve conversations", error: err.message });
    console.error("Error retrieving conversations:", err);
  }
};