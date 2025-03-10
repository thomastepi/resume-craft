import React, { useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { isMobile } from "react-device-detect";
import Template1 from "./Template1";
import Template2 from "./Template2";
import ResumeCustomization from "./ResumeCustomization";
import "./Templates.css";
import DefaultLayout from "../../components/DefaultLayout";
import { useParams, useNavigate } from "react-router-dom";
import { ResumeContext } from "../../context/ResumeContext";

const Templates = () => {
  const navigate = useNavigate();
  const params = useParams();
  const componentRef = useRef();

  const { generatedHTML, setGeneratedHTML, isGenerating } =
    useContext(ResumeContext);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    copyShadowRoots: true,
  });

  const handleDownloadPDF = () => {
    const element = componentRef.current;
    const cloneElement = element.cloneNode(true);

    const extractShadowRoots = (element) => {
      if (element.shadowRoot) {
        Array.from(element.shadowRoot.children).forEach((child) => {
          cloneElement.appendChild(child.cloneNode(true));
        });
      }
      element.childNodes.forEach(extractShadowRoots);
    };
    extractShadowRoots(element);

    html2pdf()
      .from(cloneElement)
      .set({
        margin: [10, 10],
        filename: "Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          removeContainer: false,
          logging: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  const getTemplate = () => {
    switch (params.id) {
      case "1":
        return <ResumeCustomization />;
      case "2":
        return <Template1 />;
      case "3":
        return <Template2 />;
      default:
        return null;
    }
  };
  return (
    <DefaultLayout>
      <div className="button-container">
        {params.id === "1" && generatedHTML && (
          <button
            className="btn-primary"
            style={{ width: "fit-content", padding: "0 20px" }}
            disabled={isGenerating}
            onClick={() => setGeneratedHTML(null)}
          >
            Regenerate
          </button>
        )}
        <button
          className="btn-primary"
          style={{ width: "fit-content", padding: "0 20px" }}
          disabled={isGenerating}
          onClick={() => {
            navigate("/home");
          }}
        >
          {params.id === "1" && generatedHTML ? "Back to Home" : "Back"}
        </button>
        {params.id === "1" && generatedHTML && (
          <>
            {isMobile ? (
              <button
                className="btn-secondary"
                style={{ width: "fit-content", padding: "0 20px" }}
                disabled={isGenerating}
                onClick={handleDownloadPDF}
              >
                Download as PDF
              </button>
            ) : (
              <button
                className="btn-secondary"
                style={{ width: "fit-content", padding: "0 20px" }}
                disabled={isGenerating}
                onClick={handlePrint}
              >
                Print/Save
              </button>
            )}
          </>
        )}
        {params.id === "2" || params.id === "3" ? (
          <>
            {isMobile ? (
              <button
                className="btn-secondary"
                style={{ width: "fit-content", padding: "0 20px" }}
                disabled={isGenerating}
                onClick={handleDownloadPDF}
              >
                Download as PDF
              </button>
            ) : (
              <button
                className="btn-secondary"
                style={{ width: "fit-content", padding: "0 20px" }}
                disabled={isGenerating}
                onClick={handlePrint}
              >
                Print/Save
              </button>
            )}
          </>
        ) : null}
      </div>
      <div ref={componentRef}>{getTemplate()}</div>
    </DefaultLayout>
  );
};

export default Templates;
