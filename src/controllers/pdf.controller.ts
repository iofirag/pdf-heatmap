import { Request, Response } from "express";
import * as fs from 'fs';
import Utils from '../utils/utils';
import * as pdftohtml from 'pdftohtmljs';
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

export class PdfController {
  public static upload = async (req: any, res: Response) => {
    const username = 'admin';

    // Check for any file key
    if (!req.files || Object.keys(req.files).length == 0) {
      return Utils.handleError('No files were uploaded.', res);
    }
    
    await fs.mkdir(`public/${username}`, { recursive: true }, (err) => {
      if (err) return Utils.handleError(err, res);  
    })

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    console.log('File uploaded!', req.files.pdf);

    const {tempFilePath, name, size, md5} = req.files.pdf;
    
    const pdf2htmlexLibLocation: string = 'C:/pdf2htmlEX-win32-0.14.6-upx-with-poppler-data';
    const destLocation: string = `public/${username}`;
    const htmlFileName = `${md5}${Date.now()}.html`;

    let converter = new pdftohtml(`${tempFilePath}`, htmlFileName);
    converter.add_options([
      `--data-dir=${pdf2htmlexLibLocation}/data`,
      `--dest-dir=${destLocation}`
    ]);
    // progress handler
    converter.progress((ret) => {
      console.log ((ret.current*100.0)/ret.total + ' %');
    });

    try {
      await converter.convert()
      console.log("Success convert to html");
      return res.status(200).json({ 
        success: 1,
        fileSize: size + ' bytes',
        link: `http://localhost:8080/${username}/${htmlFileName}` 
      });
    } catch(ex) {
      console.log(ex)
      return Utils.handleError(ex, res);
    } finally {
      await fs.unlink(tempFilePath, (err) => {
        if (err) throw err;
        console.log("Success delete temp file");
      });
    }
  };
}


    /*
    const username = 'admin';
    const pdf2htmlexLibLocation: string = 'C:/pdf2htmlEX-win32-0.14.6-upx-with-poppler-data';
    const destLocation: string = `public/${username}`;
    const fileFullName: string = `test.pdf`;
    const sourcePath: string = `pdfs`;

    try {
      const { stdout, stderr } = await exec(`pdf2htmlEX ${sourcePath}/${fileFullName} --data-dir=${pdf2htmlexLibLocation}/data --dest-dir=${destLocation}`);  // --dest-dir=C:/Users/oaghai/Documents/pdf-heatmap
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      const htmlFileName = fileFullName.replace('.pdf', '.html')
      return res.status(200).json({ success: 1, link: `http://localhost:8080/${username}/${htmlFileName}` });
    } catch(ex) {
      console.log('ex:', ex);
    }
    */