import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import template1_img from "../resources/templates/temp1.png";
import template2_img from "../resources/templates/temp2.png";
import template3_img from "../resources/templates/temp3.png";
import { useNavigate } from "react-router-dom";
import { Alert, Button } from "antd";

function Home() {
  const [showBanner, setShowBanner] = useState(false);
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
          <Alert
            className="home-alert-banner"
            message="🎉 Welcome to Resume Craft!"
            description="To create the perfect resume, update your profile with your latest details."
            type="info"
            showIcon
            action={
              <Button
                className="home-alert-banner-btn"
                type="button"
                onClick={() => navigate("/profile")}
              >
                Update Profile
              </Button>
            }
            closable
            onClose={() => setShowBanner(false)}
            style={{ maxWidth: "1080px" }}
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
