import { useState } from "react";
import { Modal, message } from "antd";
import axios from "axios";

const CustomModal = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [email, setEmail] = useState("");

  console.log("email: ", email);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const { _id, username, accessToken } = user;

  const handleSubmit = async () => {
    try {
      const { data } = await axios.patch(
        `${baseUrl}/api/user/update-email`,
        {
          email: email,
          _id: _id,
          username: username,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (data) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data, accessToken: accessToken })
        );
        setConfirmLoading(false);
        setOpen(false);
        message.success("Email Updated Successfully");
      } else {
        message.error(
          "Something went wrong. Please review your details and try again."
        );
      }
    } catch (e) {
      console.log("Error updating email: ", e);
      message.error(
        e.response?.data?.message,
        "Something went wrong. Please try again later"
      );
    }
  };

  return (
    <>
      <Modal
        id="custom-modal"
        title="Let’s Secure Your Account"
        open={open}
        confirmLoading={confirmLoading}
        centered
        closable={false}
        maskClosable={false}
        footer={null}
      >
        <p>
          You haven’t added an email yet! <br /> Enter your email so you can
          easily reset your password or receive important updates later.
        </p>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="your-email@example.com"
          style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
        />

        <button
          className="btn-secondary"
          type="button"
          style={{ maxWidth: "100%" }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </Modal>
    </>
  );
};
export default CustomModal;
