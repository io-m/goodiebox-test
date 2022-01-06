import express from 'express'
import bodyParser from 'body-parser';

import config from './utils/conf';
import logger from './middlewares/logger';
import logging from './utils/logging';
import allowOrigins from './middlewares/origins';
import controller from './controllers';
import UserService from './services/user.service';
import { isAuth } from './middlewares/authenticate';
// import routes from './routes/routes'
import { initFirebaseAdmin } from './utils/firebase-config';

const NAMESPACE = 'Server';
const app = express();
initFirebaseAdmin()
app.use(logger(NAMESPACE))

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowOrigins);


// All these routes could go in separate folder called routes and be defined there, and then imported here
const userService: UserService = new UserService()

app.get('/', controller.healthCheck);
app.get('/profile', isAuth, controller.getProfile(userService));
app.post('/register', /*isAuth,/*validateInputs,*/ controller.register(userService));
app.put('/profile/:id', isAuth, controller.updateProfile(userService));

app.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`)
})