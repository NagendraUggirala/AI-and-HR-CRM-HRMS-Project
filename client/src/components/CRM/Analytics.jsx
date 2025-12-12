import React, { useState } from "react";
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
 
  // Mock Data Arrays
  const [contacts, setContacts] = useState([
    { id: 1, name: "Darlee Rob", email: "darlee@example.com", phone: "(163) 2459 315", createdAt: "2024-01-14", position: " Manager", avatar: "/assets/img/users/user-49.jpg" },
    { id: 2, name: "Sharon Roy", email: "sharon@example.com", phone: "(146) 1249 296", createdAt: "2024-01-15", position: "Installer", avatar: "/assets/img/users/user-55.jpg" },
  ]);
 
  const [deals, setDeals] = useState([
    { id: 1, name: "Collins", stage: "Quality To Buy", value: 450000, owner: { name: "Anthony Lewis", avatar: "/assets/img/users/user-32.jpg" }, closedDate: "2024-01-14" },
    { id: 2, name: "Konopelski", stage: "Proposal Made", value: 315000, owner: { name: "Brian Villalobos", avatar: "/assets/img/users/user-09.jpg" }, closedDate: "2024-01-21" },
  ]);
 
  const [leads, setLeads] = useState([
    { id: 1, name: "Collins", company: { name: "BrightWave Innovations", avatar: "/assets/img/homeicons/custom-workflows-icon.png" }, stage: "Contacted", createdDate: "2024-01-14", owner: "Hendry" },
    { id: 2, name: "Konopelski", company: { name: "Stellar Dynamics", avatar: "/assets/img/homeicons/biometric-integration-icon.png" }, stage: "Closed", createdDate: "2024-01-21", owner: "Guilory" },
  ]);
 
  const [companies, setCompanies] = useState([
    { id: 1, name: "BrightWave Innovations", email: "darlee@example.com", phone: "(163) 2459 315", createdAt: "2024-01-14", avatar: "/assets/img/homeicons/custom-workflows-icon.png" },
    { id: 2, name: "Stellar Dynamics", email: "sharon@example.com", phone: "(146) 1249 296", createdAt: "2024-01-15", avatar: "/assets/img/homeicons/biometric-integration-icon.png" },
    { id: 3, name: "Quantum Nexus", email: "jessica@example.com", phone: "(148) 1229 235", createdAt: "2024-01-17", avatar: "/assets/img/icons/laravel-icon.svg" },
  ]);
 
  // Charts Data
  const chartData = {
    series: [40, 35, 15, 10],
    options: {
      chart: { type: "donut" },
      labels: ["Google", "Paid", "Campaigns", "Referrals"],
      colors: ["#0c4b5e", "#ffc107", "#fd3995", "#ab47bc"],
      legend: { position: "bottom" },
      dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(0)}%` },
    },
  };
 
  const barOptions = {
    chart: { type: "bar", stacked: true, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "45%", borderRadius: 4 } },
    colors: ["#ff6f28", "#210dd4ff"],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: { categories: ["Stage 1", "Stage 2", "Stage 3", "Stage 4"] },
    yaxis: { title: { text: "Deals" } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => `${val} deals` } },
    legend: { position: "top" },
  };
 
  const barSeries = [
    { name: "Income", data: [80, 40, 100, 20] },
    { name: "Expenses", data: [100, 100, 120, 60] },
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
 
  const handleSaveEdit = () => {
    if (editType === "contact") setContacts(contacts.map(c => c.id === editData.id ? editData : c));
    if (editType === "deal") setDeals(deals.map(d => d.id === editData.id ? editData : d));
    if (editType === "lead") setLeads(leads.map(l => l.id === editData.id ? editData : l));
    if (editType === "company") setCompanies(companies.map(c => c.id === editData.id ? editData : c));
 
    setShowModal(false);
    setEditData(null);
  };
 
  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "contact") setContacts(contacts.filter(c => c.id !== id));
      if (type === "deal") setDeals(deals.filter(d => d.id !== id));
      if (type === "lead") setLeads(leads.filter(l => l.id !== id));
      if (type === "company") setCompanies(companies.filter(c => c.id !== id));
    }
  };
 
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Contacts List", 10, 10);
    contacts.forEach((c, i) => {
      doc.text(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`, 10, 20 + i * 10);
    });
    doc.save("contacts.pdf");
  };
 
  return (
    <div>


           



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
              <table className="table">
                <thead><tr><th>Profile</th><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th>Actions</th></tr></thead>
                <tbody>
                  {contacts.map(c => (
                    <tr key={c.id}>
                      <td><img src={c.avatar} width={40} alt="" /></td>
                      <td>{c.name}<br /><small>{c.position}</small></td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.createdAt}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("contact", c.id)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete("contact", c.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
 
          {/* Deals */}
          <div className="card mb-4 w-100" style={{ width: "450px" }}>
            <div className="card-header"><h5>Deals</h5></div>
            <div className="card-body p-0">
              <table className="table">
                <thead><tr><th>Name</th><th>Stage</th><th>Value</th><th>Owner</th><th>Closed</th><th>Actions</th></tr></thead>
                <tbody>
                  {deals.map(d => (
                    <tr key={d.id}>
                      <td>{d.name}</td>
                      <td>{d.stage}</td>
                      <td>${d.value}</td>
                      <td>{d.owner.name}</td>
                      <td>{d.closedDate}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("deal", d.id)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete("deal", d.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
 
          {/* Leads */}
          <div className="card mb-4 w-100" style={{ width: "450px" }}>
            <div className="card-header"><h5>Leads</h5></div>
            <div className="card-body p-0">
              <table className="table">
                <thead><tr><th>Name</th><th>Company</th><th>Stage</th><th>Created</th><th>Owner</th><th>Actions</th></tr></thead>
                <tbody>
                  {leads.map(l => (
                    <tr key={l.id}>
                      <td>{l.name}</td>
                      <td>{l.company.name}</td>
                      <td>{l.stage}</td>
                      <td>{l.createdDate}</td>
                      <td>{l.owner}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("lead", l.id)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete("lead", l.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
 
          {/* Companies */}
          <div className="card mb-4 w-100" style={{ width: "450px" }}>
            <div className="card-header"><h5>Companies</h5></div>
            <div className="card-body p-0">
              <table className="table">
                <thead><tr><th>Logo</th><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th>Actions</th></tr></thead>
                <tbody>
                  {companies.map(c => (
                    <tr key={c.id}>
                      <td><img src={c.avatar} width={40} alt="" /></td>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.createdAt}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("company", c.id)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete("company", c.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <table className="table">
                <thead><tr><th>Logo</th><th>Name</th><th>Email</th><th>Phone</th><th>Created</th><th>Actions</th></tr></thead>
                <tbody>
                  {companies.map(c => (
                    <tr key={c.id}>
                      <td><img src={c.avatar} width={40} alt="" /></td>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.createdAt}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit("company", c.id)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete("company", c.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
    </div>
  );
};
 
export default Analytics;