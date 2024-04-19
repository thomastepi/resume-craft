import React, { useState } from "react";
import axios from "axios";
import DefaultLayout from "../components/DefaultLayout";
import { Tabs, Form, Spin, message } from "antd";
import PersonalInfo from "../components/PersonalInfo";
import SkillsEducation from "../components/SkillsEducation";
import ExperienceProject from "../components/ExperienceProject";
import AlertBox from "../components/AlertBox";
import useIsMobile from "../hooks/useIsMobile";

const onChange = (key) => {
  console.log(key);
};
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
];

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data, accessToken: user.accessToken })
      );
      setLoading(false);
      message.success("Profile Updated Successfully");
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
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
        <Form layout="vertical" onFinish={onFinish} initialValues={user}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          <div
            style={{
              width: `${isMobile ? "95%" : "50%"}`,
              marginBottom: "15px",
            }}
          >
            {error && <AlertBox message={error} setError={setError} />}
          </div>
          <button
            style={{ borderRadius: "5px" }}
            type="submit"
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
