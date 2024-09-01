import express from 'express';
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  getUserByPhoneNumber,
  registerService, 
  registerReferral 
} from '../controllers/userController.js';

const router = express.Router();

// Rutas CRUD para usuarios
router.post('/user', createUser);
router.get('/user', getUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.get('/user/phone/:phoneNumber', getUserByPhoneNumber);

// Rutas para registrar servicios y referidos
router.post('/user/service/:id', registerService);
router.post('/user/referral/:id', registerReferral);

export default router;
