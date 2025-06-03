import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useNavigate } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import { jwtDecode } from "jwt-decode";
import useAuthCheck from "../hooks/useAuthCheck";
import useInactivityLogout from "../hooks/useInactivityLogout";

const template1 = "https://ik.imagekit.io/thormars/ResumeCraft/temp1.png";
const template2 = "https://ik.imagekit.io/thormars/ResumeCraft/temp2.png";
const aiGeneration = "https://ik.imagekit.io/thormars/ResumeCraft/temp2.png";

function Home() {
  const [showBanner, setShowBanner] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
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
    if (!returningUser) setShowBanner(true);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.accessToken) {
      try {
        const decodedToken = jwtDecode(user.accessToken);
        if (decodedToken.role === "guest") {
          setIsGuest(true);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const templates = [
    {
      title: "Generate With AI",
      image: aiGeneration,
    },
    {
      title: "Simple Template",
      image: template1,
    },
    {
      title: "Professional Template",
      image: template2,
    },
  ];
  return (
    <DefaultLayout>
      {showBanner && (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
      )}

      {isGuest && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AlertBox
            message="Enjoy browsing all features, but note that profile updates and AI resume generation are disabled for guest users. To unlock all features, create a free account today!"
            title="🚀 You're Exploring as a Guest!"
            type="warning"
            navigateTo="/register"
            btnText="Sign Up Now"
            endSession={true}
            showActionButton={true}
          />
        </div>
      )}

      <div className="row home">
        {templates.map((template, index) => {
          return (
            <div key={index} className="col-md-4">
              <div className="template">
                <img src={template.image} alt={`template ${index + 1}`} />
                <div className="text">
                  <p>{template.title}</p>
                  <button
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
