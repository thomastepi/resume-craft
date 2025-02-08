import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { Tabs, Form, Spin, message } from "antd";
import PersonalInfo from "../components/PersonalInfo";
import SkillsEducation from "../components/SkillsEducation";
import ExperienceProject from "../components/ExperienceProject";
import CertificationsLanguage from "../components/CertificationsLanguage";
import AlertBox from "../components/AlertBox";
import useIsMobile from "../hooks/useIsMobile";

const items = [
  {
    key: "1",
    label: "Personal Information",
    children: <PersonalInfo />,
  },
  {
    key: "2",
    label: "Skills and Education",
    children: <SkillsEducation />,
  },
  {
    key: "3",
    label: "Experience and Projects",
    children: <ExperienceProject />,
  },
  {
    key: "4",
    label: "Certifications and Languages",
    children: <CertificationsLanguage />,
  },
];

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [form] = Form.useForm();
  const isMobile = useIsMobile();
  const user = JSON.parse(localStorage.getItem("user"));

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${baseUrl}/api/user/update`,
        {
          ...values,
          username: user.username,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (data) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data, accessToken: user.accessToken })
        );
        setLoading(false);
        message.success("Profile Updated Successfully");
      } else {
        message.error(
          "Something went wrong. Please review your details and try again."
        );
      }
    } catch (err) {
      console.log("error: ", err);
      setLoading(false);
      if (err.message === "Network Error") {
        message.error("Network Error. Please check your internet connection.");
        return;
      } else if (err.response.status === 403) {
        setAlertTitle("Unauthorized Access");
        message.info("Unauthorized Access. Please login/signup.");
        setError(err.response.data);
      } else if (err.response.status === 400) {
        setAlertTitle("An error occurred");
        message.error("An error occurred while updating your profile.");
        setError(err.response.data.error.map((error) => error));
      } else {
        message.error("An error occurred. Please try again.");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      form.submit();
    } catch (err) {
      console.log("Validation Errors:", err);
      const firstErrorField = err.errorFields?.[0]?.name?.[0];

      if (firstErrorField) {
        if (
          [
            "firstName",
            "lastName",
            "email",
            "mobileNumber",
            "address",
            "summary",
            "portfolio",
          ].includes(firstErrorField)
        ) {
          setActiveTab("1");
        } else if (["education", "skills"].includes(firstErrorField)) {
          setActiveTab("2");
        } else if (["experience", "projects"].includes(firstErrorField)) {
          setActiveTab("3");
        } else if (["certifications", "languages"].includes(firstErrorField)) {
          setActiveTab("4");
        }
      }

      message.error("Please check the section(s) with error message(s) before submitting.");
    }
  };

  return (
    <DefaultLayout>
      {loading && <Spin size="large" />}
      <h4>
        <strong>Update Profile</strong>
      </h4>
      <hr />
      <div className="update-profile">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={user}
        >
          <Tabs
            //defaultActiveKey="1"
            items={items}
            activeKey={activeTab}
            onChange={setActiveTab}
          />
          <div
            style={{
              width: `${isMobile ? "95%" : "50%"}`,
              marginBottom: "15px",
            }}
          >
            {error && (
              <AlertBox
                message={error}
                setError={setError}
                title={alertTitle}
                type="info"
              />
            )}
          </div>
          <button
            style={{ borderRadius: "5px" }}
            type="button"
            onClick={handleSubmit}
            disabled={error}
          >
            Update Profile
          </button>
        </Form>
      </div>
      <div className="divider mt-3"></div>
    </DefaultLayout>
  );
};

export default Profile;
