import { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, Button, message } from "antd";
import dayjs from "dayjs";
import { createJob, updateJob } from "../services/jobTracker.service";
import s from "../resources/styles/components/AddApplicationModal.module.css";
const { Option } = Select;
const { TextArea } = Input;

const AddApplicationModal = ({
  visible,
  isEditing,
  jobToEdit,
  loading,
  setLoading,
  onClose,
  onAddApplication,
  onEditApplication,
}) => {
  const [form] = Form.useForm();
  const dateTimestamp = dayjs("2024-01-01").valueOf();

  useEffect(() => {
    if (isEditing && jobToEdit) {
      const fieldsToSet = {
        ...jobToEdit,
        applicationDate: jobToEdit.applicationDate
          ? dayjs(jobToEdit.applicationDate).valueOf()
          : null,
      };

      form.setFieldsValue(fieldsToSet);
    } else {
      form.resetFields();
    }
  }, [isEditing, jobToEdit, form]);

  const handleFinish = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (isEditing) {
      try {
        setLoading(true);
        const res = await updateJob(jobToEdit._id, values, user.accessToken);
        onEditApplication(res);
        form.resetFields();
        message.success("Application updated successfully!");
      } catch (err) {
        console.log(err);
        message.error(err.error || "Failed to update application!");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const res = await createJob(values, user.accessToken);
      onAddApplication(res);
      form.resetFields();
      message.success("Application added successfully!");
    } catch (err) {
      console.log(err);
      message.error(err.error || "Failed to add application!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit Application" : "Add New Job Application"}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      style={{ top: 20, borderRadius: "10px", overflow: "hidden" }}
    >
      <Form
        name="application-form"
        className={s["application-form"]}
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          status: "Applied",
          applicationDate: dateTimestamp,
        }}
      >
        <Form.Item
          name="jobTitle"
          label="Job Title"
          rules={[{ required: true, message: "Please enter the job title!" }]}
        >
          <Input placeholder="e.g. Senior Software Engineer" />
        </Form.Item>

        <Form.Item
          name="company"
          label="Company"
          rules={[
            { required: true, message: "Please enter the company name!" },
          ]}
        >
          <Input placeholder="e.g. Google" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status!" }]}
        >
          <Select
            placeholder="Select application status"
            style={{ height: "40px" }}
          >
            <Option value="Wishlist">Wishlist</Option>
            <Option value="Applied">Applied</Option>
            <Option value="Interview">Interviewing</Option>
            <Option value="Offer">Offer</Option>
            <Option value="Rejected">Rejected</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="jobLink"
          label="Job Posting Link"
          rules={[{ type: "url", message: "Please enter a valid URL!" }]}
        >
          <Input placeholder="e.g. https://example.com/job" />
        </Form.Item>

        <Form.Item
          name="applicationDate"
          label="Application Date"
          getValueProps={(value) => ({ value: value && dayjs(Number(value)) })}
          normalize={(value) => value && `${dayjs(value).valueOf()}`}
        >
          <DatePicker
            className={s["date-picker"]}
            style={{ border: "none !important" }}
          />
        </Form.Item>

        <Form.Item
          name="notes"
          label="Notes"
          rules={[
            { max: 1000, message: "Cannot be more than 1000 characters" },
          ]}
        >
          <TextArea rows={4} placeholder="Any specific notes or reminders..." />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
            loading={loading}
            disabled={loading}
          >
            {isEditing ? "Save Changes" : "Add Application"}
          </Button>
          <Button htmlType="button" disabled={loading} onClick={onClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddApplicationModal;
