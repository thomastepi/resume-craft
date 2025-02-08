import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const SkillsEducation = () => {
  return (
    <div>
      <h5>
        <strong>Education</strong>{" "}
        <span style={{ fontSize: "13px", fontStyle: "italic" }}>
          (Must include at least one entry in order to generate resume using AI)
        </span>
      </h5>
      <Form.List name="education">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="row">
                  <div className="col-md-3">
                    <Form.Item
                      {...restField}
                      name={[name, "qualification"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Qualification",
                        },
                        {
                          pattern: /^[a-zA-Z0-9\s.,-]+$/,
                          message: "Invalid Qualification format",
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
                      <Input placeholder="Qualification" />
                    </Form.Item>
                  </div>

                  <div className="col-md-3">
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Institution",
                        },
                        {
                          pattern: /^[a-zA-Z0-9\s.,&'()-]+$/,
                          message: "Invalid Institution format",
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
                      <Input placeholder="Institution" />
                    </Form.Item>
                  </div>

                  <div className="col-md-2">
                    <Form.Item
                      {...restField}
                      name={[name, "range"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Year",
                        },
                        {
                          pattern: /^\d{4}-\d{4}$/,
                          message: "Use format YYYY-YYYY (e.g., 2015-2019)",
                        },
                      ]}
                    >
                      <Input placeholder="Year Interval (e.g., 2010-2014)" />
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
                Add Education
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <hr />

      <h5>
        <strong>Skills</strong>{" "}
        <span style={{ fontSize: "13px", fontStyle: "italic" }}>
          (Must include at least one entry in order to generate resume using AI)
        </span>
      </h5>
      <Form.List name="skills">
        {(fields, { add, remove }) => (
          <>
            <div className="row">
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="row">
                  <div className="col-md-3">
                    <Form.Item
                      style={{ width: "100%" }}
                      {...restField}
                      name={[name, "skill"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Skill",
                        },
                        {
                          pattern: /^[a-zA-Z\s]+$/,
                          message: "Skills can only contain letters and spaces",
                        },
                        {
                          max: 100,
                          message: "Cannot be more than 100 characters",
                        },
                        {
                          min: 2,
                          message: "Must be at least 2 characters long",
                        },
                      ]}
                    >
                      <Input placeholder="Skill" />
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
                Add Skill
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default SkillsEducation;
