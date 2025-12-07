import { useState } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { Tabs, Form, Spin, message } from "antd";
import PersonalInfo from "../components/PersonalInfo";
import SkillsEducation from "../components/SkillsEducation";
import ExperienceProject from "../components/ExperienceProject";
import CertificationsLanguage from "../components/CertificationsLanguage";
import AlertBox from "../components/AlertBox";
import useIsMobile from "../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DeleteAccount from "../components/DeleteAccount";
// import { loadGuidefoxAgent } from "../lib/loadGuidefox";
// import { waitFor, generateHintMessage } from "../utils/profileProgress";

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

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  let userRole = user?.role;
  try {
    if (!userRole && user?.accessToken) {
      const decoded = jwtDecode(user.accessToken);
      userRole = decoded?.role;
    }
  } catch (e) {
    console.error("Failed to decode token", e);
  }

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (userRole === "guest") {
        const updatedGuestUser = {
          ...user,
          ...values,
        };
        localStorage.setItem("user", JSON.stringify(updatedGuestUser));
        setTimeout(() => {
          setLoading(false);
          message.success("Profile updated for this guest session only.", [6]);
        }, 1000);
        return;
      }
      const { data } = await axios.patch(
        `${baseUrl}/api/user/update`,
        {
          ...values,
          _id: user._id,
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
        message.error("Network Error!", 5);
        setError(
          err.response?.data?.message ||
            "Network Error. Please check your internet connection."
        );
        return;
      }
      switch (err.status) {
        case 401:
          setAlertTitle(err.response?.data?.error || "Unauthorized Access!");
          message.warning(
            err.response?.data?.error || "Unauthorized Access!",
            6
          );
          setError(err.response?.data?.message || "Please log in to continue.");
          setTimeout(() => {
            navigate("/login");
            localStorage.clear();
          }, 2000);
          break;

        case 429:
          setAlertTitle(err.response?.data?.error || "Rate Limit Exceeded");
          message.warning(err.response?.data?.error || "Rate Limit Exceeded");
          setError(
            err.response?.data?.message ||
              "You've reached the limit of resume generations. Please wait."
          );
          break;

        case 403:
          setAlertTitle(err.response?.data?.error || "Access Denied");
          message.warning(
            err.response?.data?.error ||
              "You don't have permission for this action."
          );
          setError(
            err.response?.data?.message ||
              "Please sign up to unlock this feature."
          );
          break;

        case 400:
          setAlertTitle(err.response?.data?.error || "Bad Request");
          message.warning(err.response?.data?.error || "Bad Request", 5);
          setError(
            err.response?.data?.message ||
              "bad request. Please check your input and try again."
          );
          break;

        default:
          setAlertTitle(err.response?.data?.error || "An error occurred!");
          message.warning(err.response?.data?.error || "An error occurred!", 5);
          setError(
            err.response?.data?.message ||
              "An Error occured. Please try again later"
          );
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
    <DefaultLayout title="Profile">
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
                  alertTitle === "Session Expired" ||
                  alertTitle === "Invalid Token"
                    ? "Log In Now"
                    : "Sign Up Now"
                }
                navigateTo={
                  alertTitle === "Session Expired" ||
                  alertTitle === "Invalid Token"
                    ? "/login"
                    : "/register"
                }
                endSession={true}
                type="warning"
                showActionButton={alertTitle !== "Bad Request"}
                setError={setError}
              />
            )}
          </div>
          <button
            className="btn-secondary"
            type="button"
            onClick={handleSubmit}
            disabled={error || loading}
          >
            <div className="btn-secondary-state"></div>
            <span className="btn-secondary-contents">Update Profile</span>
          </button>
        </Form>
      </div>
      {/* <div className="divider mt-3"></div> */}
      <hr />
      {activeTab === "1" && <DeleteAccount />}
    </DefaultLayout>
  );
};

export default Profile;
