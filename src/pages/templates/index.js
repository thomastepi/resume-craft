import { useRef } from "react";
import Template1 from "./Template1";
import Template2 from "./Template2";
import Template4 from "./Template4";
import Template5 from "./Template5";
import ResumeActionButtons from "../../components/ResumeActionButtons";
import "./Templates.css";
import DefaultLayout from "../../components/DefaultLayout";
import { useParams } from "react-router-dom";

const Templates = () => {
  const params = useParams();
  const componentRef = useRef();

  const getTemplate = () => {
    switch (params.id) {
      case "1":
        return <Template1 />;
      case "2":
        return <Template2 />;
      case "3":
        return <Template4 />;
      case "4":
        return <Template5 />;
      default:
        return null;
    }
  };
  return (
    <DefaultLayout>
      <ResumeActionButtons ref={componentRef} />
      <div ref={componentRef}>{getTemplate()}</div>
    </DefaultLayout>
  );
};

export default Templates;
