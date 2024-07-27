import React, { useState } from "react";
import { Document, Page } from "react-pdf";

export default function Pdf() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onFileLoad = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile(e.target.result);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // console.log(selectedFile);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <input type="file" accept=".pdf" onChange={onFileLoad} />

      {selectedFile && (
        <>
          <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </>
      )}

      {numPages && (
        <p>
          Page {pageNumber} of {numPages}
        </p>
      )}
    </>
  );
}
