import express from 'express';
const router = express.Router();
import UserController from '../controllers/usercontroller.js';
import checkUserAuth from '../middlewares/authmiddleware.js';

// Route Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)

// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)




export default router