import Contact from '../models/Contact.js';

// Function to create a new contact message
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Contact message saved successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get all contact messages (Admin route)
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to delete a contact message by ID
export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await Contact.findByIdAndDelete(id);
    
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Contact message deleted successfully', data: deletedMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
