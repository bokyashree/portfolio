import express from 'express';
import { createContactMessage, getAllContactMessages, deleteContactMessage } from '../controllers/contactController.js';

const router = express.Router();

// POST route to submit a contact message
router.post('/contact', createContactMessage);

// GET route to fetch all contact messages (for admin)
router.get('/contacts', getAllContactMessages);

// DELETE route to delete a contact message by ID
router.delete('/contact/:id', deleteContactMessage);

export default router;
