import React, { useState } from "react";
import { Upload, Input, message, Progress, Tag, Tabs, Modal } from "antd";
import {
  InboxOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  //SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import {
  getResumeAnalysis,
  getTailoredResume,
} from "../services/resumeAnalyzer";
import "./../resources/styles/components/AIResumeAnalyzer.css";
import { isUserSessionValid } from "../services/authService";
import FeaturePreviewCTA from "./FeaturePreviewCTA";

const { Dragger } = Upload;
const { TextArea } = Input;
const { TabPane } = Tabs;

const AIResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  //const [tailoredResumeData, setTailoredResumeData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = isUserSessionValid();

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      message.error("Please log in to use the analyzer.");
      return;
    }
    if (!file || !jobDescription) {
      message.error("Please upload a resume and paste a job description.");
      return;
    }

    try {
      setLoading(true);
      const analysis = await getResumeAnalysis({ file, jobDescription });
      console.log("result analysis", analysis);
      setAnalysisResult(JSON.parse(analysis));
    } catch (e) {
      console.log("Error getting resume", e);
      message.error(
        e.error || e.message || "An error occured. Please try again."
      );
    }
    finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      setLoading(true);
      const result = await getTailoredResume({
        file,
        jobDescription,
        prevAnalysis: analysisResult,
      });
      //setTailoredResumeData(result);
      const resultObj = JSON.parse(result);
      localStorage.setItem("user", JSON.stringify({ ...user, ...resultObj }));
      message.success("Resume data has been updated with AI suggestions!");
      setTimeout(() => navigate("/templates/1"), 1000);
    } catch (e) {
      console.log("Error getting resume", e);
      message.error(
        e.error || e.message || "An error occured. Please try again."
      );
    }
    finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const props = {
    name: "file",
    multiple: false,
    action: null,
    beforeUpload: (file) => {
      const isLt50MB = file.size / 1024 / 1024 < 50;
      if (!isLt50MB) {
        message.error("File must be smaller than 50MB!");
        return Upload.LIST_IGNORE;
      }
      const isPdf = file.type === "application/pdf";
      if (!isPdf) {
        message.error("You can only upload PDF files!");
        return Upload.LIST_IGNORE;
      }
      setFile(file);
      message.success(`${file.name} file uploaded successfully.`);

      return false;
    },
  };

  const renderAnalysisResults = () => (
    <div className="results-container">
      <div className="results-header">
        <h2>Analysis Complete</h2>
        <Progress
          type="circle"
          percent={analysisResult.matchScore}
          strokeColor={analysisResult.matchScore > 50 ? "green" : "red"}
          //strokeWidth={8}
          //size={120}
          format={(percent) => `${percent}% Match`}
        />
      </div>

      <div className="keywords-section">
        <h3>Keyword Analysis</h3>
        <div className="keywords-lists">
          <div>
            <h4>
              <CheckCircleOutlined style={{ color: "green" }} /> Matched
              Keywords
            </h4>
            {analysisResult.matchedKeywords.map((k) => (
              <Tag color="success" key={k}>
                {k}
              </Tag>
            ))}
          </div>
          <div>
            <h4>
              <CloseCircleOutlined style={{ color: "red" }} /> Missing Keywords
            </h4>
            {analysisResult.missingKeywords.map((k) => (
              <Tag color="error" key={k}>
                {k}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="feedback-section">
        <h3>Section-by-Section Feedback</h3>
        <Tabs defaultActiveKey="0">
          {analysisResult.feedback.map((fb, index) => (
            <TabPane tab={fb.section} key={index}>
              <h4>Your Original Text:</h4>
              <p className="original-text">"{fb.original}"</p>
              <h4>AI Suggestion:</h4>
              <p className="suggestion-text">"{fb.suggestion}"</p>
            </TabPane>
          ))}
        </Tabs>
      </div>

      <div className="action-buttons">
        <button
          className="btn-secondary"
          disabled={loading}
          onClick={showModal}
        >
          Generate Tailored Resume
        </button>
        <button className="btn-primary" onClick={() => navigate("/profile")}>
          I'll Make the Changes Myself
        </button>
      </div>

      <Modal
        title="Confirm Resume Update"
        visible={isModalVisible}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={loading ? "Generating..." : "Proceed"}
        cancelText="Cancel"
        okButtonProps={{
          disabled: loading,
        }}
        cancelButtonProps={{
          disabled: loading,
        }}
      >
        <p>
          This will create a new resume based on the AI's suggestions. Your
          current resume data will be updated. Do you want to proceed?
        </p>
      </Modal>
    </div>
  );

  return (
    <DefaultLayout title="AI Toolkit - Resume Analyzer">
      <div className="analyzer-container" style={{ position: "relative" }}>
        {!isAuthenticated && (
          <FeaturePreviewCTA title="Unlock the AI Analyzer" />
        )}
        {!analysisResult ? (
          <>
            <div className="analyzer-header">
              <h1>AI Resume Analyzer</h1>
              <p>
                Upload your resume and a job description to get detailed
                feedback.
              </p>
            </div>
            <div className="analyzer-content">
              <div className="analyzer-input">
                <div className="upload-section">
                  <h2>
                    <FileTextOutlined /> Upload Your Resume (PDF)
                  </h2>
                  <Dragger {...props} disabled={loading || !isAuthenticated}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                </div>
                <div className="jd-section">
                  <h2>
                    <FileTextOutlined /> Paste Job Description
                  </h2>
                  <TextArea
                    rows={10}
                    placeholder="Paste the full job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    disabled={loading || !isAuthenticated}
                  />
                </div>
              </div>
              <div className="analyze-button-container">
                <button
                  className="btn-secondary"
                  onClick={handleAnalyze}
                  disabled={
                    !file || !jobDescription || loading || !isAuthenticated
                  }
                >
                  {loading ? "Analyzing..." : "Analyze My Resume"}
                </button>
              </div>
            </div>
          </>
        ) : (
          renderAnalysisResults()
        )}
      </div>
    </DefaultLayout>
  );
};

export default AIResumeAnalyzer;

