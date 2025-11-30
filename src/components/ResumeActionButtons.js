import { forwardRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { isMobile } from "react-device-detect";
import { useParams, useNavigate } from "react-router-dom";
import { ResumeContext } from "../context/ResumeContext";
import { useContext } from "react";
import { createTemplate } from "../services/templates";
import { Modal, message } from "antd";
import { deleteTemplate } from "../services/templates";

const ResumeActionButtons = forwardRef((props, ref) => {
  const [templateName, setTemplateName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const { generatedHTML, setGeneratedHTML, isGenerating } =
    useContext(ResumeContext);

  const templates = JSON.parse(localStorage.getItem("templates"));
  const selectedTemplate = templates.find((t) => t._id === params.id);

  const handleTemplateDelete = () => {
    const accessToken = JSON.parse(localStorage.getItem("user")).accessToken;
    const templateId = selectedTemplate._id;
    Modal.confirm({
      title: "Delete Template",
      content: "Are you sure you want to delete this template?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteTemplate(templateId, accessToken);
          localStorage.setItem(
            "templates",
            JSON.stringify(templates.filter((t) => t._id !== templateId))
          );
          message.success("Template deleted successfully!");
          navigate("/home");
        } catch (e) {
          message.error(
            e?.error ||
              e?.response?.data?.error ||
              "An error occured. Please try again."
          );
          console.log("Error deleting template", e);
        }
      },
    });
  };

  const handleSaveTemplate = async () => {
    const { accessToken } = JSON.parse(localStorage.getItem("user"));
    if (!templateName) {
      message.error("Please enter a template name.");
      return;
    }

    if (templateName.length > 50) {
      message.error("Template name cannot be more than 50 characters.");
      return;
    }

    if (!/^[a-zA-Z0-9\s&-]+$/.test(templateName)) {
      message.error("Invalid template name format.");
      return;
    }

    try {
      setLoading(true);
      const res = await createTemplate({
        generatedHTML,
        templateName,
        accessToken,
      });

      // add template to local storage
      const templates = JSON.parse(localStorage.getItem("templates"));
      localStorage.setItem("templates", JSON.stringify([...templates, res]));
      message.success("Template saved successfully!");
      setTemplateName("");
      setOpen(false);
    } catch (e) {
      message.error(
        e?.error ||
          e?.response?.data?.error ||
          "An error occured. Please try again."
      );
      console.log("Error saving template", e);
    } finally {
      setLoading(false);
    }
  };

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
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="button-container">
      {generatedHTML && !params.id && (
        <>
          <button
            disabled={loading || isGenerating}
            className="btn-primary"
            style={{ width: "fit-content", padding: "0 20px" }}
            onClick={showModal}
          >
            {loading ? "Saving..." : "Save as Template"}
          </button>

          <Modal
            open={open}
            title="Enter Template Name"
            onOk={handleSaveTemplate}
            onCancel={handleCancel}
            okText={loading ? "Saving..." : "Save"}
            okButtonProps={{
              disabled: !templateName || loading,
            }}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            )}
          >
            <input
              type="text"
              name="templateName"
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
              }}
              style={{ width: "100%", padding: "10px" }}
              placeholder="eg: Resume 1"
            />
          </Modal>
        </>
      )}
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
            <>
              <button
                className="btn-secondary"
                style={{ width: "fit-content", padding: "0 20px" }}
                disabled={isGenerating}
                onClick={handleDownloadPDF}
              >
                Download PDF
              </button>
            </>
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

      {selectedTemplate && (
        <button
          className="btn-primary"
          style={{ width: "fit-content", padding: "0 20px" }}
          disabled={isGenerating}
          onClick={() => {
            handleTemplateDelete();
          }}
        >
          Delete Template
        </button>
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
