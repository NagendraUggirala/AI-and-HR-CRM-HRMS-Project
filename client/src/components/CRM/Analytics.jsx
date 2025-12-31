import React, { useState, useEffect } from "react";
import { contactsAPI, leadsAPI, dealsAPI, companiesAPI, activitiesAPI, analyticsAPI } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chart from "react-apexcharts";
import jsPDF from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../../config/api.config";

 
const Analytics = () => {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-04-15"));

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Data states
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [leads, setLeads] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activities, setActivities] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState({
    contacts: true,
    deals: true,
    leads: true,
    companies: true,
    activities: true
  });
  const [error, setError] = useState(null);

  // Load data from API
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setError(null);
      
      // Load all data in parallel
      const [contactsData, dealsData, leadsData, companiesData, activitiesData] = await Promise.all([
        contactsAPI.list().catch(() => []),
        dealsAPI.list().catch(() => []),
        leadsAPI.list().catch(() => []),
        companiesAPI.list().catch(() => []),
        activitiesAPI.list().catch(() => [])
      ]);

      setContacts(Array.isArray(contactsData) ? contactsData : []);
      setDeals(Array.isArray(dealsData) ? dealsData : []);
      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setCompanies(Array.isArray(companiesData) ? companiesData : []);
      setActivities(Array.isArray(activitiesData) ? activitiesData : []);
    } catch (err) {
      console.error("Error loading analytics data:", err);
      setError("Failed to load analytics data. Please try again.");
      // Use empty arrays as fallback
      setContacts([]);
      setDeals([]);
      setLeads([]);
      setCompanies([]);
      setActivities([]);
    } finally {
      setLoading({
        contacts: false,
        deals: false,
        leads: false,
        companies: false,
        activities: false
      });
    }
  };

  // Calculate chart data from real data
  const getLeadsBySource = () => {
    const sourceCounts = {};
    leads.forEach(lead => {
      const source = lead.source || "Other";
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });
    return sourceCounts;
  };

  const getDealsByStage = () => {
    const stageCounts = {};
    deals.forEach(deal => {
      // Backend sends 'status', but we also check 'stage' for compatibility
      const stage = deal.status || deal.stage || "Unknown";
      stageCounts[stage] = (stageCounts[stage] || 0) + 1;
    });
    return stageCounts;
  };

  // Charts Data
  const leadsSourceData = getLeadsBySource();
  const leadsSourceLabels = Object.keys(leadsSourceData);
  const leadsSourceValues = Object.values(leadsSourceData);
  
  const chartData = {
    series: leadsSourceValues.length > 0 ? leadsSourceValues : [40, 35, 15, 10],
    options: {
      chart: { type: "donut" },
      labels: leadsSourceLabels.length > 0 ? leadsSourceLabels : ["Google", "Paid", "Campaigns", "Referrals"],
      colors: ["#0c4b5e", "#ffc107", "#fd3995", "#ab47bc"],
      legend: { position: "bottom" },
      dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(0)}%` },
    },
  };

  const dealsStageData = getDealsByStage();
  const dealsStageLabels = Object.keys(dealsStageData);
  const dealsStageValues = Object.values(dealsStageData);

  const barOptions = {
    chart: { type: "bar", stacked: true, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "45%", borderRadius: 4 } },
    colors: ["#ff6f28", "#210dd4ff"],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: { categories: dealsStageLabels.length > 0 ? dealsStageLabels : ["Stage 1", "Stage 2", "Stage 3", "Stage 4"] },
    yaxis: { title: { text: "Deals" } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => `${val} deals` } },
    legend: { position: "top" },
  };

  const barSeries = [
    { name: "Income", data: dealsStageValues.length > 0 ? dealsStageValues : [80, 40, 100, 20] },
    { name: "Expenses", data: dealsStageValues.length > 0 ? dealsStageValues.map(v => Math.floor(v * 0.6)) : [100, 100, 120, 60] },
  ];

  // Delete Handlers
  const handleDeleteClick = (type, id, name) => {
    setItemToDelete({ type, id, name });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setError(null);
      const { type, id } = itemToDelete;
      
      if (type === "contact") {
        await contactsAPI.delete(id);
        toast.success("Contact deleted successfully!");
      } else if (type === "deal") {
        await dealsAPI.delete(id);
        toast.success("Deal deleted successfully!");
      } else if (type === "lead") {
        await leadsAPI.delete(id);
        toast.success("Lead deleted successfully!");
      } else if (type === "company") {
        await companiesAPI.delete(id);
        toast.success("Company deleted successfully!");
      } else if (type === "activity") {
        await activitiesAPI.delete(id);
        toast.success("Activity deleted successfully!");
      }
      
      await loadAllData();
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (err) {
      console.error("Error deleting:", err);
      setError(`Failed to delete ${itemToDelete?.type}. Please try again.`);
      toast.error(`Failed to delete ${itemToDelete?.type}. Please try again.`);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Contacts List", 10, 10);
    contacts.forEach((c, i) => {
      doc.text(`${i + 1}. ${c.name} ${c.last_name || ''} - ${c.email || 'N/A'} - ${c.phone || 'N/A'}`, 10, 20 + i * 10);
    });
    doc.save("contacts.pdf");
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Helper function to get company name from lead
  const getCompanyName = (lead) => {
    if (typeof lead.company === 'string') return lead.company;
    if (lead.company && lead.company.name) return lead.company.name;
    return "N/A";
  };

  // Helper function to get owner name from deal
  const getOwnerName = (deal) => {
    if (typeof deal.owner === 'string') return deal.owner;
    if (deal.owner && deal.owner.name) return deal.owner.name;
    return "N/A";
  };

  // Helper function to get activity type display
  const getActivityTypeDisplay = (activity) => {
    return activity.activity_type || activity.type || "N/A";
  };

  // Helper function to get deal name
  const getDealName = (deal) => {
    return deal.deal_name || deal.name || "N/A";
  };

  // Helper function to get deal value
  const getDealValue = (deal) => {
    return deal.deal_value || deal.value || 0;
  };

  // Helper function to get contact profile image
  const getContactImage = (contact) => {
    if (contact.profile_photo) {
      return `${BASE_URL}${contact.profile_photo.startsWith('/') ? '' : '/'}${contact.profile_photo}`;
    }
    if (contact.img) {
      return contact.img.startsWith('http') ? contact.img : `${BASE_URL}${contact.img.startsWith('/') ? '' : '/'}${contact.img}`;
    }
    if (contact.avatar) {
      return contact.avatar.startsWith('http') ? contact.avatar : `${BASE_URL}${contact.avatar.startsWith('/') ? '' : '/'}${contact.avatar}`;
    }
    return "/assets/images/users/user1.png";
  };

  // Helper function to get company logo
  const getCompanyLogo = (company) => {
    if (company.logo) {
      return `${BASE_URL}${company.logo.startsWith('/') ? '' : '/'}${company.logo}`;
    }
    if (company.avatar) {
      return company.avatar.startsWith('http') ? company.avatar : `${BASE_URL}${company.avatar.startsWith('/') ? '' : '/'}${company.avatar}`;
    }
    return "/assets/images/users/user1.png";
  };

  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <h2>Analytics</h2>
        <div className="d-flex justify-content-end align-items-center ">
          <button className="btn btn-primary mx-2" onClick={handleExportPDF}>Export PDF</button>
          <DatePicker selected={selectedDate} onChange={setSelectedDate} className="form-control w-50" />
        </div>
      </div>

      {/* Tables */}
      <div className="d-flex">
        <div>
          {/* Contacts */}
          <div className="card mb-4 w-100" style={{ width: "450px" }}>
            <div className="card-header"><h5>Contacts</h5></div>
            <div className="card-body p-0">
              {loading.contacts ? (
                <div className="text-center py-3">
                  <p className="text-muted">Loading contacts...</p>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-3">
                  <p className="text-muted">No contacts found.</p>
                </div>
              ) : (
                <table className="table">
                  <thead><tr><th>Profile</th><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th style={{ width: '100px', minWidth: '100px' }}>Actions</th></tr></thead>
                  <tbody>
                    {contacts.map(c => (
                      <tr key={c.id}>
                        <td><img src={getContactImage(c)} width={40} height={40} style={{ borderRadius: '50%' }} alt="" onError={(e) => { e.target.src = "/assets/images/users/user1.png"; }} /></td>
                        <td>{c.name} {c.last_name || ''}<br /><small>{c.role || 'N/A'}</small></td>
                        <td>{c.email || 'N/A'}</td>
                        <td>{c.phone || 'N/A'}</td>
                        <td>{formatDate(c.created_at || c.createdAt)}</td>
                        <td style={{ whiteSpace: 'nowrap', width: '100px' }}>
                          <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => handleDeleteClick("contact", c.id, `${c.name} ${c.last_name || ''}`)}
                            title="Delete Contact"
                            type="button"
                            style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                          >
                            <i className="ti ti-trash me-1"></i>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Deals */}
          <div className="card mb-4 w-100" style={{ width: "450px" }}>
            <div className="card-header"><h5>Deals</h5></div>
            <div className="card-body p-0">
              {loading.deals ? (
                <div className="text-center py-3">
                  <p className="text-muted">Loading deals...</p>
                </div>
              ) : deals.length === 0 ? (
                <div className="text-center py-3">
                  <p className="text-muted">No deals found.</p>
                </div>
              ) : (
                <table className="table">
                  <thead><tr><th>Name</th><th>Stage</th><th>Value</th><th>Owner</th><th>Closed</th><th style={{ width: '100px', minWidth: '100px' }}>Actions</th></tr></thead>
                  <tbody>
                    {deals.map(d => (
                      <tr key={d.id}>
                        <td>{getDealName(d)}</td>
                        <td>{d.status || d.stage || 'N/A'}</td>
                        <td>${getDealValue(d).toLocaleString()}</td>
                        <td>{getOwnerName(d)}</td>
                        <td>{formatDate(d.closed_date || d.closedDate || d.due_date)}</td>
                        <td style={{ whiteSpace: 'nowrap', width: '100px' }}>
                          <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => handleDeleteClick("deal", d.id, getDealName(d))}
                            title="Delete Deal"
                            type="button"
                            style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                          >
                            <i className="ti ti-trash me-1"></i>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Leads */}
          <div className="card mb-4 w-100" style={{ width: "450px" }}>
            <div className="card-header"><h5>Leads</h5></div>
            <div className="card-body p-0">
              {loading.leads ? (
                <div className="text-center py-3">
                  <p className="text-muted">Loading leads...</p>
                </div>
              ) : leads.length === 0 ? (
                <div className="text-center py-3">
                  <p className="text-muted">No leads found.</p>
                </div>
              ) : (
                <table className="table">
                  <thead><tr><th>Name</th><th>Company</th><th>Stage</th><th>Created</th><th>Owner</th><th style={{ width: '100px', minWidth: '100px' }}>Actions</th></tr></thead>
                  <tbody>
                    {leads.map(l => (
                      <tr key={l.id}>
                        <td>{l.name || 'N/A'}</td>
                        <td>{getCompanyName(l)}</td>
                        <td>{l.status || l.stage || 'N/A'}</td>
                        <td>{formatDate(l.created_at || l.createdDate)}</td>
                        <td>{l.owner || 'N/A'}</td>
                        <td style={{ whiteSpace: 'nowrap', width: '100px' }}>
                          <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => handleDeleteClick("lead", l.id, l.name || 'Lead')}
                            title="Delete Lead"
                            type="button"
                            style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                          >
                            <i className="ti ti-trash me-1"></i>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Companies */}
          <div className="card mb-4 w-100" style={{ width: "450px" }}>
            <div className="card-header"><h5>Companies</h5></div>
            <div className="card-body p-0">
              {loading.companies ? (
                <div className="text-center py-3">
                  <p className="text-muted">Loading companies...</p>
                </div>
              ) : companies.length === 0 ? (
                <div className="text-center py-3">
                  <p className="text-muted">No companies found.</p>
                </div>
              ) : (
                <table className="table">
                  <thead><tr><th>Logo</th><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th style={{ width: '100px', minWidth: '100px' }}>Actions</th></tr></thead>
                  <tbody>
                    {companies.map(c => (
                      <tr key={c.id}>
                        <td><img src={getCompanyLogo(c)} width={40} height={40} style={{ borderRadius: '50%' }} alt="" onError={(e) => { e.target.src = "/assets/images/users/user1.png"; }} /></td>
                        <td>{c.name || 'N/A'}</td>
                        <td>{c.email || 'N/A'}</td>
                        <td>{c.phone || 'N/A'}</td>
                        <td>{formatDate(c.created_at || c.createdAt)}</td>
                        <td style={{ whiteSpace: 'nowrap', width: '100px' }}>
                          <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => handleDeleteClick("company", c.id, c.name || 'Company')}
                            title="Delete Company"
                            type="button"
                            style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                          >
                            <i className="ti ti-trash me-1"></i>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Activities */}
          <div className="card mb-4 w-100" style={{ width: "450px" }}>
            <div className="card-header"><h5>Activities</h5></div>
            <div className="card-body p-0">
              {loading.activities ? (
                <div className="text-center py-3">
                  <p className="text-muted">Loading activities...</p>
                </div>
              ) : activities.length === 0 ? (
                <div className="text-center py-3">
                  <p className="text-muted">No activities found.</p>
                </div>
              ) : (
                <table className="table">
                  <thead><tr><th>Title</th><th>Type</th><th>Due Date</th><th>Owner</th><th style={{ width: '100px', minWidth: '100px' }}>Actions</th></tr></thead>
                  <tbody>
                    {activities.map(a => (
                      <tr key={a.id}>
                        <td>{a.title || 'N/A'}</td>
                        <td>{getActivityTypeDisplay(a)}</td>
                        <td>{formatDate(a.due_date)}</td>
                        <td>{a.owner || 'N/A'}</td>
                        <td style={{ whiteSpace: 'nowrap', width: '100px' }}>
                          <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => handleDeleteClick("activity", a.id, a.title || 'Activity')}
                            title="Delete Activity"
                            type="button"
                            style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                          >
                            <i className="ti ti-trash me-1"></i>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mx-4">
          <div className="card mb-4 w-100" style={{ width: "500px" }}>
            <div className="card-header"><h5>Deals by Stage</h5></div>
            <div className="card-body"><Chart options={barOptions} series={barSeries} type="bar" height={325} /></div>
          </div>
          <div className="card mb-4" style={{ width: "500px" }}>
            <div className="card-header"><h5>Leads by Source</h5></div>
            <div className="card-body"><Chart options={chartData.options} series={chartData.series} type="donut" height={250} /></div>
          </div>
          <div className="card mb-4 w-100" style={{ width: "500px" }}>
            <div className="card-header"><h5>Recently Added Companies </h5></div>
            <div className="card-body p-0">
              {loading.companies ? (
                <div className="text-center py-3">
                  <p className="text-muted">Loading companies...</p>
                </div>
              ) : companies.length === 0 ? (
                <div className="text-center py-3">
                  <p className="text-muted">No companies found.</p>
                </div>
              ) : (
                <table className="table">
                  <thead><tr><th>Logo</th><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th style={{ width: '100px', minWidth: '100px' }}>Actions</th></tr></thead>
                  <tbody>
                    {companies.slice(0, 5).map(c => (
                      <tr key={c.id}>
                        <td><img src={getCompanyLogo(c)} width={40} height={40} style={{ borderRadius: '50%' }} alt="" onError={(e) => { e.target.src = "/assets/images/users/user1.png"; }} /></td>
                        <td>{c.name || 'N/A'}</td>
                        <td>{c.email || 'N/A'}</td>
                        <td>{c.phone || 'N/A'}</td>
                        <td>{formatDate(c.created_at || c.createdAt)}</td>
                        <td style={{ whiteSpace: 'nowrap', width: '100px' }}>
                          <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => handleDeleteClick("company", c.id, c.name || 'Company')}
                            title="Delete Company"
                            type="button"
                            style={{ fontSize: '12px', padding: '4px 10px', minWidth: '75px' }}
                          >
                            <i className="ti ti-trash me-1"></i>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && itemToDelete && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{itemToDelete.name || itemToDelete.type}</strong>?</p>
                <p className="text-muted">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowDeleteModal(false);
                    setItemToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
 
export default Analytics;
