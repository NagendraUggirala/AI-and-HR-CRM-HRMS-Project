import React, { useState } from "react";
import { FaFileExcel, FaPlusCircle, FaEdit, FaTrash, FaFilePdf } from "react-icons/fa";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";

const Pipeline = () => {
  const [pipelines, setPipelines] = useState([
    { name: "Sales", value: "$4,50,000", deals: 315, stage: "Won", stageColor: "success", date: "14 Jan 2024", status: "Active" },
    { name: "Marketing", value: "$3,15,000", deals: 447, stage: "In Pipeline", stageColor: "primary", date: "21 Jan 2024", status: "Active" },
    { name: "Email", value: "$6,10,000", deals: 545, stage: "Conversation", stageColor: "info", date: "15 Mar 2024", status: "Active" },
    { name: "Operational", value: "$5,50,000", deals: 787, stage: "Follow Up", stageColor: "warning", date: "20 Apr 2024", status: "Active" },
    { name: "Identify", value: "$7,40,000", deals: 128, stage: "Lost", stageColor: "danger", date: "10 Dec 2024", status: "Active" },
    { name: "Collaborative", value: "$5,00,000", deals: 315, stage: "Won", stageColor: "success", date: "06 Jul 2024", status: "Inactive" },
    { name: "Calls", value: "$8,40,000", deals: 654, stage: "Won", stageColor: "success", date: "20 Feb 2024", status: "Active" },
    { name: "Interact", value: "$6,20,000", deals: 664, stage: "Won", stageColor: "success", date: "15 Nov 2024", status: "Active" },
    { name: "Chats", value: "$4,70,000", deals: 787, stage: "Won", stageColor: "success", date: "12 Apr 2024", status: "Active" },
    { name: "Differentiate", value: "$4,50,000", deals: 478, stage: "Schedule Service", stageColor: "secondary", date: "02 Sep 2024", status: "Active" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [plansPerPage, setPlansPerPage] = useState(5);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    value: "",
    deals: "",
    stage: "",
    date: dayjs().format("YYYY-MM-DD"),
    status: "Active",
  });

  let filtered = pipelines.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / plansPerPage);
  const indexOfLast = currentPage * plansPerPage;
  const indexOfFirst = indexOfLast - plansPerPage;
  const currentPlans = filtered.slice(indexOfFirst, indexOfLast);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(pipelines);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pipelines");
    XLSX.writeFile(wb, "pipelines.xlsx");
    toast.success("Excel Exported!");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setPipelines([...pipelines, formData]);
    toast.success("Pipeline Added!");
    setShowAddModal(false);

    setFormData({
      name: "",
      value: "",
      deals: "",
      stage: "",
      date: dayjs().format("YYYY-MM-DD"),
      status: "Active",
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updated = [...pipelines];
    updated[editIndex] = formData;
    setPipelines(updated);
    toast.info("Pipeline Updated!");
    setShowEditModal(false);
  };

  const handleDelete = () => {
    setPipelines(pipelines.filter((_, i) => i !== deleteIndex));
    toast.error("Pipeline Deleted!");
    setShowDeleteModal(false);
  };

  return (
    <div className="container-fluid p-3">
      <ToastContainer />

      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
        <div>
          <h4>Pipeline</h4>
          <p style={{ marginTop: "4px", color: "#555" }}>
            Track and manage your recruitment pipeline.
          </p>
        </div>

        {/* Export and Add Buttons - Same Row */}
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div className="me-2 mb-2">
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-primary d-flex align-items-center justify-content-center dropdown-toggle btn-responsive"
                data-bs-toggle="dropdown"
                style={{
                  padding: '8px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#007bff',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  minWidth: '140px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0056b3';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#007bff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaFileExcel className="me-2" /> Export
              </button>

              <ul className="dropdown-menu dropdown-menu-end p-3" style={{
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                border: '1px solid #e0e0e0',
                minWidth: '200px'
              }}>
                <li>
                  <a 
                    href="#" 
                    className="dropdown-item rounded-1 d-flex align-items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      handleExport();
                    }}
                    style={{
                      padding: '10px 15px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <FaFileExcel className="me-2" style={{ color: '#28a745' }} />
                    Export as Excel
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="dropdown-item rounded-1 d-flex align-items-center"
                    onClick={(e) => {
                      e.preventDefault();
                      // PDF export function can be added here
                      toast.info("PDF Export coming soon!");
                    }}
                    style={{
                      padding: '10px 15px',
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <FaFilePdf className="me-2" style={{ color: '#dc3545' }} />
                    Export as PDF
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mb-2">
            <button 
              type="button" 
              className="btn d-flex align-items-center justify-content-center" 
              onClick={() => setShowAddModal(true)}
              style={{ 
                padding: '8px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                minWidth: '140px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2c5a68';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2c5a68';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaPlusCircle className="me-2" /> Add Pipeline
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search pipeline..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Deals</th>
              <th>Stage</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentPlans.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.value}</td>
                <td>{p.deals}</td>

                <td>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1" style={{ height: "6px" }}>
                      <div className={`progress-bar bg-${p.stageColor}`} style={{ width: "100%" }}></div>
                    </div>
                    <span className="ms-2 small">{p.stage}</span>
                  </div>
                </td>

                <td>{p.date}</td>

                <td>
                  <span className={`badge ${p.status === "Active" ? "bg-success" : "bg-danger"}`}>
                    {p.status}
                  </span>
                </td>

                {/* RESPONSIVE ACTION BUTTONS */}
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2 action-buttons">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setEditIndex(indexOfFirst + i);
                        setFormData(pipelines[indexOfFirst + i]);
                        setShowEditModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setDeleteIndex(indexOfFirst + i);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
        <div>
          Rows:
          <select
            className="form-select d-inline-block ms-2"
            style={{ width: "80px" }}
            value={plansPerPage}
            onChange={(e) => setPlansPerPage(Number(e.target.value))}
          >
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>

        <div>
          Showing {indexOfFirst + 1}-{Math.min(indexOfLast, filtered.length)} of {filtered.length}
        </div>

        <ul className="pagination pagination-sm mb-0">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
              Prev
            </button>
          </li>

          {[...Array(totalPages)].map((_, n) => (
            <li className={`page-item ${currentPage === n + 1 && "active"}`} key={n}>
              <button className="page-link" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <Modal
          type="Add"
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAdd}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal
          type="Edit"
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEdit}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div className="modal-backdrop show"></div>

          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Delete Pipeline</h5>
                  <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                </div>

                <div className="modal-body">Are you sure you want to delete?</div>

                <div className="modal-footer">
                  <button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

/* ---------- REUSABLE MODAL ---------- */
const Modal = ({ type, formData, setFormData, onClose, onSubmit }) => {
  return (
    <>
      <div className="modal-backdrop show"></div>

      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h4> Pipeline</h4>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={onSubmit}>
              <div className="modal-body">
                <div className="mb-2">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label>Value</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  />
                </div>

                <div className="mb-2">
                  <label>Deals</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.deals}
                    onChange={(e) => setFormData({ ...formData, deals: e.target.value })}
                  />
                </div>

                <div className="mb-2">
                  <label>Stage</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  />
                </div>

                <div className="mb-2">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="mb-2">
                  <label>Status</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {type === "Add" ? "Add" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pipeline;