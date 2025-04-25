import express from 'express';
import {
  usercontroller,
  loginUser,
  getallUser,
  getUserById,
  updateUserById,
  deleteUserById
} from '../controller/userController.js';

import { isAuthenticated } from '../utils/auth.js';

const router = express.Router();

// User routes
router.post('/sign', usercontroller);
router.post('/login', loginUser);
router.get('/getAllUser', getallUser);
router.get('/findById/:id', getUserById);
router.put('/update-user/:id', isAuthenticated, updateUserById);
router.delete('/delete/:id', isAuthenticated, deleteUserById);

export default router;
