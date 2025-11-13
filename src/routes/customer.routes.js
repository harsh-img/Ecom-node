import express from 'express';
const router = express.Router();
import {userRegister , userLogin} from '../../src/controllers/userController/userAccount.controller.js';

router.post('/register',userRegister);
router.post('/login',userLogin);

export default router;