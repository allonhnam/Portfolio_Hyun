import WindowsControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const MIN_PDF_WIDTH = 320;
const MAX_PDF_WIDTH = 1400;
const DEFAULT_PDF_WIDTH = 700;

const Resume = () => {
  const [pageWidth, setPageWidth] = useState(DEFAULT_PDF_WIDTH);

  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = pageWidth;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      setPageWidth(
        Math.min(MAX_PDF_WIDTH, Math.max(MIN_PDF_WIDTH, startWidth + dx)),
      );
    };

    const handleMouseUp = () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    document.body.style.cursor = "nwse-resize";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div id="window-header">
        <WindowsControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="download resume"
        >
          <Download className="icon" />
        </a>
      </div>
      <div className="pdf-preview">
        <div className="media-resize-wrap" style={{ width: pageWidth }}>
          <Document file="files/resume.pdf">
            <Page
              pageNumber={1}
              width={pageWidth}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
          <div className="media-resize-handle" onMouseDown={startResize} />
        </div>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
