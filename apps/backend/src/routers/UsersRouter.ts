import { Router } from 'express';
import { addUser, fetchAllUsers, fetchUserById, patchUser } from '../data-access/users/UsersService';

const router = Router();

router.get('/', fetchAllUsers);
router.get(':id', fetchUserById);
router.post('/', addUser);
router.patch(':id', patchUser);

export { router as UsersRouter };
