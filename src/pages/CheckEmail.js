import logo from "../assets/images/logo-form.png";
import { Form, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../resources/styles/pages/authentication.css";

function CheckEmail() {
  const navigate = useNavigate();

  return (
    <div className="auth-parent" style={{ marginTop: "-5rem" }}>
      <div className="auth-child">
        <div className="form">
          <Form layout="vertical">
            <div className="form-logo">
              <img src={logo} alt="logo" />
            </div>
            <h1 style={{ textAlign: "center" }}>Check Your Email</h1>
            <p
              style={{
                textAlign: "center",
                marginTop: "0.5rem",
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              We've sent a password reset link to your email. Please check your
              inbox and follow the instructions to reset your password.
            </p>
            <hr style={{ margin: "2rem 0" }} />

            <>
              <Button
                style={{ marginTop: "0.5rem", width: "100%" }}
                type="link"
                onClick={() => {
                  navigate("/login");
                }}
                icon={<ArrowLeftOutlined />}
              >
                <div className="btn-secondary-state"></div>
                <span className="btn-secondary-contents">Back to Login</span>
              </Button>
            </>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;
