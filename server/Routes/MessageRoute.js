import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import MessageController from '../Controller/MessageController.js';

const messageRoutes = express.Router();

messageRoutes.get('/allchats', authMiddleware, MessageController.getAllChats);

export default messageRoutes;