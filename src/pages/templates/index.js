import React, { useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
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

  const { generatedHTML, setGeneratedHTML, loading } =
    useContext(ResumeContext);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    copyShadowRoots: true,
  });

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
          <button className="action-btn" onClick={() => setGeneratedHTML(null)}>
            Regenerate
          </button>
        )}
        <button
          className="action-btn"
          disabled={loading}
          onClick={() => {
            navigate("/home");
          }}
        >
          {params.id === "1" && generatedHTML ? "Back to Home" : "Back"}
        </button>
        {params.id === "1" && generatedHTML && (
          <button className="action-btn" onClick={handlePrint}>
            Print/Save
          </button>
        )}
        {params.id === "2" || params.id === "3" ? (
          <button className="action-btn" onClick={handlePrint}>
            Print/Save
          </button>
        ) : null}
      </div>
      <div ref={componentRef}>{getTemplate()}</div>
    </DefaultLayout>
  );
};

export default Templates;
