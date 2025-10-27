import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
// import AlertBox from "../components/AlertBox";
// import { jwtDecode } from "jwt-decode";
import useAuthCheck from "../hooks/useAuthCheck";
import useInactivityLogout from "../hooks/useInactivityLogout";
import { loadGuidefoxAgent } from "../lib/loadGuidefox";
import { templateTourStyles } from "../utils/constants";

const template1 = "https://ik.imagekit.io/thormars/ResumeCraft/temp1.png";
const template2 = "https://ik.imagekit.io/thormars/ResumeCraft/temp2.png";
const aiGeneration = "https://ik.imagekit.io/thormars/ResumeCraft/temp2.png";

function Home() {
  // const [showBanner, setShowBanner] = useState(false);
  // const [isGuest, setIsGuest] = useState(false);
  const [tourStepNum, setTourStepNum] = useState(null);
  const navigate = useNavigate();

  useAuthCheck();
  useInactivityLogout();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { firstName, lastName, email, mobileNumber, address, summary } = user;
    const returningUser =
      firstName && lastName && email && mobileNumber && address && summary
        ? true
        : false;
    if (!returningUser) {
      // setShowBanner(true);
      setTimeout(() => {
        loadGuidefoxAgent();
      }, 2000);
    }
  }, []);

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
  }, []);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user?.accessToken) {
  //     try {
  //       const decodedToken = jwtDecode(user.accessToken);
  //       if (decodedToken.role === "guest") {
  //         setIsGuest(true);
  //       }
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //     }
  //   }
  // }, []);

  const templates = [
    {
      id: "ai-generation",
      title: "Generate With AI",
      image: aiGeneration,
    },
    {
      id: "simple-template",
      title: "Simple Template",
      image: template1,
    },
    {
      id: "professional-template",
      title: "Professional Template",
      image: template2,
    },
  ];
  return (
    <DefaultLayout>
      {/* {showBanner && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AlertBox
            message="To create the perfect resume, update your profile with your latest details."
            title="🎉 Welcome to Resume Craft!"
            type="info"
            navigateTo="/profile"
            btnText="Update Profile"
            endSession={false}
            showActionButton={true}
          />
        </div>
      )} */}

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
                    <span className="btn-primary-contents">TRY</span>
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
