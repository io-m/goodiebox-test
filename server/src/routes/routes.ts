import express from 'express';
import controller from '../controllers';
import UserService from '../services/user.service';
import { isAuth } from '../middlewares/authenticate';
import validateInputs from '../middlewares/validator';

const router = express.Router();
const userService: UserService = new UserService()

router.get('/', controller.healthCheck);
router.get('/profile', isAuth, controller.getProfile(userService));
router.post('/register', /*isAuth,/*validateInputs,*/ controller.register(userService));
router.put('/profile/:id', isAuth, controller.updateProfile(userService));

export = router;