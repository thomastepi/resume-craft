import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const PersonalInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { firstName, lastName, email, mobileNumber, address, summary } = user;
  const returningUser =
    firstName && lastName && email && mobileNumber && address && summary
      ? true
      : false;
  return (
    <>
      <h5>
        {!returningUser && (
          <span style={{ fontSize: "13px", fontStyle: "italic" }}>
            (Mandatory fields must be filled in order to generate resume using
            AI)
          </span>
        )}
      </h5>
      <div className="row">
        <div className="col-md-3">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "First name is required" },
              { min: 2, message: "First name must be at least 2 characters" },
              {
                max: 50,
                message: "First name must be at most 50 characters",
              },
              {
                pattern: /^[a-zA-Z][a-zA-Z\s'-]*$/,
                message:
                  "Must start with a letter and can only contain letters, spaces, hyphens, and apostrophes",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="col-md-3">
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Last name is required" },
              { min: 2, message: "Last name must be at least 2 characters" },
              { max: 50, message: "Last name must be at most 50 characters" },
              {
                pattern: /^[a-zA-Z][a-zA-Z\s'-]*$/,
                message:
                  "Must start with a letter and can only contain letters, spaces, hyphens, and apostrophes",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="col-md-3">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="col-md-3">
          <Form.Item
            name="mobileNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Phone number is required" },
              {
                pattern: /^\+?[0-9\s()-]{10,20}$/,
                message:
                  "Invalid phone number format. Use digits, spaces, dashes, parentheses, or an optional leading '+'.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="col-md-3">
          <Form.Item
            name="portfolio"
            label="Portfolio/LinkedIn (Optional)"
            rules={[{ type: "url", message: "Invalid URL format" }]}
          >
            <Input placeholder="https://your-portfolio.com" />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Form.Item
            name="address"
            label="Address"
            rules={[
              { required: true, message: "Address is required" },
              { min: 10, message: "Address must be at least 10 characters" },
              { max: 200, message: "Address must be at most 200 characters" },
              {
                pattern: /^[a-zA-Z0-9\s.,#&'’/()-]+$/,
                message:
                  "Invalid address format. Only letters, numbers, spaces, commas, periods, #, &, apostrophes, dashes, and slashes are allowed.",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Form.Item
            name="summary"
            label="Summary"
            rules={[
              { required: true, message: "Summary is required" },
              { min: 50, message: "Summary must be at least 50 characters" },
              {
                max: 1000,
                message: "Summary must be at most 1000 characters",
              },
              {
                pattern: /^[a-zA-Z0-9\s.,!?'"()\-_@#%&*+=[\]{}|:;<>/]+$/u,
                message: "Use letters, numbers, and basic punctuation only.",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
