//projectRoutes.js
import express from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { updateUser,getUser } from '../controllers/userController.js';
import { createContactMessage, getAllContactMessages, deleteContactMessage } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.get('/user', getUser);

// UPDATE user data (Handled by AdminJS)
router.put('/user/:id', updateUser);


// POST route to submit a contact message
router.post('/contact', createContactMessage);

// GET route to fetch all contact messages (for admin)
router.get('/contacts', getAllContactMessages);

// DELETE route to delete a contact message by ID
router.delete('/contact/:id', deleteContactMessage);
export default router;  // ✅ Default Export
