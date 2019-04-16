import { Request, Response } from "express";
import { apiRouter } from "./api.routes";
const fs = require('fs');
const path = require('path');

export class Routes {
  public routes(app): void {
    app.use("/api", apiRouter);
    app.route("/").get((req: Request, res: Response) => {
      console.log(__dirname)
      res.sendFile('assets/upload.html', { root: path.join(__dirname, '../../public') });
    });
  }
}
