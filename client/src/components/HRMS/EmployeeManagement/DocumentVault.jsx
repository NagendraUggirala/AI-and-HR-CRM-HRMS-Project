import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

// Mock API functions for documents
const mockAPI = {
  fetchDocuments: async (filters) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      documents: [
        {
          id: 1,
          name: "Aadhaar Card",
          category: "KYC",
          employee: { id: 1, name: "John Doe" },
          uploadDate: "2025-10-10",
          expiryDate: "2030-10-10",
          status: "approved",
          version: "1.0",
          mandatory: true,
          fileType: "pdf",
          size: "2.4 MB",
          fileUrl: "https://example.com/documents/aadhaar.pdf"
        },
        {
          id: 2,
          name: "Graduation Certificate",
          category: "Educational",
          employee: { id: 2, name: "Jane Smith" },
          uploadDate: "2025-10-05",
          expiryDate: null,
          status: "pending",
          version: "1.0",
          mandatory: true,
          fileType: "pdf",
          size: "1.8 MB",
          fileUrl: "https://example.com/documents/graduation.pdf"
        },
        {
          id: 3,
          name: "Employment Contract",
          category: "Employment",
          employee: { id: 3, name: "Mike Johnson" },
          uploadDate: "2025-10-01",
          expiryDate: "2026-10-01",
          status: "approved",
          version: "2.1",
          mandatory: true,
          fileType: "docx",
          size: "3.2 MB",
          fileUrl: "https://example.com/documents/contract.docx"
        },
        {
          id: 4,
          name: "PAN Card",
          category: "KYC",
          employee: { id: 4, name: "Sarah Williams" },
          uploadDate: "2025-09-28",
          expiryDate: null,
          status: "expired",
          version: "1.0",
          mandatory: true,
          fileType: "jpg",
          size: "1.5 MB",
          fileUrl: "https://example.com/documents/pan.jpg"
        },
        {
          id: 5,
          name: "Bank Account Proof",
          category: "Statutory",
          employee: { id: 1, name: "John Doe" },
          uploadDate: "2025-09-25",
          expiryDate: "2026-09-25",
          status: "approved",
          version: "1.0",
          mandatory: true,
          fileType: "pdf",
          size: "1.1 MB",
          fileUrl: "https://example.com/documents/bank.pdf"
        },
        {
          id: 6,
          name: "NDA Agreement",
          category: "Miscellaneous",
          employee: { id: 2, name: "Jane Smith" },
          uploadDate: "2025-09-20",
          expiryDate: null,
          status: "pending",
          version: "1.0",
          mandatory: false,
          fileType: "pdf",
          size: "2.0 MB",
          fileUrl: "https://example.com/documents/nda.pdf"
        }
      ],
      total: 6,
      page: 1,
      pageSize: 10
    };
  },
  createDocument: async (documentData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { 
      ...documentData, 
      id: Date.now(), 
      uploadDate: new Date().toISOString().split('T')[0],
      version: "1.0",
      fileUrl: "https://example.com/documents/new-document.pdf"
    };
  },
  updateDocument: async (id, documentData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...documentData, id };
  },
  deleteDocument: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

