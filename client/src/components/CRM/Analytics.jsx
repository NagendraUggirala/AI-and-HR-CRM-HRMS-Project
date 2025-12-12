import React, { useState } from "react";
import Chart from "react-apexcharts";
import jsPDF from "jspdf";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUser,
  FaHandshake,
  FaBullhorn,
  FaBuilding,
  FaFilePdf,

} from "react-icons/fa";

const Analytics = () => {
  const [selectedDate, setSelectedDate] = useState(new Date("2025-04-15"));

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editType, setEditType] = useState("");
  const [editData, setEditData] = useState(null);

  // Add new item modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemType, setNewItemType] = useState("");
  const [newItemData, setNewItemData] = useState({});

  // Mock Data Arrays
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Darlee Rob",
      email: "darlee@example.com",
      phone: "(163) 2459 315",
      createdAt: "2024-01-14",
      position: "Manager",
      avatar: "/assets/img/users/user-49.jpg",
    },
    {
      id: 2,
      name: "Sharon Roy",
      email: "sharon@example.com",
      phone: "(146) 1249 296",
      createdAt: "2024-01-15",
      position: "Installer",
      avatar: "/assets/img/users/user-55.jpg",
    },
  ]);

  const [deals, setDeals] = useState([
    {
      id: 1,
      name: "Collins",
      stage: "Quality To Buy",
      value: 450000,
      owner: { name: "Anthony Lewis", avatar: "/assets/img/users/user-32.jpg" },
      closedDate: "2024-01-14",
    },
    {
      id: 2,
      name: "Konopelski",
      stage: "Proposal Made",
      value: 315000,
      owner: {
        name: "Brian Villalobos",
        avatar: "/assets/img/users/user-09.jpg",
      },
      closedDate: "2024-01-21",
    },
  ]);

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Collins",
      company: {
        name: "BrightWave Innovations",
        avatar: "/assets/img/homeicons/custom-workflows-icon.png",
      },
      stage: "Contacted",
      createdDate: "2024-01-14",
      owner: "Hendry",
    },
    {
      id: 2,
      name: "Konopelski",
      company: {
        name: "Stellar Dynamics",
        avatar: "/assets/img/homeicons/biometric-integration-icon.png",
      },
      stage: "Closed",
      createdDate: "2024-01-21",
      owner: "Guilory",
    },
  ]);

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "BrightWave Innovations",
      email: "darlee@example.com",
      phone: "(163) 2459 315",
      createdAt: "2024-01-14",
      avatar: "/assets/img/homeicons/custom-workflows-icon.png",
    },
    {
      id: 2,
      name: "Stellar Dynamics",
      email: "sharon@example.com",
      phone: "(146) 1249 296",
      createdAt: "2024-01-15",
      avatar: "/assets/img/homeicons/biometric-integration-icon.png",
    },
    {
      id: 3,
      name: "Quantum Nexus",
      email: "jessica@example.com",
      phone: "(148) 1229 235",
      createdAt: "2024-01-17",
      avatar: "/assets/img/icons/laravel-icon.svg",
    },
  ]);

  // Chart data - updated dynamically based on data changes
  const [chartData] = useState({
    series: [40, 35, 15, 10],
    options: {
      chart: { type: "donut" },
      labels: ["Google", "Paid", "Campaigns", "Referrals"],
      colors: ["#0c4b5e", "#ffc107", "#fd3995", "#ab47bc"],
      legend: { position: "bottom" },
      dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(0)}%` },
    },
  });

  const [barOptions] = useState({
    chart: { type: "bar", stacked: true, toolbar: { show: false } },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "45%", borderRadius: 4 },
    },
    colors: ["#ff6f28", "#210dd4"],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: { categories: ["Stage 1", "Stage 2", "Stage 3", "Stage 4"] },
    yaxis: { title: { text: "Deals" } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => `${val} deals` } },
    legend: { position: "top" },
  });

  const [barSeries, setBarSeries] = useState([
    { name: "Income", data: [80, 40, 100, 20] },
    { name: "Expenses", data: [100, 100, 120, 60] },
  ]);

  // Action Handlers
  const handleEdit = (type, id) => {
    let data;
    if (type === "contact") data = contacts.find((c) => c.id === id);
    if (type === "deal") data = deals.find((d) => d.id === id);
    if (type === "lead") data = leads.find((l) => l.id === id);
    if (type === "company") data = companies.find((c) => c.id === id);

    setEditType(type);
    setEditData({ ...data });
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    if (editType === "contact")
      setContacts(contacts.map((c) => (c.id === editData.id ? editData : c)));
    if (editType === "deal")
      setDeals(deals.map((d) => (d.id === editData.id ? editData : d)));
    if (editType === "lead")
      setLeads(leads.map((l) => (l.id === editData.id ? editData : l)));
    if (editType === "company")
      setCompanies(companies.map((c) => (c.id === editData.id ? editData : c)));

    updateCharts();
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "contact") setContacts(contacts.filter((c) => c.id !== id));
      if (type === "deal") setDeals(deals.filter((d) => d.id !== id));
      if (type === "lead") setLeads(leads.filter((l) => l.id !== id));
      if (type === "company")
        setCompanies(companies.filter((c) => c.id !== id));

      updateCharts();
    }
  };

  const updateCharts = () => {
    // Update bar chart based on current data
    const newIncomeData = [
      contacts.length * 20,
      deals.length * 15,
      leads.length * 10,
      companies.length * 5,
    ];

    const newExpensesData = [
      contacts.length * 10,
      deals.length * 8,
      leads.length * 5,
      companies.length * 3,
    ];

    setBarSeries([
      { name: "Income", data: newIncomeData },
      { name: "Expenses", data: newExpensesData },
    ]);
  };

  const handleAddNew = (type) => {
    setNewItemType(type);

    // Set default data based on type
    const defaultData = {
      id: Date.now(),
      name: "",
      createdAt: new Date().toISOString().split("T")[0],
    };

    if (type === "contact") {
      setNewItemData({
        ...defaultData,
        email: "",
        phone: "",
        position: "",
        avatar: "/assets/img/default-avatar.png",
      });
    } else if (type === "deal") {
      setNewItemData({
        ...defaultData,
        stage: "",
        value: 0,
        owner: { name: "John Doe", avatar: "/assets/img/default-avatar.png" },
        closedDate: new Date().toISOString().split("T")[0],
      });
    } else if (type === "lead") {
      setNewItemData({
        ...defaultData,
        company: { name: "", avatar: "/assets/img/default-avatar.png" },
        stage: "",
        createdDate: new Date().toISOString().split("T")[0],
        owner: "",
      });
    } else if (type === "company") {
      setNewItemData({
        ...defaultData,
        email: "",
        phone: "",
        avatar: "/assets/img/default-avatar.png",
      });
    }

    setShowAddModal(true);
  };

  const handleSaveNewItem = () => {
    const newItem = { ...newItemData };

    if (newItemType === "contact") setContacts([...contacts, newItem]);
    if (newItemType === "deal") setDeals([...deals, newItem]);
    if (newItemType === "lead") setLeads([...leads, newItem]);
    if (newItemType === "company") setCompanies([...companies, newItem]);

    updateCharts();
    setShowAddModal(false);
    setNewItemData({});
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Analytics Report", 10, 10);
    doc.text(`Date: ${selectedDate.toDateString()}`, 10, 20);
    doc.text(`Total Contacts: ${contacts.length}`, 10, 30);
    doc.text(`Total Deals: ${deals.length}`, 10, 40);
    doc.text(`Total Leads: ${leads.length}`, 10, 50);
    doc.text(`Total Companies: ${companies.length}`, 10, 60);
    doc.save("analytics-report.pdf");
  };

  // Helper function to render table rows
  const renderTableRow = (item, type) => {
    switch (type) {
      case "contact":
        return (
          <tr key={item.id}>
            <td>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <FaUser className="text-primary" size={20} />
                </div>
                <div>
                  <div className="fw-bold">{item.name}</div>
                  <small className="text-muted">{item.position}</small>
                </div>
              </div>
            </td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.createdAt}</td>
            <td>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => handleEdit("contact", item.id)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete("contact", item.id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        );

      case "deal":
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.stage}</td>
            <td>${item.value.toLocaleString()}</td>
            <td>{item.owner?.name || "Unknown"}</td>
            <td>{item.closedDate}</td>
            <td>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => handleEdit("deal", item.id)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete("deal", item.id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        );

      case "lead":
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.company?.name || "Unknown"}</td>
            <td>{item.stage}</td>
            <td>{item.createdDate}</td>
            <td>{item.owner}</td>
            <td>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => handleEdit("lead", item.id)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete("lead", item.id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        );

      case "company":
        return (
          <tr key={item.id}>
            <td>
              <div className="d-flex align-items-center">
                <FaBuilding className="me-2 text-primary" size={18} />
                <span>{item.name}</span>
              </div>
            </td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.createdAt}</td>
            <td>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => handleEdit("company", item.id)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete("company", item.id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        );

      default:
        return null;
    }
  };

  // Data cards for left side
  const dataCards = [
    {
      title: "Contacts",
      icon: <FaUser className="text-primary" size={24} />,
      count: contacts.length,
      type: "contact",
      data: contacts,
      addButton: true,
    },
    {
      title: "Deals",
      icon: <FaHandshake className="text-success" size={24} />,
      count: deals.length,
      type: "deal",
      data: deals,
      addButton: true,
    },
    {
      title: "Leads",
      icon: <FaBullhorn className="text-warning" size={24} />,
      count: leads.length,
      type: "lead",
      data: leads,
      addButton: true,
    },
    {
      title: "Companies", // Changed from "Recent Companies"
      icon: <FaBuilding className="text-info" size={24} />,
      count: companies.length,
      type: "company",
      data: companies, // Show ALL companies, not just 3
      addButton: true,
    },
  ];

  // CSS for custom scrollbar
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: #888 #f1f1f1;
    }
    
    .table-scroll-container {
      display: block !important;
    }
  `;

  return (
    <div className="container-fluid">
      {/* Add custom scrollbar styles */}
      <style>{scrollbarStyles}</style>

      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between">
            <div className="mb-4">
          <h2 className="fw-bold h4 h2-md">Analytics Dashboard</h2>
            </div>
            <div className="d-flex flex-wrap align-items-center gap-3">
              <div className="d-flex align-items-center">
                <input
                  type="date"
                  className="form-control"
                  style={{ width: "150px" }}
                  value={selectedDate.toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </div>
              <button
                className="btn btn-primary d-flex align-items-center"
                onClick={handleExportPDF}
              >
                <FaFilePdf className="me-2" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        {/* Left Side - Data Tables */}
        <div className="col-lg-8 col-xl-8">
          <div className="row g-4">
            {dataCards.map((card, index) => (
              <div key={index} className="col-12">
                <div className="card h-100" style={{ minHeight: "350px" }}>
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      {card.icon}
                      <h5 className="mb-0 ms-2">
                        {card.title} ({card.count})
                      </h5>
                    </div>
                    {card.addButton && (
                      <button
                        className="btn btn-sm btn-outline-primary d-flex align-items-center"
                        onClick={() => handleAddNew(card.type)}
                      >
                        <FaPlus className="me-1" />
                        Add New
                      </button>
                    )}
                  </div>
                  <div className="card-body p-0" style={{ height: "300px" }}>
                    {/* Fixed scrollable table container */}
                    <div
                      className="table-scroll-container custom-scrollbar"
                      style={{
                        height: "100%",
                        overflow: "auto",
                        position: "relative",
                      }}
                    >
                      <table
                        className="table table-hover mb-0"
                        style={{ minWidth: "100%" }}
                      >
                        <thead
                          className="table-light"
                          style={{
                            position: "sticky",
                            top: 0,
                            zIndex: 2,
                            backgroundColor: "#f8f9fa",
                            boxShadow: "0 2px 2px -1px rgba(0,0,0,0.1)",
                          }}
                        >
                          <tr>
                            {card.type === "contact" && (
                              <>
                                <th style={{ minWidth: "180px" }}>Profile</th>
                                <th style={{ minWidth: "200px" }}>Email</th>
                                <th style={{ minWidth: "150px" }}>Phone</th>
                                <th style={{ minWidth: "120px" }}>Created</th>
                                <th style={{ minWidth: "120px" }}>Actions</th>
                              </>
                            )}
                            {card.type === "deal" && (
                              <>
                                <th style={{ minWidth: "150px" }}>Name</th>
                                <th style={{ minWidth: "150px" }}>Stage</th>
                                <th style={{ minWidth: "120px" }}>Value</th>
                                <th style={{ minWidth: "150px" }}>Owner</th>
                                <th style={{ minWidth: "120px" }}>Closed</th>
                                <th style={{ minWidth: "120px" }}>Actions</th>
                              </>
                            )}
                            {card.type === "lead" && (
                              <>
                                <th style={{ minWidth: "150px" }}>Name</th>
                                <th style={{ minWidth: "180px" }}>Company</th>
                                <th style={{ minWidth: "150px" }}>Stage</th>
                                <th style={{ minWidth: "120px" }}>Created</th>
                                <th style={{ minWidth: "120px" }}>Owner</th>
                                <th style={{ minWidth: "120px" }}>Actions</th>
                              </>
                            )}
                            {card.type === "company" && (
                              <>
                                <th style={{ minWidth: "180px" }}>Name</th>
                                <th style={{ minWidth: "200px" }}>Email</th>
                                <th style={{ minWidth: "150px" }}>Phone</th>
                                <th style={{ minWidth: "120px" }}>Created</th>
                                <th style={{ minWidth: "120px" }}>Actions</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {card.data.map((item) =>
                            renderTableRow(item, card.type)
                          )}
                          {card.data.length === 0 && (
                            <tr>
                              <td
                                colSpan={
                                  card.type === "contact"
                                    ? 5
                                    : card.type === "deal"
                                    ? 6
                                    : card.type === "lead"
                                    ? 6
                                    : card.type === "company"
                                    ? 5
                                    : 1
                                }
                                className="text-center py-4 text-muted"
                              >
                                No {card.title.toLowerCase()} found. Click "Add
                                New" to create one.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Charts */}
        <div className="col-lg-4 col-xl-4">
          <div className="fixed" style={{ top: "20px" }}>
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Deals by Stage</h5>
              </div>
              <div className="card-body">
                <Chart
                  options={barOptions}
                  series={barSeries}
                  type="bar"
                  height={300}
                />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Leads by Source</h5>
              </div>
              <div className="card-body">
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="donut"
                  height={250}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit {editType}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {editData && (
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        value={editData.name || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                      />
                    </div>
                    {"email" in editData && (
                      <div className="col-12">
                        <label className="form-label">Email</label>
                        <input
                          className="form-control"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                        />
                      </div>
                    )}
                    {"phone" in editData && (
                      <div className="col-12">
                        <label className="form-label">Phone</label>
                        <input
                          className="form-control"
                          value={editData.phone}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                        />
                      </div>
                    )}
                    {"stage" in editData && (
                      <div className="col-12">
                        <label className="form-label">Stage</label>
                        <input
                          className="form-control"
                          value={editData.stage}
                          onChange={(e) =>
                            setEditData({ ...editData, stage: e.target.value })
                          }
                        />
                      </div>
                    )}
                    {"value" in editData && (
                      <div className="col-12">
                        <label className="form-label">Value</label>
                        <input
                          className="form-control"
                          type="number"
                          value={editData.value}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              value: parseFloat(e.target.value),
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSaveEdit}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Item Modal */}
      {showAddModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New {newItemType}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Name *</label>
                    <input
                      className="form-control"
                      value={newItemData.name || ""}
                      onChange={(e) =>
                        setNewItemData({ ...newItemData, name: e.target.value })
                      }
                      placeholder="Enter name"
                    />
                  </div>
                  {["contact", "company"].includes(newItemType) && (
                    <>
                      <div className="col-12">
                        <label className="form-label">Email</label>
                        <input
                          className="form-control"
                          value={newItemData.email || ""}
                          onChange={(e) =>
                            setNewItemData({
                              ...newItemData,
                              email: e.target.value,
                            })
                          }
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Phone</label>
                        <input
                          className="form-control"
                          value={newItemData.phone || ""}
                          onChange={(e) =>
                            setNewItemData({
                              ...newItemData,
                              phone: e.target.value,
                            })
                          }
                          placeholder="Enter phone number"
                        />
                      </div>
                    </>
                  )}
                  {newItemType === "deal" && (
                    <>
                      <div className="col-12">
                        <label className="form-label">Stage</label>
                        <input
                          className="form-control"
                          value={newItemData.stage || ""}
                          onChange={(e) =>
                            setNewItemData({
                              ...newItemData,
                              stage: e.target.value,
                            })
                          }
                          placeholder="Enter stage"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Value</label>
                        <input
                          className="form-control"
                          type="number"
                          value={newItemData.value || ""}
                          onChange={(e) =>
                            setNewItemData({
                              ...newItemData,
                              value: parseFloat(e.target.value),
                            })
                          }
                          placeholder="Enter value"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Owner Name</label>
                        <input
                          className="form-control"
                          value={newItemData.owner?.name || ""}
                          onChange={(e) =>
                            setNewItemData({
                              ...newItemData,
                              owner: {
                                ...newItemData.owner,
                                name: e.target.value,
                              },
                            })
                          }
                          placeholder="Enter owner name"
                        />
                      </div>
                    </>
                  )}
                  {newItemType === "lead" && (
                    <>
                      <div className="col-12">
                        <label className="form-label">Company Name</label>
                        <input
                          className="form-control"
                          value={newItemData.company?.name || ""}
                          onChange={(e) =>
                            setNewItemData({
                              ...newItemData,
                              company: {
                                ...newItemData.company,
                                name: e.target.value,
                              },
                            })
                          }
                          placeholder="Enter company name"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Stage</label>
                        <input
                          className="form-control"
                          value={newItemData.stage || ""}
                          onChange={(e) =>
                            setNewItemData({
                              ...newItemData,
                              stage: e.target.value,
                            })
                          }
                          placeholder="Enter stage"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Owner</label>
                        <input
                          className="form-control"
                          value={newItemData.owner || ""}
                          onChange={(e) =>
                            setNewItemData({
                              ...newItemData,
                              owner: e.target.value,
                            })
                          }
                          placeholder="Enter owner name"
                        />
                      </div>
                    </>
                  )}
                  {newItemType === "contact" && (
                    <div className="col-12">
                      <label className="form-label">Position</label>
                      <input
                        className="form-control"
                        value={newItemData.position || ""}
                        onChange={(e) =>
                          setNewItemData({
                            ...newItemData,
                            position: e.target.value,
                          })
                        }
                        placeholder="Enter position"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveNewItem}>
                  Add {newItemType}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
