import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, Printer, Eye, Edit, Package, Truck, Wrench,
  FileText, Settings, BarChart3, Database, ArchiveRestore, ShieldCheck,
  TrendingDown, Users, DollarSign, Percent as PercentIcon, Calendar,
  AlertCircle, Check, Save, Info, CheckCircle, TrendingUp, RefreshCw,
  Calculator, X, Laptop, Smartphone, Monitor, Tablet, Server, Router,
  Headphones, Printer as PrinterIcon, Scan, Home, Building, MapPin,
  ExternalLink, Clock, Shield, Zap, Bot, Brain, Sparkles, Target,
  User, Phone, Mail, Map, Globe, Lock, Unlock, Key
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jsPDF } from 'jspdf';

// Custom icon components for missing ones
const Chair = (props) => <div {...props}>🪑</div>;
const Car = (props) => <div {...props}>🚗</div>;

const AssestManagement = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  // New state variables for action buttons
  const [showViewModal, setShowViewModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editAsset, setEditAsset] = useState(null);
  const [showAllocationDetails, setShowAllocationDetails] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [showMaintenanceDetails, setShowMaintenanceDetails] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showReallocateModal, setShowReallocateModal] = useState(false);
  
  // Asset Master Data
  const [assetMaster, setAssetMaster] = useState([
    {
      id: 1,
      assetId: 'AST001',
      assetTag: 'LAP-2024-001',
      assetName: 'Dell Latitude 5440',
      category: 'Laptop',
      make: 'Dell',
      model: 'Latitude 5440',
      serialNumber: 'SN-DL5440-001',
      purchaseDate: '2024-01-15',
      purchasePrice: '₹85,000',
      currentValue: '₹72,250',
      depreciationRate: '15%',
      condition: 'Excellent',
      location: 'Head Office - Floor 3',
      department: 'Engineering',
      status: 'Allocated',
      allocatedTo: 'EMP001 - Rahul Sharma',
      allocationDate: '2024-01-20',
      warrantyUntil: '2026-01-14',
      insurancePolicy: 'INS-2024-001',
      insuranceProvider: 'ICICI Lombard',
      lastMaintenance: '2024-03-15',
      nextMaintenance: '2024-06-15',
      maintenanceHistory: [
        { date: '2024-01-20', type: 'Initial Setup', cost: '0', technician: 'IT Team' },
        { date: '2024-03-15', type: 'Routine Check', cost: '₹1,500', technician: 'Tech Support' }
      ]
    },
    {
      id: 2,
      assetId: 'AST002',
      assetTag: 'DSK-2023-045',
      assetName: 'HP EliteDesk 800 G5',
      category: 'Desktop',
      make: 'HP',
      model: 'EliteDesk 800 G5',
      serialNumber: 'SN-HP800G5-045',
      purchaseDate: '2023-06-10',
      purchasePrice: '₹65,000',
      currentValue: '₹48,750',
      depreciationRate: '20%',
      condition: 'Good',
      location: 'Branch Office - Mumbai',
      department: 'Sales',
      status: 'Allocated',
      allocatedTo: 'EMP003 - Amit Kumar',
      allocationDate: '2023-06-20',
      warrantyUntil: '2025-06-09',
      insurancePolicy: 'INS-2023-045',
      insuranceProvider: 'HDFC Ergo',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-08-10',
      maintenanceHistory: [
        { date: '2023-06-20', type: 'Initial Setup', cost: '0', technician: 'IT Team' },
        { date: '2024-02-10', type: 'RAM Upgrade', cost: '₹3,500', technician: 'Hardware Team' }
      ]
    },
    {
      id: 3,
      assetId: 'AST003',
      assetTag: 'MOB-2024-012',
      assetName: 'iPhone 15 Pro',
      category: 'Mobile',
      make: 'Apple',
      model: 'iPhone 15 Pro',
      serialNumber: 'SN-IP15P-012',
      purchaseDate: '2024-02-01',
      purchasePrice: '₹1,35,000',
      currentValue: '₹1,21,500',
      depreciationRate: '10%',
      condition: 'Excellent',
      location: 'Head Office - Floor 2',
      department: 'Marketing',
      status: 'Allocated',
      allocatedTo: 'EMP002 - Priya Patel',
      allocationDate: '2024-02-05',
      warrantyUntil: '2025-08-01',
      insurancePolicy: 'INS-2024-012',
      insuranceProvider: 'Bajaj Allianz',
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-09-01',
      maintenanceHistory: [
        { date: '2024-02-05', type: 'Initial Setup', cost: '0', technician: 'IT Team' },
        { date: '2024-03-01', type: 'Screen Protector', cost: '₹1,200', technician: 'Mobile Support' }
      ]
    },
    {
      id: 4,
      assetId: 'AST004',
      assetTag: 'TAB-2023-078',
      assetName: 'iPad Pro 12.9"',
      category: 'Tablet',
      make: 'Apple',
      model: 'iPad Pro 12.9"',
      serialNumber: 'SN-IPADP-078',
      purchaseDate: '2023-09-15',
      purchasePrice: '₹1,10,000',
      currentValue: '₹88,000',
      depreciationRate: '20%',
      condition: 'Good',
      location: 'Head Office - Floor 3',
      department: 'Design',
      status: 'Allocated',
      allocatedTo: 'EMP004 - Sneha Reddy',
      allocationDate: '2023-09-25',
      warrantyUntil: '2025-03-14',
      insurancePolicy: 'INS-2023-078',
      insuranceProvider: 'ICICI Lombard',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-07-20',
      maintenanceHistory: [
        { date: '2023-09-25', type: 'Initial Setup', cost: '0', technician: 'IT Team' },
        { date: '2024-01-20', type: 'Battery Check', cost: '₹800', technician: 'Mobile Support' }
      ]
    },
    {
      id: 5,
      assetId: 'AST005',
      assetTag: 'ACC-2024-023',
      assetName: 'Dell Professional Dock',
      category: 'Accessories',
      make: 'Dell',
      model: 'WD19TBS',
      serialNumber: 'SN-DLDOCK-023',
      purchaseDate: '2024-01-20',
      purchasePrice: '₹18,000',
      currentValue: '₹15,300',
      depreciationRate: '15%',
      condition: 'Excellent',
      location: 'Head Office - Floor 3',
      department: 'Engineering',
      status: 'Allocated',
      allocatedTo: 'EMP001 - Rahul Sharma',
      allocationDate: '2024-01-25',
      warrantyUntil: '2026-01-19',
      insurancePolicy: 'INS-2024-023',
      insuranceProvider: 'ICICI Lombard',
      lastMaintenance: null,
      nextMaintenance: null,
      maintenanceHistory: []
    },
    {
      id: 6,
      assetId: 'AST006',
      assetTag: 'LAP-2022-156',
      assetName: 'Lenovo ThinkPad X1 Carbon',
      category: 'Laptop',
      make: 'Lenovo',
      model: 'ThinkPad X1 Carbon Gen 9',
      serialNumber: 'SN-LNX1C-156',
      purchaseDate: '2022-11-05',
      purchasePrice: '₹1,20,000',
      currentValue: '₹72,000',
      depreciationRate: '30%',
      condition: 'Fair',
      location: 'IT Store Room',
      department: 'IT',
      status: 'Available',
      allocatedTo: null,
      allocationDate: null,
      warrantyUntil: '2024-11-04',
      insurancePolicy: 'INS-2022-156',
      insuranceProvider: 'HDFC Ergo',
      lastMaintenance: '2024-02-28',
      nextMaintenance: '2024-08-28',
      maintenanceHistory: [
        { date: '2022-11-10', type: 'Initial Setup', cost: '0', technician: 'IT Team' },
        { date: '2023-08-15', type: 'Keyboard Replacement', cost: '₹4,500', technician: 'Hardware Team' },
        { date: '2024-02-28', type: 'Battery Replacement', cost: '₹6,200', technician: 'Hardware Team' }
      ]
    },
    {
      id: 7,
      assetId: 'AST007',
      assetTag: 'MON-2023-089',
      assetName: 'Dell UltraSharp 27"',
      category: 'Monitor',
      make: 'Dell',
      model: 'U2723QE',
      serialNumber: 'SN-DLU27-089',
      purchaseDate: '2023-07-20',
      purchasePrice: '₹45,000',
      currentValue: '₹33,750',
      depreciationRate: '25%',
      condition: 'Good',
      location: 'IT Store Room',
      department: 'IT',
      status: 'Available',
      allocatedTo: null,
      allocationDate: null,
      warrantyUntil: '2025-07-19',
      insurancePolicy: 'INS-2023-089',
      insuranceProvider: 'ICICI Lombard',
      lastMaintenance: null,
      nextMaintenance: null,
      maintenanceHistory: []
    },
    {
      id: 8,
      assetId: 'AST008',
      assetTag: 'MOB-2023-067',
      assetName: 'Samsung Galaxy S23',
      category: 'Mobile',
      make: 'Samsung',
      model: 'Galaxy S23',
      serialNumber: 'SN-SGS23-067',
      purchaseDate: '2023-05-12',
      purchasePrice: '₹85,000',
      currentValue: '₹59,500',
      depreciationRate: '30%',
      condition: 'Damaged',
      location: 'Repair Center',
      department: 'IT',
      status: 'Under Repair',
      allocatedTo: 'EMP008 - Neha Gupta',
      allocationDate: '2023-05-20',
      warrantyUntil: '2025-05-11',
      insurancePolicy: 'INS-2023-067',
      insuranceProvider: 'Bajaj Allianz',
      lastMaintenance: '2024-03-10',
      nextMaintenance: '2024-06-10',
      maintenanceHistory: [
        { date: '2023-05-20', type: 'Initial Setup', cost: '0', technician: 'IT Team' },
        { date: '2024-03-10', type: 'Screen Repair', cost: '₹12,000', technician: 'Authorized Service' }
      ]
    }
  ]);

  // Asset Categories
  const assetCategories = [
    { value: 'Laptop', label: 'Laptop', icon: <Laptop size={16} /> },
    { value: 'Desktop', label: 'Desktop', icon: <Monitor size={16} /> },
    { value: 'Mobile', label: 'Mobile', icon: <Smartphone size={16} /> },
    { value: 'Tablet', label: 'Tablet', icon: <Tablet size={16} /> },
    { value: 'Monitor', label: 'Monitor', icon: <Monitor size={16} /> },
    { value: 'Printer', label: 'Printer', icon: <PrinterIcon size={16} /> },
    { value: 'Scanner', label: 'Scanner', icon: <Scan size={16} /> },
    { value: 'Server', label: 'Server', icon: <Server size={16} /> },
    { value: 'Network', label: 'Network Equipment', icon: <Router size={16} /> },
    { value: 'Accessories', label: 'Accessories', icon: <Headphones size={16} /> },
    { value: 'Furniture', label: 'Furniture', icon: <Chair size={16} /> },
    { value: 'Vehicle', label: 'Vehicle', icon: <Car size={16} /> },
    { value: 'Other', label: 'Other', icon: <Package size={16} /> }
  ];

  // Asset Conditions
  const assetConditions = [
    { value: 'Brand New', label: 'Brand New', color: 'success' },
    { value: 'Excellent', label: 'Excellent', color: 'success' },
    { value: 'Good', label: 'Good', color: 'info' },
    { value: 'Fair', label: 'Fair', color: 'warning' },
    { value: 'Poor', label: 'Poor', color: 'warning' },
    { value: 'Damaged', label: 'Damaged', color: 'danger' },
    { value: 'Beyond Repair', label: 'Beyond Repair', color: 'dark' }
  ];

  // Asset Statuses
  const assetStatuses = [
    { value: 'Available', label: 'Available', color: 'success' },
    { value: 'Allocated', label: 'Allocated', color: 'primary' },
    { value: 'Under Repair', label: 'Under Repair', color: 'warning' },
    { value: 'Lost', label: 'Lost', color: 'danger' },
    { value: 'Retired', label: 'Retired', color: 'secondary' },
    { value: 'Disposed', label: 'Disposed', color: 'dark' }
  ];

  // Asset Allocations
  const [assetAllocations, setAssetAllocations] = useState([
    {
      id: 1,
      allocationId: 'ALLOC-2024-001',
      assetId: 'AST001',
      assetName: 'Dell Latitude 5440',
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      department: 'Engineering',
      allocationDate: '2024-01-20',
      expectedReturnDate: '2026-01-19',
      allocationType: 'New Joining',
      allocationReason: 'Standard issue for Senior Software Engineer',
      approvedBy: 'Manager - Rajesh Kumar',
      handoverChecklist: [
        { item: 'Laptop', checked: true },
        { item: 'Charger', checked: true },
        { item: 'Docking Station', checked: true },
        { item: 'Laptop Bag', checked: true },
        { item: 'User Manual', checked: true }
      ],
      termsAccepted: true,
      termsAcceptedDate: '2024-01-20',
      insuranceCoverage: 'Full coverage',
      status: 'Active',
      handoverDate: '2024-01-20',
      handoverBy: 'IT Admin - Sunil Verma',
      acknowledgment: 'Signed digitally on portal',
      notes: 'Employee acknowledged all terms and conditions'
    },
    {
      id: 2,
      allocationId: 'ALLOC-2024-002',
      assetId: 'AST003',
      assetName: 'iPhone 15 Pro',
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      department: 'Marketing',
      allocationDate: '2024-02-05',
      expectedReturnDate: '2025-08-04',
      allocationType: 'Role Change',
      allocationReason: 'Promotion to Marketing Manager - requires mobile device',
      approvedBy: 'Director - Meena Sharma',
      handoverChecklist: [
        { item: 'Mobile Phone', checked: true },
        { item: 'Charger', checked: true },
        { item: 'Earphones', checked: true },
        { item: 'Protective Case', checked: true }
      ],
      termsAccepted: true,
      termsAcceptedDate: '2024-02-05',
      insuranceCoverage: 'Full coverage with screen protection',
      status: 'Active',
      handoverDate: '2024-02-05',
      handoverBy: 'IT Admin - Sunil Verma',
      acknowledgment: 'Signed digitally',
      notes: 'Employee requires mobile for client meetings'
    },
    {
      id: 3,
      allocationId: 'ALLOC-2023-045',
      assetId: 'AST002',
      assetName: 'HP EliteDesk 800 G5',
      employeeId: 'EMP003',
      employeeName: 'Amit Kumar',
      department: 'Sales',
      allocationDate: '2023-06-20',
      expectedReturnDate: '2025-06-19',
      allocationType: 'New Joining',
      allocationReason: 'Standard desktop for Sales Executive',
      approvedBy: 'Sales Head - Vikas Singh',
      handoverChecklist: [
        { item: 'CPU', checked: true },
        { item: 'Monitor', checked: true },
        { item: 'Keyboard', checked: true },
        { item: 'Mouse', checked: true },
        { item: 'UPS', checked: true }
      ],
      termsAccepted: true,
      termsAcceptedDate: '2023-06-20',
      insuranceCoverage: 'Basic coverage',
      status: 'Active',
      handoverDate: '2023-06-20',
      handoverBy: 'IT Support - Rohan Mehta',
      acknowledgment: 'Physical signature on form',
      notes: 'Standard desktop setup completed'
    }
  ]);

  // Asset Returns
  const [assetReturns, setAssetReturns] = useState([
    {
      id: 1,
      returnId: 'RET-2024-001',
      assetId: 'AST009',
      assetName: 'MacBook Pro 16"',
      employeeId: 'EMP007',
      employeeName: 'Kavya Singh',
      department: 'Product',
      allocationDate: '2023-03-15',
      returnDate: '2024-03-10',
      returnReason: 'Employee Resignation',
      conditionAtReturn: 'Good',
      physicalVerification: true,
      verificationBy: 'IT Admin - Sunil Verma',
      returnChecklist: [
        { item: 'Laptop', checked: true },
        { item: 'Charger', checked: true },
        { item: 'Laptop Bag', checked: false },
        { item: 'USB-C Hub', checked: true }
      ],
      missingItems: ['Laptop Bag'],
      damageDetails: 'Minor scratches on lid',
      penaltyAmount: '₹3,000',
      penaltyReason: 'Missing laptop bag',
      clearanceCertificate: 'CERT-2024-001',
      certificateIssuedDate: '2024-03-12',
      status: 'Completed',
      notes: 'Employee paid penalty, certificate issued'
    },
    {
      id: 2,
      returnId: 'RET-2024-002',
      assetId: 'AST010',
      assetName: 'Dell XPS 13',
      employeeId: 'EMP009',
      employeeName: 'Vikram Rao',
      department: 'Engineering',
      allocationDate: '2023-08-10',
      returnDate: '2024-03-15',
      returnReason: 'Internal Transfer',
      conditionAtReturn: 'Excellent',
      physicalVerification: true,
      verificationBy: 'IT Support - Rohan Mehta',
      returnChecklist: [
        { item: 'Laptop', checked: true },
        { item: 'Charger', checked: true },
        { item: 'Sleeve', checked: true },
        { item: 'Dongle', checked: true }
      ],
      missingItems: [],
      damageDetails: 'No damage',
      penaltyAmount: '₹0',
      penaltyReason: '',
      clearanceCertificate: 'CERT-2024-002',
      certificateIssuedDate: '2024-03-16',
      status: 'Completed',
      notes: 'Asset in perfect condition, ready for re-allocation'
    }
  ]);

  // Maintenance History
  const [maintenanceHistory, setMaintenanceHistory] = useState([
    {
      id: 1,
      maintenanceId: 'MNT-2024-001',
      assetId: 'AST008',
      assetName: 'Samsung Galaxy S23',
      maintenanceType: 'Repair',
      maintenanceDate: '2024-03-10',
      cost: '₹12,000',
      performedBy: 'Authorized Service Center',
      description: 'Screen replacement due to accidental damage',
      nextMaintenanceDate: '2024-06-10',
      warrantyCovered: false,
      status: 'Completed',
      attachments: ['Repair_Invoice.pdf', 'Before_After_Photos.zip']
    },
    {
      id: 2,
      maintenanceId: 'MNT-2024-002',
      assetId: 'AST006',
      assetName: 'Lenovo ThinkPad X1 Carbon',
      maintenanceType: 'Preventive',
      maintenanceDate: '2024-02-28',
      cost: '₹6,200',
      performedBy: 'Hardware Team',
      description: 'Battery replacement and system cleanup',
      nextMaintenanceDate: '2024-08-28',
      warrantyCovered: false,
      status: 'Completed',
      attachments: ['Battery_Invoice.pdf', 'Service_Report.pdf']
    },
    {
      id: 3,
      maintenanceId: 'MNT-2024-003',
      assetId: 'AST001',
      assetName: 'Dell Latitude 5440',
      maintenanceType: 'Routine Check',
      maintenanceDate: '2024-03-15',
      cost: '₹1,500',
      performedBy: 'Tech Support',
      description: 'Software updates and hardware diagnostics',
      nextMaintenanceDate: '2024-06-15',
      warrantyCovered: true,
      status: 'Completed',
      attachments: ['Diagnostic_Report.pdf']
    }
  ]);

  // Insurance Policies
  const [insurancePolicies, setInsurancePolicies] = useState([
    {
      id: 1,
      policyId: 'INS-2024-001',
      assetId: 'AST001',
      assetName: 'Dell Latitude 5440',
      provider: 'ICICI Lombard',
      policyNumber: 'ICL-2024-854632',
      coverageAmount: '₹85,000',
      premium: '₹8,500',
      coverageType: 'Comprehensive',
      startDate: '2024-01-16',
      endDate: '2025-01-15',
      coverageDetails: 'Accidental damage, theft, fire, natural disasters',
      deductible: '₹5,000',
      status: 'Active',
      claims: [
        { date: '2024-02-10', claimId: 'CLM-2024-001', amount: '₹15,000', status: 'Approved' }
      ]
    },
    {
      id: 2,
      policyId: 'INS-2024-012',
      assetId: 'AST003',
      assetName: 'iPhone 15 Pro',
      provider: 'Bajaj Allianz',
      policyNumber: 'BAJ-2024-745821',
      coverageAmount: '₹1,35,000',
      premium: '₹13,500',
      coverageType: 'Premium',
      startDate: '2024-02-02',
      endDate: '2025-02-01',
      coverageDetails: 'Accidental damage, theft, liquid damage, screen breakage',
      deductible: '₹7,500',
      status: 'Active',
      claims: []
    }
  ]);

  // Depreciation Schedule
  const [depreciationSchedule, setDepreciationSchedule] = useState([
    {
      id: 1,
      assetId: 'AST001',
      assetName: 'Dell Latitude 5440',
      purchasePrice: '₹85,000',
      depreciationRate: '15%',
      depreciationMethod: 'Straight Line',
      usefulLife: '3 years',
      currentValue: '₹72,250',
      yearlyDepreciation: '₹12,750',
      accumulatedDepreciation: '₹12,750',
      netBookValue: '₹72,250',
      nextDepreciationDate: '2025-01-15',
      salvageValue: '₹8,500'
    },
    {
      id: 2,
      assetId: 'AST002',
      assetName: 'HP EliteDesk 800 G5',
      purchasePrice: '₹65,000',
      depreciationRate: '20%',
      depreciationMethod: 'Straight Line',
      usefulLife: '3 years',
      currentValue: '₹48,750',
      yearlyDepreciation: '₹13,000',
      accumulatedDepreciation: '₹16,250',
      netBookValue: '₹48,750',
      nextDepreciationDate: '2024-06-10',
      salvageValue: '₹6,500'
    }
  ]);

  // Statistics
  const statistics = {
    totalAssets: assetMaster.length,
    allocatedAssets: assetMaster.filter(a => a.status === 'Allocated').length,
    availableAssets: assetMaster.filter(a => a.status === 'Available').length,
    underRepair: assetMaster.filter(a => a.status === 'Under Repair').length,
    totalValue: assetMaster.reduce((sum, asset) => sum + parseInt(asset.currentValue.replace(/[^0-9]/g, '')), 0),
    pendingReturns: 2,
    upcomingMaintenance: 3,
    expiringInsurance: 1
  };

  // Departments
  const departments = [
    'Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 
    'Operations', 'IT', 'Design', 'Product', 'Support'
  ];

  // Locations
  const locations = [
    'Head Office - Floor 1',
    'Head Office - Floor 2',
    'Head Office - Floor 3',
    'Branch Office - Mumbai',
    'Branch Office - Bangalore',
    'Branch Office - Delhi',
    'IT Store Room',
    'Repair Center',
    'Warehouse'
  ];

  // Utility Functions
  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    const numericAmount = typeof amount === 'string' ? parseInt(amount.replace(/[^0-9]/g, '')) : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(numericAmount);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Available': return <span className="badge bg-success">Available</span>;
      case 'Allocated': return <span className="badge bg-primary">Allocated</span>;
      case 'Under Repair': return <span className="badge bg-warning">Under Repair</span>;
      case 'Lost': return <span className="badge bg-danger">Lost</span>;
      case 'Retired': return <span className="badge bg-secondary">Retired</span>;
      case 'Disposed': return <span className="badge bg-dark">Disposed</span>;
      default: return <span className="badge bg-info">{status}</span>;
    }
  };

  const getConditionBadge = (condition) => {
    const cond = assetConditions.find(c => c.value === condition);
    if (cond) {
      return <span className={`badge bg-${cond.color}`}>{condition}</span>;
    }
    return <span className="badge bg-secondary">{condition}</span>;
  };

  const getCategoryIcon = (category) => {
    const cat = assetCategories.find(c => c.value === category);
    return cat ? cat.icon : <Package size={16} />;
  };

  // Action Button Handlers - FIXED VERSION
  const handleViewAsset = (asset) => {
    setSelectedAsset(asset);
    setShowViewModal(true);
  };

  const handleEditAsset = (asset) => {
    setEditAsset(asset);
    setEditMode(true);
    setShowAssetModal(true);
  };

  const handleAllocateAssetClick = (asset) => {
    if (asset.status === 'Available') {
      setSelectedAsset(asset);
      setShowAllocationModal(true);
    } else {
      alert(`Cannot allocate ${asset.assetName}. Current status: ${asset.status}`);
    }
  };

  const handleMaintenanceClick = (asset) => {
    setSelectedAsset(asset);
    setShowMaintenanceModal(true);
  };

  const handleViewAllocationDetails = (allocation) => {
    setSelectedAllocation(allocation);
    setShowAllocationDetails(true);
  };

  const handleInitiateReturn = (allocation) => {
    const asset = assetMaster.find(a => a.assetId === allocation.assetId);
    if (asset) {
      setSelectedAsset(asset);
      setShowReturnModal(true);
    }
  };

  const handleViewMaintenanceDetails = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setShowMaintenanceDetails(true);
  };

  const handleEditMaintenance = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setShowMaintenanceModal(true);
  };

  const handleViewPolicyDetails = (policy) => {
    const asset = assetMaster.find(a => a.assetId === policy.assetId);
    if (asset) {
      setSelectedAsset(asset);
      setShowViewModal(true);
    }
  };

  const handleFileClaim = (policy) => {
    const asset = assetMaster.find(a => a.assetId === policy.assetId);
    if (asset) {
      setSelectedAsset(asset);
      setShowClaimModal(true);
    }
  };

  const handleReallocateAsset = (returnItem) => {
    const asset = assetMaster.find(a => a.assetId === returnItem.assetId);
    if (asset && asset.status === 'Available') {
      setSelectedAsset(asset);
      setShowReallocateModal(true);
    } else {
      alert('Asset is not available for reallocation');
    }
  };

  // Additional Action Handlers
  const handleDeleteAsset = (assetId) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      setAssetMaster(prev => prev.filter(asset => asset.id !== assetId));
      alert('Asset deleted successfully!');
    }
  };

  const handleBulkDelete = () => {
    if (selectedAssets.length === 0) {
      alert('Please select assets to delete');
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${selectedAssets.length} selected assets?`)) {
      setAssetMaster(prev => prev.filter(asset => !selectedAssets.includes(asset.id)));
      setSelectedAssets([]);
      alert(`${selectedAssets.length} assets deleted successfully!`);
    }
  };

  // Simple Table Drawing Function for PDF
  const drawTable = (doc, headers, data, startX, startY, options = {}) => {
    const { fontSize = 8, headerBackground = [41, 128, 185], rowHeight = 10 } = options;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const availableWidth = pageWidth - (margin * 2);
    const colCount = headers.length;
    const colWidth = availableWidth / colCount;
    
    let currentY = startY;
    let currentX = margin;
    
    // Draw header
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(...headerBackground);
    doc.rect(currentX, currentY, availableWidth, rowHeight, 'F');
    doc.setTextColor(255, 255, 255);
    
    headers.forEach((header, index) => {
      const x = currentX + (colWidth * index) + 2;
      const y = currentY + (rowHeight / 2) + 2;
      const text = typeof header === 'string' ? header.substring(0, 15) : String(header).substring(0, 15);
      doc.text(text, x, y);
    });
    
    currentY += rowHeight;
    
    // Draw data rows
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    data.forEach((row, rowIndex) => {
      // Alternate row background
      if (rowIndex % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(currentX, currentY, availableWidth, rowHeight, 'F');
      }
      
      // Draw cell borders
      doc.setDrawColor(200, 200, 200);
      for (let i = 0; i <= colCount; i++) {
        doc.line(currentX + (colWidth * i), currentY, currentX + (colWidth * i), currentY + rowHeight);
      }
      doc.line(currentX, currentY, currentX + availableWidth, currentY);
      doc.line(currentX, currentY + rowHeight, currentX + availableWidth, currentY + rowHeight);
      
      // Draw cell content
      headers.forEach((header, colIndex) => {
        const x = currentX + (colWidth * colIndex) + 2;
        const y = currentY + (rowHeight / 2) + 2;
        let cellValue = row[colIndex];
        if (cellValue === undefined || cellValue === null) cellValue = '';
        const text = String(cellValue).substring(0, 20);
        doc.text(text, x, y);
      });
      
      currentY += rowHeight;
      
      // Check for page break
      if (currentY > 280) {
        doc.addPage();
        currentY = margin;
        // Redraw header on new page
        doc.setFillColor(...headerBackground);
        doc.rect(currentX, currentY, availableWidth, rowHeight, 'F');
        doc.setTextColor(255, 255, 255);
        headers.forEach((header, index) => {
          const x = currentX + (colWidth * index) + 2;
          const y = currentY + (rowHeight / 2) + 2;
          doc.text(header.substring(0, 15), x, y);
        });
        currentY += rowHeight;
        doc.setTextColor(0, 0, 0);
      }
    });
    
    return { finalY: currentY + 5 };
  };

  // PDF Report Generation Functions
  const generateAssetInventoryPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    
    // Report Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('ASSET INVENTORY REPORT', pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 22, { align: 'center' });
    doc.text(`Company: Asset Management System`, pageWidth / 2, 27, { align: 'center' });
    
    // Summary Section
    let yPos = 35;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SUMMARY STATISTICS', 20, yPos);
    
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const allocatedCount = assetMaster.filter(a => a.status === 'Allocated').length;
    const availableCount = assetMaster.filter(a => a.status === 'Available').length;
    const underRepairCount = assetMaster.filter(a => a.status === 'Under Repair').length;
    const totalValue = assetMaster.reduce((sum, asset) => sum + parseInt(asset.currentValue.replace(/[^0-9]/g, '')), 0);
    
    doc.text(`Total Assets: ${assetMaster.length}`, 20, yPos);
    doc.text(`Total Value: ${formatCurrency(totalValue)}`, 100, yPos);
    yPos += 6;
    doc.text(`Allocated: ${allocatedCount}`, 20, yPos);
    doc.text(`Available: ${availableCount}`, 100, yPos);
    yPos += 6;
    doc.text(`Under Repair: ${underRepairCount}`, 20, yPos);
    doc.text(`Utilization: ${Math.round((allocatedCount / assetMaster.length) * 100)}%`, 100, yPos);
    yPos += 15;
    
    // Asset Details Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ASSET DETAILS', 20, yPos);
    yPos += 8;
    
    const headers = ['Asset Tag', 'Asset Name', 'Category', 'Status', 'Value', 'Location'];
    const tableData = assetMaster.map(asset => [
      asset.assetTag,
      asset.assetName,
      asset.category,
      asset.status,
      asset.currentValue,
      asset.location
    ]);
    
    const tableResult = drawTable(doc, headers, tableData, 20, yPos, {
      fontSize: 7,
      headerBackground: [41, 128, 185]
    });
    
    yPos = tableResult.finalY + 10;
    
    // Category-wise Summary
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CATEGORY-WISE SUMMARY', 20, yPos);
    yPos += 8;
    
    const categories = [...new Set(assetMaster.map(a => a.category))];
    const categoryData = categories.map(category => {
      const categoryAssets = assetMaster.filter(a => a.category === category);
      const categoryValue = categoryAssets.reduce((sum, asset) => 
        sum + parseInt(asset.currentValue.replace(/[^0-9]/g, '')), 0
      );
      return [
        category,
        categoryAssets.length,
        formatCurrency(categoryValue)
      ];
    });
    
    drawTable(doc, ['Category', 'Count', 'Total Value'], categoryData, 20, yPos, {
      headerBackground: [39, 174, 96]
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 285, { align: 'center' });
      doc.text('Confidential - Asset Management System', pageWidth / 2, 290, { align: 'center' });
    }
    
    // Save PDF
    doc.save(`asset-inventory-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateEmployeeWisePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    
    // Report Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('EMPLOYEE ASSET ALLOCATION REPORT', pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 22, { align: 'center' });
    
    // Summary
    let yPos = 30;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ALLOCATION SUMMARY', 20, yPos);
    yPos += 8;
    
    const activeAllocations = assetAllocations.filter(a => a.status === 'Active');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Active Allocations: ${activeAllocations.length}`, 20, yPos);
    doc.text(`Employees: ${[...new Set(activeAllocations.map(a => a.employeeName))].length}`, 100, yPos);
    yPos += 10;
    
    // Allocations Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ASSET ALLOCATIONS', 20, yPos);
    yPos += 8;
    
    const headers = ['Allocation ID', 'Asset', 'Employee', 'Department', 'Allocation Date'];
    const tableData = activeAllocations.map(allocation => [
      allocation.allocationId,
      allocation.assetName,
      allocation.employeeName,
      allocation.department,
      allocation.allocationDate
    ]);
    
    drawTable(doc, headers, tableData, 20, yPos, {
      fontSize: 7,
      headerBackground: [41, 128, 185]
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 285, { align: 'center' });
      doc.text('Confidential - Asset Management System', pageWidth / 2, 290, { align: 'center' });
    }
    
    doc.save(`employee-asset-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateDepreciationPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    
    // Report Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('ASSET DEPRECIATION REPORT', pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 22, { align: 'center' });
    
    // Summary
    let yPos = 30;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DEPRECIATION SUMMARY', 20, yPos);
    yPos += 8;
    
    const totalPurchase = depreciationSchedule.reduce((sum, asset) => 
      sum + parseInt(asset.purchasePrice.replace(/[^0-9]/g, '')), 0
    );
    const totalCurrent = depreciationSchedule.reduce((sum, asset) => 
      sum + parseInt(asset.currentValue.replace(/[^0-9]/g, '')), 0
    );
    const totalDepreciation = totalPurchase - totalCurrent;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Assets: ${depreciationSchedule.length}`, 20, yPos);
    doc.text(`Total Purchase Value: ${formatCurrency(totalPurchase)}`, 100, yPos);
    yPos += 6;
    doc.text(`Total Current Value: ${formatCurrency(totalCurrent)}`, 20, yPos);
    doc.text(`Total Depreciation: ${formatCurrency(totalDepreciation)}`, 100, yPos);
    yPos += 15;
    
    // Depreciation Schedule Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DEPRECIATION SCHEDULE', 20, yPos);
    yPos += 8;
    
    const headers = ['Asset', 'Purchase Price', 'Current Value', 'Dep %', 'Yearly Dep', 'Acc Dep', 'NBV'];
    const tableData = depreciationSchedule.map(schedule => [
      schedule.assetName,
      schedule.purchasePrice,
      schedule.currentValue,
      schedule.depreciationRate,
      schedule.yearlyDepreciation,
      schedule.accumulatedDepreciation,
      schedule.netBookValue
    ]);
    
    drawTable(doc, headers, tableData, 20, yPos, {
      fontSize: 7,
      headerBackground: [155, 89, 182]
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 285, { align: 'center' });
      doc.text('Confidential - Asset Management System', pageWidth / 2, 290, { align: 'center' });
    }
    
    doc.save(`depreciation-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateMaintenancePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    
    // Report Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('MAINTENANCE HISTORY REPORT', pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 22, { align: 'center' });
    
    // Summary
    let yPos = 30;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('MAINTENANCE SUMMARY', 20, yPos);
    yPos += 8;
    
    const totalCost = maintenanceHistory.reduce((sum, record) => 
      sum + parseInt(record.cost.replace(/[^0-9]/g, '')), 0
    );
    const warrantyCovered = maintenanceHistory.filter(m => m.warrantyCovered).length;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Records: ${maintenanceHistory.length}`, 20, yPos);
    doc.text(`Total Cost: ${formatCurrency(totalCost)}`, 100, yPos);
    yPos += 6;
    doc.text(`Warranty Covered: ${warrantyCovered}`, 20, yPos);
    yPos += 10;
    
    // Maintenance Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('MAINTENANCE RECORDS', 20, yPos);
    yPos += 8;
    
    const headers = ['Date', 'Asset', 'Type', 'Cost', 'Performed By', 'Warranty'];
    const tableData = maintenanceHistory.map(record => [
      record.maintenanceDate,
      record.assetName,
      record.maintenanceType,
      record.cost,
      record.performedBy,
      record.warrantyCovered ? 'Yes' : 'No'
    ]);
    
    drawTable(doc, headers, tableData, 20, yPos, {
      fontSize: 7,
      headerBackground: [230, 126, 34]
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 285, { align: 'center' });
      doc.text('Confidential - Asset Management System', pageWidth / 2, 290, { align: 'center' });
    }
    
    doc.save(`maintenance-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateInsurancePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    
    // Report Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('INSURANCE POLICIES REPORT', pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 22, { align: 'center' });
    
    // Summary
    let yPos = 30;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INSURANCE SUMMARY', 20, yPos);
    yPos += 8;
    
    const totalCoverage = insurancePolicies.reduce((sum, policy) => 
      sum + parseInt(policy.coverageAmount.replace(/[^0-9]/g, '')), 0
    );
    const totalPremium = insurancePolicies.reduce((sum, policy) => 
      sum + parseInt(policy.premium.replace(/[^0-9]/g, '')), 0
    );
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Policies: ${insurancePolicies.length}`, 20, yPos);
    doc.text(`Total Coverage: ${formatCurrency(totalCoverage)}`, 100, yPos);
    yPos += 6;
    doc.text(`Total Premium: ${formatCurrency(totalPremium)}`, 20, yPos);
    yPos += 10;
    
    // Insurance Policies Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INSURANCE POLICIES', 20, yPos);
    yPos += 8;
    
    const headers = ['Policy ID', 'Asset', 'Provider', 'Coverage', 'Premium', 'Validity'];
    const tableData = insurancePolicies.map(policy => [
      policy.policyId,
      policy.assetName,
      policy.provider,
      policy.coverageAmount,
      policy.premium,
      policy.endDate
    ]);
    
    drawTable(doc, headers, tableData, 20, yPos, {
      fontSize: 7,
      headerBackground: [41, 128, 185]
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 285, { align: 'center' });
      doc.text('Confidential - Asset Management System', pageWidth / 2, 290, { align: 'center' });
    }
    
    doc.save(`insurance-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const generateReturnsPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    
    // Report Header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('ASSET RETURNS REPORT', pageWidth / 2, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 22, { align: 'center' });
    
    // Summary
    let yPos = 30;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('RETURNS SUMMARY', 20, yPos);
    yPos += 8;
    
    const totalPenalty = assetReturns.reduce((sum, returnItem) => 
      sum + parseInt(returnItem.penaltyAmount.replace(/[^0-9]/g, '')), 0
    );
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Returns: ${assetReturns.length}`, 20, yPos);
    doc.text(`Total Penalty: ${formatCurrency(totalPenalty)}`, 100, yPos);
    yPos += 10;
    
    // Returns Table
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ASSET RETURNS', 20, yPos);
    yPos += 8;
    
    const headers = ['Return ID', 'Asset', 'Employee', 'Return Date', 'Reason', 'Condition'];
    const tableData = assetReturns.map(returnItem => [
      returnItem.returnId,
      returnItem.assetName,
      returnItem.employeeName,
      returnItem.returnDate,
      returnItem.returnReason,
      returnItem.conditionAtReturn
    ]);
    
    drawTable(doc, headers, tableData, 20, yPos, {
      fontSize: 7,
      headerBackground: [39, 174, 96]
    });
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 285, { align: 'center' });
      doc.text('Confidential - Asset Management System', pageWidth / 2, 290, { align: 'center' });
    }
    
    doc.save(`returns-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Handlers
  const handleAddAsset = (assetData) => {
    const newAsset = {
      id: assetMaster.length + 1,
      ...assetData,
      assetId: `AST${String(assetMaster.length + 1).padStart(3, '0')}`,
      assetTag: `${assetData.category.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-${String(assetMaster.filter(a => a.category === assetData.category).length + 1).padStart(3, '0')}`,
      currentValue: assetData.purchasePrice,
      status: 'Available',
      allocatedTo: null,
      allocationDate: null,
      lastMaintenance: null,
      nextMaintenance: null,
      maintenanceHistory: []
    };
    
    setAssetMaster(prev => [...prev, newAsset]);
    setShowAssetModal(false);
    alert(`Asset ${newAsset.assetName} added successfully!`);
  };

  const handleAllocateAsset = (allocationData) => {
    const newAllocation = {
      id: assetAllocations.length + 1,
      ...allocationData,
      allocationId: `ALLOC-${new Date().getFullYear()}-${String(assetAllocations.length + 1).padStart(3, '0')}`,
      status: 'Active',
      handoverDate: new Date().toISOString().split('T')[0],
      handoverBy: 'Current User',
      acknowledgment: 'Pending',
      notes: ''
    };
    
    // Update asset status
    setAssetMaster(prev => prev.map(asset => 
      asset.id === parseInt(allocationData.assetId)
        ? { 
            ...asset, 
            status: 'Allocated',
            allocatedTo: `${allocationData.employeeId} - ${allocationData.employeeName}`,
            allocationDate: new Date().toISOString().split('T')[0]
          }
        : asset
    ));
    
    setAssetAllocations(prev => [...prev, newAllocation]);
    setShowAllocationModal(false);
    alert(`Asset allocated to ${allocationData.employeeName} successfully!`);
  };

  const handleReturnAsset = (returnData) => {
    const newReturn = {
      id: assetReturns.length + 1,
      ...returnData,
      returnId: `RET-${new Date().getFullYear()}-${String(assetReturns.length + 1).padStart(3, '0')}`,
      returnDate: new Date().toISOString().split('T')[0],
      clearanceCertificate: `CERT-${new Date().getFullYear()}-${String(assetReturns.length + 1).padStart(3, '0')}`,
      certificateIssuedDate: new Date().toISOString().split('T')[0],
      status: 'Completed'
    };
    
    // Update asset status
    setAssetMaster(prev => prev.map(asset => 
      asset.id === parseInt(returnData.assetId)
        ? { 
            ...asset, 
            status: 'Available',
            allocatedTo: null,
            allocationDate: null,
            condition: returnData.conditionAtReturn
          }
        : asset
    ));
    
    // Update allocation status
    setAssetAllocations(prev => prev.map(allocation => 
      allocation.assetId === returnData.assetId && allocation.status === 'Active'
        ? { ...allocation, status: 'Returned' }
        : allocation
    ));
    
    setAssetReturns(prev => [...prev, newReturn]);
    setShowReturnModal(false);
    alert(`Asset return processed successfully!`);
  };

  const handleAddMaintenance = (maintenanceData) => {
    const newMaintenance = {
      id: maintenanceHistory.length + 1,
      ...maintenanceData,
      maintenanceId: `MNT-${new Date().getFullYear()}-${String(maintenanceHistory.length + 1).padStart(3, '0')}`,
      status: 'Completed',
      attachments: []
    };
    
    // Update asset maintenance info
    setAssetMaster(prev => prev.map(asset => 
      asset.id === parseInt(maintenanceData.assetId)
        ? { 
            ...asset, 
            lastMaintenance: maintenanceData.maintenanceDate,
            nextMaintenance: maintenanceData.nextMaintenanceDate,
            maintenanceHistory: [
              ...asset.maintenanceHistory,
              {
                date: maintenanceData.maintenanceDate,
                type: maintenanceData.maintenanceType,
                cost: maintenanceData.cost,
                technician: maintenanceData.performedBy
              }
            ]
          }
        : asset
    ));
    
    setMaintenanceHistory(prev => [...prev, newMaintenance]);
    setShowMaintenanceModal(false);
    alert(`Maintenance record added successfully!`);
  };

  // Filter assets based on search term
  const filteredAssets = assetMaster.filter(asset =>
    searchTerm === '' ||
    asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (asset.allocatedTo && asset.allocatedTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Reports Section Component
  const ReportsSection = () => (
    <div className="row g-4">
      <div className="col-12 col-md-6">
        <div className="card h-100">
          <div className="card-header bg-primary text-white">
            <h6 className="fw-bold mb-0">
              <FileText className="me-2" />
              Asset Inventory Report (PDF)
            </h6>
          </div>
          <div className="card-body">
            <p className="text-muted">Complete inventory with all asset details, categories, and current values.</p>
            <div className="mb-3">
              <h6>Report Includes:</h6>
              <ul className="small">
                <li>Asset master data with all fields</li>
                <li>Category-wise summary</li>
                <li>Department-wise allocation</li>
                <li>Current value calculation</li>
                <li>Status distribution</li>
              </ul>
            </div>
            <button className="btn btn-primary w-100" onClick={generateAssetInventoryPDF}>
              <Download className="me-2" size={16} />
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
      
      <div className="col-12 col-md-6">
        <div className="card h-100">
          <div className="card-header bg-success text-white">
            <h6 className="fw-bold mb-0">
              <Users className="me-2" />
              Employee-wise Allocation Report (PDF)
            </h6>
          </div>
          <div className="card-body">
            <p className="text-muted">Detailed report of assets allocated to each employee.</p>
            <div className="mb-3">
              <h6>Report Includes:</h6>
              <ul className="small">
                <li>Employee-wise asset list</li>
                <li>Allocation dates and terms</li>
                <li>Department-wise summary</li>
                <li>Pending returns list</li>
                <li>Insurance coverage details</li>
              </ul>
            </div>
            <button className="btn btn-success w-100" onClick={generateEmployeeWisePDF}>
              <Download className="me-2" size={16} />
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
      
      <div className="col-12 col-md-6">
        <div className="card h-100">
          <div className="card-header bg-info text-white">
            <h6 className="fw-bold mb-0">
              <TrendingDown className="me-2" />
              Depreciation Report (PDF)
            </h6>
          </div>
          <div className="card-body">
            <p className="text-muted">Detailed depreciation schedule and calculations for all assets.</p>
            <div className="mb-3">
              <h6>Report Includes:</h6>
              <ul className="small">
                <li>Depreciation schedule for each asset</li>
                <li>Purchase price vs current value</li>
                <li>Accumulated depreciation</li>
                <li>Net book values</li>
                <li>Next depreciation dates</li>
              </ul>
            </div>
            <button className="btn btn-info w-100 text-white" onClick={generateDepreciationPDF}>
              <Download className="me-2" size={16} />
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
      
      <div className="col-12 col-md-6">
        <div className="card h-100">
          <div className="card-header bg-warning text-dark">
            <h6 className="fw-bold mb-0">
              <AlertCircle className="me-2" />
              Maintenance Report (PDF)
            </h6>
          </div>
          <div className="card-body">
            <p className="text-muted">Complete maintenance history and cost analysis.</p>
            <div className="mb-3">
              <h6>Report Includes:</h6>
              <ul className="small">
                <li>Maintenance history for all assets</li>
                <li>Cost analysis and trends</li>
                <li>Warranty vs non-warranty repairs</li>
                <li>Upcoming maintenance schedule</li>
                <li>Service provider details</li>
              </ul>
            </div>
            <button className="btn btn-warning w-100" onClick={generateMaintenancePDF}>
              <Download className="me-2" size={16} />
              Download PDF Report
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="card h-100">
          <div className="card-header bg-purple text-white" style={{ backgroundColor: '#6f42c1' }}>
            <h6 className="fw-bold mb-0">
              <ShieldCheck className="me-2" />
              Insurance Report (PDF)
            </h6>
          </div>
          <div className="card-body">
            <p className="text-muted">Insurance policies and claim history.</p>
            <div className="mb-3">
              <h6>Report Includes:</h6>
              <ul className="small">
                <li>Insurance policy details</li>
                <li>Coverage amounts and premiums</li>
                <li>Claim history</li>
                <li>Policy expiry dates</li>
                <li>Provider-wise summary</li>
              </ul>
            </div>
            <button className="btn w-100" style={{ backgroundColor: '#6f42c1', color: 'white' }} onClick={generateInsurancePDF}>
              <Download className="me-2" size={16} />
              Download Insurance Report
            </button>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="card h-100">
          <div className="card-header bg-teal text-white" style={{ backgroundColor: '#20c997' }}>
            <h6 className="fw-bold mb-0">
              <ArchiveRestore className="me-2" />
              Asset Return Report (PDF)
            </h6>
          </div>
          <div className="card-body">
            <p className="text-muted">Asset return history and condition analysis.</p>
            <div className="mb-3">
              <h6>Report Includes:</h6>
              <ul className="small">
                <li>Return history for all assets</li>
                <li>Condition analysis</li>
                <li>Penalty calculations</li>
                <li>Missing items report</li>
                <li>Employee-wise return summary</li>
              </ul>
            </div>
            <button className="btn w-100" style={{ backgroundColor: '#20c997', color: 'white' }} onClick={generateReturnsPDF}>
              <Download className="me-2" size={16} />
              Download Returns Report
            </button>
          </div>
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <div className="card-header bg-dark text-white">
            <h6 className="fw-bold mb-0">
              <Printer className="me-2" />
              Bulk Report Generator
            </h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <p className="text-muted">Generate multiple reports at once with custom date ranges.</p>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">From Date</label>
                    <input type="date" className="form-control" defaultValue={new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">To Date</label>
                    <input type="date" className="form-control" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <button className="btn btn-dark w-100" onClick={() => {
                  generateAssetInventoryPDF();
                  setTimeout(() => generateEmployeeWisePDF(), 1000);
                  setTimeout(() => generateDepreciationPDF(), 2000);
                  setTimeout(() => generateMaintenancePDF(), 3000);
                  setTimeout(() => generateInsurancePDF(), 4000);
                  setTimeout(() => generateReturnsPDF(), 5000);
                }}>
                  <Download className="me-2" size={16} />
                  Generate All Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Component
  return (
    <div className="container-fluid px-3 px-md-4 py-3">
      {/* Header */}
      <div className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div>
            <h5 className="fw-bold mb-2">Asset Management System</h5>
            <p className="text-muted mb-0">
              <Package className="me-2 text-primary" />
              Complete asset lifecycle management from allocation to return
            </p>
          </div>
          
          <div className="d-flex flex-wrap gap-2">
            <button 
              className="btn btn-primary d-flex align-items-center gap-2" 
              onClick={() => setShowAssetModal(true)}
            >
              <Package size={16} />
              <span>Add Asset</span>
            </button>
            <button 
              className="btn btn-success d-flex align-items-center gap-2"
              onClick={() => setShowAllocationModal(true)}
            >
              <Truck size={16} />
              <span>Allocate Asset</span>
            </button>
            <button 
              className="btn btn-warning d-flex align-items-center gap-2"
              onClick={() => setShowReturnModal(true)}
            >
              <ArchiveRestore size={16} />
              <span>Process Return</span>
            </button>
            <button 
              className="btn btn-info d-flex align-items-center gap-2 text-white"
              onClick={() => setShowMaintenanceModal(true)}
            >
              <Wrench size={16} />
              <span>Maintenance</span>
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="p-3 bg-primary bg-opacity-10 rounded mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="spinner-grow spinner-grow-sm text-success" role="status"></div>
                  <span className="fw-medium">Asset Management Active</span>
                </div>
                <div className="vr"></div>
                <span className="text-muted small">Tracking {statistics.totalAssets} assets</span>
              </div>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="d-flex align-items-center gap-3 justify-content-end">
                <span className="badge bg-success bg-opacity-10 text-success">
                  <CheckCircle size={12} className="me-1" />
                  {statistics.allocatedAssets} Allocated
                </span>
                <span className="badge bg-info bg-opacity-10 text-info">
                  <Package size={12} className="me-1" />
                  {statistics.availableAssets} Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="p-3 bg-white border rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Total Assets</div>
                <div className="h3 mb-0 fw-bold text-primary">{statistics.totalAssets}</div>
              </div>
              <Package size={24} className="text-primary opacity-75" />
            </div>
            <div className="small text-success mt-2">
              <TrendingUp size={12} className="me-1" />
              {formatCurrency(statistics.totalValue)} total value
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="p-3 bg-white border rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Allocated Assets</div>
                <div className="h3 mb-0 fw-bold text-success">{statistics.allocatedAssets}</div>
              </div>
              <Truck size={24} className="text-success opacity-75" />
            </div>
            <div className="small text-muted mt-2">
              {Math.round((statistics.allocatedAssets / statistics.totalAssets) * 100)}% utilization
            </div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="p-3 bg-white border rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Under Repair</div>
                <div className="h3 mb-0 fw-bold text-warning">{statistics.underRepair}</div>
              </div>
              <Wrench size={24} className="text-warning opacity-75" />
            </div>
            <div className="small text-warning mt-2">Requires attention</div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="p-3 bg-white border rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-muted small mb-1">Pending Returns</div>
                <div className="h3 mb-0 fw-bold text-info">{statistics.pendingReturns}</div>
              </div>
              <ArchiveRestore size={24} className="text-info opacity-75" />
            </div>
            <div className="small text-muted mt-2">Follow-up required</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={16} /> },
            { key: 'master', label: 'Asset Master', icon: <Database size={16} /> },
            { key: 'allocations', label: 'Allocations', icon: <Truck size={16} /> },
            { key: 'returns', label: 'Returns', icon: <ArchiveRestore size={16} /> },
            { key: 'maintenance', label: 'Maintenance', icon: <Wrench size={16} /> },
            { key: 'insurance', label: 'Insurance', icon: <ShieldCheck size={16} /> },
            { key: 'depreciation', label: 'Depreciation', icon: <TrendingDown size={16} /> },
            { key: 'reports', label: 'Reports', icon: <FileText size={16} /> }
          ].map(section => (
            <button
              key={section.key}
              className={`btn ${activeSection === section.key ? 'btn-primary' : 'btn-outline-primary'} d-flex align-items-center gap-2`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Search size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search assets, serial numbers, employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-primary">
                <Filter size={16} className="me-2" />
                Filter
              </button>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center"
                onClick={() => window.location.reload()}
              >
                <RefreshCw size={16} />
              </button>
              <button 
                className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center"
                onClick={() => setActiveSection('reports')}
              >
                <Download size={16} />
              </button>
              <button 
                className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center"
                onClick={() => window.print()}
              >
                <Printer size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Content based on Active Section */}
      {activeSection === 'master' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <Database className="me-2" />
                  Asset Master
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary">{statistics.totalAssets} assets</span>
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setShowAssetModal(true)}
                  >
                    <Package size={14} className="me-1" />
                    Add New
                  </button>
                  {selectedAssets.length > 0 && (
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={handleBulkDelete}
                    >
                      <X size={14} className="me-1" />
                      Delete Selected ({selectedAssets.length})
                    </button>
                  )}
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <input 
                            type="checkbox" 
                            className="form-check-input"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAssets(filteredAssets.map(a => a.id));
                              } else {
                                setSelectedAssets([]);
                              }
                            }}
                          />
                        </th>
                        <th>Asset Details</th>
                        <th>Category</th>
                        <th>Serial No.</th>
                        <th>Purchase Details</th>
                        <th>Current Value</th>
                        <th>Condition</th>
                        <th>Status</th>
                        <th>Allocated To</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssets.map(asset => (
                        <tr key={asset.id}>
                          <td>
                            <input 
                              type="checkbox" 
                              className="form-check-input"
                              checked={selectedAssets.includes(asset.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedAssets(prev => [...prev, asset.id]);
                                } else {
                                  setSelectedAssets(prev => prev.filter(id => id !== asset.id));
                                }
                              }}
                            />
                          </td>
                          <td>
                            <div className="fw-medium">{asset.assetName}</div>
                            <small className="text-muted">{asset.assetTag}</small>
                            <div className="small">
                              <span className="me-2">{asset.make}</span>
                              <span>{asset.model}</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              {getCategoryIcon(asset.category)}
                              <span>{asset.category}</span>
                            </div>
                          </td>
                          <td>
                            <code>{asset.serialNumber}</code>
                          </td>
                          <td>
                            <div className="small">
                              <div>Date: {asset.purchaseDate}</div>
                              <div>Price: {asset.purchasePrice}</div>
                            </div>
                          </td>
                          <td className="fw-bold text-success">
                            {asset.currentValue}
                          </td>
                          <td>
                            {getConditionBadge(asset.condition)}
                          </td>
                          <td>
                            {getStatusBadge(asset.status)}
                          </td>
                          <td>
                            {asset.allocatedTo ? (
                              <div className="small">
                                <div className="fw-medium">{asset.allocatedTo}</div>
                                <div className="text-muted">Since: {asset.allocationDate}</div>
                              </div>
                            ) : (
                              <span className="text-muted">Not allocated</span>
                            )}
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => handleViewAsset(asset)}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-success"
                                onClick={() => handleAllocateAssetClick(asset)}
                                disabled={asset.status !== 'Available'}
                                title={asset.status !== 'Available' ? 'Asset not available for allocation' : 'Allocate asset'}
                              >
                                <Truck size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => handleMaintenanceClick(asset)}
                              >
                                <Wrench size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-warning"
                                onClick={() => handleEditAsset(asset)}
                              >
                                <Edit size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteAsset(asset.id)}
                              >
                                <X size={12} />
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
          </div>
        </div>
      )}

      {activeSection === 'allocations' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <Truck className="me-2" />
                  Asset Allocations
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-success">{assetAllocations.filter(a => a.status === 'Active').length} active</span>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => setShowAllocationModal(true)}
                  >
                    <Truck size={14} className="me-1" />
                    New Allocation
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Allocation ID</th>
                        <th>Asset Details</th>
                        <th>Employee Details</th>
                        <th>Allocation Date</th>
                        <th>Type</th>
                        <th>Approved By</th>
                        <th>Insurance</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assetAllocations.map(allocation => (
                        <tr key={allocation.id}>
                          <td>
                            <code>{allocation.allocationId}</code>
                          </td>
                          <td>
                            <div className="fw-medium">{allocation.assetName}</div>
                            <small className="text-muted">Asset ID: {allocation.assetId}</small>
                          </td>
                          <td>
                            <div className="fw-medium">{allocation.employeeName}</div>
                            <small className="text-muted">{allocation.employeeId} • {allocation.department}</small>
                          </td>
                          <td>{allocation.allocationDate}</td>
                          <td>
                            <span className="badge bg-info bg-opacity-10 text-info">
                              {allocation.allocationType}
                            </span>
                          </td>
                          <td>{allocation.approvedBy}</td>
                          <td>
                            <span className="badge bg-success bg-opacity-10 text-success">
                              {allocation.insuranceCoverage}
                            </span>
                          </td>
                          <td>
                            {allocation.status === 'Active' ? (
                              <span className="badge bg-success">Active</span>
                            ) : (
                              <span className="badge bg-secondary">Returned</span>
                            )}
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => handleViewAllocationDetails(allocation)}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-warning"
                                onClick={() => handleInitiateReturn(allocation)}
                                disabled={allocation.status !== 'Active'}
                                title={allocation.status !== 'Active' ? 'Already returned' : 'Initiate return'}
                              >
                                <ArchiveRestore size={12} />
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
          </div>
        </div>
      )}

      {activeSection === 'returns' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <ArchiveRestore className="me-2" />
                  Asset Returns
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-warning">{assetReturns.length} returns</span>
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => setShowReturnModal(true)}
                  >
                    <ArchiveRestore size={14} className="me-1" />
                    Process Return
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Return ID</th>
                        <th>Asset Details</th>
                        <th>Employee Details</th>
                        <th>Return Date</th>
                        <th>Reason</th>
                        <th>Condition</th>
                        <th>Penalty</th>
                        <th>Certificate</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assetReturns.map(returnItem => (
                        <tr key={returnItem.id}>
                          <td>
                            <code>{returnItem.returnId}</code>
                          </td>
                          <td>
                            <div className="fw-medium">{returnItem.assetName}</div>
                            <small className="text-muted">Asset ID: {returnItem.assetId}</small>
                          </td>
                          <td>
                            <div className="fw-medium">{returnItem.employeeName}</div>
                            <small className="text-muted">{returnItem.employeeId} • {returnItem.department}</small>
                          </td>
                          <td>{returnItem.returnDate}</td>
                          <td>
                            <span className="badge bg-info bg-opacity-10 text-info">
                              {returnItem.returnReason}
                            </span>
                          </td>
                          <td>
                            {getConditionBadge(returnItem.conditionAtReturn)}
                          </td>
                          <td>
                            {returnItem.penaltyAmount !== '₹0' ? (
                              <span className="fw-bold text-danger">{returnItem.penaltyAmount}</span>
                            ) : (
                              <span className="text-success">No penalty</span>
                            )}
                          </td>
                          <td>
                            <code>{returnItem.clearanceCertificate}</code>
                          </td>
                          <td>
                            <span className="badge bg-success">Completed</span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  const asset = assetMaster.find(a => a.assetId === returnItem.assetId);
                                  if (asset) handleViewAsset(asset);
                                }}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-success"
                                onClick={() => handleReallocateAsset(returnItem)}
                                title="Re-allocate this asset"
                              >
                                <Truck size={12} />
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
          </div>
        </div>
      )}

      {activeSection === 'maintenance' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <Wrench className="me-2" />
                  Maintenance History
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-info">{maintenanceHistory.length} records</span>
                  <button 
                    className="btn btn-info btn-sm text-white"
                    onClick={() => setShowMaintenanceModal(true)}
                  >
                    <Wrench size={14} className="me-1" />
                    Add Maintenance
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Maintenance ID</th>
                        <th>Asset Details</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Cost</th>
                        <th>Performed By</th>
                        <th>Description</th>
                        <th>Warranty</th>
                        <th>Next Due</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceHistory.map(maintenance => (
                        <tr key={maintenance.id}>
                          <td>
                            <code>{maintenance.maintenanceId}</code>
                          </td>
                          <td>
                            <div className="fw-medium">{maintenance.assetName}</div>
                            <small className="text-muted">Asset ID: {maintenance.assetId}</small>
                          </td>
                          <td>
                            <span className={`badge ${
                              maintenance.maintenanceType === 'Emergency' ? 'bg-danger' :
                              maintenance.maintenanceType === 'Corrective' ? 'bg-warning' :
                              maintenance.maintenanceType === 'Preventive' ? 'bg-success' : 'bg-info'
                            }`}>
                              {maintenance.maintenanceType}
                            </span>
                          </td>
                          <td>{maintenance.maintenanceDate}</td>
                          <td className="fw-bold">{maintenance.cost}</td>
                          <td>{maintenance.performedBy}</td>
                          <td>
                            <div className="small text-truncate" style={{ maxWidth: '200px' }}>
                              {maintenance.description}
                            </div>
                          </td>
                          <td>
                            {maintenance.warrantyCovered ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              <span className="badge bg-secondary">No</span>
                            )}
                          </td>
                          <td>{maintenance.nextMaintenanceDate}</td>
                          <td>
                            <span className="badge bg-success">Completed</span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => handleViewMaintenanceDetails(maintenance)}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => handleEditMaintenance(maintenance)}
                              >
                                <Edit size={12} />
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
          </div>
        </div>
      )}

      {activeSection === 'insurance' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <ShieldCheck className="me-2" />
                  Insurance Policies
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-success">{insurancePolicies.length} policies</span>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={() => setShowInsuranceModal(true)}
                  >
                    <ShieldCheck size={14} className="me-1" />
                    Add Policy
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Policy ID</th>
                        <th>Asset Details</th>
                        <th>Provider</th>
                        <th>Policy Number</th>
                        <th>Coverage Amount</th>
                        <th>Premium</th>
                        <th>Coverage Type</th>
                        <th>Validity</th>
                        <th>Claims</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {insurancePolicies.map(policy => (
                        <tr key={policy.id}>
                          <td>
                            <code>{policy.policyId}</code>
                          </td>
                          <td>
                            <div className="fw-medium">{policy.assetName}</div>
                            <small className="text-muted">Asset ID: {policy.assetId}</small>
                          </td>
                          <td>{policy.provider}</td>
                          <td>
                            <code>{policy.policyNumber}</code>
                          </td>
                          <td className="fw-bold text-success">{policy.coverageAmount}</td>
                          <td>{policy.premium}</td>
                          <td>
                            <span className="badge bg-info bg-opacity-10 text-info">
                              {policy.coverageType}
                            </span>
                          </td>
                          <td>
                            <div className="small">
                              <div>From: {policy.startDate}</div>
                              <div>To: {policy.endDate}</div>
                            </div>
                          </td>
                          <td>
                            {policy.claims.length > 0 ? (
                              <span className="badge bg-warning">{policy.claims.length} claims</span>
                            ) : (
                              <span className="badge bg-success">No claims</span>
                            )}
                          </td>
                          <td>
                            <span className="badge bg-success">Active</span>
                          </td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => handleViewPolicyDetails(policy)}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-warning"
                                onClick={() => handleFileClaim(policy)}
                              >
                                <AlertCircle size={12} />
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
          </div>
        </div>
      )}

      {activeSection === 'depreciation' && (
        <div className="row g-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">
                  <TrendingDown className="me-2" />
                  Asset Depreciation Schedule
                </h6>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary">{depreciationSchedule.length} assets</span>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      alert('Depreciation calculation feature coming soon!');
                    }}
                  >
                    <Calculator size={14} className="me-1" />
                    Calculate
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Asset Details</th>
                        <th>Purchase Price</th>
                        <th>Depreciation Rate</th>
                        <th>Method</th>
                        <th>Useful Life</th>
                        <th>Current Value</th>
                        <th>Yearly Depreciation</th>
                        <th>Accumulated</th>
                        <th>Net Book Value</th>
                        <th>Next Calculation</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {depreciationSchedule.map(schedule => (
                        <tr key={schedule.id}>
                          <td>
                            <div className="fw-medium">{schedule.assetName}</div>
                            <small className="text-muted">Asset ID: {schedule.assetId}</small>
                          </td>
                          <td className="fw-bold">{schedule.purchasePrice}</td>
                          <td>
                            <span className="badge bg-warning">{schedule.depreciationRate}</span>
                          </td>
                          <td>{schedule.depreciationMethod}</td>
                          <td>{schedule.usefulLife}</td>
                          <td className="fw-bold text-success">{schedule.currentValue}</td>
                          <td>{schedule.yearlyDepreciation}</td>
                          <td>{schedule.accumulatedDepreciation}</td>
                          <td className="fw-bold">{schedule.netBookValue}</td>
                          <td>{schedule.nextDepreciationDate}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  const asset = assetMaster.find(a => a.assetId === schedule.assetId);
                                  if (asset) handleViewAsset(asset);
                                }}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  alert('Edit depreciation schedule feature coming soon!');
                                }}
                              >
                                <Edit size={12} />
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
          </div>
        </div>
      )}

      {/* Reports Section */}
      {activeSection === 'reports' && <ReportsSection />}

      {/* Quick Stats */}
      <div className="mt-4 pt-3 border-top">
        <h6 className="fw-bold mb-3">
          <BarChart3 size={16} className="me-2" />
          Quick Statistics
        </h6>
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <div className="p-3 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted small">Total Asset Value</div>
                <DollarSign size={20} className="text-success" />
              </div>
              <div className="h4 fw-bold">{formatCurrency(statistics.totalValue)}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted small">Asset Utilization</div>
                <PercentIcon size={20} className="text-primary" />
              </div>
              <div className="h4 fw-bold">
                {Math.round((statistics.allocatedAssets / statistics.totalAssets) * 100)}%
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted small">Upcoming Maintenance</div>
                <Calendar size={20} className="text-warning" />
              </div>
              <div className="h4 fw-bold">{statistics.upcomingMaintenance}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted small">Expiring Insurance</div>
                <AlertCircle size={20} className="text-danger" />
              </div>
              <div className="h4 fw-bold">{statistics.expiringInsurance}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset View Modal - Fixed with scroll inside modal */}
      {showViewModal && selectedAsset && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <Eye className="me-2" />
                  Asset Details - {selectedAsset.assetName}
                </h5>
                <button className="btn-close btn-close-white" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Basic Information</h6>
                    <div className="mb-2">
                      <small className="text-muted">Asset ID</small>
                      <div className="fw-medium">{selectedAsset.assetId}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Asset Tag</small>
                      <div className="fw-medium">{selectedAsset.assetTag}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Category</small>
                      <div className="d-flex align-items-center gap-2">
                        {getCategoryIcon(selectedAsset.category)}
                        <span>{selectedAsset.category}</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Make & Model</small>
                      <div className="fw-medium">{selectedAsset.make} {selectedAsset.model}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Serial Number</small>
                      <div className="fw-medium">{selectedAsset.serialNumber}</div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Status & Value</h6>
                    <div className="mb-2">
                      <small className="text-muted">Status</small>
                      <div>{getStatusBadge(selectedAsset.status)}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Condition</small>
                      <div>{getConditionBadge(selectedAsset.condition)}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Purchase Details</small>
                      <div className="fw-medium">
                        {selectedAsset.purchaseDate} • {selectedAsset.purchasePrice}
                      </div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Current Value</small>
                      <div className="fw-bold text-success h5">{selectedAsset.currentValue}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Depreciation Rate</small>
                      <div className="fw-medium">{selectedAsset.depreciationRate}</div>
                    </div>
                  </div>
                </div>
                
                <div className="row mt-3">
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Location & Allocation</h6>
                    <div className="mb-2">
                      <small className="text-muted">Location</small>
                      <div className="fw-medium">{selectedAsset.location}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Department</small>
                      <div className="fw-medium">{selectedAsset.department}</div>
                    </div>
                    {selectedAsset.allocatedTo && (
                      <div className="mb-2">
                        <small className="text-muted">Allocated To</small>
                        <div className="fw-medium">{selectedAsset.allocatedTo}</div>
                        <small className="text-muted">Since: {selectedAsset.allocationDate}</small>
                      </div>
                    )}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Maintenance & Warranty</h6>
                    <div className="mb-2">
                      <small className="text-muted">Last Maintenance</small>
                      <div className="fw-medium">{selectedAsset.lastMaintenance || 'None'}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Next Maintenance Due</small>
                      <div className="fw-medium">{selectedAsset.nextMaintenance || 'Not scheduled'}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Warranty Until</small>
                      <div className="fw-medium">{selectedAsset.warrantyUntil || 'No warranty'}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Insurance Policy</small>
                      <div className="fw-medium">{selectedAsset.insurancePolicy || 'No insurance'}</div>
                    </div>
                  </div>
                </div>
                
                {selectedAsset.maintenanceHistory && selectedAsset.maintenanceHistory.length > 0 && (
                  <div className="mt-4">
                    <h6 className="fw-bold mb-3">Maintenance History</h6>
                    <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Cost</th>
                            <th>Technician</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedAsset.maintenanceHistory.map((history, index) => (
                            <tr key={index}>
                              <td>{history.date}</td>
                              <td>{history.type}</td>
                              <td>{history.cost}</td>
                              <td>{history.technician}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={() => {
                  setShowViewModal(false);
                  handleEditAsset(selectedAsset);
                }}>
                  <Edit className="me-2" size={16} />
                  Edit Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Allocation Details Modal - Fixed with scroll inside modal */}
      {showAllocationDetails && selectedAllocation && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">
                  <Truck className="me-2" />
                  Allocation Details - {selectedAllocation.allocationId}
                </h5>
                <button className="btn-close btn-close-white" onClick={() => setShowAllocationDetails(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Asset Information</h6>
                    <div className="mb-2">
                      <small className="text-muted">Asset Name</small>
                      <div className="fw-medium">{selectedAllocation.assetName}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Asset ID</small>
                      <div className="fw-medium">{selectedAllocation.assetId}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Allocation Type</small>
                      <div className="fw-medium">{selectedAllocation.allocationType}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Reason</small>
                      <div className="fw-medium">{selectedAllocation.allocationReason}</div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Employee Details</h6>
                    <div className="mb-2">
                      <small className="text-muted">Employee Name</small>
                      <div className="fw-medium">{selectedAllocation.employeeName}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Employee ID</small>
                      <div className="fw-medium">{selectedAllocation.employeeId}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Department</small>
                      <div className="fw-medium">{selectedAllocation.department}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Allocation Date</small>
                      <div className="fw-medium">{selectedAllocation.allocationDate}</div>
                    </div>
                  </div>
                </div>
                
                <div className="row mt-3">
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Approval & Handover</h6>
                    <div className="mb-2">
                      <small className="text-muted">Approved By</small>
                      <div className="fw-medium">{selectedAllocation.approvedBy}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Handover Date</small>
                      <div className="fw-medium">{selectedAllocation.handoverDate}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Handover By</small>
                      <div className="fw-medium">{selectedAllocation.handoverBy}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Acknowledgment</small>
                      <div className="fw-medium">{selectedAllocation.acknowledgment}</div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Terms & Insurance</h6>
                    <div className="mb-2">
                      <small className="text-muted">Insurance Coverage</small>
                      <div className="fw-medium">{selectedAllocation.insuranceCoverage}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Terms Accepted</small>
                      <div className="fw-medium">
                        {selectedAllocation.termsAccepted ? 'Yes' : 'No'} on {selectedAllocation.termsAcceptedDate}
                      </div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Expected Return Date</small>
                      <div className="fw-medium">{selectedAllocation.expectedReturnDate}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Status</small>
                      <div>{selectedAllocation.status === 'Active' ? 
                        <span className="badge bg-success">Active</span> : 
                        <span className="badge bg-secondary">Returned</span>}
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedAllocation.handoverChecklist && selectedAllocation.handoverChecklist.length > 0 && (
                  <div className="mt-4">
                    <h6 className="fw-bold mb-3">Handover Checklist</h6>
                    <div className="row">
                      {selectedAllocation.handoverChecklist.map((item, index) => (
                        <div className="col-md-4 mb-2" key={index}>
                          <div className={`d-flex align-items-center gap-2 ${item.checked ? 'text-success' : 'text-danger'}`}>
                            {item.checked ? <Check size={16} /> : <X size={16} />}
                            <span>{item.item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAllocationDetails(false)}>
                  Close
                </button>
                {selectedAllocation.status === 'Active' && (
                  <button className="btn btn-warning" onClick={() => {
                    setShowAllocationDetails(false);
                    handleInitiateReturn(selectedAllocation);
                  }}>
                    <ArchiveRestore className="me-2" size={16} />
                    Initiate Return
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Details Modal - Fixed with scroll inside modal */}
      {showMaintenanceDetails && selectedMaintenance && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title fw-bold">
                  <Wrench className="me-2" />
                  Maintenance Details - {selectedMaintenance.maintenanceId}
                </h5>
                <button className="btn-close btn-close-white" onClick={() => setShowMaintenanceDetails(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Asset Information</h6>
                    <div className="mb-2">
                      <small className="text-muted">Asset Name</small>
                      <div className="fw-medium">{selectedMaintenance.assetName}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Asset ID</small>
                      <div className="fw-medium">{selectedMaintenance.assetId}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Maintenance Type</small>
                      <div className="fw-medium">
                        <span className={`badge ${
                          selectedMaintenance.maintenanceType === 'Emergency' ? 'bg-danger' :
                          selectedMaintenance.maintenanceType === 'Corrective' ? 'bg-warning' :
                          selectedMaintenance.maintenanceType === 'Preventive' ? 'bg-success' : 'bg-info'
                        }`}>
                          {selectedMaintenance.maintenanceType}
                        </span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Maintenance Date</small>
                      <div className="fw-medium">{selectedMaintenance.maintenanceDate}</div>
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <h6 className="fw-bold mb-3">Cost & Warranty</h6>
                    <div className="mb-2">
                      <small className="text-muted">Cost</small>
                      <div className="fw-bold h5">{selectedMaintenance.cost}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Warranty Covered</small>
                      <div className="fw-medium">
                        {selectedMaintenance.warrantyCovered ? 
                          <span className="badge bg-success">Yes</span> : 
                          <span className="badge bg-secondary">No</span>}
                      </div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Performed By</small>
                      <div className="fw-medium">{selectedMaintenance.performedBy}</div>
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Next Maintenance Due</small>
                      <div className="fw-medium">{selectedMaintenance.nextMaintenanceDate}</div>
                    </div>
                  </div>
                </div>
                
                <div className="row mt-3">
                  <div className="col-12 mb-3">
                    <h6 className="fw-bold mb-3">Description</h6>
                    <div className="p-3 bg-light rounded">
                      {selectedMaintenance.description}
                    </div>
                  </div>
                </div>
                
                {selectedMaintenance.attachments && selectedMaintenance.attachments.length > 0 && (
                  <div className="mt-4">
                    <h6 className="fw-bold mb-3">Attachments</h6>
                    <div className="row">
                      {selectedMaintenance.attachments.map((attachment, index) => (
                        <div className="col-md-4 mb-2" key={index}>
                          <div className="p-2 border rounded d-flex align-items-center gap-2">
                            <FileText size={16} />
                            <span className="small">{attachment}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowMaintenanceDetails(false)}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={() => {
                  setShowMaintenanceDetails(false);
                  handleEditMaintenance(selectedMaintenance);
                }}>
                  <Edit className="me-2" size={16} />
                  Edit Maintenance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals for Add/Edit/Allocate/Return/Maintenance - Fixed with scroll */}
      {showAssetModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  <Package className="me-2" />
                  {editMode ? 'Edit Asset' : 'Add New Asset'}
                </h5>
                <button className="btn-close btn-close-white" onClick={() => {
                  setShowAssetModal(false);
                  setEditMode(false);
                  setEditAsset(null);
                }}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="alert alert-info">
                  <Info className="me-2" size={16} />
                  {editMode ? 'Update asset information' : 'Fill all required fields to add a new asset'}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Asset Name *</label>
                    <input type="text" className="form-control" placeholder="e.g., Dell Latitude 5440" 
                      defaultValue={editAsset?.assetName} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category *</label>
                    <select className="form-select" defaultValue={editAsset?.category}>
                      <option value="">Select Category</option>
                      {assetCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Make *</label>
                    <input type="text" className="form-control" placeholder="e.g., Dell" 
                      defaultValue={editAsset?.make} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Model *</label>
                    <input type="text" className="form-control" placeholder="e.g., Latitude 5440" 
                      defaultValue={editAsset?.model} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Serial Number *</label>
                    <input type="text" className="form-control" placeholder="Unique serial number" 
                      defaultValue={editAsset?.serialNumber} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Purchase Date *</label>
                    <input type="date" className="form-control" defaultValue={editAsset?.purchaseDate} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Purchase Price (₹) *</label>
                    <input type="text" className="form-control" placeholder="e.g., 85000" 
                      defaultValue={editAsset?.purchasePrice?.replace('₹', '')} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Depreciation Rate (%) *</label>
                    <select className="form-select" defaultValue={editAsset?.depreciationRate?.replace('%', '')}>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                      <option value="20">20%</option>
                      <option value="25">25%</option>
                      <option value="30">30%</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Condition *</label>
                    <select className="form-select" defaultValue={editAsset?.condition}>
                      {assetConditions.map(cond => (
                        <option key={cond.value} value={cond.value}>{cond.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Location *</label>
                    <select className="form-select" defaultValue={editAsset?.location}>
                      <option value="">Select Location</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Department *</label>
                    <select className="form-select" defaultValue={editAsset?.department}>
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Warranty Until</label>
                    <input type="date" className="form-control" defaultValue={editAsset?.warrantyUntil} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => {
                  setShowAssetModal(false);
                  setEditMode(false);
                  setEditAsset(null);
                }}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={() => {
                  alert(editMode ? 'Asset updated successfully!' : 'Asset added successfully!');
                  setShowAssetModal(false);
                  setEditMode(false);
                  setEditAsset(null);
                }}>
                  <Save className="me-2" size={16} />
                  {editMode ? 'Update Asset' : 'Save Asset'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAllocationModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">
                  <Truck className="me-2" />
                  Allocate Asset
                </h5>
                <button className="btn-close btn-close-white" onClick={() => setShowAllocationModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="alert alert-info">
                  <Info className="me-2" size={16} />
                  Select an available asset and provide employee details
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Asset *</label>
                  <select className="form-select" defaultValue={selectedAsset?.id}>
                    <option value="">Select Available Asset</option>
                    {assetMaster.filter(a => a.status === 'Available').map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.assetName} ({asset.assetTag}) - {asset.currentValue}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Employee ID *</label>
                    <input type="text" className="form-control" placeholder="e.g., EMP001" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Employee Name *</label>
                    <input type="text" className="form-control" placeholder="Full name" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Department *</label>
                    <select className="form-select">
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Allocation Type *</label>
                    <select className="form-select">
                      <option value="New Joining">New Joining</option>
                      <option value="Role Change">Role Change</option>
                      <option value="Replacement">Replacement</option>
                      <option value="Project Requirement">Project Requirement</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Allocation Reason *</label>
                  <textarea className="form-control" rows="3" placeholder="Reason for allocation..." />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setShowAllocationModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={() => {
                  alert('Asset allocated successfully!');
                  setShowAllocationModal(false);
                }}>
                  <Check className="me-2" size={16} />
                  Allocate Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReturnModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title fw-bold">
                  <ArchiveRestore className="me-2" />
                  Process Asset Return
                </h5>
                <button className="btn-close" onClick={() => setShowReturnModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="alert alert-warning">
                  <AlertCircle className="me-2" size={16} />
                  Complete physical verification before processing return
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Asset to Return *</label>
                  <select className="form-select" defaultValue={selectedAsset?.id}>
                    <option value="">Select Allocated Asset</option>
                    {assetMaster.filter(a => a.status === 'Allocated').map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.assetName} ({asset.assetTag}) - {asset.allocatedTo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Return Reason *</label>
                    <select className="form-select">
                      <option value="">Select Reason</option>
                      <option value="Employee Resignation">Employee Resignation</option>
                      <option value="Internal Transfer">Internal Transfer</option>
                      <option value="Asset Upgrade">Asset Upgrade</option>
                      <option value="End of Project">End of Project</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Condition at Return *</label>
                    <select className="form-select">
                      {assetConditions.map(cond => (
                        <option key={cond.value} value={cond.value}>{cond.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Missing Items</label>
                    <input type="text" className="form-control" placeholder="List missing items, if any" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Damage Details</label>
                    <input type="text" className="form-control" placeholder="Describe any damage" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setShowReturnModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-warning" onClick={() => {
                  alert('Asset return processed successfully!');
                  setShowReturnModal(false);
                }}>
                  <ArchiveRestore className="me-2" size={16} />
                  Process Return
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMaintenanceModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title fw-bold">
                  <Wrench className="me-2" />
                  {selectedMaintenance ? 'Edit Maintenance Record' : 'Add Maintenance Record'}
                </h5>
                <button className="btn-close btn-close-white" onClick={() => {
                  setShowMaintenanceModal(false);
                  setSelectedMaintenance(null);
                }}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="alert alert-info">
                  <Info className="me-2" size={16} />
                  {selectedMaintenance ? 'Update maintenance details' : 'Record maintenance details for an asset'}
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Asset *</label>
                  <select className="form-select" defaultValue={selectedAsset?.id || selectedMaintenance?.assetId}>
                    <option value="">Select Asset</option>
                    {assetMaster.map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.assetName} ({asset.assetTag})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Maintenance Type *</label>
                    <select className="form-select" defaultValue={selectedMaintenance?.maintenanceType}>
                      <option value="Preventive">Preventive</option>
                      <option value="Corrective">Corrective</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Routine Check">Routine Check</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Maintenance Date *</label>
                    <input type="date" className="form-control" defaultValue={selectedMaintenance?.maintenanceDate} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Cost (₹) *</label>
                    <input type="text" className="form-control" placeholder="0" 
                      defaultValue={selectedMaintenance?.cost?.replace('₹', '')} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Performed By *</label>
                    <input type="text" className="form-control" placeholder="Technician/Service center" 
                      defaultValue={selectedMaintenance?.performedBy} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea className="form-control" rows="3" placeholder="Describe maintenance work done..." 
                    defaultValue={selectedMaintenance?.description} />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => {
                  setShowMaintenanceModal(false);
                  setSelectedMaintenance(null);
                }}>
                  Cancel
                </button>
                <button className="btn btn-info text-white" onClick={() => {
                  alert(selectedMaintenance ? 'Maintenance record updated successfully!' : 'Maintenance record added successfully!');
                  setShowMaintenanceModal(false);
                  setSelectedMaintenance(null);
                }}>
                  <Save className="me-2" size={16} />
                  {selectedMaintenance ? 'Update Record' : 'Save Record'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insurance Modal - Fixed with scroll */}
      {showInsuranceModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">
                  <ShieldCheck className="me-2" />
                  Add Insurance Policy
                </h5>
                <button className="btn-close btn-close-white" onClick={() => setShowInsuranceModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="alert alert-info">
                  <Info className="me-2" size={16} />
                  Add insurance policy details for an asset
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Asset *</label>
                  <select className="form-select">
                    <option value="">Select Asset</option>
                    {assetMaster.map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.assetName} ({asset.assetTag})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Insurance Provider *</label>
                    <input type="text" className="form-control" placeholder="e.g., ICICI Lombard" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Policy Number *</label>
                    <input type="text" className="form-control" placeholder="Policy number" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Coverage Amount (₹) *</label>
                    <input type="text" className="form-control" placeholder="e.g., 85000" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Premium (₹) *</label>
                    <input type="text" className="form-control" placeholder="e.g., 8500" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Start Date *</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">End Date *</label>
                    <input type="date" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setShowInsuranceModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={() => {
                  alert('Insurance policy added successfully!');
                  setShowInsuranceModal(false);
                }}>
                  <Save className="me-2" size={16} />
                  Save Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Claim Modal - Fixed with scroll */}
      {showClaimModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title fw-bold">
                  <AlertCircle className="me-2" />
                  File Insurance Claim
                </h5>
                <button className="btn-close" onClick={() => setShowClaimModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="alert alert-warning">
                  <AlertCircle className="me-2" size={16} />
                  File insurance claim for {selectedAsset?.assetName}
                </div>
                <div className="mb-3">
                  <label className="form-label">Claim Date *</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Claim Amount (₹) *</label>
                  <input type="text" className="form-control" placeholder="Claim amount" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Claim Reason *</label>
                  <textarea className="form-control" rows="3" placeholder="Describe the reason for claim..." />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setShowClaimModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-warning" onClick={() => {
                  alert('Insurance claim filed successfully!');
                  setShowClaimModal(false);
                }}>
                  <AlertCircle className="me-2" size={16} />
                  File Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reallocate Modal - Fixed with scroll */}
      {showReallocateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">
                  <Truck className="me-2" />
                  Re-allocate Asset
                </h5>
                <button className="btn-close btn-close-white" onClick={() => setShowReallocateModal(false)}></button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="alert alert-info">
                  <Info className="me-2" size={16} />
                  Re-allocate {selectedAsset?.assetName} to a new employee
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Employee ID *</label>
                    <input type="text" className="form-control" placeholder="e.g., EMP001" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Employee Name *</label>
                    <input type="text" className="form-control" placeholder="Full name" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Department *</label>
                    <select className="form-select">
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Allocation Type *</label>
                    <select className="form-select">
                      <option value="New Joining">New Joining</option>
                      <option value="Role Change">Role Change</option>
                      <option value="Replacement">Replacement</option>
                      <option value="Project Requirement">Project Requirement</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Allocation Reason *</label>
                  <textarea className="form-control" rows="3" placeholder="Reason for allocation..." />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={() => setShowReallocateModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={() => {
                  alert('Asset re-allocated successfully!');
                  setShowReallocateModal(false);
                }}>
                  <Check className="me-2" size={16} />
                  Re-allocate Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssestManagement;