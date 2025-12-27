import React, { useState, useEffect } from "react";
import { contactsAPI, leadsAPI, dealsAPI, companiesAPI } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chart from "react-apexcharts";
import jsPDF from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

 
 
const Analytics = () => {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-04-15"));
 
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editType, setEditType] = useState("");
  const [editData, setEditData] = useState(null);
 
  // Data states
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [leads, setLeads] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState({
    contacts: true,
    deals: true,
    leads: true,
    companies: true
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
      const [contactsData, dealsData, leadsData, companiesData] = await Promise.all([
        contactsAPI.list().catch(() => []),
        dealsAPI.list().catch(() => []),
        leadsAPI.list().catch(() => []),
        companiesAPI.list().catch(() => [])
      ]);

      setContacts(Array.isArray(contactsData) ? contactsData : []);
      setDeals(Array.isArray(dealsData) ? dealsData : []);
      setLeads(Array.isArray(leadsData) ? leadsData : []);
      setCompanies(Array.isArray(companiesData) ? companiesData : []);
    } catch (err) {
      console.error("Error loading analytics data:", err);
      setError("Failed to load analytics data. Please try again.");
      // Use empty arrays as fallback
      setContacts([]);
      setDeals([]);
      setLeads([]);
      setCompanies([]);
    } finally {
      setLoading({
        contacts: false,
        deals: false,
        leads: false,
        companies: false
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
 
  // Action Handlers
  const handleEdit = (type, id) => {
    let data;
    if (type === "contact") data = contacts.find(c => c.id === id);
    if (type === "deal") data = deals.find(d => d.id === id);
    if (type === "lead") data = leads.find(l => l.id === id);
    if (type === "company") data = companies.find(c => c.id === id);
 
    setEditType(type);
    setEditData({ ...data });
    setShowModal(true);
  };
 
  const handleSaveEdit = async () => {
    try {
      setError(null);
      
      if (editType === "contact") {
        await contactsAPI.update(editData.id, editData);
        toast.success("Contact updated successfully!");
      }
      if (editType === "deal") {
        await dealsAPI.update(editData.id, editData);
        toast.success("Deal updated successfully!");
      }
      if (editType === "lead") {
        await leadsAPI.update(editData.id, editData);
        toast.success("Lead updated successfully!");
      }
      if (editType === "company") {
        await companiesAPI.update(editData.id, editData);
        toast.success("Company updated successfully!");
      }
 
      await loadAllData();
      setShowModal(false);
      setEditData(null);
    } catch (err) {
      console.error("Error updating:", err);
      setError(`Failed to update ${editType}. Please try again.`);
      toast.error(`Failed to update ${editType}. Please try again.`);
    }
  };
 
  const handleDelete = async (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        setError(null);
        
        if (type === "contact") {
          await contactsAPI.delete(id);
          toast.success("Contact deleted successfully!");
        }
        if (type === "deal") {
          await dealsAPI.delete(id);
          toast.success("Deal deleted successfully!");
        }
        if (type === "lead") {
          await leadsAPI.delete(id);
          toast.success("Lead deleted successfully!");
        }
        if (type === "company") {
          await companiesAPI.delete(id);
          toast.success("Company deleted successfully!");
        }
        
        await loadAllData();
      } catch (err) {
        console.error("Error deleting:", err);
        setError(`Failed to delete ${type}. Please try again.`);
        toast.error(`Failed to delete ${type}. Please try again.`);
      }
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
                  <thead><tr><th>Profile</th><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th>Actions</th></tr></thead>
                  <tbody>
                    {contacts.map(c => (
                      <tr key={c.id}>
                        <td><img src={c.img || c.avatar || "/assets/img/users/user-49.jpg"} width={40} alt="" /></td>
                        <td>{c.name} {c.last_name || ''}<br /><small>{c.role || 'N/A'}</small></td>
                        <td>{c.email || 'N/A'}</td>
                        <td>{c.phone || 'N/A'}</td>
                        <td>{formatDate(c.created_at || c.createdAt)}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("contact", c.id)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete("contact", c.id)}>Delete</button>
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
                  <thead><tr><th>Name</th><th>Stage</th><th>Value</th><th>Owner</th><th>Closed</th><th>Actions</th></tr></thead>
                  <tbody>
                    {deals.map(d => (
                      <tr key={d.id}>
                        <td>{d.name || 'N/A'}</td>
                        <td>{d.stage || 'N/A'}</td>
                        <td>${d.value ? d.value.toLocaleString() : '0'}</td>
                        <td>{getOwnerName(d)}</td>
                        <td>{formatDate(d.closed_date || d.closedDate)}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("deal", d.id)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete("deal", d.id)}>Delete</button>
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
                  <thead><tr><th>Name</th><th>Company</th><th>Stage</th><th>Created</th><th>Owner</th><th>Actions</th></tr></thead>
                  <tbody>
                    {leads.map(l => (
                      <tr key={l.id}>
                        <td>{l.name || 'N/A'}</td>
                        <td>{getCompanyName(l)}</td>
                        <td>{l.status || l.stage || 'N/A'}</td>
                        <td>{formatDate(l.created_at || l.createdDate)}</td>
                        <td>{l.owner || 'N/A'}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("lead", l.id)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete("lead", l.id)}>Delete</button>
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
                  <thead><tr><th>Logo</th><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th>Actions</th></tr></thead>
                  <tbody>
                    {companies.map(c => (
                      <tr key={c.id}>
                        <td><img src={c.avatar || c.logo || "/assets/img/homeicons/custom-workflows-icon.png"} width={40} alt="" /></td>
                        <td>{c.name || 'N/A'}</td>
                        <td>{c.email || 'N/A'}</td>
                        <td>{c.phone || 'N/A'}</td>
                        <td>{formatDate(c.created_at || c.createdAt)}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("company", c.id)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete("company", c.id)}>Delete</button>
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
                  <thead><tr><th>Logo</th><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th>Actions</th></tr></thead>
                  <tbody>
                    {companies.slice(0, 5).map(c => (
                      <tr key={c.id}>
                        <td><img src={c.avatar || c.logo || "/assets/img/homeicons/custom-workflows-icon.png"} width={40} alt="" /></td>
                        <td>{c.name || 'N/A'}</td>
                        <td>{c.email || 'N/A'}</td>
                        <td>{c.phone || 'N/A'}</td>
                        <td>{formatDate(c.created_at || c.createdAt)}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("company", c.id)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete("company", c.id)}>Delete</button>
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
 
      {/* Edit Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit {editType}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {editData && (
                  <>
                    <input className="form-control mb-2" value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                    {"email" in editData && <input className="form-control mb-2" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />}
                    {"phone" in editData && <input className="form-control mb-2" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />}
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button className="btn btn-primary" onClick={handleSaveEdit}>Save changes</button>
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