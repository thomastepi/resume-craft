import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const CertificationsLanguage = () => {
  return (
    <div>
      <h5>
        <strong>Certifications</strong>
      </h5>
      <Form.List name="certifications">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="row">
                  <div className="col-md-4">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Certification name is required",
                        },
                        {
                          pattern: /^[a-zA-Z0-9\s&-]+$/,
                          message: "Invalid certification name format",
                        },
                        {
                          min: 2,
                          message: "Must be at least 2 characters long",
                        },
                        {
                          max: 100,
                          message: "Cannot be more than 100 characters",
                        },
                      ]}
                    >
                      <Input placeholder="Certification Name" />
                    </Form.Item>
                  </div>

                  <div className="col-md-3">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "organization"]}
                      rules={[
                        {
                          required: true,
                          message: "Organization name is required",
                        },
                        {
                          pattern: /^[a-zA-Z0-9\s&-]+$/,
                          message: "Invalid organization name format",
                        },
                        {
                          min: 2,
                          message: "Must be at least 2 characters long",
                        },
                        {
                          max: 100,
                          message: "Cannot be more than 100 characters",
                        },
                      ]}
                    >
                      <Input placeholder="Organization" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "year"]}
                      rules={[
                        { required: true, message: "Year is required" },
                        {
                          pattern: /^\d{4}$/,
                          message: "Enter a valid 4-digit year (e.g., 2020)",
                        },
                      ]}
                    >
                      <Input placeholder="Year (YYYY)" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <MinusCircleOutlined
                      style={{ fontSize: 26, color: "tomato" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Certification
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <hr />

      <h5>
        <strong>Languages</strong>
      </h5>
      <Form.List name="languages">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="row">
                  <div className="col-md-3">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "language"]}
                      rules={[
                        { required: true, message: "Language is required" },
                        {
                          pattern: /^[a-zA-Z\s]+$/,
                          message: "Invalid language name (letters only)",
                        },
                        {
                          min: 2,
                          message: "Must be at least 2 characters long",
                        },
                        {
                          max: 50,
                          message: "Cannot be more than 50 characters",
                        },
                      ]}
                    >
                      <Input placeholder="Language (e.g., English, French)" />
                    </Form.Item>
                  </div>

                  <div className="col-md-3">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "proficiency"]}
                      rules={[
                        {
                          required: true,
                          message: "Proficiency level is required",
                        },
                        {
                          pattern: /^[a-zA-Z\s]+$/,
                          message: "Invalid proficiency level (letters only)",
                        },
                        {
                          min: 2,
                          message: "Must be at least 2 characters long",
                        },
                        {
                          max: 50,
                          message: "Cannot be more than 50 characters",
                        },
                      ]}
                    >
                      <Input placeholder="Proficiency (e.g., Beginner, Fluent)" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <MinusCircleOutlined
                      style={{ fontSize: 26, color: "tomato" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Language
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default CertificationsLanguage;
