import express from "express";
import {
  passportAuthenticate,
  secretController,
} from "./controllers/secretController";
import healthRoutes from "./routes/healthRoutes";
import stocksRoutes from "./routes/stocksRoutes";
import "dotenv/config";

const app = express();

const IP_ADDRESS = process.env.IP_ADDRESS;
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/secret", passportAuthenticate, secretController);

app.use("/v1/stocks", stocksRoutes);
app.use("/health", healthRoutes);

const server = app.listen(PORT, () => {
  console.log(`REST API server ready at: http://${IP_ADDRESS}:${PORT}`);
});

export { app, server };
