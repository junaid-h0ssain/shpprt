import type { Request, Response } from "express";
import { Router } from "express";
import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

const userRouter = Router();

export async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { email, name, imageUrl } = req.body;

    if (!email || !name || !imageUrl) {
      return res.status(400).json({ error: "Email is required" });
    }

    const userData = {
      email,
      ...(name !== undefined ? { name } : {}),
      ...(imageUrl !== undefined ? { imageUrl } : {}),
    };

    const existingUser = await queries.getUserById(userId);
    const user = existingUser
      ? await queries.updateUser(userId, userData)
      : await queries.createUser({
          id: userId,
          ...userData,
        });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
}

userRouter.post("/sync", syncUser);

export default userRouter;
