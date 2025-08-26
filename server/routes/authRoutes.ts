import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/authControlllers.js';
import {
  authenticateToken,
  handleValidationErrors,
} from '../middleware/auth.js';
import { validateSchema } from '../middleware/validation.js';
import { userCreateSchema, userLoginSchema } from '../schemas/validation.js';

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
