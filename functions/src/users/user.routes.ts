import { Router as expressRouter } from 'express';

import { validateBody, validateQuery } from '../middlewares/validate';

import { checkUserExist, createUser } from './user.controller';
import { checkUserQuerySchema, createUserBodySchema } from './user.validators';

const router = expressRouter();

router.get('/check', validateQuery(checkUserQuerySchema), checkUserExist);
router.post('/', validateBody(createUserBodySchema), createUser);

export default router;
