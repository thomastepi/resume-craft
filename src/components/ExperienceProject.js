import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const ExperienceProject = () => {
  return (
    <div>
      <h5>
        <strong>Experience</strong>
      </h5>
      <Form.List name="experience">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="row">
                  <div className="col-md-2">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "company"]}
                      rules={[
                        { required: true, message: "Company name is required" },
                        {
                          pattern: /^[a-zA-Z0-9\s&-]+$/,
                          message: "Invalid company name format",
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
                      <Input placeholder="Company" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "role"]}
                      rules={[
                        { required: true, message: "Role is required" },
                        {
                          pattern: /^[a-zA-Z0-9\s&-]+$/,
                          message: "Invalid role format",
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
                      <Input placeholder="Role" />
                    </Form.Item>
                  </div>

                  <div className="col-md-3">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "roleDescription"]}
                      rules={[
                        { required: true, message: "Description is required" },
                        { min: 20, message: "Must be at least 20 characters" },
                        { max: 1000, message: "Max 1000 characters allowed" },
                      ]}
                    >
                      <TextArea placeholder="Description" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "place"]}
                      rules={[
                        { required: true, message: "Location is required" },
                        {
                          pattern: /^[a-zA-Z0-9\s,.-]+$/,
                          message: "Invalid location format",
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
                      <Input placeholder="Location" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "range"]}
                      rules={[
                        { required: true, message: "Year interval required" },
                        {
                          pattern: /^\d{4}(-(\d{4}|present))?$/,
                          message:
                            "Use format YYYY or YYYY-YYYY or YYYY-present",
                        },
                      ]}
                    >
                      <Input placeholder="Year Interval" />
                    </Form.Item>
                  </div>

                  <div className="col-md-1">
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
                Add Experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <hr />

      <h5>
        <strong>Projects</strong>
      </h5>
      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="row">
                  <div className="col-md-4">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "title"]}
                      rules={[
                        {
                          required: true,
                          message: "Project title is required",
                        },
                        {
                          pattern: /^[a-zA-Z0-9\s-]+$/,
                          message: "Invalid title format",
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
                      <Input placeholder="Title" />
                    </Form.Item>
                  </div>

                  <div className="col-md-4">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "description"]}
                      rules={[
                        { required: true, message: "Description is required" },
                        { min: 20, message: "Must be at least 20 characters" },
                        { max: 1000, message: "Max 1000 characters allowed" },
                      ]}
                    >
                      <TextArea placeholder="Description" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "range"]}
                      rules={[
                        { required: true, message: "Year interval required" },
                        {
                          pattern: /^\d{4}(-(\d{4}|present))?$/,
                          message:
                            "Use format YYYY or YYYY-YYYY or YYYY-present",
                        },
                      ]}
                    >
                      <Input placeholder="Year Interval" />
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
                Add Project
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default ExperienceProject;
