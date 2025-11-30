import HtmlTemplateRenderer from "../../components/HtmlTemplateRenderer";
import renderTemplateHtml from "../../utils/renderUserTemplate";
import "../../resources/styles/pages/templates/templates.css";

const ResumePreview = ({ id }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const templates = JSON.parse(localStorage.getItem("templates"));
  const selectedTemplate = templates.find((t) => t._id === id);

  if (!user || !selectedTemplate)
    return <div style={{ textAlign: "center" }}>Template not found</div>;

  const filledHtml = renderTemplateHtml(selectedTemplate.html, user);

  return (
    <div className="resume-preview-parent">
      <HtmlTemplateRenderer html={filledHtml} />
    </div>
  );
};

export default ResumePreview;
