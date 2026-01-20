// src\components\HRMS\PayrollManagement\BankTransfer.jsx
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Search, Plus, Eye, FileText, Trash2, Download,
  Clock, CheckCircle, XCircle, Lock, RefreshCw, Upload,
  AlertCircle, BanknoteIcon, CreditCard, FileCheck,
  Filter, FileSpreadsheet, Settings, BarChart3, Send
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";

// Simple Breadcrumb component
const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="mb-3">
      <ol className="breadcrumb mb-0">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`breadcrumb-item ${item.active ? 'active' : ''}`}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.link && !item.active ? (
              <a href={item.link} className="text-decoration-none">{item.label}</a>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

const BankTransfer = () => {
  // State declarations
  const [showGeneratePanel, setShowGeneratePanel] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [paymentType, setPaymentType] = useState("NEFT");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [splitByBank, setSplitByBank] = useState(true);
  const [bankFilter, setBankFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showReconciliationPanel, setShowReconciliationPanel] = useState(false);
  const [reconciliationData, setReconciliationData] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());
  const [selectedPayments, setSelectedPayments] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [bulkAction, setBulkAction] = useState("");

  // Advanced filter states
  const [advancedFilters, setAdvancedFilters] = useState({
    dateFrom: "",
    dateTo: "",
    amountFrom: "",
    amountTo: "",
    employeeCountFrom: "",
    employeeCountTo: "",
    paymentMethod: "All",
  });

  // Mock data - Integrated with employee data
  const banks = [
    { id: 1, name: "State Bank of India", code: "SBI001", format: "NEFT", supportedTypes: ["NEFT", "RTGS"] },
    { id: 2, name: "HDFC Bank", code: "HDFC002", format: "CSV", supportedTypes: ["NEFT", "RTGS", "IMPS"] },
    { id: 3, name: "ICICI Bank", code: "ICICI003", format: "XML", supportedTypes: ["NEFT", "RTGS"] },
    { id: 4, name: "Axis Bank", code: "AXIS004", format: "TXT", supportedTypes: ["NEFT", "IMPS"] },
    { id: 5, name: "Kotak Mahindra Bank", code: "KOTAK005", format: "CSV", supportedTypes: ["NEFT", "RTGS", "IMPS"] },
    { id: 6, name: "Punjab National Bank", code: "PNB006", format: "NEFT", supportedTypes: ["NEFT"] },
  ];

  const paymentTypes = [
    { id: "NEFT", name: "NEFT", description: "Next day settlement", cutoffTime: "7:00 PM" },
    { id: "RTGS", name: "RTGS", description: "Real-time gross settlement", minAmount: "₹2,00,000", cutoffTime: "3:30 PM" },
    { id: "IMPS", name: "IMPS", description: "Immediate payment service", maxAmount: "₹2,00,000", cutoffTime: "24x7" },
  ];

  // Employee data
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Abhilash Gurrampally",
      code: "LEV098",
      bankName: "SBI BANK",
      ifscCode: "SBIN0017895",
      accountNumber: "40579942875",
      accountType: "Savings",
      branch: "Hyderabad Main",
      verified: true,
      salary: "₹85,000",
      status: "Active"
    },
    {
      id: 2,
      name: "Anusha Enigalla",
      code: "LEV111",
      bankName: "State Bank of India",
      ifscCode: "SBIN0021729",
      accountNumber: "38762788694",
      accountType: "Savings",
      branch: "Secunderabad",
      verified: true,
      salary: "₹62,000",
      status: "Active"
    },
    {
      id: 3,
      name: "Ashok Kota",
      code: "LEV122",
      bankName: "Canara Bank",
      ifscCode: "CNRB0013494",
      accountNumber: "39493220090427",
      accountType: "Current",
      branch: "Bangalore",
      verified: false,
      salary: "₹95,000",
      status: "Active"
    },
    {
      id: 4,
      name: "Bogala Chandramouli",
      code: "LEV096",
      bankName: "State Bank of India",
      ifscCode: "SBIN0017408",
      accountNumber: "39453293605",
      accountType: "Savings",
      branch: "Chennai",
      verified: true,
      salary: "₹78,000",
      status: "Active"
    },
    {
      id: 5,
      name: "Burri Gowtham",
      code: "LEV092",
      bankName: "HDFC Bank",
      ifscCode: "HDFC0002348",
      accountNumber: "50100619519020",
      accountType: "Salary",
      branch: "Mumbai",
      verified: false,
      salary: "₹1,10,000",
      status: "Active"
    },
  ]);

  const [payments, setPayments] = useState([
    {
      id: 1,
      fileName: "SALARY_OCT_2024_SBI",
      bank: "State Bank of India",
      paymentType: "NEFT",
      status: "Processed",
      totalAmount: "₹1,25,00,000",
      totalEmployees: 85,
      generatedDate: "25 Oct 2024",
      processedDate: "26 Oct 2024",
      encrypted: true,
      splitByBank: true,
      acknowledgment: "Uploaded",
      failedTransactions: 0,
      paymentMethod: "Bulk Transfer",
      fileSize: "2.5 MB",
      referenceNumber: "REF20241025SBI001",
      includedEmployees: [1, 2, 4],
      netAmount: "₹1,24,95,000",
      charges: "₹5,000",
      paymentDate: "2024-10-26",
      batchId: "BATCH001",
    },
    {
      id: 2,
      fileName: "SALARY_OCT_2024_HDFC",
      bank: "HDFC Bank",
      paymentType: "RTGS",
      status: "Failed",
      totalAmount: "₹75,00,000",
      totalEmployees: 42,
      generatedDate: "25 Oct 2024",
      processedDate: "Pending",
      encrypted: true,
      splitByBank: true,
      acknowledgment: "Pending",
      failedTransactions: 2,
      paymentMethod: "Bulk Transfer",
      fileSize: "1.2 MB",
      referenceNumber: "REF20241025HDFC002",
      includedEmployees: [5],
      netAmount: "₹74,98,500",
      charges: "₹1,500",
      paymentDate: "2024-10-26",
      batchId: "BATCH002",
    },
    {
      id: 3,
      fileName: "SALARY_OCT_2024_ICICI",
      bank: "ICICI Bank",
      paymentType: "NEFT",
      status: "Generated",
      totalAmount: "₹50,00,000",
      totalEmployees: 28,
      generatedDate: "25 Oct 2024",
      processedDate: "Pending",
      encrypted: true,
      splitByBank: true,
      acknowledgment: "Pending",
      failedTransactions: 0,
      paymentMethod: "Bulk Transfer",
      fileSize: "850 KB",
      referenceNumber: "REF20241025ICICI003",
      includedEmployees: [3],
      netAmount: "₹49,99,000",
      charges: "₹1,000",
      paymentDate: "2024-10-26",
      batchId: "BATCH003",
    },
    {
      id: 4,
      fileName: "BONUS_OCT_2024_ALL",
      bank: "All Banks",
      paymentType: "IMPS",
      status: "Failed",
      totalAmount: "₹15,00,000",
      totalEmployees: 35,
      generatedDate: "20 Oct 2024",
      processedDate: "20 Oct 2024",
      encrypted: false,
      splitByBank: false,
      acknowledgment: "Uploaded",
      failedTransactions: 5,
      paymentMethod: "Bonus Payment",
      fileSize: "680 KB",
      referenceNumber: "REF20241020BNS001",
      includedEmployees: [],
      netAmount: "₹14,98,000",
      charges: "₹2,000",
      paymentDate: "2024-10-20",
      batchId: "BATCH004",
    },
  ]);

  const pendingPayments = [
    {
      id: 1,
      employeeName: "Rahul Sharma",
      employeeCode: "LEV101",
      amount: "₹85,000",
      bank: "SBI",
      ifscCode: "SBIN0012345",
      accountNumber: "XXXX-XXXX-1234",
      daysPending: 2,
      reason: "Insufficient balance",
      status: "Failed",
      retryCount: 2,
    },
    {
      id: 2,
      employeeName: "Priya Singh",
      employeeCode: "LEV102",
      amount: "₹62,000",
      bank: "HDFC",
      ifscCode: "HDFC0005678",
      accountNumber: "XXXX-XXXX-5678",
      daysPending: 1,
      reason: "Account validation failed",
      status: "Pending",
      retryCount: 1,
    },
    {
      id: 3,
      employeeName: "Amit Kumar",
      employeeCode: "LEV103",
      amount: "₹95,000",
      bank: "ICICI",
      ifscCode: "ICICI0090123",
      accountNumber: "XXXX-XXXX-9012",
      daysPending: 3,
      reason: "Bank server error",
      status: "Failed",
      retryCount: 3,
    },
  ];

  // Initial reconciliation data
  useEffect(() => {
    const initialReconciliationData = [
      {
        id: 1,
        transactionId: "TXN001",
        employeeCode: "LEV098",
        employeeName: "Abhilash Gurrampally",
        amount: "₹85,000",
        status: "Matched",
        date: "25 Oct 2024",
        reference: "REF20241025SBI001",
        bankReference: "SBIREF12345",
        bank: "SBI",
        accountNumber: "40579942875",
      },
      {
        id: 2,
        transactionId: "TXN002",
        employeeCode: "LEV111",
        employeeName: "Anusha Enigalla",
        amount: "₹62,000",
        status: "Matched",
        date: "25 Oct 2024",
        reference: "REF20241025SBI001",
        bankReference: "SBIREF12346",
        bank: "SBI",
        accountNumber: "38762788694",
      },
      {
        id: 3,
        transactionId: "TXN003",
        employeeCode: "LEV122",
        employeeName: "Ashok Kota",
        amount: "₹95,000",
        status: "Unmatched",
        date: "25 Oct 2024",
        reference: "REF20241025ICICI003",
        bankReference: "",
        bank: "Canara Bank",
        accountNumber: "39493220090427",
      },
      {
        id: 4,
        transactionId: "TXN004",
        employeeCode: "LEV096",
        employeeName: "Bogala Chandramouli",
        amount: "₹78,000",
        status: "Pending",
        date: "25 Oct 2024",
        reference: "REF20241025SBI001",
        bankReference: "",
        bank: "SBI",
        accountNumber: "39453293605",
      },
    ];
    setReconciliationData(initialReconciliationData);
  }, []);

  const reconciliationStats = {
    totalAmount: "₹2,85,00,000",
    matchedTransactions: 155,
    unmatchedTransactions: 3,
    pendingVerification: 2,
    lastReconciliation: "25 Oct 2024",
    successRate: "98.1%",
    totalTransactions: 158,
  };

  // Pagination calculations
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  
  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.referenceNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBank = bankFilter === "All" || payment.bank === bankFilter;
    const matchesStatus = statusFilter === "All" || payment.status === statusFilter;
    
    // Advanced filters
    const matchesDate = !advancedFilters.dateFrom || 
      (payment.generatedDate >= advancedFilters.dateFrom && 
       (!advancedFilters.dateTo || payment.generatedDate <= advancedFilters.dateTo));
    
    const matchesPaymentMethod = advancedFilters.paymentMethod === "All" || 
      payment.paymentMethod === advancedFilters.paymentMethod;

    return matchesSearch && matchesBank && matchesStatus && matchesDate && matchesPaymentMethod;
  });

  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  // ========== BULK ACTION FUNCTIONS ==========
  const handleSelectPayment = (paymentId) => {
    const newSelection = new Set(selectedPayments);
    if (newSelection.has(paymentId)) {
      newSelection.delete(paymentId);
    } else {
      newSelection.add(paymentId);
    }
    setSelectedPayments(newSelection);
  };

  const handleSelectAllPayments = () => {
    if (selectedPayments.size === filteredPayments.length) {
      setSelectedPayments(new Set());
    } else {
      setSelectedPayments(new Set(filteredPayments.map(payment => payment.id)));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedPayments.size === 0) {
      toast.warning("Please select at least one payment file");
      setBulkAction("");
      return;
    }

    switch (action) {
      case "export":
        exportSelectedPayments();
        break;
      case "retry":
        retrySelectedPayments();
        break;
      case "delete":
        deleteSelectedPayments();
        break;
      case "mark_processed":
        markSelectedAsProcessed();
        break;
      default:
        break;
    }
    
    // Reset bulk action dropdown
    setBulkAction("");
  };

  const exportSelectedPayments = () => {
    const selectedPaymentData = payments.filter(payment => 
      selectedPayments.has(payment.id)
    );

    if (selectedPaymentData.length === 0) {
      toast.warning("No payments selected");
      return;
    }

    const headers = [
      "File Name", "Bank", "Payment Type", "Status", "Total Amount", 
      "Employees", "Generated Date", "Processed Date", "Reference Number",
      "Batch ID", "Encrypted", "Failed Transactions"
    ];

    const data = selectedPaymentData.map(payment => [
      payment.fileName,
      payment.bank,
      payment.paymentType,
      payment.status,
      payment.totalAmount,
      payment.totalEmployees,
      payment.generatedDate,
      payment.processedDate,
      payment.referenceNumber,
      payment.batchId,
      payment.encrypted ? "Yes" : "No",
      payment.failedTransactions
    ]);

    const csvContent = [headers, ...data]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `selected-payments-${new Date().getTime()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success(`Exported ${selectedPaymentData.length} payment files`);
  };

  const retrySelectedPayments = () => {
    const selectedCount = selectedPayments.size;
    if (selectedCount === 0) return;

    if (window.confirm(`Retry ${selectedCount} failed payment(s)?`)) {
      setPayments(payments.map(payment => 
        selectedPayments.has(payment.id) && payment.status === "Failed"
          ? { ...payment, status: "In Progress", failedTransactions: 0 }
          : payment
      ));

      // Simulate retry process
      setTimeout(() => {
        setPayments(payments.map(payment => 
          selectedPayments.has(payment.id) && payment.status === "In Progress"
            ? { ...payment, status: "Processed", failedTransactions: 0 }
            : payment
        ));
        toast.success(`Retried ${selectedCount} payment(s) successfully`);
      }, 2000);

      setSelectedPayments(new Set());
    }
  };

  const deleteSelectedPayments = () => {
    const selectedCount = selectedPayments.size;
    if (selectedCount === 0) return;

    if (window.confirm(`Delete ${selectedCount} selected payment file(s)? This action cannot be undone.`)) {
      setPayments(payments.filter(payment => !selectedPayments.has(payment.id)));
      toast.success(`Deleted ${selectedCount} payment file(s)`);
      setSelectedPayments(new Set());
    }
  };

  const markSelectedAsProcessed = () => {
    const selectedCount = selectedPayments.size;
    if (selectedCount === 0) return;

    if (window.confirm(`Mark ${selectedCount} selected payment(s) as processed?`)) {
      setPayments(payments.map(payment => 
        selectedPayments.has(payment.id)
          ? { 
              ...payment, 
              status: "Processed",
              processedDate: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
              acknowledgment: "Auto-processed"
            }
          : payment
      ));

      toast.success(`Marked ${selectedCount} payment(s) as processed`);
      setSelectedPayments(new Set());
    }
  };

  const downloadPaymentFile = (payment) => {
    // Find employees for this payment
    const paymentEmployees = employees.filter(emp => 
      payment.includedEmployees && payment.includedEmployees.includes(emp.id)
    );
    
    if (paymentEmployees.length === 0) {
      toast.warning("No employee data found for this payment");
      return;
    }

    // Generate file based on bank format
    const bankInfo = banks.find(b => b.name === payment.bank);
    const fileFormats = {
      'CSV': generateCSVFile,
      'XML': generateXMLFile,
      'TXT': generateTXTFile,
      'NEFT': generateNEFTFile,
    };

    const generateFunction = fileFormats[bankInfo?.format || 'CSV'] || generateCSVFile;
    generateFunction(payment, paymentEmployees);
    toast.success(`Downloaded ${payment.fileName}`);
  };
  // ========== END BULK ACTION FUNCTIONS ==========

  // Functions
  const handleGenerateFile = async () => {
    if (!selectedBank) {
      toast.error("Please select a bank");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const bankInfo = banks.find((b) => b.id === parseInt(selectedBank));
      const selectedEmployeesData = employees.filter(emp => selectedEmployees.has(emp.id));
      
      const totalAmount = selectedEmployeesData.reduce((sum, emp) => {
        const salary = parseFloat(emp.salary.replace(/[^0-9.]/g, ''));
        return sum + (isNaN(salary) ? 0 : salary);
      }, 0);
      
      const newPayment = {
        id: payments.length + 1,
        fileName: `SALARY_${new Date()
          .toLocaleDateString("en-GB", { month: "short", year: "numeric" })
          .toUpperCase()}_${bankInfo.code}`,
        bank: bankInfo.name,
        paymentType: paymentType,
        status: "Generated",
        totalAmount: `₹${totalAmount.toLocaleString('en-IN')}`,
        totalEmployees: selectedEmployeesData.length,
        generatedDate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        processedDate: "Pending",
        encrypted: encryptionEnabled,
        splitByBank: splitByBank,
        acknowledgment: "Pending",
        failedTransactions: 0,
        paymentMethod: "Bulk Transfer",
        fileSize: "Processing...",
        referenceNumber: `REF${new Date().getTime()}${bankInfo.code}`,
        includedEmployees: Array.from(selectedEmployees),
        netAmount: `₹${(totalAmount - 500).toLocaleString('en-IN')}`,
        charges: "₹500",
        paymentDate: new Date().toISOString().split('T')[0],
        batchId: `BATCH${new Date().getTime()}`,
      };

      setPayments([newPayment, ...payments]);
      
      // Generate and download the payment file
      generatePaymentFile(newPayment, bankInfo, selectedEmployeesData);
      
      toast.success(`Payment file generated for ${bankInfo.name} (${paymentType})`, {
        autoClose: 3000,
      });
      
    } catch (error) {
      toast.error("Failed to generate payment file");
    } finally {
      setIsGenerating(false);
      setShowConfirmModal(false);
      setShowGeneratePanel(false);
      setSelectedBank("");
      setSelectedEmployees(new Set());
      setPaymentType("NEFT");
    }
  };

  const generatePaymentFile = (payment, bankInfo, employeeData) => {
    const fileFormats = {
      'CSV': generateCSVFile,
      'XML': generateXMLFile,
      'TXT': generateTXTFile,
      'NEFT': generateNEFTFile,
    };

    const generateFunction = fileFormats[bankInfo.format] || generateCSVFile;
    generateFunction(payment, employeeData);
  };

  const generateCSVFile = (payment, employeeData) => {
    const headers = ["Employee Code", "Employee Name", "Bank Name", "IFSC Code", "Account Number", "Amount", "Payment Date"];
    const rows = employeeData.map(emp => [
      emp.code,
      emp.name,
      emp.bankName,
      emp.ifscCode,
      emp.accountNumber,
      emp.salary.replace('₹', ''),
      payment.paymentDate
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    downloadFile(csvContent, `${payment.fileName}.csv`, 'text/csv');
  };

  const generateNEFTFile = (payment, employeeData) => {
    const header = `01,${payment.referenceNumber},${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;
    const rows = employeeData.map((emp, index) => {
      const amount = emp.salary.replace(/[^0-9.]/g, '');
      return `02,${String(index + 1).padStart(6, '0')},${emp.accountNumber},${emp.ifscCode},${amount.padStart(13, '0')},${emp.name.substring(0, 30)}`;
    });
    const footer = `03,${employeeData.length},${payment.totalAmount.replace(/[^0-9.]/g, '').padStart(13, '0')}`;
    
    const fileContent = [header, ...rows, footer].join('\n');
    downloadFile(fileContent, `${payment.fileName}.txt`, 'text/plain');
  };

  const generateXMLFile = (payment, employeeData) => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<paymentBatch>
  <header>
    <reference>${payment.referenceNumber}</reference>
    <date>${payment.paymentDate}</date>
    <totalAmount>${payment.totalAmount}</totalAmount>
    <totalEmployees>${payment.totalEmployees}</totalEmployees>
  </header>
  <transactions>
    ${employeeData.map(emp => `
    <transaction>
      <employeeCode>${emp.code}</employeeCode>
      <employeeName>${emp.name}</employeeName>
      <bankName>${emp.bankName}</bankName>
      <ifscCode>${emp.ifscCode}</ifscCode>
      <accountNumber>${emp.accountNumber}</accountNumber>
      <amount>${emp.salary}</amount>
    </transaction>`).join('')}
  </transactions>
</paymentBatch>`;
    
    downloadFile(xmlContent, `${payment.fileName}.xml`, 'application/xml');
  };

  const generateTXTFile = (payment, employeeData) => {
    const txtContent = `PAYMENT FILE
================
Reference: ${payment.referenceNumber}
Date: ${payment.paymentDate}
Bank: ${payment.bank}
Payment Type: ${payment.paymentType}
Total Amount: ${payment.totalAmount}
Total Employees: ${payment.totalEmployees}

EMPLOYEE PAYMENTS:
${employeeData.map(emp => 
  `${emp.code} | ${emp.name} | ${emp.bankName} | ${emp.ifscCode} | ${emp.accountNumber} | ${emp.salary}`
).join('\n')}`;
    
    downloadFile(txtContent, `${payment.fileName}.txt`, 'text/plain');
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleExportReport = (format = 'csv') => {
    const headers = [
      "File Name", "Bank", "Payment Type", "Status", "Total Amount", 
      "Employees", "Generated Date", "Processed Date", "Reference Number",
      "Batch ID", "Encrypted", "Failed Transactions"
    ];

    const data = payments.map(payment => [
      payment.fileName,
      payment.bank,
      payment.paymentType,
      payment.status,
      payment.totalAmount,
      payment.totalEmployees,
      payment.generatedDate,
      payment.processedDate,
      payment.referenceNumber,
      payment.batchId,
      payment.encrypted ? "Yes" : "No",
      payment.failedTransactions
    ]);

    if (format === 'csv') {
      const csvContent = [headers, ...data]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      downloadBlob(blob, 'payment-processing-report.csv');
      toast.success("Report exported in CSV format");
    } else if (format === 'pdf') {
      generatePDFReport(headers, data);
      toast.success("Report exported in PDF format");
    }
  };

  const generatePDFReport = (headers, data) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Payment Processing Report", 14, 15);
    
    // Report Info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25);
    doc.text(`Total Payments: ${payments.length}`, 14, 30);
    
    // Simple table
    let y = 40;
    doc.setFontSize(12);
    doc.text("Payment Records", 14, y);
    y += 10;
    
    // Draw table header
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("File Name", 14, y);
    doc.text("Bank", 50, y);
    doc.text("Status", 90, y);
    doc.text("Amount", 120, y);
    doc.text("Employees", 150, y);
    
    y += 5;
    doc.line(14, y, 200, y);
    y += 5;
    
    // Draw table data
    doc.setFont("helvetica", "normal");
    data.forEach((row, index) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      
      doc.text(row[0].substring(0, 20), 14, y);
      doc.text(row[1].substring(0, 15), 50, y);
      doc.text(row[3], 90, y);
      doc.text(row[4], 120, y);
      doc.text(row[5].toString(), 150, y);
      y += 6;
    });
    
    doc.save("payment-processing-report.pdf");
  };

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleUploadAcknowledgement = async () => {
    if (!uploadFile) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedPayment) {
        const updatedPayments = payments.map((payment) =>
          payment.id === selectedPayment.id
            ? {
                ...payment,
                acknowledgment: "Uploaded",
                status: "Processed",
                processedDate: new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
              }
            : payment
        );

        setPayments(updatedPayments);
        setSelectedPayment({
          ...selectedPayment,
          acknowledgment: "Uploaded",
          status: "Processed",
          processedDate: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        });

        toast.success("Acknowledgement file uploaded successfully!");
      }

      setUploadFile(null);
      setShowUploadModal(false);
    } catch (error) {
      toast.error("Failed to upload acknowledgement");
    }
  };

  const handleRetryFailed = async (paymentId) => {
    try {
      const payment = payments.find(p => p.id === paymentId);
      if (!payment) return;

      setPayments(
        payments.map((payment) =>
          payment.id === paymentId
            ? { ...payment, status: "In Progress", failedTransactions: 0 }
            : payment
        )
      );

      if (selectedPayment?.id === paymentId) {
        setSelectedPayment({
          ...selectedPayment,
          status: "In Progress",
          failedTransactions: 0,
        });
      }

      toast.info("Retrying failed transactions...");
      
      // Simulate retry process
      setTimeout(() => {
        setPayments(
          payments.map((payment) =>
            payment.id === paymentId
              ? { ...payment, status: "Processed", failedTransactions: 0 }
              : payment
          )
        );
        toast.success("All transactions processed successfully!");
      }, 2000);

    } catch (error) {
      toast.error("Failed to retry transactions");
    }
  };

  const handleReconcile = async () => {
    try {
      toast.info("Starting bank reconciliation...");
      
      // Simulate reconciliation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newReconciliationData = [
        {
          id: 1,
          transactionId: "TXN001",
          employeeCode: "LEV098",
          employeeName: "Abhilash Gurrampally",
          amount: "₹85,000",
          status: "Matched",
          date: "25 Oct 2024",
          reference: "REF20241025SBI001",
          bankReference: "SBIREF12345",
          bank: "SBI",
          accountNumber: "40579942875",
        },
        {
          id: 2,
          transactionId: "TXN002",
          employeeCode: "LEV111",
          employeeName: "Anusha Enigalla",
          amount: "₹62,000",
          status: "Matched",
          date: "25 Oct 2024",
          reference: "REF20241025SBI001",
          bankReference: "SBIREF12346",
          bank: "SBI",
          accountNumber: "38762788694",
        },
        {
          id: 3,
          transactionId: "TXN003",
          employeeCode: "LEV122",
          employeeName: "Ashok Kota",
          amount: "₹95,000",
          status: "Unmatched",
          date: "25 Oct 2024",
          reference: "REF20241025ICICI003",
          bankReference: "",
          bank: "Canara Bank",
          accountNumber: "39493220090427",
        },
        {
          id: 4,
          transactionId: "TXN004",
          employeeCode: "LEV096",
          employeeName: "Bogala Chandramouli",
          amount: "₹78,000",
          status: "Pending",
          date: "25 Oct 2024",
          reference: "REF20241025SBI001",
          bankReference: "",
          bank: "SBI",
          accountNumber: "39453293605",
        },
      ];

      setReconciliationData(newReconciliationData);
      setShowReconciliationPanel(true);
      toast.success("Bank reconciliation completed successfully!");
    } catch (error) {
      toast.error("Reconciliation failed");
    }
  };

  const handleSelectEmployee = (employeeId) => {
    const newSelection = new Set(selectedEmployees);
    if (newSelection.has(employeeId)) {
      newSelection.delete(employeeId);
    } else {
      newSelection.add(employeeId);
    }
    setSelectedEmployees(newSelection);
  };

  const handleSelectAllEmployees = () => {
    if (selectedEmployees.size === employees.length) {
      setSelectedEmployees(new Set());
    } else {
      setSelectedEmployees(new Set(employees.map(emp => emp.id)));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Generated: "bg-primary-subtle text-primary border-primary-subtle",
      "In Progress": "bg-warning-subtle text-warning border-warning-subtle",
      Processed: "bg-success-subtle text-success border-success-subtle",
      Failed: "bg-danger-subtle text-danger border-danger-subtle",
      "Partially Processed": "bg-info-subtle text-info border-info-subtle",
    };

    const icons = {
      Generated: <FileText size={12} />,
      "In Progress": <Clock size={12} />,
      Processed: <CheckCircle size={12} />,
      Failed: <XCircle size={12} />,
      "Partially Processed": <AlertCircle size={12} />,
    };

    return (
      <span
        className={`badge border d-inline-flex align-items-center gap-1 ${styles[status]}`}
      >
        {icons[status]}
        {status}
      </span>
    );
  };

  const getBankBadge = (bank) => {
    const bankColors = {
      "State Bank of India": "bg-info-subtle text-info",
      "HDFC Bank": "bg-primary-subtle text-primary",
      "ICICI Bank": "bg-success-subtle text-success",
      "Axis Bank": "bg-warning-subtle text-warning",
      "Kotak Mahindra Bank": "bg-danger-subtle text-danger",
      "Punjab National Bank": "bg-secondary-subtle text-secondary",
      "All Banks": "bg-dark-subtle text-dark",
    };

    return (
      <span className={`badge ${bankColors[bank] || "bg-light text-dark"}`}>
        {bank}
      </span>
    );
  };

  const PaymentStatusTracker = ({ status }) => {
    const steps = ["Generated", "Encrypted", "Sent to Bank", "Processed"];
    const currentIndex = steps.indexOf(
      status === "In Progress"
        ? "Sent to Bank"
        : status === "Processed"
        ? "Processed"
        : status === "Failed"
        ? "Failed"
        : "Generated"
    );

    return (
      <div className="d-flex align-items-center gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="d-flex flex-column align-items-center">
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center border-2 ${
                  index <= currentIndex
                    ? "bg-success border-success text-white"
                    : "bg-white border-secondary text-muted"
                }`}
                style={{ width: "32px", height: "32px" }}
              >
                {step === "Generated" ? (
                  <FileText size={16} />
                ) : step === "Encrypted" ? (
                  <Lock size={16} />
                ) : step === "Sent to Bank" ? (
                  <Send size={16} />
                ) : (
                  <CheckCircle size={16} />
                )}
              </div>
              <span className="small mt-1 text-muted">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`border-top border-2 ${
                  index < currentIndex ? "border-success" : "border-secondary"
                }`}
                style={{ width: "48px" }}
              />
            )}
          </React.Fragment>
        ))}
        {status === "Failed" && (
          <>
            <div
              className="border-top border-2 border-danger"
              style={{ width: "48px" }}
            />
            <div className="d-flex flex-column align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center border-2 bg-danger border-danger text-white"
                style={{ width: "32px", height: "32px" }}
              >
                <XCircle size={16} />
              </div>
              <span className="small mt-1 text-muted">Failed</span>
            </div>
          </>
        )}
      </div>
    );
  };

  const handleGoToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) pages.push("...");
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="container-fluid">
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/dashboard" },
          { label: "Payroll Management", link: "/payroll" },
          { label: "Bank Transfer", active: true },
        ]}
      />

      {/* Header */}
      <div className="card border shadow-none mb-4 mt-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h5 className="mb-1">
                <Icon icon="heroicons:banknotes" /> Bank Transfer & Payment Processing
              </h5>
              <p className="text-muted small mb-0">
                Generate, track, and reconcile payment files for salary disbursement
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter size={16} className="me-2" />
                {showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowGeneratePanel(true)}
              >
                <Plus size={16} className="me-2" />
                Generate Payment File
              </button>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by file name, bank, reference number..."
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
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.name}>
                    {bank.name}
                  </option>
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

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="card border mt-3">
              <div className="card-body">
                <h6 className="mb-3">Advanced Filters</h6>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label className="form-label">Date From</label>
                    <input
                      type="date"
                      className="form-control"
                      value={advancedFilters.dateFrom}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, dateFrom: e.target.value})}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Date To</label>
                    <input
                      type="date"
                      className="form-control"
                      value={advancedFilters.dateTo}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, dateTo: e.target.value})}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Payment Method</label>
                    <select
                      className="form-select"
                      value={advancedFilters.paymentMethod}
                      onChange={(e) => setAdvancedFilters({...advancedFilters, paymentMethod: e.target.value})}
                    >
                      <option value="All">All Methods</option>
                      <option value="Bulk Transfer">Bulk Transfer</option>
                      <option value="Bonus Payment">Bonus Payment</option>
                      <option value="Advance Payment">Advance Payment</option>
                    </select>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button
                      className="btn btn-secondary w-100"
                      onClick={() => setAdvancedFilters({
                        dateFrom: "",
                        dateTo: "",
                        amountFrom: "",
                        amountTo: "",
                        employeeCountFrom: "",
                        employeeCountTo: "",
                        paymentMethod: "All",
                      })}
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                  <div className="small text-muted">This month</div>
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
                  <div className="small text-muted">Transactions</div>
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
                  <div className="small text-muted">Require action</div>
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
                  <div className="small text-muted">Need retry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="card border shadow-none mb-4">
        <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <h6 className="mb-0">Payment Files ({filteredPayments.length})</h6>
            {selectedPayments.size > 0 && (
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-primary">
                  {selectedPayments.size} selected
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setSelectedPayments(new Set())}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          <div className="d-flex gap-2">
            <select 
              className="form-select form-select-sm w-auto"
              value={bulkAction}
              onChange={(e) => {
                setBulkAction(e.target.value);
                if (e.target.value) {
                  handleBulkAction(e.target.value);
                }
              }}
            >
              <option value="">Bulk Actions</option>
              <option value="export">Export Selected</option>
              <option value="retry">Retry Failed</option>
              <option value="delete">Delete Selected</option>
              <option value="mark_processed">Mark as Processed</option>
            </select>
            <button 
              className="btn btn-sm btn-outline-primary"
              onClick={() => handleExportReport('csv')}
            >
              <Download size={14} className="me-1" />
              Export All
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4 py-3 text-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedPayments.size === filteredPayments.length && filteredPayments.length > 0}
                      onChange={handleSelectAllPayments}
                    />
                  </th>
                  <th className="px-4 py-3 text-start">File Name</th>
                  <th className="px-4 py-3 text-start">Bank</th>
                  <th className="px-4 py-3 text-start">Payment Type</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Total Amount</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.length > 0 ? (
                  currentPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-4 py-3 text-start">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedPayments.has(payment.id)}
                          onChange={() => handleSelectPayment(payment.id)}
                        />
                      </td>
                      <td className="px-4 py-3 text-start">
                        <div className="fw-medium">{payment.fileName}</div>
                        <div className="small text-muted d-flex align-items-center gap-1">
                          <Clock size={12} />
                          {payment.generatedDate}
                          {payment.referenceNumber && (
                            <>
                              <span className="mx-1">•</span>
                              <span className="text-primary">{payment.referenceNumber}</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        {getBankBadge(payment.bank)}
                        <div className="small text-muted mt-1">{payment.batchId}</div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <div className="fw-medium">{payment.paymentType}</div>
                        <div className="small text-muted">{payment.paymentMethod}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {getStatusBadge(payment.status)}
                        {payment.failedTransactions > 0 && (
                          <div className="small text-danger mt-1">
                            {payment.failedTransactions} failed
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="fw-bold text-primary">
                          {payment.totalAmount}
                        </div>
                        <div className="small text-muted">
                          {payment.totalEmployees} employees
                        </div>
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
                          {payment.status === "Failed" && (
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleRetryFailed(payment.id)}
                              title="Retry Failed"
                            >
                              <RefreshCw size={14} />
                            </button>
                          )}
                          {payment.status === "Processed" && (
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
                            className="btn btn-sm btn-outline-info"
                            onClick={() => {
                              downloadPaymentFile(payment);
                            }}
                            title="Download File"
                          >
                            <Download size={14} />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this payment record?"
                                )
                              ) {
                                setPayments(
                                  payments.filter((p) => p.id !== payment.id)
                                );
                                toast.success("Payment record deleted");
                              }
                            }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="text-muted">
                        <FileText size={48} className="mb-2 opacity-25" />
                        <p>No payment files found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
          <div className="text-muted">
            {selectedPayments.size > 0 ? (
              <span className="text-primary">
                {selectedPayments.size} selected • 
              </span>
            ) : null}
            Showing {indexOfFirstPayment + 1} to {Math.min(indexOfLastPayment, filteredPayments.length)} of {filteredPayments.length} payments
          </div>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handleGoToPage(currentPage - 1)}>
                  Previous
                </button>
              </li>
              
              {renderPagination().map((page, idx) => (
                <li key={idx} className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}>
                  {page === '...' ? (
                    <span className="page-link">...</span>
                  ) : (
                    <button className="page-link" onClick={() => handleGoToPage(page)}>
                      {page}
                    </button>
                  )}
                </li>
              ))}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handleGoToPage(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

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
                  onClick={() => handleExportReport('csv')}
                >
                  <FileSpreadsheet size={16} />
                  Export CSV
                </button>
                <button
                  className="btn btn-light border text-muted d-flex align-items-center gap-2"
                  onClick={() => handleExportReport('pdf')}
                >
                  <FileText size={16} />
                  Export PDF
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
                  onClick={() => setShowReconciliationPanel(true)}
                >
                  <BarChart3 size={16} />
                  View Analytics
                </button>
                <button
                  className="btn btn-light border text-muted d-flex align-items-center gap-2"
                  onClick={() => alert("Payment file encryption settings")}
                >
                  <Settings size={16} />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border shadow-none">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Pending Payments ({pendingPayments.length})</h6>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => {
                  toast.info("Showing all pending payments");
                }}
              >
                View All
              </button>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {pendingPayments.map((payment) => (
                  <div key={payment.id} className="list-group-item border-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-medium small">
                          {payment.employeeName}
                        </div>
                        <div className="text-muted smaller">
                          {payment.bank} • {payment.accountNumber}
                        </div>
                        <div className="small text-danger">
                          {payment.reason}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-danger">
                          {payment.amount}
                        </div>
                        <div className="text-muted smaller">
                          {payment.daysPending} days • {payment.retryCount} retries
                        </div>
                        <button
                          className="btn btn-sm btn-outline-warning mt-1"
                          onClick={() => {
                            toast.info(`Retrying payment for ${payment.employeeName}`);
                          }}
                        >
                          Retry
                        </button>
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
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Generate Payment File</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowGeneratePanel(false);
                    setSelectedBank("");
                    setPaymentType("NEFT");
                    setEncryptionEnabled(true);
                    setSplitByBank(true);
                    setSelectedEmployees(new Set());
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
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name} ({bank.code}) - Supports: {bank.supportedTypes.join(', ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Type Selector */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Payment Type</label>
                  <div className="row g-3">
                    {paymentTypes.map((type) => (
                      <div key={type.id} className="col-md-4">
                        <div
                          className={`card border cursor-pointer ${
                            paymentType === type.id ? "border-primary shadow-sm" : ""
                          }`}
                          onClick={() => setPaymentType(type.id)}
                          style={{ height: "100%" }}
                        >
                          <div className="card-body text-center">
                            <div className="mb-2">
                              <div
                                className={`rounded-circle d-inline-flex align-items-center justify-content-center ${
                                  paymentType === type.id
                                    ? "bg-primary"
                                    : "bg-light"
                                }`}
                                style={{ width: "48px", height: "48px" }}
                              >
                                <CreditCard
                                  size={20}
                                  className={
                                    paymentType === type.id
                                      ? "text-white"
                                      : "text-muted"
                                  }
                                />
                              </div>
                            </div>
                            <h6 className="fw-bold mb-1">{type.name}</h6>
                            <p className="small text-muted mb-2">
                              {type.description}
                            </p>
                            {type.cutoffTime && (
                              <div className="small text-warning">
                                Cut-off: {type.cutoffTime}
                              </div>
                            )}
                            {type.minAmount && (
                              <div className="small text-info">
                                Min: {type.minAmount}
                              </div>
                            )}
                            {type.maxAmount && (
                              <div className="small text-info">
                                Max: {type.maxAmount}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Employee Selection */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Select Employees ({selectedEmployees.size} selected)
                  </label>
                  <div className="card border">
                    <div className="card-header bg-light d-flex justify-content-between align-items-center">
                      <div>
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={selectedEmployees.size === employees.length}
                          onChange={handleSelectAllEmployees}
                        />
                        <span className="small">Select All</span>
                      </div>
                      <div className="text-muted small">
                        Total: {employees.length} employees
                      </div>
                    </div>
                    <div className="card-body" style={{ maxHeight: "200px", overflowY: "auto" }}>
                      <div className="row g-2">
                        {employees.map((emp) => (
                          <div key={emp.id} className="col-md-6">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedEmployees.has(emp.id)}
                                onChange={() => handleSelectEmployee(emp.id)}
                                id={`emp-${emp.id}`}
                              />
                              <label className="form-check-label w-100" htmlFor={`emp-${emp.id}`}>
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <div className="fw-medium small">{emp.name}</div>
                                    <div className="text-muted smaller">{emp.code}</div>
                                  </div>
                                  <div className="text-end">
                                    <div className="text-primary small">{emp.salary}</div>
                                    <div className="smaller text-muted">{emp.bankName}</div>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Advanced Settings
                  </label>
                  <div className="bg-light border rounded p-4">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={encryptionEnabled}
                        onChange={(e) => setEncryptionEnabled(e.target.checked)}
                        id="encryptionCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="encryptionCheck"
                      >
                        Enable File Encryption
                      </label>
                      <div className="small text-muted">
                        Encrypt payment file for security (AES-256)
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
                        Generate separate files for each bank branch
                      </div>
                    </div>
                  </div>
                </div>

                {/* File Preview */}
                {selectedBank && selectedEmployees.size > 0 && (
                  <div>
                    <label className="form-label fw-semibold">
                      File Preview
                    </label>
                    <div className="bg-light border rounded p-4">
                      <pre
                        className="mb-0"
                        style={{
                          whiteSpace: "pre-wrap",
                          fontFamily: "monospace",
                          fontSize: "12px",
                        }}
                      >
                        {`FILE TYPE: ${paymentType}
BANK: ${banks.find((b) => b.id === parseInt(selectedBank))?.name}
EMPLOYEES: ${selectedEmployees.size}
TOTAL AMOUNT: ₹${employees
  .filter(emp => selectedEmployees.has(emp.id))
  .reduce((sum, emp) => sum + parseFloat(emp.salary.replace(/[^0-9.]/g, '')), 0)
  .toLocaleString('en-IN')}
ENCRYPTION: ${encryptionEnabled ? "ENABLED (AES-256)" : "DISABLED"}
SPLIT BY BANK: ${splitByBank ? "YES" : "NO"}
DATE: ${new Date().toLocaleDateString()}
REFERENCE: REF${new Date().getTime()}${banks.find((b) => b.id === parseInt(selectedBank))?.code}`}
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
                    setSelectedBank("");
                    setPaymentType("NEFT");
                    setEncryptionEnabled(true);
                    setSplitByBank(true);
                    setSelectedEmployees(new Set());
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (!selectedBank) {
                      toast.error("Please select a bank");
                      return;
                    }
                    if (selectedEmployees.size === 0) {
                      toast.error("Please select at least one employee");
                      return;
                    }
                    setShowConfirmModal(true);
                  }}
                  disabled={!selectedBank || selectedEmployees.size === 0}
                >
                  {isGenerating ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText size={16} className="me-2" />
                      Generate File
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
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
                  Are you sure you want to generate payment file for{" "}
                  <strong>{banks.find((b) => b.id === parseInt(selectedBank))?.name}</strong>?
                </p>
                <div className="bg-light rounded p-3 small">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Payment Type:</span>
                    <span className="fw-medium">{paymentType}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Employees:</span>
                    <span className="fw-medium">{selectedEmployees.size} employees</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Total Amount:</span>
                    <span className="fw-bold text-primary">
                      ₹{employees
                        .filter(emp => selectedEmployees.has(emp.id))
                        .reduce((sum, emp) => sum + parseFloat(emp.salary.replace(/[^0-9.]/g, '')), 0)
                        .toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Encryption:</span>
                    <span className="fw-medium">
                      {encryptionEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Split by Bank:</span>
                    <span className="fw-medium">
                      {splitByBank ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                <div className="alert alert-warning mt-3">
                  <AlertCircle size={16} className="me-2" />
                  <strong>Note:</strong> This action cannot be undone. The payment file will be generated and downloaded immediately.
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
                  {isGenerating ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Generating...
                    </>
                  ) : (
                    "Generate File"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {showDetailModal && selectedPayment && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
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
                  <h6 className="small fw-semibold text-muted mb-2">
                    Payment Information
                  </h6>
                  <div className="bg-light rounded p-3">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="small text-muted">File Name:</span>
                          <span className="small fw-medium">
                            {selectedPayment.fileName}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="small text-muted">Bank:</span>
                          <span className="small fw-medium">
                            {selectedPayment.bank}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="small text-muted">
                            Reference Number:
                          </span>
                          <span className="small fw-medium text-primary">
                            {selectedPayment.referenceNumber}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="small text-muted">
                            Batch ID:
                          </span>
                          <span className="small fw-medium">
                            {selectedPayment.batchId}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="small text-muted">
                            Total Amount:
                          </span>
                          <span className="small fw-bold text-primary">
                            {selectedPayment.totalAmount}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="small text-muted">Employees:</span>
                          <span className="small fw-medium">
                            {selectedPayment.totalEmployees}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="small text-muted">
                            Payment Method:
                          </span>
                          <span className="small fw-medium">
                            {selectedPayment.paymentMethod}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="small text-muted">
                            Charges:
                          </span>
                          <span className="small fw-medium text-danger">
                            {selectedPayment.charges}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Tracker */}
                <div className="mb-4">
                  <h6 className="small fw-semibold text-muted mb-2">
                    Payment Progress
                  </h6>
                  <div className="bg-light rounded p-4 d-flex justify-content-center">
                    <PaymentStatusTracker status={selectedPayment.status} />
                  </div>
                </div>

                {/* Payment History */}
                <div>
                  <h6 className="small fw-semibold text-muted mb-2">
                    Payment History
                  </h6>
                  <div className="bg-light rounded p-3">
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <div
                        className="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: "32px", height: "32px" }}
                      >
                        <FileText size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="small fw-medium mb-0">File Generated</p>
                        <p className="small text-muted mb-0">
                          {selectedPayment.generatedDate}
                        </p>
                        <div className="small text-muted">
                          {selectedPayment.encrypted && (
                            <span className="d-inline-flex align-items-center gap-1">
                              <Lock size={12} /> Encrypted
                            </span>
                          )}
                          {selectedPayment.splitByBank && (
                            <span className="d-inline-flex align-items-center gap-1 ms-3">
                              <RefreshCw size={12} /> Split by Bank
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {selectedPayment.processedDate !== "Pending" && (
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div
                          className="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <Send size={16} className="text-success" />
                        </div>
                        <div>
                          <p className="small fw-medium mb-0">Sent to Bank</p>
                          <p className="small text-muted mb-0">
                            {selectedPayment.processedDate}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedPayment.acknowledgment === "Uploaded" && (
                      <div className="d-flex align-items-start gap-3">
                        <div
                          className="rounded-circle bg-info-subtle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <Upload size={16} className="text-info" />
                        </div>
                        <div>
                          <p className="small fw-medium mb-0">
                            Acknowledgement Uploaded
                          </p>
                          <p className="small text-muted mb-0">
                            Processed by bank
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedPayment.failedTransactions > 0 && (
                      <div className="d-flex align-items-start gap-3 mt-3">
                        <div
                          className="rounded-circle bg-danger-subtle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: "32px", height: "32px" }}
                        >
                          <AlertCircle size={16} className="text-danger" />
                        </div>
                        <div>
                          <p className="small fw-medium mb-0">
                            Failed Transactions
                          </p>
                          <p className="small text-muted mb-0">
                            {selectedPayment.failedTransactions} transactions
                            failed
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Included Employees */}
                {selectedPayment.includedEmployees && selectedPayment.includedEmployees.length > 0 && (
                  <div className="mt-4">
                    <h6 className="small fw-semibold text-muted mb-2">
                      Included Employees ({selectedPayment.includedEmployees.length})
                    </h6>
                    <div className="table-responsive">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Bank</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees
                            .filter(emp => selectedPayment.includedEmployees.includes(emp.id))
                            .map(emp => (
                              <tr key={emp.id}>
                                <td>{emp.code}</td>
                                <td>{emp.name}</td>
                                <td>{emp.bankName}</td>
                                <td>{emp.salary}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer d-flex justify-content-between">
                <div>
                  {selectedPayment.status === "Failed" && (
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleRetryFailed(selectedPayment.id)}
                    >
                      <RefreshCw size={14} className="me-2" />
                      Retry Failed
                    </button>
                  )}
                  {selectedPayment.status === "Processed" && (
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => {
                        setSelectedPayment(selectedPayment);
                        setShowUploadModal(true);
                        setShowDetailModal(false);
                      }}
                    >
                      <Upload size={14} className="me-2" />
                      Upload Ack
                    </button>
                  )}
                </div>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      downloadPaymentFile(selectedPayment);
                    }}
                  >
                    <Download size={14} className="me-2" />
                    Download File
                  </button>
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
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
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
                  <label className="form-label fw-semibold">
                    Select Acknowledgement File
                  </label>
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      accept=".txt,.csv,.xml,.json,.pdf"
                      onChange={(e) => setUploadFile(e.target.files[0])}
                    />
                  </div>
                  <div className="small text-muted mt-2">
                    Supported formats: TXT, CSV, XML, JSON, PDF (Bank-specific formats)
                  </div>
                </div>

                {uploadFile && (
                  <div className="alert alert-info">
                    <div className="d-flex align-items-center gap-2">
                      <FileText size={16} />
                      <div>
                        <strong>Selected file:</strong> {uploadFile.name}
                        <div className="small">
                          Size: {(uploadFile.size / 1024).toFixed(2)} KB
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment && (
                  <div className="alert alert-warning">
                    <AlertCircle size={16} className="me-2" />
                    <strong>Payment:</strong> {selectedPayment.fileName}
                    <div className="small mt-1">
                      Reference: {selectedPayment.referenceNumber} | 
                      Amount: {selectedPayment.totalAmount}
                    </div>
                  </div>
                )}

                <div className="alert alert-warning">
                  <AlertCircle size={16} className="me-2" />
                  <strong>Note:</strong> Uploading acknowledgement will mark the
                  payment as processed and update transaction status.
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
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
        >
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
                        <h4 className="fw-bold">
                          {reconciliationStats.totalAmount}
                        </h4>
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
                        <h4 className="fw-bold">
                          {reconciliationStats.matchedTransactions}
                        </h4>
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
                        <h4 className="fw-bold">
                          {reconciliationStats.unmatchedTransactions}
                        </h4>
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
                        <h4 className="fw-bold">
                          {reconciliationStats.pendingVerification}
                        </h4>
                        <p className="text-muted small mb-0">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reconciliation Table */}
                <div className="card border">
                  <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Reconciliation Details</h6>
                    <div className="small text-muted">
                      Success Rate: {reconciliationStats.successRate}
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="px-4 py-3">Transaction ID</th>
                            <th className="px-4 py-3">Employee</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Bank Reference</th>
                            <th className="px-4 py-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reconciliationData.map((record) => (
                            <tr key={record.id}>
                              <td className="px-4 py-3">
                                <div className="fw-medium">
                                  {record.transactionId}
                                </div>
                                <div className="small text-muted">
                                  Ref: {record.reference}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="fw-medium">
                                  {record.employeeName}
                                </div>
                                <div className="small text-muted">
                                  {record.employeeCode}
                                </div>
                                <div className="small">
                                  {record.bank} • {record.accountNumber}
                                </div>
                              </td>
                              <td className="px-4 py-3 fw-bold">
                                {record.amount}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`badge ${
                                    record.status === "Matched"
                                      ? "bg-success-subtle text-success"
                                      : record.status === "Unmatched"
                                      ? "bg-danger-subtle text-danger"
                                      : "bg-warning-subtle text-warning"
                                  }`}
                                >
                                  {record.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">{record.date}</td>
                              <td className="px-4 py-3">
                                {record.bankReference || (
                                  <span className="text-muted">N/A</span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <button 
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => {
                                    toast.info(`Viewing details for ${record.transactionId}`);
                                  }}
                                >
                                  Details
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
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => {
                        handleExportReport('pdf');
                      }}
                    >
                      <Download size={16} className="me-2" />
                      Export Report
                    </button>
                    <button 
                      className="btn btn-outline-success"
                      onClick={() => {
                        setReconciliationData(reconciliationData.map(r => ({
                          ...r,
                          status: "Matched"
                        })));
                        toast.success("All transactions marked as verified");
                      }}
                    >
                      <CheckCircle size={16} className="me-2" />
                      Mark All as Verified
                    </button>
                    <button 
                      className="btn btn-outline-warning"
                      onClick={() => {
                        toast.info("Transactions flagged for review");
                      }}
                    >
                      <AlertCircle size={16} className="me-2" />
                      Flag for Review
                    </button>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => {
                        toast.warning("Discrepancy reported to bank");
                      }}
                    >
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

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default BankTransfer;