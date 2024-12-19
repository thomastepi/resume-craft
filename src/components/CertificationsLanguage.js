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
                <>
                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Certification Name",
                        },
                      ]}
                    >
                      <Input placeholder="Certification Name" />
                    </Form.Item>
                  </div>

                  <div className="col-md-3">
                    <Form.Item
                      {...restField}
                      name={[name, "organization"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Organization",
                        },
                      ]}
                    >
                      <Input placeholder="Organization" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      {...restField}
                      name={[name, "year"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Year",
                        },
                      ]}
                    >
                      <Input placeholder="Year" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <MinusCircleOutlined
                      style={{ fontSize: 26, color: "tomato" }}
                      onClick={() => remove(name)}
                    />
                  </div>
                </>
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
                <>
                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "language"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Language",
                        },
                      ]}
                    >
                      <Input placeholder="Language" />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      {...restField}
                      name={[name, "proficiency"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Proficiency Level",
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
                </>
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
