import React, { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { 
  Search, 
  Plus, 
  X, 
  Send, 
  Eye, 
  FileText, 
  Trash2, 
  Download, 
  Bell, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Mail,
  Shield,
  Lock,
  RefreshCw,
  Upload,
  AlertCircle,
  BanknoteIcon,
  TrendingUp,
  CreditCard,
  FileCheck
} from 'lucide-react';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const BankTransfer = () => {
  const [showGeneratePanel, setShowGeneratePanel] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [paymentType, setPaymentType] = useState('NEFT');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [splitByBank, setSplitByBank] = useState(true);
  const [bankFilter, setBankFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showReconciliationPanel, setShowReconciliationPanel] = useState(false);
  const [reconciliationData, setReconciliationData] = useState([]);

  // Mock data
  const banks = [
    { id: 1, name: 'State Bank of India', code: 'SBI001' },
    { id: 2, name: 'HDFC Bank', code: 'HDFC002' },
    { id: 3, name: 'ICICI Bank', code: 'ICICI003' },
    { id: 4, name: 'Axis Bank', code: 'AXIS004' },
    { id: 5, name: 'Kotak Mahindra Bank', code: 'KOTAK005' },
    { id: 6, name: 'Punjab National Bank', code: 'PNB006' }
  ];

  const paymentTypes = [
    { id: 'NEFT', name: 'NEFT', description: 'Next day settlement' },
    { id: 'RTGS', name: 'RTGS', description: 'Real-time gross settlement' },
    { id: 'IMPS', name: 'IMPS', description: 'Immediate payment service' }
  ];

  const [payments, setPayments] = useState([
    {
      id: 1,
      fileName: 'SALARY_OCT_2024_SBI',
      bank: 'State Bank of India',
      paymentType: 'NEFT',
      status: 'Processed',
      totalAmount: '₹1,25,00,000',
      totalEmployees: 85,
      generatedDate: '25 Oct 2024',
      processedDate: '26 Oct 2024',
      encrypted: true,
      splitByBank: true,
      acknowledgment: 'Uploaded',
      failedTransactions: 0,
      paymentMethod: 'Bulk Transfer'
    },
    {
      id: 2,
      fileName: 'SALARY_OCT_2024_HDFC',
      bank: 'HDFC Bank',
      paymentType: 'RTGS',
      status: 'In Progress',
      totalAmount: '₹75,00,000',
      totalEmployees: 42,
      generatedDate: '25 Oct 2024',
      processedDate: 'Pending',
      encrypted: true,
      splitByBank: true,
      acknowledgment: 'Pending',
      failedTransactions: 2,
      paymentMethod: 'Bulk Transfer'
    },
    {
      id: 3,
      fileName: 'SALARY_OCT_2024_ICICI',
      bank: 'ICICI Bank',
      paymentType: 'NEFT',
      status: 'Generated',
      totalAmount: '₹50,00,000',
      totalEmployees: 28,
      generatedDate: '25 Oct 2024',
      processedDate: 'Pending',
      encrypted: true,
      splitByBank: true,
      acknowledgment: 'Pending',
      failedTransactions: 0,
      paymentMethod: 'Bulk Transfer'
    },
    {
      id: 4,
      fileName: 'BONUS_OCT_2024_ALL',
      bank: 'All Banks',
      paymentType: 'IMPS',
      status: 'Failed',
      totalAmount: '₹15,00,000',
      totalEmployees: 35,
      generatedDate: '20 Oct 2024',
      processedDate: '20 Oct 2024',
      encrypted: false,
      splitByBank: false,
      acknowledgment: 'Uploaded',
      failedTransactions: 5,
      paymentMethod: 'Bonus Payment'
    },
    {
      id: 5,
      fileName: 'SALARY_SEP_2024_ALL',
      bank: 'All Banks',
      paymentType: 'NEFT',
      status: 'Processed',
      totalAmount: '₹1,10,00,000',
      totalEmployees: 80,
      generatedDate: '25 Sep 2024',
      processedDate: '26 Sep 2024',
      encrypted: true,
      splitByBank: true,
      acknowledgment: 'Uploaded',
      failedTransactions: 1,
      paymentMethod: 'Bulk Transfer'
    }
  ]);

  const pendingPayments = [
    { id: 1, employeeName: 'Rahul Sharma', amount: '₹85,000', bank: 'SBI', accountNumber: 'XXXX-XXXX-1234', daysPending: 2, reason: 'Insufficient balance' },
    { id: 2, employeeName: 'Priya Singh', amount: '₹62,000', bank: 'HDFC', accountNumber: 'XXXX-XXXX-5678', daysPending: 1, reason: 'Account validation failed' },
    { id: 3, employeeName: 'Amit Kumar', amount: '₹95,000', bank: 'ICICI', accountNumber: 'XXXX-XXXX-9012', daysPending: 3, reason: 'Bank server error' }
  ];

  const reconciliationStats = {
    totalAmount: '₹2,85,00,000',
    matchedTransactions: 155,
    unmatchedTransactions: 3,
    pendingVerification: 2,
    lastReconciliation: '25 Oct 2024'
  };

  // Sidebar content for Bank Transfer
  const sidebarContent = (
    <nav className="space-y-1 p-3">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Bank Transfer
      </div>
      
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:banknotes" className="mr-3 h-5 w-5" />
        All Payments
      </button>
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:document-plus" className="mr-3 h-5 w-5" />
        New Payment File
      </button>
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:shield-check" className="mr-3 h-5 w-5" />
        Reconciliation
      </button>
      <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
        <Icon icon="heroicons:chart-bar" className="mr-3 h-5 w-5" />
        Reports
      </button>
      
      <div className="pt-4 border-t border-gray-200 mt-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Stats
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Processed:</span>
            <span className="font-semibold text-success">₹2.85Cr</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending:</span>
            <span className="font-semibold text-warning">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Failed:</span>
            <span className="font-semibold text-danger">7</span>
          </div>
        </div>
      </div>
    </nav>
  );

  const getStatusBadge = (status) => {
    const styles = {
      Generated: 'bg-primary-subtle text-primary border-primary-subtle',
      'In Progress': 'bg-warning-subtle text-warning border-warning-subtle',
      Processed: 'bg-success-subtle text-success border-success-subtle',
      Failed: 'bg-danger-subtle text-danger border-danger-subtle',
      'Partially Processed': 'bg-info-subtle text-info border-info-subtle'
    };
    
    const icons = {
      Generated: <FileText size={12} />,
      'In Progress': <Clock size={12} />,
      Processed: <CheckCircle size={12} />,
      Failed: <XCircle size={12} />,
      'Partially Processed': <AlertCircle size={12} />
    };

    return (
      <span className={`badge border d-inline-flex align-items-center gap-1 ${styles[status]}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  const getBankBadge = (bank) => {
    const bankColors = {
      'State Bank of India': 'bg-info-subtle text-info',
      'HDFC Bank': 'bg-primary-subtle text-primary',
      'ICICI Bank': 'bg-success-subtle text-success',
      'Axis Bank': 'bg-warning-subtle text-warning',
      'Kotak Mahindra Bank': 'bg-danger-subtle text-danger',
      'Punjab National Bank': 'bg-secondary-subtle text-secondary',
      'All Banks': 'bg-dark-subtle text-dark'
    };

    return (
      <span className={`badge ${bankColors[bank] || 'bg-light text-dark'}`}>
        {bank}
      </span>
    );
  };

  const handleGenerateFile = () => {
    if (!selectedBank) {
      alert('Please select a bank');
      return;
    }

    const bankInfo = banks.find(b => b.id === parseInt(selectedBank));
    const newPayment = {
      id: payments.length + 1,
      fileName: `SALARY_${new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}_${bankInfo.code}`,
      bank: bankInfo.name,
      paymentType: paymentType,
      status: 'Generated',
      totalAmount: '₹0',
      totalEmployees: 0,
      generatedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      processedDate: 'Pending',
      encrypted: encryptionEnabled,
      splitByBank: splitByBank,
      acknowledgment: 'Pending',
      failedTransactions: 0,
      paymentMethod: 'Bulk Transfer'
    };

    setPayments([newPayment, ...payments]);
    setShowConfirmModal(false);
    setShowGeneratePanel(false);
    setSelectedBank('');
    setPaymentType('NEFT');
    
    alert(`Payment file generated for ${bankInfo.name} (${paymentType})`);
  };

  const handleExportReport = () => {
    const csvContent = [
      ['File Name', 'Bank', 'Payment Type', 'Status', 'Total Amount', 'Employees', 'Generated Date', 'Processed Date', 'Encrypted', 'Failed Transactions'],
      ...payments.map(payment => [
        payment.fileName,
        payment.bank,
        payment.paymentType,
        payment.status,
        payment.totalAmount,
        payment.totalEmployees,
        payment.generatedDate,
        payment.processedDate,
        payment.encrypted ? 'Yes' : 'No',
        payment.failedTransactions
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payment-processing-report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert('Report exported successfully!');
  };

  const handleUploadAcknowledgement = () => {
    if (!uploadFile) {
      alert('Please select a file to upload');
      return;
    }

    // Simulate file upload
    setTimeout(() => {
      if (selectedPayment) {
        setPayments(payments.map(payment => 
          payment.id === selectedPayment.id 
            ? { ...payment, acknowledgment: 'Uploaded', status: 'Processed', processedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
            : payment
        ));
        
        setSelectedPayment({
          ...selectedPayment,
          acknowledgment: 'Uploaded',
          status: 'Processed',
          processedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        });
      }
      
      setUploadFile(null);
      setShowUploadModal(false);
      alert('Acknowledgement file uploaded successfully!');
    }, 1000);
  };

  const handleRetryFailed = (paymentId) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, status: 'In Progress', failedTransactions: 0 }
        : payment
    ));
    
    if (selectedPayment?.id === paymentId) {
      setSelectedPayment({
        ...selectedPayment,
        status: 'In Progress',
        failedTransactions: 0
      });
    }
    
    alert('Retrying failed transactions...');
  };

  const handleReconcile = () => {
    // Simulate reconciliation process
    setTimeout(() => {
      const newReconciliationData = [
        { id: 1, transactionId: 'TXN001', amount: '₹45,000', status: 'Matched', date: '25 Oct 2024' },
        { id: 2, transactionId: 'TXN002', amount: '₹38,000', status: 'Matched', date: '25 Oct 2024' },
        { id: 3, transactionId: 'TXN003', amount: '₹52,000', status: 'Unmatched', date: '25 Oct 2024' },
        { id: 4, transactionId: 'TXN004', amount: '₹67,000', status: 'Pending', date: '25 Oct 2024' }
      ];
      
      setReconciliationData(newReconciliationData);
      setShowReconciliationPanel(true);
      alert('Bank reconciliation completed!');
    }, 1500);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.bank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBank = bankFilter === 'All' || payment.bank === bankFilter;
    const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
    
    return matchesSearch && matchesBank && matchesStatus;
  });

  const PaymentStatusTracker = ({ status }) => {
    const steps = ['Generated', 'Encrypted', 'Sent to Bank', 'Processed'];
    const currentIndex = steps.indexOf(status === 'In Progress' ? 'Sent to Bank' : 
                                      status === 'Processed' ? 'Processed' : 
                                      status === 'Failed' ? 'Failed' : 'Generated');

    return (
      <div className="d-flex align-items-center gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="d-flex flex-column align-items-center">
              <div className={`rounded-circle d-flex align-items-center justify-content-center border border-2 ${
                index <= currentIndex ? 'bg-success border-success text-white' : 
                'bg-white border-secondary text-muted'
              }`} style={{width: '32px', height: '32px'}}>
                {step === 'Generated' ? <FileText size={16} /> :
                 step === 'Encrypted' ? <Lock size={16} /> :
                 step === 'Sent to Bank' ? <Send size={16} /> :
                 <CheckCircle size={16} />}
              </div>
              <span className="small mt-1 text-muted">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`border-top border-2 ${
                index < currentIndex ? 'border-success' : 'border-secondary'
              }`} style={{width: '48px'}} />
            )}
          </React.Fragment>
        ))}
        {status === 'Failed' && (
          <>
            <div className="border-top border-2 border-danger" style={{width: '48px'}} />
            <div className="d-flex flex-column align-items-center">
              <div className="rounded-circle d-flex align-items-center justify-content-center border border-2 bg-danger border-danger text-white" style={{width: '32px', height: '32px'}}>
                <XCircle size={16} />
              </div>
              <span className="small mt-1 text-muted">Failed</span>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    
      <div className="container-fluid">
        {/* Header */}
        <div className="card border shadow-none mb-4 mt-3">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h5 className="mb-1">
                  <Icon icon="heroicons:banknotes" /> Bank Transfer & Payment Processing
                </h5>
                <p className="text-muted small mb-0">Generate, track, and reconcile payment files for salary disbursement</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowGeneratePanel(true)}
              >
                <Plus size={16} className="me-2" />
                Generate Payment File
              </button>
            </div>
            
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by file name, bank, or payment type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={bankFilter}
                  onChange={(e) => setBankFilter(e.target.value)}
                >
                  <option value="All">All Banks</option>
                  {banks.map(bank => (
                    <option key={bank.id} value={bank.name}>{bank.name}</option>
                  ))}
                  <option value="All Banks">All Banks</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Generated">Generated</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Processed">Processed</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Statistics */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="w-48-px h-48-px bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center">
                      <BanknoteIcon size={20} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Total Processed</h6>
                    <div className="fw-bold fs-4">₹2.85Cr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="w-48-px h-48-px bg-success-subtle rounded-circle d-flex align-items-center justify-content-center">
                      <CheckCircle size={20} className="text-success" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Successful</h6>
                    <div className="fw-bold fs-4">158</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="w-48-px h-48-px bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center">
                      <AlertCircle size={20} className="text-warning" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Pending</h6>
                    <div className="fw-bold fs-4">3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border shadow-none">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="w-48-px h-48-px bg-danger-subtle rounded-circle d-flex align-items-center justify-content-center">
                      <XCircle size={20} className="text-danger" />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-muted mb-1">Failed</h6>
                    <div className="fw-bold fs-4">7</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="card border shadow-none mb-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-4 py-3 text-start">File Name</th>
                    <th className="px-4 py-3 text-start">Bank</th>
                    <th className="px-4 py-3 text-start">Payment Type</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-center">Total Amount</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-4 py-3 text-start">
                        <div className="fw-medium">{payment.fileName}</div>
                        <div className="small text-muted d-flex align-items-center gap-1">
                          <Clock size={12} />
                          {payment.generatedDate}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        {getBankBadge(payment.bank)}
                      </td>
                      <td className="px-4 py-3 text-start">
                        <div className="text-muted small">{payment.paymentType}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="fw-bold text-primary">{payment.totalAmount}</div>
                        <div className="small text-muted">{payment.totalEmployees} employees</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => {
                              setSelectedPayment(payment);
                              setShowDetailModal(true);
                            }}
                            title="View Details"
                          >
                            <Eye size={14} />
                          </button>
                          {payment.status === 'Failed' && (
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleRetryFailed(payment.id)}
                              title="Retry Failed"
                            >
                              <RefreshCw size={14} />
                            </button>
                          )}
                          {payment.status === 'Processed' && (
                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() => {
                                setSelectedPayment(payment);
                                setShowUploadModal(true);
                              }}
                              title="Upload Acknowledgement"
                            >
                              <Upload size={14} />
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this payment record?')) {
                                setPayments(payments.filter(p => p.id !== payment.id));
                              }
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions & Pending Payments */}
        <div className="row g-4">
          <div className="col-md-8">
            <div className="card border shadow-none">
              <div className="card-header bg-transparent border-0">
                <h6 className="mb-0">Quick Actions</h6>
              </div>
              <div className="card-body">
                <div className="d-flex flex-wrap gap-3">
                  <button 
                    className="btn btn-light border text-muted d-flex align-items-center gap-2"
                    onClick={handleExportReport}
                  >
                    <Download size={16} />
                    Export Report
                  </button>
                  <button 
                    className="btn btn-light border text-muted d-flex align-items-center gap-2"
                    onClick={handleReconcile}
                  >
                    <FileCheck size={16} />
                    Bank Reconciliation
                  </button>
                  <button 
                    className="btn btn-light border text-muted d-flex align-items-center gap-2"
                    onClick={() => alert('Payment file encryption settings')}
                  >
                    <Shield size={16} />
                    Security Settings
                  </button>
                  <button 
                    className="btn btn-light border text-muted d-flex align-items-center gap-2"
                    onClick={() => setShowReconciliationPanel(true)}
                  >
                    <TrendingUp size={16} />
                    View Reconciliation
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border shadow-none">
              <div className="card-header bg-transparent border-0">
                <h6 className="mb-0">Pending Payments</h6>
              </div>
              <div className="card-body p-0">
                <div className="list-group list-group-flush">
                  {pendingPayments.map(payment => (
                    <div key={payment.id} className="list-group-item border-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-medium small">{payment.employeeName}</div>
                          <div className="text-muted smaller">{payment.bank} • {payment.accountNumber}</div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold text-danger">{payment.amount}</div>
                          <div className="text-muted smaller">{payment.daysPending} days</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Payment File Panel */}
        {showGeneratePanel && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Generate Payment File</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowGeneratePanel(false);
                      setSelectedBank('');
                      setPaymentType('NEFT');
                      setEncryptionEnabled(true);
                      setSplitByBank(true);
                    }}
                  ></button>
                </div>

                <div className="modal-body">
                  {/* Bank Selector */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Select Bank</label>
                    <select
                      className="form-select"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      <option value="">Choose a bank...</option>
                      {banks.map(bank => (
                        <option key={bank.id} value={bank.id}>
                          {bank.name} ({bank.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Payment Type Selector */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Payment Type</label>
                    <div className="row g-3">
                      {paymentTypes.map(type => (
                        <div key={type.id} className="col-md-4">
                          <div 
                            className={`card border cursor-pointer ${paymentType === type.id ? 'border-primary' : ''}`}
                            onClick={() => setPaymentType(type.id)}
                            style={{ height: '100%' }}
                          >
                            <div className="card-body text-center">
                              <div className="mb-2">
                                <div className={`rounded-circle d-inline-flex align-items-center justify-content-center ${
                                  paymentType === type.id ? 'bg-primary' : 'bg-light'
                                }`} style={{width: '48px', height: '48px'}}>
                                  <CreditCard size={20} className={paymentType === type.id ? 'text-white' : 'text-muted'} />
                                </div>
                              </div>
                              <h6 className="fw-bold mb-1">{type.name}</h6>
                              <p className="small text-muted mb-0">{type.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Advanced Settings</label>
                    <div className="bg-light border rounded p-4">
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={encryptionEnabled}
                          onChange={(e) => setEncryptionEnabled(e.target.checked)}
                          id="encryptionCheck"
                        />
                        <label className="form-check-label" htmlFor="encryptionCheck">
                          Enable File Encryption
                        </label>
                        <div className="small text-muted">
                          Encrypt payment file for security
                        </div>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={splitByBank}
                          onChange={(e) => setSplitByBank(e.target.checked)}
                          id="splitCheck"
                        />
                        <label className="form-check-label" htmlFor="splitCheck">
                          Split Payment File by Bank
                        </label>
                        <div className="small text-muted">
                          Generate separate files for each bank
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* File Preview */}
                  {selectedBank && (
                    <div>
                      <label className="form-label fw-semibold">File Preview</label>
                      <div className="bg-light border rounded p-4">
                        <pre className="mb-0" style={{whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '12px'}}>
                          {`FILE TYPE: ${paymentType}
BANK: ${banks.find(b => b.id === parseInt(selectedBank))?.name}
ENCRYPTION: ${encryptionEnabled ? 'ENABLED' : 'DISABLED'}
SPLIT BY BANK: ${splitByBank ? 'YES' : 'NO'}
DATE: ${new Date().toLocaleDateString()}
HEADER: PAYMENT DETAILS
TRANSACTIONS: 0
TOTAL AMOUNT: ₹0`}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                <div className="modal-footer d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowGeneratePanel(false);
                      setSelectedBank('');
                      setPaymentType('NEFT');
                      setEncryptionEnabled(true);
                      setSplitByBank(true);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      if (!selectedBank) {
                        alert('Please select a bank');
                        return;
                      }
                      setShowConfirmModal(true);
                    }}
                    disabled={!selectedBank}
                  >
                    <FileText size={16} className="me-2" />
                    Generate File
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm File Generation</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowConfirmModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-3">
                    Are you sure you want to generate payment file for {banks.find(b => b.id === parseInt(selectedBank))?.name}?
                  </p>
                  <div className="bg-light rounded p-3 small">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Payment Type:</span>
                      <span className="fw-medium">{paymentType}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Encryption:</span>
                      <span className="fw-medium">{encryptionEnabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Split by Bank:</span>
                      <span className="fw-medium">{splitByBank ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleGenerateFile}
                  >
                    Generate File
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Details Modal */}
        {showDetailModal && selectedPayment && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Payment Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDetailModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  {/* Payment Info */}
                  <div className="mb-4">
                    <h6 className="small fw-semibold text-muted mb-2">Payment Information</h6>
                    <div className="bg-light rounded p-3">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="small text-muted">File Name:</span>
                            <span className="small fw-medium">{selectedPayment.fileName}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="small text-muted">Bank:</span>
                            <span className="small fw-medium">{selectedPayment.bank}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="small text-muted">Payment Type:</span>
                            <span className="small fw-medium">{selectedPayment.paymentType}</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="small text-muted">Total Amount:</span>
                            <span className="small fw-bold text-primary">{selectedPayment.totalAmount}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="small text-muted">Employees:</span>
                            <span className="small fw-medium">{selectedPayment.totalEmployees}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="small text-muted">Payment Method:</span>
                            <span className="small fw-medium">{selectedPayment.paymentMethod}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Tracker */}
                  <div className="mb-4">
                    <h6 className="small fw-semibold text-muted mb-2">Payment Progress</h6>
                    <div className="bg-light rounded p-4 d-flex justify-content-center">
                      <PaymentStatusTracker status={selectedPayment.status} />
                    </div>
                  </div>

                  {/* Payment History */}
                  <div>
                    <h6 className="small fw-semibold text-muted mb-2">Payment History</h6>
                    <div className="bg-light rounded p-3">
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '32px', height: '32px'}}>
                          <FileText size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="small fw-medium mb-0">File Generated</p>
                          <p className="small text-muted mb-0">{selectedPayment.generatedDate}</p>
                          <div className="small text-muted">
                            {selectedPayment.encrypted && <span className="d-inline-flex align-items-center gap-1"><Lock size={12} /> Encrypted</span>}
                            {selectedPayment.splitByBank && <span className="d-inline-flex align-items-center gap-1 ms-3"><RefreshCw size={12} /> Split by Bank</span>}
                          </div>
                        </div>
                      </div>
                      {selectedPayment.processedDate !== 'Pending' && (
                        <div className="d-flex align-items-start gap-3 mb-3">
                          <div className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '32px', height: '32px'}}>
                            <Send size={16} className="text-success" />
                          </div>
                          <div>
                            <p className="small fw-medium mb-0">Sent to Bank</p>
                            <p className="small text-muted mb-0">{selectedPayment.processedDate}</p>
                          </div>
                        </div>
                      )}
                      {selectedPayment.acknowledgment === 'Uploaded' && (
                        <div className="d-flex align-items-start gap-3">
                          <div className="rounded-circle bg-info-subtle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '32px', height: '32px'}}>
                            <Upload size={16} className="text-info" />
                          </div>
                          <div>
                            <p className="small fw-medium mb-0">Acknowledgement Uploaded</p>
                            <p className="small text-muted mb-0">Processed by bank</p>
                          </div>
                        </div>
                      )}
                      {selectedPayment.failedTransactions > 0 && (
                        <div className="d-flex align-items-start gap-3 mt-3">
                          <div className="rounded-circle bg-danger-subtle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '32px', height: '32px'}}>
                            <AlertCircle size={16} className="text-danger" />
                          </div>
                          <div>
                            <p className="small fw-medium mb-0">Failed Transactions</p>
                            <p className="small text-muted mb-0">{selectedPayment.failedTransactions} transactions failed</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="modal-footer d-flex justify-content-between">
                  <div>
                    {selectedPayment.status === 'Failed' && (
                      <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick={() => handleRetryFailed(selectedPayment.id)}
                      >
                        <RefreshCw size={14} className="me-2" />
                        Retry Failed
                      </button>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowDetailModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Acknowledgement Modal */}
        {showUploadModal && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Upload Bank Acknowledgement</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadFile(null);
                    }}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Select Acknowledgement File</label>
                    <div className="input-group">
                      <input
                        type="file"
                        className="form-control"
                        accept=".txt,.csv,.xml,.json"
                        onChange={(e) => setUploadFile(e.target.files[0])}
                      />
                    </div>
                    <div className="small text-muted mt-2">
                      Supported formats: TXT, CSV, XML, JSON (Bank-specific formats)
                    </div>
                  </div>

                  {uploadFile && (
                    <div className="alert alert-info">
                      <div className="d-flex align-items-center gap-2">
                        <FileText size={16} />
                        <div>
                          <strong>Selected file:</strong> {uploadFile.name}
                          <div className="small">Size: {(uploadFile.size / 1024).toFixed(2)} KB</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="alert alert-warning">
                    <AlertCircle size={16} className="me-2" />
                    <strong>Note:</strong> Uploading acknowledgement will mark the payment as processed and update transaction status.
                  </div>
                </div>

                <div className="modal-footer d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadFile(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUploadAcknowledgement}
                    disabled={!uploadFile}
                  >
                    <Upload size={16} className="me-2" />
                    Upload & Process
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reconciliation Panel */}
        {showReconciliationPanel && (
          <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Bank Statement Reconciliation</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowReconciliationPanel(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  {/* Reconciliation Stats */}
                  <div className="row g-4 mb-4">
                    <div className="col-md-3">
                      <div className="card border">
                        <div className="card-body text-center">
                          <div className="text-primary mb-2">
                            <BanknoteIcon size={24} />
                          </div>
                          <h4 className="fw-bold">{reconciliationStats.totalAmount}</h4>
                          <p className="text-muted small mb-0">Total Amount</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card border">
                        <div className="card-body text-center">
                          <div className="text-success mb-2">
                            <CheckCircle size={24} />
                          </div>
                          <h4 className="fw-bold">{reconciliationStats.matchedTransactions}</h4>
                          <p className="text-muted small mb-0">Matched</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card border">
                        <div className="card-body text-center">
                          <div className="text-danger mb-2">
                            <XCircle size={24} />
                          </div>
                          <h4 className="fw-bold">{reconciliationStats.unmatchedTransactions}</h4>
                          <p className="text-muted small mb-0">Unmatched</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card border">
                        <div className="card-body text-center">
                          <div className="text-warning mb-2">
                            <Clock size={24} />
                          </div>
                          <h4 className="fw-bold">{reconciliationStats.pendingVerification}</h4>
                          <p className="text-muted small mb-0">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reconciliation Table */}
                  <div className="card border">
                    <div className="card-header bg-transparent border-0">
                      <h6 className="mb-0">Reconciliation Details</h6>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th className="px-4 py-3">Transaction ID</th>
                              <th className="px-4 py-3">Amount</th>
                              <th className="px-4 py-3">Status</th>
                              <th className="px-4 py-3">Date</th>
                              <th className="px-4 py-3">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reconciliationData.map(record => (
                              <tr key={record.id}>
                                <td className="px-4 py-3">
                                  <div className="fw-medium">{record.transactionId}</div>
                                </td>
                                <td className="px-4 py-3 fw-bold">{record.amount}</td>
                                <td className="px-4 py-3">
                                  <span className={`badge ${
                                    record.status === 'Matched' ? 'bg-success-subtle text-success' :
                                    record.status === 'Unmatched' ? 'bg-danger-subtle text-danger' :
                                    'bg-warning-subtle text-warning'
                                  }`}>
                                    {record.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3">{record.date}</td>
                                <td className="px-4 py-3">
                                  <button className="btn btn-sm btn-outline-primary">
                                    View Details
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Reconciliation Actions */}
                  <div className="mt-4">
                    <h6 className="mb-3">Reconciliation Actions</h6>
                    <div className="d-flex flex-wrap gap-3">
                      <button className="btn btn-outline-primary">
                        <Download size={16} className="me-2" />
                        Export Report
                      </button>
                      <button className="btn btn-outline-success">
                        <CheckCircle size={16} className="me-2" />
                        Mark All as Verified
                      </button>
                      <button className="btn btn-outline-warning">
                        <AlertCircle size={16} className="me-2" />
                        Flag for Review
                      </button>
                      <button className="btn btn-outline-danger">
                        <XCircle size={16} className="me-2" />
                        Report Discrepancy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="modal-footer d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowReconciliationPanel(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleReconcile}
                  >
                    <RefreshCw size={16} className="me-2" />
                    Run Reconciliation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default BankTransfer;