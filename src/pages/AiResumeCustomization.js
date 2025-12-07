import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import s from '../resources/styles/pages/aiToolkit.module.css';

const AiToolkit = () => {
  const navigate = useNavigate();

  return (
    <DefaultLayout title="AI Toolkit">
      <div className={s.pageHeader}>
        <p>Powerful tools to analyze, refine, or generate your resume.</p>
      </div>
      <div className={s.optionsGrid}>
        <div className={s.optionCard} onClick={() => navigate('/ai-toolkit/analyzer')}>
          <h2>Analyze & Refine Resume</h2>
          <p>Upload your resume and a job description to get detailed feedback and suggestions for improvement.</p>
          <div className={s.cardIcon}>📄🔍</div>
        </div>
        <div className={s.optionCard} onClick={() => navigate('/ai-toolkit/generate')}>
          <h2>Generate New Resume</h2>
          <p>Generate a new, tailored resume from scratch based on your saved profile information.</p>
          <div className={s.cardIcon}>✨📝</div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AiToolkit;