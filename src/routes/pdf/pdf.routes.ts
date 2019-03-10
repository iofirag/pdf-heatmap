import { Router } from "express";
import { PdfController as cont } from "../../controllers/pdf.controller";

export const pdfRouter: Router = Router();

pdfRouter
  .post('/upload', cont.upload)

