import { forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { isMobile } from "react-device-detect";
import { useParams, useNavigate } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";
import { useContext } from "react";

const ResumeActionButtons = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const params = useParams();

  const { generatedHTML, setGeneratedHTML, isGenerating } =
    useContext(ResumeContext);

  const handlePrint = useReactToPrint({
    contentRef: ref,
    copyShadowRoots: true,
  });

  const handleDownloadPDF = () => {
    const element = ref.current;
    const cloneElement = element.cloneNode(true);
    console.log("element", element);

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
  return (
    <div className="button-container">
      {!params.id && generatedHTML && (
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
        {generatedHTML ? "Back to Home" : "Back"}
      </button>
      {!params.id && generatedHTML && (
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
      {params.id ? (
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
  );
});

export default ResumeActionButtons;
