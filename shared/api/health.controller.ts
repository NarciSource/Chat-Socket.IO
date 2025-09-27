import express from "express";

import { HealthService } from "./health.service";

export default function createHealthRouter(service: HealthService) {
  const router = express.Router();

  router.get("/health", (req, res) => {
    if (service.healthy) {
      res
        .status(200)
        .json({ status: "healthy", timestamp: new Date().toISOString() });
    } else {
      res
        .status(500)
        .json({ status: "unhealthy", timestamp: new Date().toISOString() });
    }
  });

  return router;
}
