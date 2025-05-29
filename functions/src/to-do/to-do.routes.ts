import {Router as expressRouter} from "express";

import {validateBody} from "../middlewares/validate";

import {checkUserAuth} from "../middlewares/check-user";
import {createItem, deleteItem, getToDoList, updateItem} from "./to-do.controller";
import {upsertToDoListItemSchema} from "./to-do.validators";

const router = expressRouter();

router.get(
  "/",
  checkUserAuth(),
  getToDoList
);

router.post(
  "/",
  checkUserAuth(),
  validateBody(upsertToDoListItemSchema),
  createItem
);

router.patch(
  "/:itemId",
  checkUserAuth(),
  validateBody(upsertToDoListItemSchema),
  updateItem
);

router.delete(
  "/:itemId",
  checkUserAuth(),
  deleteItem,
);

export default router;
