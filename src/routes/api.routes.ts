import { Request, Response, Router } from "express";
import { pdfRouter } from "./pdf/pdf.routes";

export const apiRouter: Router = Router();

apiRouter
  .use("/pdf", pdfRouter)

  .get("/", (req: Request, res: Response) => {
    const pageContent: string = `<h1>Our King 👑 api</h1>`;
    res.status(200).send(pageContent);
  });
