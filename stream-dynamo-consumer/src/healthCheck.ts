import express from "express";

let healthy = false;

export function setHealthy(status: boolean) {
  healthy = status;
}

export function getHealthy() {
  return healthy;
}

export default function healthCheck() {
  const app = express();
  const port = 3000;

  app.get("/health", (req, res) => {
    if (getHealthy()) {
      res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
      });
    } else {
      res.status(500).json({
        status: "unhealthy",
        timestamp: new Date().toISOString(),
      });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
