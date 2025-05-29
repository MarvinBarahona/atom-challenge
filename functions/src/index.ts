import {onRequest} from "firebase-functions/v2/https";
import app from "./app";
import userRoutes from "./users/user.routes";

app.use("/users", userRoutes);

export const api = onRequest(app);
