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
      }
      switch (err.status) {
        case 429:
          setAlertTitle(err.response.data.error || "Rate Limit Exceeded");
          message.error(
            err.response.data.error ||
              "You've reached the limit of resume generations. Please wait."
          );
          setError(err.response.data.message || "Try again later.");
          break;

        case 403:
          setAlertTitle(err.response.data.error || "Access Denied");
          message.warning(
            err.response.data.error ||
              "You don't have permission for this action."
          );
          setError(
            err.response.data.message ||
              "Please sign up to unlock this feature."
          );
          break;

        default:
          setAlertTitle(err.response.data.error || "An error occurred!");
          message.error(err.response.data.error || "An error occurred!");
          setError(err.response.data.message || "An unexpected error occurred. Please try again.");
          break;
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

      message.error(
        "Please check the section(s) with error message(s) before submitting."
      );
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
                title={alertTitle}
                btnText={
                  alertTitle === "Session Expired" || "Invalid Token"
                    ? "Log In Now"
                    : "Sign Up Now"
                }
                navigateTo={
                  alertTitle === "Session Expired" || "Invalid Token"
                    ? "/login"
                    : "/register"
                }
                endSession={true}
                type="error"
                showActionButton={true}
                setError={setError}
              />
            )}
          </div>
          <button
            style={{
              borderRadius: "5px",
              cursor: error ? "not-allowed" : "pointer",
            }}
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
