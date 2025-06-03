import { onRequest } from 'firebase-functions/v2/https';

import app from './app';

import userRoutes from './users/user.routes';
import toDoRoutes from './to-do/to-do.routes';

app.use('/users', userRoutes);
app.use('/to-do', toDoRoutes);

export const api = onRequest(app);
