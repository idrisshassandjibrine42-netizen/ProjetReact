import express from "express";
import dotenv from "dotenv";
import testRoute from "./routes/testRoute.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use("/api", testRoute);
app.get("/", (req, res) => {
  res.send("Mon serveur démarre avec succès !");
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
