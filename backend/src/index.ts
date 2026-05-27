import express  from "express";
import { ENV } from "./config/env";
import { clerkMiddleware } from '@clerk/express'
import cors from "cors";
import userRouter from "./controllers/userController";
import productRouter from "./controllers/productController";
import commentRouter from "./controllers/commentController";

const app = express();
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ENV.FRONTEND_URL,
  credentials: true
}));

app.get("/api/health", (req, res) => {
  res.json({
    message: "Welcome to shpprt API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/comments", commentRouter);

app.listen(ENV.PORT, () => {
  console.log("Welcome to the shpprt backend\nServer is running on port " + ENV.PORT);
});