import express from 'express';
const router = express.Router();
import {userRegister} from '../../src/controllers/userController/userAccount.controller.js';

router.post('/register',userRegister);

export default router;