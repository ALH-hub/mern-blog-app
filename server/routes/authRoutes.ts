import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authControlllers';
import { authenticateToken, handleValidationErrors } from '../middleware/auth';
import { validateSchema } from '../middleware/validation';
import { userCreateSchema, userLoginSchema } from '../schemas/validation';

const routes = express.Router();

routes.post(
  '/register',
  validateSchema(userCreateSchema),
  handleValidationErrors,
  registerUser,
);
routes.post(
  '/login',
  validateSchema(userLoginSchema),
  handleValidationErrors,
  loginUser,
);
routes.post('/logout', authenticateToken, logoutUser);

export default routes;
