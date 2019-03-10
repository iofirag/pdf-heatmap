import { Request, Response } from "express";
import { apiRouter } from "./api.routes";

export class Routes {
  public routes(app): void {
    app.use("/api", apiRouter);
    app.route("/").get((req: Request, res: Response) => {
      const pageContent: string = `<h1>PDF Heatmap 👑</h1>`;
      res.status(200).send(pageContent);
    });
  }
}
