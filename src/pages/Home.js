import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message, Spin, Modal, Input, Select, Pagination } from "antd";
import DefaultLayout from "../components/DefaultLayout";
import useAuthCheck from "../hooks/useAuthCheck";
import useInactivityLogout from "../hooks/useInactivityLogout";
import { calculateProfileProgress } from "../utils/profileProgress";
import s from "../resources/styles/pages/home.module.css";
import AddApplicationModal from "../components/AddApplicationModal";
import { sampleTips } from "../utils/constants";
import { getAllJobs, deleteJob } from "../services/jobTracker.service";

const { Search } = Input;
const { Option } = Select;

function Home() {
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [applications, setApplications] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  //const [dropdownVisibleId, setDropdownVisibleId] = useState(null);

  const navigate = useNavigate();

  const randomTip = sampleTips[Math.floor(Math.random() * sampleTips.length)];

  // Custom hooks for auth and session management
  useAuthCheck();
  useInactivityLogout();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userTemplates = JSON.parse(localStorage.getItem("templates"));
    if (userData) {
      setUser(userData);
      setTemplates(userTemplates);
      setProgress(calculateProfileProgress(userData));
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      try {
        setLoading(true);
        const jobs = await getAllJobs(user.accessToken);
        setApplications(jobs);
      } catch (error) {
        message.error(
          error || error.response?.data?.error || "Failed to fetch jobs."
        );
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleAddApplication = (newApp) => {
    setApplications((prevApps) => [...prevApps, newApp]);
    setIsAddModalVisible(false);
  };

  const handleEditApplication = (updatedApp) => {
    setApplications((prevApps) =>
      prevApps.map((app) => (app._id === updatedApp._id ? updatedApp : app))
    );
    setIsAddModalVisible(false);
    setIsEditing(false);
  };

  const openModalOnEdit = (id) => {
    const job = applications.find((app) => app._id === id);
    setJobToEdit(job);
    setIsAddModalVisible(true);
    setIsEditing(true);
  };

  const handleDeleteApplication = (id) => {
    Modal.confirm({
      title: "Delete Application",
      content: "Are you sure you want to delete this application?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteJob(id, user.accessToken);
          setApplications((prevApps) =>
            prevApps.filter((app) => app._id !== id)
          );
          message.success("Application deleted successfully!");
        } catch (error) {
          message.error(
            error.error ||
              error.response?.data?.error ||
              "Failed to delete job."
          );
          console.error("Error deleting job:", error);
        }
      },
    });
  };

  // Filtering logic
  const filteredApplications = applications.filter((app) => {
    const matchesSearchText = searchText
      ? app.jobTitle.toLowerCase().includes(searchText.toLowerCase()) ||
        app.company.toLowerCase().includes(searchText.toLowerCase())
      : true;
    const matchesStatus = filterStatus ? app.status === filterStatus : true;
    return matchesSearchText && matchesStatus;
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedApplications = filteredApplications.slice(
    startIndex,
    endIndex
  );

  if (!user) {
    return <DefaultLayout title="Home"></DefaultLayout>;
  }

  return (
    <DefaultLayout title="Home">
      <AddApplicationModal
        visible={isAddModalVisible}
        isEditing={isEditing}
        jobToEdit={isEditing ? jobToEdit : null}
        loading={loading}
        setLoading={setLoading}
        onClose={() => {
          setIsAddModalVisible(false);
          setIsEditing(false);
        }}
        onAddApplication={handleAddApplication}
        onEditApplication={handleEditApplication}
      />
      <div className={s.welcomeHeader}>
        <h1>Welcome back, {user.username}!</h1>
        <p>Let's get your resume ready to land that dream job.</p>
      </div>

      <div className={s.dashboardGrid}>
        <main>
          {progress < 100 && (
            <div className={`${s.card} ${s.progressCard}`}>
              <h3>Profile Completion</h3>
              <div className={s.progressBarContainer}>
                <div
                  className={s.progressBar}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className={s.progressText}>{progress}% Complete</p>
              <p>
                A complete profile is key to a standout resume.{" "}
                <Link to="/profile">Fill out yours now!</Link>
              </p>
            </div>
          )}

          <div className={`${s.card} ${s.documentsCard}`}>
            <h3>Your Documents</h3>
            <div className={s.documentsGrid}>
              {templates.length === 0 && <p>No saved templates found.</p>}
              {templates.map((doc) => (
                <div key={doc._id} className={s.documentItem}>
                  <div className={s.thumbnail}>{doc.icon || "📄"}</div>
                  <div className={s.docInfo}>
                    <h4>{doc.name}</h4>
                    <p>Last edited: {doc.updatedAt.slice(0, 10)}</p>
                    <div className={s.docActions}>
                      <button
                        className={s.docButton}
                        onClick={() => navigate(`/templates/${doc._id}`)}
                      >
                        Open
                      </button>
                      {/* implement dropdown with rename, duplicate, delete functionalities */}
                      {/* <button className={`${s.docButton} ${s.moreButton}`}>
                        ...
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${s.card} ${s.trackerCard}`}>
            <h3>Job Application Tracker</h3>
            <div className={s.trackerControls}>
              <Search
                placeholder="Search by job title or company"
                onSearch={setSearchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
              <Select
                placeholder="Filter by status"
                allowClear
                onChange={setFilterStatus}
                style={{
                  width: 150,
                  height: 40,
                  border: "1px solid gray",
                  borderRadius: 5,
                }}
              >
                <Option value="Wishlist">Wishlist</Option>
                <Option value="Applied">Applied</Option>
                <Option value="Interview">Interviewing</Option>
                <Option value="Offer">Offer</Option>
                <Option value="Rejected">Rejected</Option>
              </Select>
            </div>
            {loading ? (
              <Spin size="large" />
            ) : (
              <>
                <div className={s.applicationList}>
                  {displayedApplications.length > 0 ? (
                    displayedApplications.map((app) => (
                      <div key={app._id} className={s.applicationItem}>
                        <h4>{app.jobTitle}</h4>
                        <p>{app.company}</p>
                        <span
                          className={`${s.statusTag} ${
                            s[`status${app.status}`]
                          }`}
                        >
                          {app.status}
                        </span>
                        <div className={s.applicationActions}>
                          <button
                            className={s.actionBtn}
                            onClick={() => openModalOnEdit(app._id)}
                          >
                            Edit
                          </button>
                          <button
                            className={`${s.actionBtn} ${s.deleteBtn}`}
                            onClick={() => handleDeleteApplication(app._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No applications found matching your criteria.</p>
                  )}
                </div>
                <Pagination
                  className={s.pagination}
                  current={currentPage}
                  pageSize={pageSize}
                  total={filteredApplications.length}
                  onChange={(page, newPageSize) => {
                    setCurrentPage(page);
                    setPageSize(newPageSize);
                  }}
                  showSizeChanger
                  pageSizeOptions={["5", "10", "20"]}
                />
              </>
            )}
            <button
              className={s.addApplicationButton}
              onClick={() => setIsAddModalVisible(true)}
            >
              Add New Application
            </button>
          </div>
        </main>
        <aside>
          <div className={`${s.card} ${s.actionsCard}`}>
            <h3>Quick Actions</h3>
            <div className={s.actionsContainer}>
              <Link to="/profile" className={s.actionButton}>
                Edit Profile
              </Link>
              <Link to="/templates" className={s.actionButton}>
                Browse Templates
              </Link>
              <Link to="/ai-toolkit" className={s.actionButton}>
                AI Toolkit
              </Link>
            </div>
          </div>

          <div className={`${s.card} ${s.tipCard}`}>
            <h3>Tip of the Day</h3>
            <p className={s.tipContent}>{randomTip}</p>
            <div className={s.tipIcon}>💡</div>
          </div>
        </aside>
      </div>
    </DefaultLayout>
  );
}

export default Home;
