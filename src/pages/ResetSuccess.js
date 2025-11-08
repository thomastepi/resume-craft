import logo from "../assets/images/logo-form.png";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import "../resources/styles/pages/authentication.css";

function ResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="auth-parent" style={{ marginTop: "-5rem" }}>
      <div className="auth-child">
        <div className="form">
          <Form layout="vertical">
            <div className="form-logo">
              <img src={logo} alt="logo" />
            </div>
            <h1 style={{ textAlign: "center" }}>Password Reset Successful</h1>
            <p
              style={{
                textAlign: "center",
                marginTop: "0.5rem",
                color: "#666",
                fontSize: "0.9rem",
              }}
            >
              Your password has been successfully reset. You can now log in with
              your new password.
            </p>
            <hr style={{ margin: "2rem 0" }} />

            <>
              <button
                type="submit"
                className="btn-secondary"
                onClick={() => navigate("/login")}
              >
                <div className="btn-secondary-state"></div>
                <span className="btn-secondary-contents">Login</span>
              </button>
            </>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetSuccess;
