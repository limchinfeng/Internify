// pages/api/extract-text.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("1");
  const form = new formidable.IncomingForm();
  console.log("2pdf.");
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing the form data.' });
      return;
    }

    try {
      const file = files.file as unknown as formidable.File;
      const dataBuffer = fs.readFileSync(file.filepath);
      const data = await pdfParse(dataBuffer);

      res.status(200).json({ text: data.text });
    } catch (error) {
      res.status(500).json({ error: 'Error processing the PDF file.' });
    }
  });
};
