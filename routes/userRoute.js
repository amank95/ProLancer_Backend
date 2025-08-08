import express from 'express';
import { deleteUser ,getUser} from '../controllers/userController.js';
import { verifyToken } from '../middleware/jwt.js';
const router = express.Router();

// Route to delete a user
router.delete('/:id',verifyToken, deleteUser);
// router.get('/:id', verifyToken, getUser);
router.get('/:id', getUser);
export default router;
