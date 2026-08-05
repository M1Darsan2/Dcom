import express from "express";
import { ENV } from "./src/config/env.js";
import { connectDb } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.routes.js";
import productRoute from "./src/routes/product.routes.js";
import cartRouter from "./src/routes/cart.routes.js";
import paymentRoute from "./src/routes/payment.routes.js";
import analyticRoute from "./src/routes/analytic.routes.js";
import orderRoute from "./src/routes/order.routes.js";
import cors from "cors";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use('/api/payment', paymentRoute);
app.use('/api/analytic', analyticRoute);
app.use('/api/order', orderRoute);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(ENV.PORT, () => {
  connectDb();
  console.log(`server started ${ENV.PORT}`);
});