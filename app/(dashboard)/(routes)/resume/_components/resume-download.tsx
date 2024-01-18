"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const ResumeDownload = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please select a PDF file.');
    }
  };

  useEffect(() => {
    if (pdfFile) {
      extractText();
    }
  }, [pdfFile]);

  const extractText = async () => {
    if (!pdfFile) return;

    console.log("1");
  
    try {
      const formData = new FormData();
      formData.append('file', pdfFile);
  
      const response = await axios.post('/api/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Extracted Text:', response.data);
      // You can now do something with the extracted text
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to extract text');
    }
  };
  

  const handleUpload = async () => {
    if (!pdfFile) return;

    try {
      const response = await axios.post('/api/upload', pdfFile
);
  
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {pdfFile && <button onClick={handleUpload}>Download PDF</button>}
    </div>
  );
};