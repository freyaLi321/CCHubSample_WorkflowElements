import express from "express";
import ViteExpress from "vite-express";
import { CCHubConfiguration } from "./cchub-configuration.js";
import { CCHubService } from "./cchub-service.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const config = new CCHubConfiguration();
const cchubService = new CCHubService(config);

app.get("/api/get-token/:userId", async (req, res) => {
  const storefrontUserToken = await cchubService.getStorefrontToken(req.params.userId);

  res.json({
    storefrontUserToken
  });
});

app.post("/api/save-project/", async (req, res) => {
  const { privateDesignId, userId, orderId } = req.body;

  const project = await cchubService.saveProjectInCCHub(privateDesignId, userId, orderId);
  
  res.json(project);
});


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
