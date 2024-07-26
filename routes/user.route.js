import express from 'express';
import { deleteUser, updateUser, getUser} from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/:id', verifyToken, getUser)
// router.post('/update/:id', verifyToken, updateUser) --> will implement these commented latter on !
// router.delete('/delete/:id', verifyToken, deleteUser)

export default router;