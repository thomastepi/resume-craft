//import react from "react";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const PersonalInfo = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Missing First Name" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Missing Last Name" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Missing email" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <div className="col-md-4">
          <Form.Item
            name="mobileNumber"
            label="Phone Number"
            rules={[{ required: true, message: "Missing Phone Number" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="col-md-4">
          <Form.Item
            name="portfolio"
            label="Portfolio/LinkedIn (Optional)"
            rules={[
              {
                required: false,
                message:
                  "Providing a portfolio is optional but highly recommended.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item
            name="summary"
            label="Summary"
            rules={[{ required: true, message: "Missing Summary" }]}
          >
            <TextArea />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Missing Address" }]}
          >
            <TextArea />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
