import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import useAuthCheck from "../hooks/useAuthCheck";
import useInactivityLogout from "../hooks/useInactivityLogout";
import { loadGuidefoxAgent } from "../lib/loadGuidefox";
import { templateTourStyles } from "../utils/constants";
import CustomModal from "../components/CustomModal";

const template1 = "https://ik.imagekit.io/thormars/ResumeCraft/template1.png";
const template2 = "https://ik.imagekit.io/thormars/ResumeCraft/template2.png";
const template3 = "https://ik.imagekit.io/thormars/ResumeCraft/template3.png";
const template4 = "https://ik.imagekit.io/thormars/ResumeCraft/template4.png";
const template5 = "https://ik.imagekit.io/thormars/ResumeCraft/template5.png";
const template6 = "https://ik.imagekit.io/thormars/ResumeCraft/template6.png";

function Home() {
  const [tourStepNum, setTourStepNum] = useState(null);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useAuthCheck();
  useInactivityLogout();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { _id, firstName, lastName, email, mobileNumber, address, summary } =
      user;
    if (!email) {
      setUserId(_id);
      setOpen(true);
      return;
    }
    const returningUser =
      firstName && lastName && mobileNumber && address && summary
        ? true
        : false;
    if (!returningUser || user.username === "guest") {
      setTimeout(() => {
        loadGuidefoxAgent();
      }, 2000);
    }
  }, [open]);

  useEffect(() => {
    const interval = setInterval(() => {
      const stepNum = window.bw?.tour?.currentStep;

      setTourStepNum((prev) => {
        if (stepNum === 0) return null;
        if (!stepNum || stepNum === prev) return prev;
        return stepNum;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [open]);

  const templates = [
    {
      id: "template-one",
      title: "Template One",
      image: template1,
    },
    {
      id: "template-two",
      title: "Template Two",
      image: template2,
    },
    {
      id: "template-three",
      title: "Template Three",
      image: template3,
    },
    {
      id: "template-four",
      title: "Template Four",
      image: template4,
    },
    {
      id: "template-five",
      title: "Template Five",
      image: template5,
    },
    {
      id: "template-six",
      title: "Template Six",
      image: template6,
    },
  ];
  return (
    <DefaultLayout>
      <CustomModal open={open} setOpen={setOpen} _id={userId} />
      <div
        className="row home"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
            width: "100%",
          }}
        >
          <AlertBox
            actionBtnId="ai-generate-btn"
            message="Want a personalized resume? Choose your preferred language, colors, fonts, and layout, then let AI build it for you. Or scroll down to explore our sample templates."
            title="🤖 Let AI Design Your Resume!"
            type="info"
            navigateTo="/ai-resume-customization"
            btnText="Generate with AI"
            endSession={false}
            showActionButton={true}
            closable={false}
            showIcon={false}
          />
        </div>
        <div style={{ width: "100%", margin: "40px 0" }}>
          <h2 style={{ textAlign: "center", width: "100%" }}>
            Choose a Template to Get Started
          </h2>
          <p style={{ textAlign: "center", marginTop: 8, opacity: 0.85 }}>
            Your resume templates will be automatically filled with your saved
            profile information.
          </p>
        </div>
        {templates.map((template, index) => {
          return (
            <div key={index} className="col-md-4">
              <div className="template">
                <img src={template.image} alt={`template ${index + 1}`} />
                <div
                  className="text"
                  style={templateTourStyles(tourStepNum, index)}
                >
                  <p>{template.title}</p>
                  <button
                    id={template.id}
                    className="btn-primary"
                    style={{ width: "fit-content" }}
                    onClick={() => {
                      navigate(`/templates/${index + 1}`);
                    }}
                  >
                    <div className="btn-primary-state"></div>
                    <span className="btn-primary-contents">Use Template</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DefaultLayout>
  );
}

export default Home;
