import { useRef } from "react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template3 from "./Template3";
import Template4 from "./Template4";
import Template5 from "./Template5";
import Template6 from "./Template6";
import ResumePreview from "./ResumePreview";
import ResumeActionButtons from "../../components/ResumeActionButtons";
import "./Templates.css";
import DefaultLayout from "../../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { isUserSessionValid } from "../../services/authService";
import FeaturePreviewCTA from "../../components/FeaturePreviewCTA";

const Templates = () => {
  const params = useParams();
  const componentRef = useRef();
  const isAuthenticated = isUserSessionValid();

  const getTemplate = () => {
    switch (params.id) {
      case "1":
        return <Template1 name={`template${params.id}`} />;
      case "2":
        return <Template2 name={`template${params.id}`} />;
      case "3":
        return <Template3 name={`template${params.id}`} />;
      case "4":
        return <Template4 name={`template${params.id}`} />;
      case "5":
        return <Template5 name={`template${params.id}`} />;
      case "6":
        return <Template6 name={`template${params.id}`} />;
      default:
        return <ResumePreview id={params.id} />;
    }
  };
  return (
    <DefaultLayout title={`Template ${params.id}`}>
      <div style={{ position: "relative" }}>
        {!isAuthenticated && <FeaturePreviewCTA />}
        <ResumeActionButtons ref={componentRef} />
        <div ref={componentRef}>{getTemplate()}</div>
      </div>
    </DefaultLayout>
  );
};

export default Templates;
