import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import template1_img from "../resources/templates/temp1.png";
import template2_img from "../resources/templates/temp2.png";
import template3_img from "../resources/templates/temp3.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
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
