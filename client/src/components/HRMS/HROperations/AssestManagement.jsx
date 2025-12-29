import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Eye, 
  Edit,
  Calendar,
  Clock,
  DollarSign,
  Percent,
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  Zap,
  Bot,
  Brain,
  Sparkles,
  Target,
  Users,
  FileText,
  Calculator,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Settings,
  MoreVertical,
  Send,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Bell,
  UserCheck,
  FileCheck,
  Mail,
  Phone,
  Briefcase,
  Award,
  Crown,
  X,
  Check,
  File,
  Trash2,
  Copy,
  Share2,
  Info,
  Star,
  Heart,
  FolderPlus,
  Upload,
  Save,
  Lock,
  Unlock,
  Volume2,
  Mic,
  Video,
  PhoneCall,
  MapPin,
  Globe,
  Link,
  FileUp,
  UserX,
  Scale,
  CalendarDays,
  Laptop,
  Smartphone,
  Monitor,
  Tablet,
  Headphones,
  Cpu,
  HardDrive,
  Server,
  Router,
  Camera,
  Printer as PrinterIcon,
  Scan,
  Battery,
  Wifi,
  Bluetooth,
  Database,
  Key,
  Home,
  Building,
  Map,
  Package,
  Truck,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Wallet,
  CreditCard,
  TrendingDown,
  Percent as PercentIcon,
  GitBranch,
  GitPullRequest,
  GitMerge,
  GitCommit,
  GitCompare,
  GitFork,
  Layers,
  Grid,
  List,
  Grid3x3,
  Columns,
  Rows,
  Layout,
  LayoutGrid,
  LayoutList,
  Box,
  Boxes,
  Package2,
  PackageOpen,
  Inbox,
  Archive,
  ArchiveRestore,
  Folder,
  FolderOpen,
  FolderInput,
  FolderOutput,
  FolderMinus,
  FolderPlus as FolderPlusIcon,
  FolderKey,
  FolderSearch,
  FolderX,
  FolderCheck,
  FolderArchive,
  FolderDown,
  FolderUp,
  HardDriveDownload,
  HardDriveUpload,
  ServerCog,
  RouterCog,
  Network,
  Cloud,
  CloudOff,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  CloudSun,
  CloudMoon,
  Cloudy,
  Sun,
  Moon,
  CloudUpload,
  CloudDownload,
  CloudSync,
  Terminal,
  Code,
  Brackets,
  Braces,
  Parentheses,
  CurlyBraces,
  Square,
  Circle,
  Triangle,
  Octagon,
  Hexagon,
  Pentagon,
  Octagram,
  Crosshair,
  Target as TargetIcon,
  Cross,
  Minus,
  Plus,
  Divide,
  Multiply,
  Equal,
  NotEqual,
  Infinity as InfinityIcon,
  Pi,
  Sigma,
  Omega,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Rho,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  OmegaCircle,
  AlphaCircle,
  BetaCircle,
  GammaCircle,
  DeltaCircle,
  EpsilonCircle,
  ZetaCircle,
  EtaCircle,
  ThetaCircle,
  IotaCircle,
  KappaCircle,
  LambdaCircle,
  MuCircle,
  NuCircle,
  XiCircle,
  OmicronCircle,
  RhoCircle,
  TauCircle,
  UpsilonCircle,
  PhiCircle,
  ChiCircle,
  PsiCircle,
  Copyright,
  Registered,
  Trademark,
  Hash,
  AtSign,
  Asterisk,
  Ampersand,
  DollarSign as DollarIcon,
  Euro,
  PoundSterling,
  Yen,
  Bitcoin,
  CreditCard as CreditCardIcon,
  QrCode,
  Barcode,
  Radio,
  Tv,
  Watch,
  WatchIcon,
  AlarmClock,
  Timer,
  TimerReset,
  TimerOff,
  Hourglass,
  SandTimer,
  CalendarClock,
  CalendarMinus,
  CalendarPlus,
  CalendarX,
  CalendarCheck,
  CalendarRange,
  CalendarSearch,
  CalendarDays as CalendarDaysIcon,
  CalendarHeart,
  CalendarStar,
  CalendarSync,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
  Clock1,
  Clock2,
  Clock3,
  ClockArrowUp,
  ClockArrowDown,
  History,
  RotateCcw,
  RotateCw,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  StopCircle,
  Power,
  PowerOff,
  BatteryCharging,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  BatteryEmpty,
  Plug,
  PlugZap,
  PlugOff,
  Unplug,
  Cigarette,
  CigaretteOff,
  Coffee,
  CoffeeOff,
  Wine,
  WineOff,
  Beer,
  BeerOff,
  GlassWater,
  GlassWaterOff,
  Droplets,
  Droplet,
  DropletOff,
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
  Wind,
  Flame,
  Snowflake,
  SunDim,
  SunMedium,
  SunBright,
  CloudSunRain,
  CloudMoonRain,
  CloudHail,
  CloudSleet,
  CloudWind,
  Tornado,
  Hurricane,
  Earthquake,
  Volcano,
  Meteor,
  Comet,
  Satellite,
  SatelliteDish,
  Telescope,
  Microscope,
  Beaker,
  FlaskConical,
  FlaskRound,
  TestTube,
  TestTubeDiagonal,
  Vial,
  Pill,
  Capsule,
  Syringe,
  Stethoscope,
  Scalpel,
  Bone,
  Skull,
  Brain as BrainIcon,
  HeartPulse,
  Lungs,
  Kidney,
  Liver,
  Stomach,
  Eye as EyeIcon,
  Ear,
  Nose,
  Mouth,
  Hand,
  Arm,
  Leg,
  Foot,
  Skeleton,
  PersonStanding,
  PersonWalking,
  PersonRunning,
  PersonSwimming,
  PersonSkiing,
  PersonSnowboarding,
  PersonSurfing,
  PersonClimbing,
  PersonJumping,
  PersonFalling
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Custom icon components for missing ones
const Chair = (props) => <div {...props}>🪑</div>;
const Car = (props) => <div {...props}>🚗</div>;
const Wrench = (props) => <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;

