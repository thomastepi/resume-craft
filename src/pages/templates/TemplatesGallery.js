import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../components/DefaultLayout";
import s from "../../resources/styles/pages/templates-gallery.module.css";
import { isUserSessionValid } from "../../services/authService";

const template1 = "https://ik.imagekit.io/thormars/ResumeCraft/template1.png";
const template2 = "https://ik.imagekit.io/thormars/ResumeCraft/template2.png";
const template3 = "https://ik.imagekit.io/thormars/ResumeCraft/template3.png";
const template4 = "https://ik.imagekit.io/thormars/ResumeCraft/template4.png";
const template5 = "https://ik.imagekit.io/thormars/ResumeCraft/template5.png";
const template6 = "https://ik.imagekit.io/thormars/ResumeCraft/template6.png";

const sampleTemplates = [
  { id: 1, title: "Classic Professional", image: template1 },
  { id: 2, title: "Modern Creative", image: template2 },
  { id: 3, title: "Elegant & Simple", image: template3 },
  { id: 4, title: "Bold & Assertive", image: template4 },
  { id: 5, title: "Technical & Clean", image: template5 },
  { id: 6, title: "Minimalist", image: template6 },
];

const TemplatesGallery = () => {
  const navigate = useNavigate();
  const [userSavedTemplates, setUserSavedTemplates] = useState([]);
  const isAuthenticated = isUserSessionValid();

  useEffect(() => {
    if (isAuthenticated) {
      const savedTemplates = JSON.parse(localStorage.getItem("templates")) || [];
      setUserSavedTemplates(savedTemplates);
    }
  }, [isAuthenticated]);

  const TemplateCard = ({ template, isSavedTemplate = false }) => (
    <div className={s.card}>
      <img src={isSavedTemplate ? template.image || template1 : template.image} alt={template.title || template.name} />
      <div className={s.cardContent}>
        <h3>{template.title || template.name}</h3>
        <button
          className={s.useButton}
          onClick={() => navigate(`/templates/${template._id || template.id}`)}
        >
          Preview & Use
        </button>
      </div>
    </div>
  );

  return (
    <DefaultLayout title="Browse Templates">
      <div className={s.pageHeader}>
        <p>
          Choose a template to start. Your saved profile information will be
          automatically applied.
        </p>
      </div>

      {isAuthenticated && userSavedTemplates.length > 0 && (
        <>
          <h2 className={s.sectionTitle}>Your Saved Templates</h2>
          <div className={s.templatesGrid}>
            {userSavedTemplates.map((template) => (
              <TemplateCard
                key={template._id}
                template={template}
                isSavedTemplate={true}
              />
            ))}
          </div>
          <h2 className={s.sectionTitle}>Sample Templates</h2>
        </>
      )}
      {!isAuthenticated || userSavedTemplates.length === 0 ? (
        <h2 className={s.sectionTitle}>Available Templates</h2>
      ) : null}

      <div className={s.templatesGrid}>
        {sampleTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export default TemplatesGallery;
