import { Alert, Button } from "antd";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import s from "../resources/styles/components/AlertBox.module.css";

const AlertBox = ({
  message,
  title,
  type,
  navigateTo,
  endSession,
  btnText,
  setError,
  showActionButton,
  closable,
  actionBtnId,
  showIcon,
}) => {
  const navigate = useNavigate();
  const onCloseAction = () => {
    if (setError) setError("");
  };

  return (
    <Alert
      className={s.main}
      message={title}
      description={message}
      type={type}
      onClose={onCloseAction}
      closable={closable}
      showIcon={showIcon}
      action={
        showActionButton && (
          <Button
            id={actionBtnId}
            className="home-alert-banner-btn"
            size="small"
            type="primary"
            onClick={() => {
              if (endSession) {
                logoutUser(navigate);
              }
              navigate(navigateTo);
            }}
          >
            {btnText}
          </Button>
        )
      }
    />
  );
};

export default AlertBox;
