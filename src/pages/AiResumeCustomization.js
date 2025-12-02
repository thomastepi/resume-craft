import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/styles/pages/aiToolkit.css';

const AiToolkit = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout>
      <div className="ai-toolkit-container">
        <div className="toolkit-header">
          <h1>AI Toolkit</h1>
          <p>Powerful tools to enhance your resume</p>
        </div>
        <div className="toolkit-options">
          <div className="toolkit-option-card" onClick={() => navigate('/ai-toolkit/analyzer')}>
            <h2>Analyze & Refine Resume</h2>
            <p>Upload your resume and a job description to get detailed feedback and suggestions for improvement.</p>
            <div className="card-icon">📄🔍</div>
          </div>
          <div className="toolkit-option-card" onClick={() => navigate('/ai-toolkit/generate')}>
            <h2>Generate New Resume</h2>
            <p>Generate a new resume from scratch based on your profile and customization options.</p>
            <div className="card-icon">✨📝</div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AiToolkit;