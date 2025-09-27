import express from "express";

import { healthService } from "./health.service";
import createHealthRouter from "./health.controller";

export class Server {
  public start() {
    const app = express();
    const port = 3000;

    app.use(createHealthRouter(healthService));

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}

export default new Server();