const Documentvault = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadFile, setUploadFile] = useState(null);

  const [documentForm, setDocumentForm] = useState({
    name: '',
    category: 'KYC',
    employee: '',
    expiryDate: '',
    status: 'pending',
    mandatory: false,
    fileType: 'pdf'
  });

  const categories = ['all', 'KYC', 'Educational', 'Employment', 'Statutory', 'Miscellaneous'];
  const statuses = ['all', 'approved', 'pending', 'expired', 'rejected'];
  const fileTypes = ['pdf', 'docx', 'jpg', 'jpeg', 'png'];

  useEffect(() => {
    loadDocuments();
  }, [filterCategory, filterStatus, currentPage]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.fetchDocuments({ 
        category: filterCategory, 
        status: filterStatus, 
        page: currentPage 
      });
      setDocuments(data.documents);
    } catch (error) {
      showNotification('Failed to load documents', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateDocument = async () => {
    if (!documentForm.name || !documentForm.employee || !uploadFile) {
      showNotification('Please fill in all required fields and select a file', 'error');
      return;
    }

    try {
      const newDocument = await mockAPI.createDocument({
        ...documentForm,
        employee: { id: Date.now(), name: documentForm.employee },
        size: `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: uploadFile.name.split('.').pop().toLowerCase()
      });
      setDocuments([newDocument, ...documents]);
      setShowDocumentModal(false);
      resetForm();
      setUploadFile(null);
      showNotification('Document uploaded successfully');
    } catch (error) {
      showNotification('Failed to upload document', 'error');
    }
  };

  const handleUpdateDocument = async () => {
    try {
      const updatedDocument = await mockAPI.updateDocument(selectedDocument.id, {
        ...selectedDocument,
        ...documentForm,
        employee: { ...selectedDocument.employee, name: documentForm.employee }
      });
      setDocuments(documents.map(d => d.id === selectedDocument.id ? updatedDocument : d));
      setShowDocumentModal(false);
      setSelectedDocument(null);
      resetForm();
      setUploadFile(null);
      showNotification('Document updated successfully');
    } catch (error) {
      showNotification('Failed to update document', 'error');
    }
  };

  const handleDeleteDocument = async () => {
    try {
      await mockAPI.deleteDocument(selectedDocument.id);
      setDocuments(documents.filter(d => d.id !== selectedDocument.id));
      setShowDeleteModal(false);
      setSelectedDocument(null);
      showNotification('Document deleted successfully');
    } catch (error) {
      showNotification('Failed to delete document', 'error');
    }
  };

  const handleDownloadDocument = (doc) => {
    // Create a temporary anchor element for download
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = `${doc.name}.${doc.fileType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification(`Downloading ${doc.name}`);
  };

  const handleViewHistory = (doc) => {
    showNotification(`Viewing history for ${doc.name}`, 'info');
  };

  const handleBulkUpload = async (files) => {
    try {
      // Simulate bulk upload
      const newDocuments = Array.from(files).map((file, index) => ({
        id: documents.length + index + 1,
        name: file.name,
        category: 'Miscellaneous',
        employee: { id: 999, name: 'Bulk Upload' },
        uploadDate: new Date().toISOString().split('T')[0],
        expiryDate: null,
        status: 'pending',
        version: '1.0',
        mandatory: false,
        fileType: file.name.split('.').pop(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        fileUrl: 'https://example.com/documents/bulk-upload.pdf'
      }));
      
      setDocuments([...newDocuments, ...documents]);
      showNotification(`${files.length} document(s) uploaded successfully`);
    } catch (error) {
      showNotification('Failed to upload documents', 'error');
    }
  };

  const handleBulkDownload = () => {
    if (selectedDocuments.length === 0) {
      showNotification('Please select documents to download', 'error');
      return;
    }

    // Download each selected document
    selectedDocuments.forEach(docId => {
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        handleDownloadDocument(doc);
      }
    });
    
    showNotification(`Downloading ${selectedDocuments.length} document(s)`);
  };

  const handleBulkApprove = () => {
    if (selectedDocuments.length === 0) {
      showNotification('Please select documents to approve', 'error');
      return;
    }

    const updatedDocuments = documents.map(doc => 
      selectedDocuments.includes(doc.id) 
        ? { ...doc, status: 'approved' }
        : doc
    );
    setDocuments(updatedDocuments);
    showNotification(`${selectedDocuments.length} document(s) approved`);
    setSelectedDocuments([]);
  };

  const handleBulkDelete = () => {
    if (selectedDocuments.length === 0) {
      showNotification('Please select documents to delete', 'error');
      return;
    }

    const updatedDocuments = documents.filter(doc => !selectedDocuments.includes(doc.id));
    setDocuments(updatedDocuments);
    setSelectedDocuments([]);
    showNotification(`${selectedDocuments.length} document(s) deleted`);
  };

  const openEditModal = (document) => {
    setSelectedDocument(document);
    setDocumentForm({
      name: document.name,
      category: document.category,
      employee: document.employee.name,
      expiryDate: document.expiryDate || '',
      status: document.status,
      mandatory: document.mandatory,
      fileType: document.fileType
    });
    setShowDocumentModal(true);
  };

  const resetForm = () => {
    setDocumentForm({
      name: '',
      category: 'KYC',
      employee: '',
      expiryDate: '',
      status: 'pending',
      mandatory: false,
      fileType: 'pdf'
    });
    setUploadFile(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-success-subtle text-success',
      pending: 'bg-warning-subtle text-warning',
      expired: 'bg-danger-subtle text-danger',
      rejected: 'bg-dark-subtle text-dark'
    };
    const icons = {
      approved: 'heroicons:check-circle',
      pending: 'heroicons:clock',
      expired: 'heroicons:exclamation-circle',
      rejected: 'heroicons:x-circle'
    };
    return (
      <span className={`badge d-flex align-items-center ${styles[status]}`}>
        <Icon icon={icons[status]} className="me-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getCategoryBadge = (category) => {
    const styles = {
      KYC: 'bg-primary-subtle text-primary',
      Educational: 'bg-info-subtle text-info',
      Employment: 'bg-purple-subtle text-primary',
      Statutory: 'bg-orange-subtle text-info',
      Miscellaneous: 'bg-secondary-subtle text-secondary'
    };
    return (
      <span className={`badge ${styles[category]}`}>
        {category}
      </span>
    );
  };

  const getFileIcon = (fileType) => {
    const icons = {
      pdf: 'heroicons:document-text',
      docx: 'heroicons:document',
      jpg: 'heroicons:photo',
      jpeg: 'heroicons:photo',
      png: 'heroicons:photo'
    };
    return icons[fileType] || 'heroicons:document';
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectDocument = (docId) => {
    setSelectedDocuments(prev =>
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(d => d.id));
    }
  };

  const stats = {
    total: documents.length,
    approved: documents.filter(d => d.status === 'approved').length,
    pending: documents.filter(d => d.status === 'pending').length,
    expiring: documents.filter(d => isExpiringSoon(d.expiryDate)).length,
    expired: documents.filter(d => isExpired(d.expiryDate)).length
  };

  return (
    
      <div className="container-fluid">
        {/* Notification */}
        {notification && (
          <div className={`position-fixed top-0 end-0 m-3 z-50 alert alert-${notification.type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`} role="alert">
            {notification.message}
            <button type="button" className="btn-close" onClick={() => setNotification(null)}></button>
          </div>
        )}

        {/* Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="text-3xl fw-bold text-dark mb-2 mt-3 d-flex align-items-center gap-2">
                <Icon icon="heroicons:folder" />
                Document Vault
              </h5>
              <p className="text-muted">Centralized document repository with version control</p>
            </div>
            <div className="d-flex gap-2">
              <label className="btn btn-secondary d-flex align-items-center gap-2">
                <Icon icon="heroicons:arrow-up-tray" className="me-1" />
                Bulk Upload
                <input
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => handleBulkUpload(e.target.files)}
                />
              </label>
              <button
                onClick={() => {
                  setSelectedDocument(null);
                  resetForm();
                  setShowDocumentModal(true);
                }}
                className="btn btn-primary d-flex align-items-center gap-2"
              >
                <Icon icon="heroicons:plus" className="me-1" />
                Upload Document
              </button>
            </div>
          </div>

          {/* Stats Cards */}
       <div className="row g-3 mb-4">
  <div className="col-md-3">
    <div className="card border h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <div className="avatar-sm bg-primary-subtle rounded d-flex align-items-center justify-content-center">
              <span className="avatar-title text-primary">
                <Icon icon="heroicons:folder" width="24" height="24" />
              </span>
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <h4 className="mb-1">{stats.total}</h4>
            <p className="text-muted mb-0">Total Documents</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-md-3">
    <div className="card border h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <div className="avatar-sm bg-success-subtle rounded d-flex align-items-center justify-content-center">
              <span className="avatar-title text-success">
                <Icon icon="heroicons:check-circle" width="24" height="24" />
              </span>
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <h4 className="mb-1">{stats.approved}</h4>
            <p className="text-muted mb-0">Approved</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-md-3">
    <div className="card border h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <div className="avatar-sm bg-warning-subtle rounded d-flex align-items-center justify-content-center">
              <span className="avatar-title text-warning">
                <Icon icon="heroicons:clock" width="24" height="24" />
              </span>
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <h4 className="mb-1">{stats.pending}</h4>
            <p className="text-muted mb-0">Pending Review</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-md-3">
    <div className="card border h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="flex-shrink-0">
            <div className="avatar-sm bg-danger-subtle rounded d-flex align-items-center justify-content-center">
              <span className="avatar-title text-danger">
                <Icon icon="heroicons:exclamation-triangle" width="24" height="24" />
              </span>
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <h4 className="mb-1">{stats.expiring}</h4>
            <p className="text-muted mb-0">Expiring Soon</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          {/* Search & Filter Bar */}
          <div className="d-flex flex-column flex-md-row gap-3 mb-4">
            <div className="position-relative flex-fill">
              <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
              <input
                type="text"
                placeholder="Search by document name or employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control ps-5"
              />
            </div>
            <div className="d-flex gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="form-select"
                style={{ minWidth: '150px' }}
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select"
                style={{ minWidth: '150px' }}
              >
                <option value="all">All Status</option>
                {statuses.filter(s => s !== 'all').map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
             
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedDocuments.length > 0 && (
            <div className="alert alert-info d-flex align-items-center justify-content-between mb-4">
              <span className="fw-medium">
                {selectedDocuments.length} document(s) selected
              </span>
              <div className="d-flex gap-2">
                <button 
                  onClick={handleBulkApprove}
                  className="btn btn-sm btn-outline-primary"
                >
                  Approve
                </button>
                <button 
                  onClick={handleBulkDownload}
                  className="btn btn-sm btn-outline-primary"
                >
                  Download
                </button>
                <button 
                  onClick={handleBulkDelete}
                  className="btn btn-sm btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Expiring Documents Alert */}
          {stats.expiring > 0 && (
            <div className="alert alert-warning alert-dismissible fade show mb-4" role="alert">
              <div className="d-flex align-items-center">
                <Icon icon="heroicons:exclamation-triangle" className="me-2 fs-5" />
                <div>
                  <strong>Warning:</strong> {stats.expiring} document(s) are expiring within 30 days.
                </div>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
            </div>
          )}
        </div>

        {/* Documents Table */}
        <div className="card border shadow-none">
          <div className="card-body p-0">
            {loading ? (
              <div className="d-flex align-items-center justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-light">
                    <tr>
                     
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Document</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Category</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Employee</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Upload Date</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Expiry Date</th>
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Status</th>
              
                      <th className="border-0 px-4 py-3 text-uppercase fw-bold text-dark">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => (
                      <tr
                        key={doc.id}
                        className={`${isExpired(doc.expiryDate) ? 'bg-danger-subtle' : ''} ${isExpiringSoon(doc.expiryDate) ? 'bg-warning-subtle' : ''}`}
                      >
                      
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-2">
                            <Icon icon={getFileIcon(doc.fileType)} className="text-primary fs-5" />
                            <div>
                              <div className="fw-medium text-dark d-flex align-items-center ">
                                {doc.name}
                              
                              </div>
                              <div className="text-muted small mt-1">
                                {doc.fileType.toUpperCase()} • {doc.size}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {getCategoryBadge(doc.category)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-dark">{doc.employee.name}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-2">
                            <Icon icon="heroicons:calendar" className="text-muted" />
                            <span className="text-dark">
                              {new Date(doc.uploadDate).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-2">
                            <Icon icon="heroicons:calendar-days" className="text-muted" />
                            <span className={`${isExpired(doc.expiryDate) ? 'text-danger fw-medium' : 'text-dark'}`}>
                              {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : 'No Expiry'}
                              {isExpiringSoon(doc.expiryDate) && !isExpired(doc.expiryDate) && (
                                <Icon icon="heroicons:exclamation-triangle" className="ms-2 text-warning" />
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {getStatusBadge(doc.status)}
                        </td>
                       
                        <td className="px-4 py-3">
                          <div className="d-flex align-items-center gap-2">
                            <button
                              onClick={() => openEditModal(doc)}
                              className="btn btn-sm btn-outline-primary"
                              title="Edit"
                            >
                              <Icon icon="heroicons:pencil" />
                            </button>
                            <button
                              onClick={() => handleDownloadDocument(doc)}
                              className="btn btn-sm btn-outline-primary"
                              title="Download"
                            >
                              <Icon icon="heroicons:arrow-down-tray" />
                            </button>
                            
                            <button
                              onClick={() => {
                                setSelectedDocument(doc);
                                setShowDeleteModal(true);
                              }}
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                            >
                              <Icon icon="heroicons:trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {filteredDocuments.length === 0 && !loading && (
              <div className="text-center py-5 text-muted">
                <Icon icon="heroicons:folder-open" className="fs-1 text-muted mb-3" />
                <p className="mb-0">No documents found</p>
              </div>
            )}
          </div>
        </div>
      

      {/* Create/Edit Document Modal */}
      {showDocumentModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedDocument ? 'Edit Document' : 'Upload New Document'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDocumentModal(false);
                    setSelectedDocument(null);
                    resetForm();
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Document Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={documentForm.name}
                      onChange={(e) => setDocumentForm({ ...documentForm, name: e.target.value })}
                      className="form-control"
                      placeholder="Enter document name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Category <span className="text-danger">*</span>
                    </label>
                    <select
                      value={documentForm.category}
                      onChange={(e) => setDocumentForm({ ...documentForm, category: e.target.value })}
                      className="form-select"
                    >
                      {categories.filter(c => c !== 'all').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      File Type
                    </label>
                    <select
                      value={documentForm.fileType}
                      onChange={(e) => setDocumentForm({ ...documentForm, fileType: e.target.value })}
                      className="form-select"
                    >
                      {fileTypes.map(type => (
                        <option key={type} value={type}>{type.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Employee <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={documentForm.employee}
                      onChange={(e) => setDocumentForm({ ...documentForm, employee: e.target.value })}
                      className="form-control"
                      placeholder="Employee name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={documentForm.expiryDate}
                      onChange={(e) => setDocumentForm({ ...documentForm, expiryDate: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                      value={documentForm.status}
                      onChange={(e) => setDocumentForm({ ...documentForm, status: e.target.value })}
                      className="form-select"
                    >
                      {statuses.filter(s => s !== 'all').map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        checked={documentForm.mandatory}
                        onChange={(e) => setDocumentForm({ ...documentForm, mandatory: e.target.checked })}
                        className="form-check-input"
                      />
                      Mandatory Document
                    </label>
                  </div>
                  {!selectedDocument && (
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Upload File <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => setUploadFile(e.target.files[0])}
                      />
                      {uploadFile && (
                        <div className="mt-2 text-muted small">
                          Selected: {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setShowDocumentModal(false);
                    setSelectedDocument(null);
                    resetForm();
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={selectedDocument ? handleUpdateDocument : handleCreateDocument}
                  className="btn btn-primary"
                >
                  {selectedDocument ? 'Update Document' : 'Upload Document'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Document</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedDocument(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  Are you sure you want to delete "{selectedDocument?.name}"? This action cannot be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedDocument(null);
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDocument}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documentvault;