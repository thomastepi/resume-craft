import React from "react";
import { Alert, Button, message as toastMessage } from "antd";
import { useNavigate } from "react-router-dom";

const AlertBox = ({
  message,
  title,
  type,
  navigateTo,
  endSession,
  btnText,
  setError,
}) => {
  const navigate = useNavigate();
  const onCloseAction = () => {
    if (setError) setError("");
  };

  return (
    <Alert
      style={{ maxWidth: "1080px" }}
      className="home-alert-banner"
      message={title}
      description={message}
      type={type}
      onClose={onCloseAction}
      closable
      showIcon
      action={
        <Button
          className="home-alert-banner-btn"
          size="small"
          type="primary"
          onClick={() => {
            if (endSession) {
              localStorage.clear();
              toastMessage.success(
                "Guest Session Ended. Create an account to unlock all features!"
              );
            }
            navigate(navigateTo);
          }}
        >
          {btnText}
        </Button>
      }
    />
  );
};

export default AlertBox;