const AssestManagement = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDepreciationModal, setShowDepreciationModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showDamageModal, setShowDamageModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  // Menu items for the dashboard layout
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={20} />, active: true },
    { id: 'assets', label: 'Assets', icon: <Package size={20} /> },
    { id: 'allocations', label: 'Allocations', icon: <Truck size={20} /> },
    { id: 'maintenance', label: 'Maintenance', icon: <Wrench size={20} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  // User info for the dashboard layout
  const userInfo = {
    name: 'John Doe',
    role: 'Asset Manager',
    avatar: 'JD'
  };

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

  // Reports
  const generateAssetInventoryReport = () => {
    const report = {
      title: 'Asset Inventory Report',
      generatedDate: new Date().toISOString().split('T')[0],
      summary: statistics,
      assets: assetMaster,
      categories: assetCategories.map(cat => ({
        category: cat.label,
        count: assetMaster.filter(a => a.category === cat.value).length,
        totalValue: assetMaster
          .filter(a => a.category === cat.value)
          .reduce((sum, asset) => sum + parseInt(asset.currentValue.replace(/[^0-9]/g, '')), 0)
      })),
      departments: departments.map(dept => ({
        department: dept,
        assets: assetMaster.filter(a => a.department === dept).length,
        allocated: assetMaster.filter(a => a.department === dept && a.status === 'Allocated').length
      }))
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asset-inventory-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Asset inventory report downloaded!');
  };

  const generateEmployeeWiseReport = () => {
    const report = {
      title: 'Employee-wise Asset Allocation Report',
      generatedDate: new Date().toISOString().split('T')[0],
      allocations: assetAllocations.filter(a => a.status === 'Active'),
      summary: {
        totalAllocations: assetAllocations.filter(a => a.status === 'Active').length,
        totalEmployees: new Set(assetAllocations.filter(a => a.status === 'Active').map(a => a.employeeId)).size,
        departments: [...new Set(assetAllocations.filter(a => a.status === 'Active').map(a => a.department))]
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employee-asset-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Employee-wise asset report downloaded!');
  };

  const generateDepreciationReport = () => {
    const report = {
      title: 'Asset Depreciation Report',
      generatedDate: new Date().toISOString().split('T')[0],
      schedule: depreciationSchedule,
      summary: {
        totalAssets: depreciationSchedule.length,
        totalPurchaseValue: depreciationSchedule.reduce((sum, asset) => sum + parseInt(asset.purchasePrice.replace(/[^0-9]/g, '')), 0),
        totalCurrentValue: depreciationSchedule.reduce((sum, asset) => sum + parseInt(asset.currentValue.replace(/[^0-9]/g, '')), 0),
        totalDepreciation: depreciationSchedule.reduce((sum, asset) => sum + parseInt(asset.accumulatedDepreciation.replace(/[^0-9]/g, '')), 0)
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `depreciation-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Depreciation report downloaded!');
  };

  // Modal Components
  const AssetMasterModal = () => {
    const [formData, setFormData] = useState({
      assetName: '',
      category: 'Laptop',
      make: '',
      model: '',
      serialNumber: '',
      purchaseDate: new Date().toISOString().split('T')[0],
      purchasePrice: '',
      depreciationRate: '15',
      condition: 'Brand New',
      location: 'Head Office - Floor 1',
      department: 'IT',
      warrantyUntil: '',
      insuranceProvider: '',
      insurancePolicy: ''
    });

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold">
                <Package className="me-2" />
                Add New Asset
              </h5>
              <button className="btn-close btn-close-white" onClick={() => setShowAssetModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Asset Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.assetName}
                    onChange={(e) => setFormData({...formData, assetName: e.target.value})}
                    required
                    placeholder="e.g., Dell Latitude 5440"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Asset Category *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {assetCategories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Make *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.make}
                    onChange={(e) => setFormData({...formData, make: e.target.value})}
                    required
                    placeholder="e.g., Dell, HP, Apple"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Model *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    required
                    placeholder="e.g., Latitude 5440, iPhone 15 Pro"
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Serial Number *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                    required
                    placeholder="Unique serial number"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Purchase Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Purchase Price (₹) *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.purchasePrice}
                    onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                    required
                    placeholder="e.g., 85000"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Depreciation Rate (%) *</label>
                  <select
                    className="form-select"
                    value={formData.depreciationRate}
                    onChange={(e) => setFormData({...formData, depreciationRate: e.target.value})}
                    required
                  >
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
                  <select
                    className="form-select"
                    value={formData.condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                    required
                  >
                    {assetConditions.map(condition => (
                      <option key={condition.value} value={condition.value}>
                        {condition.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Location *</label>
                  <select
                    className="form-select"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Department *</label>
                  <select
                    className="form-select"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Warranty Until</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.warrantyUntil}
                    onChange={(e) => setFormData({...formData, warrantyUntil: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Insurance Provider</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})}
                    placeholder="e.g., ICICI Lombard"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Insurance Policy No.</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.insurancePolicy}
                    onChange={(e) => setFormData({...formData, insurancePolicy: e.target.value})}
                    placeholder="Policy number"
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowAssetModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleAddAsset(formData)}
                disabled={!formData.assetName || !formData.make || !formData.model || !formData.serialNumber || !formData.purchasePrice}
              >
                <Save className="me-2" size={16} />
                Save Asset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AssetAllocationModal = () => {
    const [formData, setFormData] = useState({
      assetId: '',
      employeeId: '',
      employeeName: '',
      department: '',
      allocationType: 'New Joining',
      allocationReason: '',
      expectedReturnDate: '',
      approvedBy: '',
      insuranceCoverage: 'Basic Coverage'
    });

    const availableAssets = assetMaster.filter(a => a.status === 'Available');

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold">
                <Truck className="me-2" />
                Allocate Asset
              </h5>
              <button className="btn-close btn-close-white" onClick={() => setShowAllocationModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="alert alert-info">
                <Info className="me-2" size={16} />
                Select an available asset and provide employee details for allocation.
              </div>
              
              <div className="mb-3">
                <label className="form-label">Select Asset *</label>
                <select
                  className="form-select"
                  value={formData.assetId}
                  onChange={(e) => {
                    const asset = assetMaster.find(a => a.id === parseInt(e.target.value));
                    setFormData({
                      ...formData,
                      assetId: e.target.value,
                      department: asset?.department || ''
                    });
                  }}
                  required
                >
                  <option value="">Select Available Asset</option>
                  {availableAssets.map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.assetName} ({asset.assetTag}) - {formatCurrency(asset.currentValue)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Employee ID *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    required
                    placeholder="e.g., EMP001"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Employee Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.employeeName}
                    onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                    required
                    placeholder="Full name"
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Department *</label>
                  <select
                    className="form-select"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Allocation Type *</label>
                  <select
                    className="form-select"
                    value={formData.allocationType}
                    onChange={(e) => setFormData({...formData, allocationType: e.target.value})}
                    required
                  >
                    <option value="New Joining">New Joining</option>
                    <option value="Role Change">Role Change</option>
                    <option value="Replacement">Replacement</option>
                    <option value="Project Requirement">Project Requirement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Allocation Reason *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.allocationReason}
                  onChange={(e) => setFormData({...formData, allocationReason: e.target.value})}
                  required
                  placeholder="Reason for asset allocation..."
                />
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Expected Return Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.expectedReturnDate}
                    onChange={(e) => setFormData({...formData, expectedReturnDate: e.target.value})}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Approved By *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.approvedBy}
                    onChange={(e) => setFormData({...formData, approvedBy: e.target.value})}
                    required
                    placeholder="Manager/Director name"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Insurance Coverage *</label>
                <select
                  className="form-select"
                  value={formData.insuranceCoverage}
                  onChange={(e) => setFormData({...formData, insuranceCoverage: e.target.value})}
                  required
                >
                  <option value="Basic Coverage">Basic Coverage</option>
                  <option value="Full Coverage">Full Coverage</option>
                  <option value="Premium Coverage">Premium Coverage</option>
                  <option value="No Coverage">No Coverage</option>
                </select>
              </div>
              
              <div className="card border">
                <div className="card-header">
                  <h6 className="fw-bold mb-0">Handover Checklist</h6>
                </div>
                <div className="card-body">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="check1" />
                    <label className="form-check-label" htmlFor="check1">
                      Asset in good condition
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="check2" />
                    <label className="form-check-label" htmlFor="check2">
                      All accessories included
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="check3" />
                    <label className="form-check-label" htmlFor="check3">
                      User manual provided
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="check4" />
                    <label className="form-check-label" htmlFor="check4">
                      Terms and conditions explained
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowAllocationModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => handleAllocateAsset(formData)}
                disabled={!formData.assetId || !formData.employeeId || !formData.employeeName || !formData.department || !formData.allocationReason || !formData.approvedBy}
              >
                <Check className="me-2" size={16} />
                Allocate Asset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AssetReturnModal = () => {
    const [formData, setFormData] = useState({
      assetId: '',
      employeeId: '',
      returnReason: '',
      conditionAtReturn: 'Good',
      physicalVerification: true,
      missingItems: '',
      damageDetails: '',
      penaltyAmount: '0',
      penaltyReason: ''
    });

    const allocatedAssets = assetMaster.filter(a => a.status === 'Allocated');

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-warning text-dark">
              <h5 className="modal-title fw-bold">
                <ArchiveRestore className="me-2" />
                Process Asset Return
              </h5>
              <button className="btn-close" onClick={() => setShowReturnModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="alert alert-warning">
                <AlertCircle className="me-2" size={16} />
                <strong>Note:</strong> Complete physical verification before processing return.
              </div>
              
              <div className="mb-3">
                <label className="form-label">Select Asset to Return *</label>
                <select
                  className="form-select"
                  value={formData.assetId}
                  onChange={(e) => {
                    const asset = assetMaster.find(a => a.id === parseInt(e.target.value));
                    setFormData({
                      ...formData,
                      assetId: e.target.value,
                      employeeId: asset?.allocatedTo?.split(' - ')[0] || ''
                    });
                  }}
                  required
                >
                  <option value="">Select Allocated Asset</option>
                  {allocatedAssets.map(asset => (
                    <option key={asset.id} value={asset.id}>
                      {asset.assetName} ({asset.assetTag}) - Allocated to: {asset.allocatedTo}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Employee ID *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    required
                    disabled
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Return Reason *</label>
                  <select
                    className="form-select"
                    value={formData.returnReason}
                    onChange={(e) => setFormData({...formData, returnReason: e.target.value})}
                    required
                  >
                    <option value="">Select Reason</option>
                    <option value="Employee Resignation">Employee Resignation</option>
                    <option value="Internal Transfer">Internal Transfer</option>
                    <option value="Asset Upgrade">Asset Upgrade</option>
                    <option value="End of Project">End of Project</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Condition at Return *</label>
                  <select
                    className="form-select"
                    value={formData.conditionAtReturn}
                    onChange={(e) => setFormData({...formData, conditionAtReturn: e.target.value})}
                    required
                  >
                    {assetConditions.map(condition => (
                      <option key={condition.value} value={condition.value}>
                        {condition.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Physical Verification</label>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.physicalVerification}
                      onChange={(e) => setFormData({...formData, physicalVerification: e.target.checked})}
                      id="physicalVerification"
                    />
                    <label className="form-check-label" htmlFor="physicalVerification">
                      Asset physically verified
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Return Checklist</label>
                <div className="card border">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="returnCheck1" />
                          <label className="form-check-label" htmlFor="returnCheck1">
                            Asset received
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="returnCheck2" />
                          <label className="form-check-label" htmlFor="returnCheck2">
                            All accessories returned
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="returnCheck3" />
                          <label className="form-check-label" htmlFor="returnCheck3">
                            Data wiped/backup taken
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="returnCheck4" />
                          <label className="form-check-label" htmlFor="returnCheck4">
                            Condition documented
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Missing Items</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.missingItems}
                    onChange={(e) => setFormData({...formData, missingItems: e.target.value})}
                    placeholder="List missing items, if any"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Damage Details</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.damageDetails}
                    onChange={(e) => setFormData({...formData, damageDetails: e.target.value})}
                    placeholder="Describe any damage"
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Penalty Amount (₹)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.penaltyAmount}
                    onChange={(e) => setFormData({...formData, penaltyAmount: e.target.value})}
                    placeholder="0"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Penalty Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.penaltyReason}
                    onChange={(e) => setFormData({...formData, penaltyReason: e.target.value})}
                    placeholder="Reason for penalty, if any"
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowReturnModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-warning" 
                onClick={() => handleReturnAsset(formData)}
                disabled={!formData.assetId || !formData.returnReason || !formData.conditionAtReturn}
              >
                <ArchiveRestore className="me-2" size={16} />
                Process Return
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MaintenanceModal = () => {
    const [formData, setFormData] = useState({
      assetId: '',
      maintenanceType: 'Preventive',
      maintenanceDate: new Date().toISOString().split('T')[0],
      cost: '',
      performedBy: '',
      description: '',
      nextMaintenanceDate: '',
      warrantyCovered: false
    });

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title fw-bold">
                <Wrench className="me-2" />
                Add Maintenance Record
              </h5>
              <button className="btn-close btn-close-white" onClick={() => setShowMaintenanceModal(false)}></button>
            </div>
            
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Select Asset *</label>
                <select
                  className="form-select"
                  value={formData.assetId}
                  onChange={(e) => setFormData({...formData, assetId: e.target.value})}
                  required
                >
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
                  <select
                    className="form-select"
                    value={formData.maintenanceType}
                    onChange={(e) => setFormData({...formData, maintenanceType: e.target.value})}
                    required
                  >
                    <option value="Preventive">Preventive</option>
                    <option value="Corrective">Corrective</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Routine Check">Routine Check</option>
                    <option value="Upgrade">Upgrade</option>
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Maintenance Date *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.maintenanceDate}
                    onChange={(e) => setFormData({...formData, maintenanceDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Cost (₹) *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.cost}
                    onChange={(e) => setFormData({...formData, cost: e.target.value})}
                    required
                    placeholder="0"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Performed By *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.performedBy}
                    onChange={(e) => setFormData({...formData, performedBy: e.target.value})}
                    required
                    placeholder="Technician/Service center name"
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Description *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  placeholder="Describe maintenance work done..."
                />
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Next Maintenance Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.nextMaintenanceDate}
                    onChange={(e) => setFormData({...formData, nextMaintenanceDate: e.target.value})}
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Warranty Covered</label>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.warrantyCovered}
                      onChange={(e) => setFormData({...formData, warrantyCovered: e.target.checked})}
                      id="warrantyCovered"
                    />
                    <label className="form-check-label" htmlFor="warrantyCovered">
                      Covered under warranty
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={() => setShowMaintenanceModal(false)}>
                Cancel
              </button>
              <button 
                className="btn btn-info text-white" 
                onClick={() => handleAddMaintenance(formData)}
                disabled={!formData.assetId || !formData.cost || !formData.performedBy || !formData.description}
              >
                <Save className="me-2" size={16} />
                Save Record
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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

  // Main Component
  const mainContent = (
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
                onClick={() => setShowReportsModal(true)}
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

      {/* Asset Master Section */}
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
                                setSelectedAssets(assetMaster.map(a => a.id));
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
                                onClick={() => {
                                  setSelectedAsset(asset);
                                  // Show details modal
                                }}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-success"
                                onClick={() => {
                                  setSelectedAsset(asset);
                                  setShowAllocationModal(true);
                                }}
                                disabled={asset.status !== 'Available'}
                              >
                                <Truck size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  setSelectedAsset(asset);
                                  setShowMaintenanceModal(true);
                                }}
                              >
                                <Wrench size={12} />
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

      {/* Allocations Section */}
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
                                onClick={() => {
                                  // Show allocation details
                                }}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-warning"
                                onClick={() => {
                                  // Initiate return
                                }}
                                disabled={allocation.status !== 'Active'}
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

      {/* Returns Section */}
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
                                  // Show return details
                                }}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-success"
                                onClick={() => {
                                  // Re-allocate asset
                                }}
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

      {/* Maintenance Section */}
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
                                onClick={() => {
                                  // Show maintenance details
                                }}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  // Edit maintenance
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

      {/* Insurance Section */}
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
                                onClick={() => {
                                  // Show policy details
                                }}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-warning"
                                onClick={() => {
                                  // File claim
                                }}
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

      {/* Depreciation Section */}
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
                    onClick={() => setShowDepreciationModal(true)}
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
                                  // Show depreciation details
                                }}
                              >
                                <Eye size={12} />
                              </button>
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => {
                                  // Edit schedule
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
      {activeSection === 'reports' && (
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h6 className="fw-bold mb-0">
                  <FileText className="me-2" />
                  Asset Inventory Report
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
                <button className="btn btn-primary w-100" onClick={generateAssetInventoryReport}>
                  <Download className="me-2" size={16} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-success text-white">
                <h6 className="fw-bold mb-0">
                  <Users className="me-2" />
                  Employee-wise Allocation Report
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
                <button className="btn btn-success w-100" onClick={generateEmployeeWiseReport}>
                  <Download className="me-2" size={16} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-info text-white">
                <h6 className="fw-bold mb-0">
                  <TrendingDown className="me-2" />
                  Depreciation Report
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
                <button className="btn btn-info w-100 text-white" onClick={generateDepreciationReport}>
                  <Download className="me-2" size={16} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header bg-warning text-dark">
                <h6 className="fw-bold mb-0">
                  <AlertCircle className="me-2" />
                  Lost/Damaged Asset Report
                </h6>
              </div>
              <div className="card-body">
                <p className="text-muted">Report on lost, damaged, or under repair assets.</p>
                <div className="mb-3">
                  <h6>Report Includes:</h6>
                  <ul className="small">
                    <li>List of damaged assets</li>
                    <li>Repair cost details</li>
                    <li>Insurance claim status</li>
                    <li>Penalty calculations</li>
                    <li>Replacement recommendations</li>
                  </ul>
                </div>
                <button className="btn btn-warning w-100">
                  <Download className="me-2" size={16} />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <ShieldAlert size={20} className="text-danger" />
              </div>
              <div className="h4 fw-bold">{statistics.expiringInsurance}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAssetModal && <AssetMasterModal />}
      {showAllocationModal && <AssetAllocationModal />}
      {showReturnModal && <AssetReturnModal />}
      {showMaintenanceModal && <MaintenanceModal />}
    </div>
  );

  return mainContent;
};

export default AssestManagement;