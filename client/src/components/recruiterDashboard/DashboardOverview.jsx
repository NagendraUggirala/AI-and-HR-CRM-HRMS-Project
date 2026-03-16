import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import CandidateProfilePage from './CandidateProfilePage';
import { BASE_URL } from '../../config/api.config';
import '../../App.css';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalJobs: 0,
      totalCandidates: 0,
      totalApplications: 0,
      activeJobs: 0,
      hiredCandidates: 0,
      pendingApplications: 0
    },
    recentApplications: [],
    stageDistribution: {},
    loading: true,
    error: null
  });
  const [refreshing, setRefreshing] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setDashboardData(prev => ({ ...prev, error: 'Please login to view dashboard', loading: false }));
      return;
    }

    try {
      setRefreshing(true);
      const candidatesResponse = await fetch(`${BASE_URL}/api/recruiter_dashboard/candidates`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const jobsResponse = await fetch(`${BASE_URL}/api/jobs/list`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (candidatesResponse.ok && jobsResponse.ok) {
        const candidates = await candidatesResponse.json();
        const jobs = await jobsResponse.json();

        const stats = {
          totalJobs: jobs.length,
          totalCandidates: candidates.length,
          totalApplications: candidates.length,
          activeJobs: jobs.filter(job => job.status === 'Active').length,
          hiredCandidates: candidates.filter(c => c.stage === 'Hired').length,
          pendingApplications: candidates.filter(c => c.stage === 'Applied').length
        };

        const stageDistribution = {};
        candidates.forEach(candidate => {
          stageDistribution[candidate.stage] = (stageDistribution[candidate.stage] || 0) + 1;
        });

        const recentApplications = candidates.slice(0, 5).map(candidate => ({
          id: candidate.id,
          name: candidate.name,
          email: candidate.email,
          role: candidate.role,
          stage: candidate.stage,
          appliedAt: new Date().toISOString(),
          skills: candidate.skills,
          fullData: candidate
        }));

        setDashboardData({
          stats,
          recentApplications,
          stageDistribution,
          loading: false,
          error: null
        });
      } else {
        setDashboardData(prev => ({
          ...prev,
          error: 'Failed to fetch dashboard data',
          loading: false
        }));
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setDashboardData(prev => ({
        ...prev,
        error: 'Network error. Please check if backend is running.',
        loading: false
      }));
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stageColorDot = (stage) => {
    const map = {
      Applied: 'bg-primary',
      Screening: 'bg-warning',
      Interview: 'bg-info',
      Offer: 'bg-primary',
      Hired: 'bg-success',
      Rejected: 'bg-danger'
    };
    return map[stage] || 'bg-secondary';
  };

  const stageBadgeClass = (stage) => {
    const map = {
      Applied: 'bg-primary',
      Screening: 'bg-warning text-dark',
      Interview: 'bg-info',
      Offer: 'bg-primary',
      Hired: 'bg-success',
      Rejected: 'bg-danger'
    };
    return map[stage] || 'bg-secondary';
  };

  const handleViewCandidate = (application) => {
    if (!application) return;
    const candidateData = application.fullData
      ? {
          id: application.fullData.id,
          name: application.fullData.name,
          email: application.fullData.email,
          role: application.fullData.role,
          skills: application.fullData.skills,
          stage: application.fullData.stage,
          status: application.fullData.stage === 'Hired'
            ? 'Completed'
            : application.fullData.stage === 'Interview'
            ? 'In Progress'
            : application.fullData.stage === 'Offer'
            ? 'Awaiting Decision'
            : 'Pending',
          resume_url: application.fullData.resume_url,
          notes: application.fullData.notes,
          recruiter_comments: application.fullData.recruiter_comments,
          resume_screened: application.fullData.resume_screened || 'no',
          fullData: application.fullData
        }
      : application;

    setSelectedCandidate(candidateData);
    setShowCandidateModal(true);
  };

  const handleCloseCandidateModal = () => {
    setShowCandidateModal(false);
    setSelectedCandidate(null);
  };

  if (dashboardData.loading) {
    return (
      <div className="container-fluid py-4">
        <div className="card border shadow-none">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mb-0">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (dashboardData.error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger d-flex align-items-center mb-0" role="alert">
          <Icon icon="heroicons:exclamation-circle" className="me-2" style={{ fontSize: 20 }} />
          <div className="flex-grow-1">{dashboardData.error}</div>
          <button
            type="button"
            className="btn refresh-btn d-flex align-items-center gap-2"
            onClick={fetchDashboardData}
          >
            <Icon icon="heroicons:arrow-path" style={{ width: 16, height: 16 }} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { stats, recentApplications, stageDistribution } = dashboardData;
  const totalCandidatesForPct = stats.totalCandidates || 1;

  return (
    <div className="container-fluid py-4">
      {/* Page Header: title left, last updated + refresh right */}
      <div className="mb-4 d-flex justify-content-between align-items-start flex-wrap gap-3">
        <div>
          <h4 className="fw-bold h4 d-flex align-items-center gap-2 mb-0">
            <Icon icon="heroicons:home" className="text-black" style={{ fontSize: 28 }} />
            Dashboard
          </h4>
          <p className="text-secondary mb-0 mt-1">Here&apos;s what&apos;s happening with your recruitment pipeline.</p>
        </div>
        <div className="d-flex flex-column align-items-end gap-2">
          <span className="text-muted small">
            Last updated: <span className="fw-medium text-body">{new Date().toLocaleDateString()}</span>
          </span>
          <button
            type="button"
            className="btn refresh-btn d-flex align-items-center gap-2"
            onClick={fetchDashboardData}
            disabled={refreshing}
          >
            <Icon icon="heroicons:arrow-path" className={refreshing ? 'spin' : ''} style={{ width: 16, height: 16 }} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* KPI Row - App.css kpi-card style */}
      <div className="kpi-row mb-4">
        {[
          { title: 'Total Jobs', value: stats.totalJobs, sub: `${stats.activeJobs} active`, icon: 'heroicons:briefcase', bg: 'kpi-primary', color: 'kpi-primary-text' },
          { title: 'Total Candidates', value: stats.totalCandidates, sub: `${stats.pendingApplications} pending`, icon: 'heroicons:user-group', bg: 'kpi-success', color: 'kpi-success-text' },
          { title: 'Applications', value: stats.totalApplications, sub: 'All time', icon: 'heroicons:document-text', bg: 'kpi-info', color: 'kpi-info-text' },
          { title: 'Hired', value: stats.hiredCandidates, sub: 'This month', icon: 'heroicons:check-badge', bg: 'kpi-warning', color: 'kpi-warning-text' }
        ].map((item, index) => (
          <div className="kpi-col" key={index}>
            <div className="kpi-card">
              <div className="kpi-card-body">
                <div className={`kpi-icon ${item.bg}`}>
                  <Icon icon={item.icon} className={`kpi-icon-style ${item.color}`} />
                </div>
                <div className="kpi-content">
                  <div className="kpi-title">{item.title}</div>
                  <div className="kpi-value">{item.value}</div>
                  {item.sub && <div className="kpi-sub text-muted">{item.sub}</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content: Pipeline Overview + Quick Actions */}
      <div className="row g-3 mb-4">
        {/* Pipeline Overview */}
        <div className="col-12 col-lg-6">
          <div className="card border shadow-none h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-semibold mb-0">Pipeline Overview</h5>
                <Icon icon="heroicons:chart-bar" className="text-muted" style={{ fontSize: 22 }} />
              </div>
              <div className="d-flex flex-column gap-3">
                {Object.entries(stageDistribution).map(([stage, count]) => (
                  <div key={stage} className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <span className={`rounded-circle ${stageColorDot(stage)}`} style={{ width: 10, height: 10 }} />
                      <span className="small fw-medium">{stage}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="small text-muted">{count}</span>
                      <div className="rounded-pill bg-light" style={{ width: 80, height: 8 }}>
                        <div
                          className={`h-100 rounded-pill ${stageColorDot(stage)}`}
                          style={{ width: `${(count / totalCandidatesForPct) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {Object.keys(stageDistribution).length === 0 && (
                  <p className="text-muted small mb-0">No pipeline data yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12 col-lg-6">
          <div className="card border shadow-none h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-semibold mb-0">Quick Actions</h5>
                <span className="small text-muted">Need to move fast? Use these actions.</span>
              </div>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                <button type="button" className="btn create-job-btn d-inline-flex align-items-center gap-2" onClick={() => navigate('/jobs/new')}>
                  <Icon icon="heroicons:plus" style={{ width: 16, height: 16 }} />
                  Create Job
                </button>
                <button type="button" className="btn job-listings-btn d-inline-flex align-items-center gap-2" onClick={() => navigate('/candidates')}>
                  <Icon icon="heroicons:eye" style={{ width: 16, height: 16 }} />
                  View Candidates
                </button>
                <button type="button" className="btn job-listings-btn d-inline-flex align-items-center gap-2" onClick={() => navigate('/resume-screening')}>
                  <Icon icon="heroicons:arrow-up-tray" style={{ width: 16, height: 16 }} />
                  AI Resume Screening
                </button>
                <button type="button" className="btn job-listings-btn d-inline-flex align-items-center gap-2" onClick={() => navigate('/jobslist')}>
                  <Icon icon="heroicons:briefcase" style={{ width: 16, height: 16 }} />
                  Job Listings
                </button>
                <button type="button" className="btn job-listings-btn d-inline-flex align-items-center gap-2" onClick={() => navigate('/pipeline/view')}>
                  <Icon icon="heroicons:squares-2x2" style={{ width: 16, height: 16 }} />
                  Pipeline View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications + Activity Summary */}
      <div className="row g-3">
        {/* Recent Applications */}
        <div className="col-12 col-lg-7">
          <div className="card border shadow-none h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-semibold mb-0">Recent Applications</h5>
                <button
                  type="button"
                  className="btn btn-link p-0 text-primary text-decoration-none fw-medium"
                  onClick={() => navigate('/candidates')}
                >
                  View All
                </button>
              </div>
              <div className="d-flex flex-column gap-2">
                {recentApplications.map((application) => (
                  <div
                    key={application.id}
                    className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center"
                        style={{ width: 40, height: 40 }}
                      >
                        <span className="small fw-semibold text-primary">
                          {application.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="fw-medium">{application.name}</div>
                        <div className="small text-muted">{application.role}</div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className={`badge ${stageBadgeClass(application.stage)}`}>
                        {application.stage}
                      </span>
                      <button
                        type="button"
                        className="btn job-listings-btn p-2"
                        onClick={() => handleViewCandidate(application)}
                        title="Quick View"
                      >
                        <Icon icon="heroicons:eye" style={{ width: 16, height: 16 }} />
                      </button>
                    </div>
                  </div>
                ))}
                {recentApplications.length === 0 && (
                  <p className="text-muted small mb-0 py-3">No recent applications.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Summary: This Week + Performance */}
        <div className="col-12 col-lg-5">
          <div className="d-flex flex-column gap-3 h-100">
            <div className="card border shadow-none">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">This Week</h5>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light">
                    <span className="text-muted small">New Applications</span>
                    <span className="fw-medium">{stats.pendingApplications}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light">
                    <span className="text-muted small">Interviews Scheduled</span>
                    <span className="fw-medium">0</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Offers Extended</span>
                    <span className="fw-medium">0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card border shadow-none">
              <div className="card-body">
                <h5 className="fw-semibold mb-3">Performance</h5>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light">
                    <span className="text-muted small">Application Rate</span>
                    <span className="fw-medium text-success">100%</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-light">
                    <span className="text-muted small">Time to Hire</span>
                    <span className="fw-medium">-</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Success Rate</span>
                    <span className="fw-medium">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Quick View Modal (same style as Candidates page) */}
      {showCandidateModal && selectedCandidate && (
        <div
          className="job-modal-overlay"
          tabIndex="-1"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseCandidateModal();
          }}
        >
          <div
            className="job-modal-dialog"
            style={{ maxWidth: '900px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <CandidateProfilePage
              candidate={selectedCandidate}
              onClose={handleCloseCandidateModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
