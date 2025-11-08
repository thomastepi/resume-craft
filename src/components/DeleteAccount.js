import { Button, Modal, message } from "antd";
import axios from "axios";
import { clearUserDataOnDelete } from "../services/authService";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { accessToken } = JSON.parse(localStorage.getItem("user"));
  const onDeleteAccount = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/user/delete-user`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      clearUserDataOnDelete(navigate);
    } catch (error) {
      console.error("Account Deletion Error: ", error);
      message.error(
        `${error?.response?.data?.error} This account could not be deleted` ||
          "Failed to delete account.",
        [5]
      );
    }
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Are you sure you want to delete your account?",
      content:
        "This action is permanent and cannot be undone. All your resumes, and personal data will be permanently deleted from ResumeCraft.",
      centered: true,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        onDeleteAccount();
      },
    });
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <h5 style={{ fontWeight: "bold", fontSize: "15px" }}>
        Delete your account
      </h5>
      <p style={{ fontSize: "13px" }}>
        Deleting your account will permanently remove your ResumeCraft data,
        including your profile information. This action cannot be undone.
      </p>
      <Button type="primary" danger onClick={showDeleteConfirm}>
        Delete Account
      </Button>
    </div>
  );
};

export default DeleteAccount;
