import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import template1_img from "../resources/templates/temp1.png";
import template2_img from "../resources/templates/temp2.png";
import template3_img from "../resources/templates/temp3.png";
import { useNavigate } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import { jwtDecode } from "jwt-decode";

function Home() {
  const [showBanner, setShowBanner] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

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
      title: "Simple Resume",
      image: template1_img,
    },
    {
      title: "Highlighted Sections",
      image: template2_img,
    },
    {
      title: "Generate With AI",
      image: template3_img,
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
                    onClick={() => {
                      navigate(`/templates/${index + 1}`);
                    }}
                  >
                    TRY
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
