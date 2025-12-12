import React, { useState } from 'react';
import {
    Search, Plus, X, Save, Eye, FileText, Trash2, Download,
    Bell, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp,
    Copy, Edit2, Users, User, Calendar, Percent, DollarSign,
    Calculator, History, Layers, BarChart
} from 'lucide-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import RecruiterDashboardLayout from '../../recruiterDashboard/RecruiterDashboardLayout';

const SalaryStructure = () => {
    const [activeTab, setActiveTab] = useState('components');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreatePanel, setShowCreatePanel] = useState(false);
    const [showSimulationPanel, setShowSimulationPanel] = useState(false);
    const [showVersionModal, setShowVersionModal] = useState(false);
    const [selectedStructure, setSelectedStructure] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [showComponentModal, setShowComponentModal] = useState(false);
    const [showBulkAssignModal, setShowBulkAssignModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);

    // State for new structure form
    const [newStructure, setNewStructure] = useState({
        name: '',
        grade: '',
        ctc: '',
        effectiveDate: new Date().toISOString().split('T')[0],
        description: ''
    });

    // State for simulation
    const [simulationData, setSimulationData] = useState({
        baseCTC: 1000000,
        variablePercent: 20,
        pfPercent: 12,
        esiPercent: 0.75,
        taxDeduction: 50000
    });

    // Mock data for components
    const [components, setComponents] = useState({
        earnings: [
            { id: 1, name: 'Basic Salary', type: 'fixed', taxable: true, statutory: false, calculation: 'percentage', value: 40, base: 'CTC' },
            { id: 2, name: 'House Rent Allowance', type: 'fixed', taxable: true, statutory: false, calculation: 'percentage', value: 20, base: 'Basic' },
            { id: 3, name: 'Conveyance Allowance', type: 'fixed', taxable: true, statutory: false, calculation: 'flat', value: 19200, base: 'fixed' },
            { id: 4, name: 'Special Allowance', type: 'fixed', taxable: true, statutory: false, calculation: 'percentage', value: 20, base: 'CTC' },
            { id: 5, name: 'Performance Bonus', type: 'variable', taxable: true, statutory: false, calculation: 'percentage', value: 10, base: 'CTC' },
        ],
        deductions: [
            { id: 6, name: 'Provident Fund (PF)', type: 'fixed', taxable: false, statutory: true, calculation: 'percentage', value: 12, base: 'Basic' },
            { id: 7, name: 'ESI Contribution', type: 'fixed', taxable: false, statutory: true, calculation: 'percentage', value: 0.75, base: 'Gross' },
            { id: 8, name: 'Professional Tax', type: 'fixed', taxable: false, statutory: true, calculation: 'flat', value: 200, base: 'fixed' },
            { id: 9, name: 'TDS', type: 'variable', taxable: false, statutory: true, calculation: 'percentage', value: 10, base: 'Taxable' },
            { id: 10, name: 'Loan EMI', type: 'fixed', taxable: false, statutory: false, calculation: 'flat', value: 5000, base: 'fixed' },
        ],
        employerContributions: [
            { id: 11, name: 'Employer PF', type: 'fixed', taxable: false, statutory: true, calculation: 'percentage', value: 12, base: 'Basic' },
            { id: 12, name: 'Employer ESI', type: 'fixed', taxable: false, statutory: true, calculation: 'percentage', value: 3.25, base: 'Gross' },
        ],
        reimbursements: [
            { id: 13, name: 'Medical Reimbursement', type: 'fixed', taxable: false, statutory: false, calculation: 'flat', value: 15000, base: 'fixed' },
            { id: 14, name: 'LTA', type: 'fixed', taxable: false, statutory: false, calculation: 'percentage', value: 8, base: 'Basic' },
            { id: 15, name: 'Telephone Allowance', type: 'fixed', taxable: true, statutory: false, calculation: 'flat', value: 1000, base: 'fixed' },
            { id: 16, name: 'Fuel Allowance', type: 'fixed', taxable: true, statutory: false, calculation: 'percentage', value: 5, base: 'Basic' },
        ]
    });

    // Mock data for salary structures
    const [structures, setStructures] = useState([
        {
            id: 1,
            name: 'Grade A - Management',
            grade: 'A',
            ctc: 1500000,
            effectiveDate: '2024-01-01',
            status: 'Active',
            employeeCount: 45,
            createdAt: '2023-12-15',
            createdBy: 'HR Admin',
            components: [1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14]
        },
        {
            id: 2,
            name: 'Grade B - Senior',
            grade: 'B',
            ctc: 1000000,
            effectiveDate: '2024-01-01',
            status: 'Active',
            employeeCount: 120,
            createdAt: '2023-12-10',
            createdBy: 'HR Manager',
            components: [1, 2, 3, 4, 5, 6, 8, 11, 13]
        },
        {
            id: 3,
            name: 'Grade C - Junior',
            grade: 'C',
            ctc: 600000,
            effectiveDate: '2024-01-01',
            status: 'Active',
            employeeCount: 250,
            createdAt: '2023-12-05',
            createdBy: 'HR Executive',
            components: [1, 2, 3, 4, 6, 8, 11]
        },
        {
            id: 4,
            name: 'Grade D - Trainee',
            grade: 'D',
            ctc: 300000,
            effectiveDate: '2024-01-01',
            status: 'Active',
            employeeCount: 80,
            createdAt: '2023-11-30',
            createdBy: 'HR Admin',
            components: [1, 2, 3, 6, 8, 11]
        }
    ]);

    // Mock data for assignments
    const [assignments, setAssignments] = useState([
        { id: 1, employeeId: 'EMP001', name: 'Nagendra Uggirala', department: 'Engineering', grade: 'A', currentStructure: 'Grade A - Management', effectiveDate: '2024-01-01', ctc: 1500000, takeHome: 105000 },
        { id: 2, employeeId: 'EMP002', name: 'Ravi Kumar', department: 'Engineering', grade: 'B', currentStructure: 'Grade B - Senior', effectiveDate: '2024-01-01', ctc: 1000000, takeHome: 70000 },
        { id: 3, employeeId: 'EMP003', name: 'Sita Rani', department: 'Design', grade: 'B', currentStructure: 'Grade B - Senior', effectiveDate: '2024-01-01', ctc: 1000000, takeHome: 70000 },
        { id: 4, employeeId: 'EMP004', name: 'Priya Sharma', department: 'Engineering', grade: 'C', currentStructure: 'Grade C - Junior', effectiveDate: '2024-01-01', ctc: 600000, takeHome: 42000 },
        { id: 5, employeeId: 'EMP005', name: 'Amit Patel', department: 'Sales', grade: 'A', currentStructure: 'Grade A - Management', effectiveDate: '2024-01-01', ctc: 1500000, takeHome: 105000 },
    ]);

    // Mock data for versions
    const [versions, setVersions] = useState([
        { id: 1, version: 'v1.0', structureId: 1, changes: 'Initial structure', date: '2023-12-15', changedBy: 'HR Admin', status: 'Published' },
        { id: 2, version: 'v1.1', structureId: 1, changes: 'Updated PF percentage from 10% to 12%', date: '2024-03-01', changedBy: 'HR Manager', status: 'Published' },
        { id: 3, version: 'v1.2', structureId: 1, changes: 'Added performance bonus component', date: '2024-06-15', changedBy: 'HR Admin', status: 'Draft' },
    ]);

    const getStatusBadge = (status) => {
        const styles = {
            Active: 'bg-success-subtle text-success border-success-subtle',
            Inactive: 'bg-secondary-subtle text-secondary border-secondary-subtle',
            Draft: 'bg-warning-subtle text-warning border-warning-subtle',
            Published: 'bg-primary-subtle text-primary border-primary-subtle'
        };

        const icons = {
            Active: <CheckCircle size={12} />,
            Inactive: <XCircle size={12} />,
            Draft: <Edit2 size={12} />,
            Published: <FileText size={12} />
        };

        return (
            <span className={`badge border d-inline-flex align-items-center gap-1 ${styles[status]}`}>
                {icons[status]}
                {status}
            </span>
        );
    };

    const getComponentTypeBadge = (type) => {
        const styles = {
            fixed: 'bg-info-subtle text-info border-info-subtle',
            variable: 'bg-warning-subtle text-warning border-warning-subtle',
            statutory: 'bg-danger-subtle text-danger border-danger-subtle',
            reimbursement: 'bg-success-subtle text-success border-success-subtle'
        };

        return (
            <span className={`badge border small ${styles[type]}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
        );
    };

    const getTaxableBadge = (taxable) => (
        <span className={`badge border small ${taxable ? 'bg-danger-subtle text-danger border-danger-subtle' : 'bg-success-subtle text-success border-success-subtle'}`}>
            {taxable ? 'Taxable' : 'Non-Taxable'}
        </span>
    );

    const calculateBreakdown = (structureId) => {
        const structure = structures.find(s => s.id === structureId);
        if (!structure) return null;

        const ctc = structure.ctc;
        const basic = ctc * 0.4;
        const hra = basic * 0.5;
        const conveyance = 19200;
        const specialAllowance = ctc * 0.2 - conveyance;
        const pf = basic * 0.12;
        const employerPf = basic * 0.12;
        const pt = 200;
        const tds = ctc * 0.1;
        const gross = basic + hra + conveyance + specialAllowance;
        const deductions = pf + pt + tds;
        const takeHome = gross - deductions;
        const employerCost = ctc + employerPf;

        return {
            basic, hra, conveyance, specialAllowance, pf, employerPf, pt, tds,
            gross, deductions, takeHome, employerCost, ctc
        };
    };

    const renderComponentsTab = () => (
        <div className="card border shadow-none mb-4">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0">
                        <Layers size={18} className="me-2" />
                        Salary Components Master
                    </h5>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-light border text-muted"
                            onClick={() => setShowComponentModal(true)}
                        >
                            <Plus size={16} className="me-2" />
                            Add Component
                        </button>
                        <button
                            className="btn btn-light border text-muted"
                            onClick={() => alert('Import feature coming soon!')}
                        >
                            <Download size={16} className="me-2" />
                            Import
                        </button>
                    </div>
                </div>

                {/* Earnings Components */}
                <div className="mb-5">
                    <h6 className="text-primary mb-3">💰 Earnings Components</h6>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Component Name</th>
                                    <th>Type</th>
                                    <th>Taxable</th>
                                    <th>Calculation</th>
                                    <th>Value</th>
                                    <th>Base</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {components.earnings.map(comp => (
                                    <tr key={comp.id}>
                                        <td className="fw-medium">{comp.name}</td>
                                        <td>{getComponentTypeBadge(comp.type)}</td>
                                        <td>{getTaxableBadge(comp.taxable)}</td>
                                        <td>
                                            <span className="badge bg-light border text-dark small">
                                                {comp.calculation}
                                            </span>
                                        </td>
                                        <td>
                                            {comp.calculation === 'percentage' ? `${comp.value}%` : `₹${comp.value.toLocaleString()}`}
                                        </td>
                                        <td>{comp.base}</td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => {
                                                        setSelectedComponent(comp);
                                                        setShowComponentModal(true);
                                                    }}
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => {
                                                        if (window.confirm('Delete this component?')) {
                                                            setComponents({
                                                                ...components,
                                                                earnings: components.earnings.filter(c => c.id !== comp.id)
                                                            });
                                                        }
                                                    }}
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

                {/* Deductions Components */}
                <div className="mb-5">
                    <h6 className="text-danger mb-3">📉 Deduction Components</h6>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Component Name</th>
                                    <th>Type</th>
                                    <th>Statutory</th>
                                    <th>Calculation</th>
                                    <th>Value</th>
                                    <th>Base</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {components.deductions.map(comp => (
                                    <tr key={comp.id}>
                                        <td className="fw-medium">{comp.name}</td>
                                        <td>{getComponentTypeBadge(comp.type)}</td>
                                        <td>{getTaxableBadge(comp.statutory)}</td>
                                        <td>
                                            <span className="badge bg-light border text-dark small">
                                                {comp.calculation}
                                            </span>
                                        </td>
                                        <td>
                                            {comp.calculation === 'percentage' ? `${comp.value}%` : `₹${comp.value.toLocaleString()}`}
                                        </td>
                                        <td>{comp.base}</td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => {
                                                        setSelectedComponent(comp);
                                                        setShowComponentModal(true);
                                                    }}
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => {
                                                        if (window.confirm('Delete this component?')) {
                                                            setComponents({
                                                                ...components,
                                                                deductions: components.deductions.filter(c => c.id !== comp.id)
                                                            });
                                                        }
                                                    }}
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

                {/* Other Components Grid */}
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <h6 className="text-info mb-3">🏢 Employer Contributions</h6>
                        <div className="list-group">
                            {components.employerContributions.map(comp => (
                                <div key={comp.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="fw-medium">{comp.name}</div>
                                        <small className="text-muted">{comp.calculation === 'percentage' ? `${comp.value}% of ${comp.base}` : `₹${comp.value}`}</small>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => {
                                                setSelectedComponent(comp);
                                                setShowComponentModal(true);
                                            }}
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <h6 className="text-success mb-3">🔄 Reimbursements</h6>
                        <div className="list-group">
                            {components.reimbursements.map(comp => (
                                <div key={comp.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="fw-medium">{comp.name}</div>
                                        <small className="text-muted">{comp.calculation === 'percentage' ? `${comp.value}% of ${comp.base}` : `₹${comp.value}`} • {comp.taxable ? 'Taxable' : 'Non-Taxable'}</small>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => {
                                                setSelectedComponent(comp);
                                                setShowComponentModal(true);
                                            }}
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTemplatesTab = () => (
        <div className="card border shadow-none mb-4">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0">
                        <FileText size={18} className="me-2" />
                        Salary Structure Templates
                    </h5>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowCreatePanel(true)}
                        >
                            <Plus size={16} className="me-2" />
                            Create Template
                        </button>
                        <button
                            className="btn btn-light border text-muted"
                            onClick={() => setShowSimulationPanel(true)}
                        >
                            <Calculator size={16} className="me-2" />
                            What-If Simulation
                        </button>
                        <button
                            className="btn btn-light border text-muted"
                            onClick={() => setShowVersionModal(true)}
                        >
                            <History size={16} className="me-2" />
                            Version History
                        </button>
                    </div>
                </div>

                {/* Structure Templates Grid */}
                <div className="row">
                    {structures.map(structure => {
                        const breakdown = calculateBreakdown(structure.id);
                        return (
                            <div key={structure.id} className="col-md-6 col-lg-3 mb-4">
                                <div className={`card h-100 ${selectedStructure?.id === structure.id ? 'border-primary' : ''}`}>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h6 className="card-title mb-1">{structure.name}</h6>
                                                <span className="badge bg-light text-dark border">Grade {structure.grade}</span>
                                            </div>
                                            {getStatusBadge(structure.status)}
                                        </div>

                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="text-muted small">Annual CTC</span>
                                                <span className="fw-bold">₹{structure.ctc.toLocaleString()}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="text-muted small">Take-Home</span>
                                                <span className="fw-bold text-success">₹{breakdown?.takeHome.toLocaleString()}</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="text-muted small">Employer Cost</span>
                                                <span className="fw-bold text-warning">₹{breakdown?.employerCost.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center">
                                                <Users size={14} className="me-1 text-muted" />
                                                <span className="small text-muted">{structure.employeeCount} employees</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <Calendar size={14} className="me-1 text-muted" />
                                                <span className="small text-muted">{structure.effectiveDate}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-primary flex-fill"
                                                onClick={() => setSelectedStructure(structure)}
                                            >
                                                <Eye size={14} className="me-1" />
                                                View
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-secondary flex-fill"
                                                onClick={() => {
                                                    const newStructure = { ...structure, id: structures.length + 1, name: `${structure.name} (Copy)` };
                                                    setStructures([...structures, newStructure]);
                                                }}
                                            >
                                                <Copy size={14} className="me-1" />
                                                Duplicate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Structure Details Modal */}
                {selectedStructure && (
                    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                        <div className="modal-dialog modal-xl modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{selectedStructure.name} - Breakdown</h5>
                                    <button type="button" className="btn-close" onClick={() => setSelectedStructure(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6 className="text-primary mb-3">💰 Earnings</h6>
                                            <div className="list-group mb-4">
                                                {['Basic Salary', 'House Rent Allowance', 'Conveyance Allowance', 'Special Allowance'].map((item, idx) => {
                                                    const value = calculateBreakdown(selectedStructure.id);
                                                    const amounts = [value?.basic, value?.hra, value?.conveyance, value?.specialAllowance];
                                                    return (
                                                        <div key={idx} className="list-group-item d-flex justify-content-between">
                                                            <span>{item}</span>
                                                            <span className="fw-medium">₹{amounts[idx]?.toLocaleString()}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <h6 className="text-danger mb-3">📉 Deductions</h6>
                                            <div className="list-group mb-4">
                                                {['Provident Fund', 'Professional Tax', 'TDS'].map((item, idx) => {
                                                    const value = calculateBreakdown(selectedStructure.id);
                                                    const amounts = [value?.pf, value?.pt, value?.tds];
                                                    return (
                                                        <div key={idx} className="list-group-item d-flex justify-content-between">
                                                            <span>{item}</span>
                                                            <span className="fw-medium text-danger">-₹{amounts[idx]?.toLocaleString()}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-md-6">
                                            <div className="card bg-light">
                                                <div className="card-body">
                                                    <h6 className="text-success mb-3">📊 Summary</h6>
                                                    {calculateBreakdown(selectedStructure.id) && (
                                                        <>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span>Gross Salary:</span>
                                                                <span className="fw-bold">₹{calculateBreakdown(selectedStructure.id).gross.toLocaleString()}</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span>Total Deductions:</span>
                                                                <span className="fw-bold text-danger">-₹{calculateBreakdown(selectedStructure.id).deductions.toLocaleString()}</span>
                                                            </div>
                                                            <hr />
                                                            <div className="d-flex justify-content-between">
                                                                <span className="fw-bold">Take-Home Salary:</span>
                                                                <span className="fw-bold fs-5 text-success">₹{calculateBreakdown(selectedStructure.id).takeHome.toLocaleString()}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="card bg-warning-subtle">
                                                <div className="card-body">
                                                    <h6 className="text-warning mb-3">🏢 Employer Cost</h6>
                                                    {calculateBreakdown(selectedStructure.id) && (
                                                        <>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span>CTC:</span>
                                                                <span>₹{calculateBreakdown(selectedStructure.id).ctc.toLocaleString()}</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                <span>Employer PF:</span>
                                                                <span>+₹{calculateBreakdown(selectedStructure.id).employerPf.toLocaleString()}</span>
                                                            </div>
                                                            <hr />
                                                            <div className="d-flex justify-content-between">
                                                                <span className="fw-bold">Total Cost to Company:</span>
                                                                <span className="fw-bold fs-5 text-warning">₹{calculateBreakdown(selectedStructure.id).employerCost.toLocaleString()}</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setSelectedStructure(null)}>
                                        Close
                                    </button>
                                    <button className="btn btn-primary" onClick={() => setShowBulkAssignModal(true)}>
                                        <Users size={16} className="me-2" />
                                        Assign to Employees
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderAssignmentTab = () => (
        <div className="card border shadow-none mb-4">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="mb-0">
                        <Users size={18} className="me-2" />
                        Structure Assignment
                    </h5>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowBulkAssignModal(true)}
                        >
                            <Users size={16} className="me-2" />
                            Bulk Assignment
                        </button>
                        <button
                            className="btn btn-light border text-muted"
                            onClick={() => alert('Individual assignment panel coming soon!')}
                        >
                            <User size={16} className="me-2" />
                            Individual Assignment
                        </button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Grade</th>
                                <th>Current Structure</th>
                                <th>CTC</th>
                                <th>Take-Home</th>
                                <th>Effective Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map(assignment => (
                                <tr key={assignment.id}>
                                    <td className="fw-medium">{assignment.employeeId}</td>
                                    <td>{assignment.name}</td>
                                    <td>
                                        <span className="badge bg-info-subtle text-info border">
                                            {assignment.department}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="badge bg-primary-subtle text-primary border">
                                            Grade {assignment.grade}
                                        </span>
                                    </td>
                                    <td>{assignment.currentStructure}</td>
                                    <td className="fw-bold">₹{assignment.ctc.toLocaleString()}</td>
                                    <td className="fw-bold text-success">₹{assignment.takeHome.toLocaleString()}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-1">
                                            <Calendar size={14} className="text-muted" />
                                            {assignment.effectiveDate}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-1">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => alert(`Change structure for ${assignment.name}`)}
                                            >
                                                Change
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => {
                                                    setSelectedStructure(structures.find(s => s.name === assignment.currentStructure));
                                                    setShowHistoryModal(true);
                                                }}
                                            >
                                                History
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
    );

    return (
        <div>
            {/* Main content area - aligned with sidebar */}
            <div style={{
                width: '100%',
                minHeight: '100vh',
                backgroundColor: '#f8f9fa'
            }}>
                {/* Header Card - Now properly placed */}
                <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '0' }}>
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div>
                                <h5 className="mb-1">
                                    <Icon icon="heroicons:currency-dollar" /> Salary Structure Management
                                </h5>
                                <p className="text-muted small mb-0">Manage CTC structures, components, and employee assignments</p>
                            </div>
                           
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-3">
                                <div className="card bg-primary-subtle border-primary-subtle">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="text-primary mb-1">Totalsalary Structures</h6>
                                                <h3 className="mb-0">{structures.length}</h3>
                                            </div>
                                            <div className="bg-primary rounded-circle p-3">
                                                <Layers size={24} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card bg-success-subtle border-success-subtle">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="text-success mb-1">Active Assignments</h6>
                                                <h3 className="mb-0">{assignments.length}</h3>
                                            </div>
                                            <div className="bg-success rounded-circle p-3">
                                                <Users size={24} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card bg-warning-subtle border-warning-subtle">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="text-warning mb-1">Total Components</h6>
                                                <h3 className="mb-0">
                                                    {components.earnings.length + components.deductions.length +
                                                        components.employerContributions.length + components.reimbursements.length}
                                                </h3>
                                            </div>
                                            <div className="bg-warning rounded-circle p-3">
                                                <BarChart size={24} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card bg-info-subtle border-info-subtle">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="text-info mb-1">Employee Coverage</h6>
                                                <h3 className="mb-0">
                                                    {structures.reduce((sum, s) => sum + s.employeeCount, 0)}
                                                </h3>
                                            </div>
                                            <div className="bg-info rounded-circle p-3">
                                                <User size={24} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="d-flex align-items-center justify-content-end gap-3 mb-4">
                             
                            <button
                                className="btn btn-light border text-muted"
                                onClick={() => {
                                    const csvContent = [
                                        ['Structure Name', 'Grade', 'CTC', 'Status', 'Employee Count', 'Created Date'],
                                        ...structures.map(s => [
                                            s.name, s.grade, s.ctc, s.status, s.employeeCount, s.createdAt
                                        ])
                                    ].map(row => row.join(',')).join('\n');

                                    const blob = new Blob([csvContent], { type: 'text/csv' });
                                    const url = window.URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'salary-structures-report.csv';
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    window.URL.revokeObjectURL(url);

                                    alert('Report exported successfully!');
                                }}
                            >
                                <Download size={16} className="me-2" />
                                Export Report
                            </button>
                            <button
                                className="btn btn-light border text-muted"
                                onClick={() => alert('Notification settings feature coming soon!')}
                            >
                                <Bell size={16} className="me-2" />
                                Compliance Alerts
                            </button>
                            <button
                                className="btn btn-light border text-muted"
                                onClick={() => alert('Audit log feature coming soon!')}
                            >
                                <History size={16} className="me-2" />
                                Audit Log
                            </button>
                        </div>
                        {/* Tabs */}
                        <div className="d-flex border-bottom">
                            <button
                                className={`btn btn-link text-decoration-none py-3 px-4 ${activeTab === 'components' ? 'border-bottom-2 border-primary text-primary fw-semibold' : 'text-muted'}`}
                                onClick={() => setActiveTab('components')}
                            >
                                <Layers size={18} className="me-2" />
                                Components Master
                            </button>
                            <button
                                className={`btn btn-link text-decoration-none py-3 px-4 ${activeTab === 'templates' ? 'border-bottom-2 border-primary text-primary fw-semibold' : 'text-muted'}`}
                                onClick={() => setActiveTab('templates')}
                            >
                                <FileText size={18} className="me-2" />
                                Structure Templates
                            </button>
                            <button
                                className={`btn btn-link text-decoration-none py-3 px-4 ${activeTab === 'assignment' ? 'border-bottom-2 border-primary text-primary fw-semibold' : 'text-muted'}`}
                                onClick={() => setActiveTab('assignment')}
                            >
                                <Users size={18} className="me-2" />
                                Structure Assignment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area - Directly below header */}
                <div style={{ padding: '0 20px 20px 20px' }}>
                    {/* Tab Content */}
                    {activeTab === 'components' && renderComponentsTab()}
                    {activeTab === 'templates' && renderTemplatesTab()}
                    {activeTab === 'assignment' && renderAssignmentTab()}

                    {/* Quick Stats */}

                </div>
            </div>

            {/* All modals at root level */}
            {/* Create Structure Panel */}
            {showCreatePanel && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create New Salary Structure</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCreatePanel(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Structure Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., Grade A - Management"
                                            value={newStructure.name}
                                            onChange={(e) => setNewStructure({ ...newStructure, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Grade Level</label>
                                        <select
                                            className="form-select"
                                            value={newStructure.grade}
                                            onChange={(e) => setNewStructure({ ...newStructure, grade: e.target.value })}
                                        >
                                            <option value="">Select Grade</option>
                                            <option value="A">Grade A</option>
                                            <option value="B">Grade B</option>
                                            <option value="C">Grade C</option>
                                            <option value="D">Grade D</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Annual CTC (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="e.g., 1500000"
                                            value={newStructure.ctc}
                                            onChange={(e) => setNewStructure({ ...newStructure, ctc: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Effective Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={newStructure.effectiveDate}
                                            onChange={(e) => setNewStructure({ ...newStructure, effectiveDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Description (Optional)</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Describe this salary structure..."
                                            value={newStructure.description}
                                            onChange={(e) => setNewStructure({ ...newStructure, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Select Components</label>
                                        <div className="bg-light p-3 rounded">
                                            <div className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="basic" defaultChecked />
                                                <label className="form-check-label" htmlFor="basic">
                                                    Basic Salary (40% of CTC)
                                                </label>
                                            </div>
                                            <div className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="hra" defaultChecked />
                                                <label className="form-check-label" htmlFor="hra">
                                                    House Rent Allowance (50% of Basic)
                                                </label>
                                            </div>
                                            <div className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="conveyance" defaultChecked />
                                                <label className="form-check-label" htmlFor="conveyance">
                                                    Conveyance Allowance (₹19,200)
                                                </label>
                                            </div>
                                            <div className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id="pf" defaultChecked />
                                                <label className="form-check-label" htmlFor="pf">
                                                    Provident Fund (12% of Basic)
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowCreatePanel(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={() => {
                                    if (!newStructure.name || !newStructure.grade || !newStructure.ctc) {
                                        alert('Please fill all required fields');
                                        return;
                                    }

                                    const newStruct = {
                                        id: structures.length + 1,
                                        ...newStructure,
                                        ctc: parseInt(newStructure.ctc),
                                        status: 'Draft',
                                        employeeCount: 0,
                                        createdAt: new Date().toISOString().split('T')[0],
                                        createdBy: 'Current User',
                                        components: [1, 2, 3, 6] // Default components
                                    };

                                    setStructures([...structures, newStruct]);
                                    setShowCreatePanel(false);
                                    setNewStructure({
                                        name: '',
                                        grade: '',
                                        ctc: '',
                                        effectiveDate: new Date().toISOString().split('T')[0],
                                        description: ''
                                    });
                                    alert('Salary structure created successfully!');
                                }}>
                                    <Save size={16} className="me-2" />
                                    Create Structure
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* What-If Simulation Panel */}
            {showSimulationPanel && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">What-If Salary Simulation</h5>
                                <button type="button" className="btn-close" onClick={() => setShowSimulationPanel(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-4">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Base CTC (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={simulationData.baseCTC}
                                            onChange={(e) => setSimulationData({ ...simulationData, baseCTC: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Variable Pay (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={simulationData.variablePercent}
                                            onChange={(e) => setSimulationData({ ...simulationData, variablePercent: parseFloat(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">PF Contribution (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            step="0.1"
                                            value={simulationData.pfPercent}
                                            onChange={(e) => setSimulationData({ ...simulationData, pfPercent: parseFloat(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Tax Deduction (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={simulationData.taxDeduction}
                                            onChange={(e) => setSimulationData({ ...simulationData, taxDeduction: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>

                                {/* Simulation Results */}
                                <div className="card bg-light">
                                    <div className="card-body">
                                        <h6 className="mb-3">Simulation Results</h6>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Basic Salary:</span>
                                                    <span className="fw-medium">₹{(simulationData.baseCTC * 0.4).toLocaleString()}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>HRA:</span>
                                                    <span className="fw-medium">₹{(simulationData.baseCTC * 0.4 * 0.5).toLocaleString()}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Variable Pay:</span>
                                                    <span className="fw-medium">₹{(simulationData.baseCTC * simulationData.variablePercent / 100).toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>PF Deduction:</span>
                                                    <span className="fw-medium text-danger">-₹{(simulationData.baseCTC * 0.4 * simulationData.pfPercent / 100).toLocaleString()}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span>Tax:</span>
                                                    <span className="fw-medium text-danger">-₹{simulationData.taxDeduction.toLocaleString()}</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <span className="fw-bold">Estimated Take-Home:</span>
                                                    <span className="fw-bold fs-5 text-success">
                                                        ₹{(
                                                            simulationData.baseCTC * 0.4 +
                                                            simulationData.baseCTC * 0.4 * 0.5 +
                                                            simulationData.baseCTC * simulationData.variablePercent / 100 -
                                                            simulationData.baseCTC * 0.4 * simulationData.pfPercent / 100 -
                                                            simulationData.taxDeduction
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowSimulationPanel(false)}>
                                    Close
                                </button>
                                <button className="btn btn-primary" onClick={() => {
                                    alert('Simulation saved! You can now create a structure from these values.');
                                    setShowSimulationPanel(false);
                                }}>
                                    Save as Template
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Assignment Modal */}
            {showBulkAssignModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Bulk Structure Assignment</h5>
                                <button type="button" className="btn-close" onClick={() => setShowBulkAssignModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-4">
                                    <label className="form-label">Select Structure</label>
                                    <select className="form-select">
                                        <option value="">Choose a structure...</option>
                                        {structures.map(structure => (
                                            <option key={structure.id} value={structure.id}>
                                                {structure.name} (Grade {structure.grade})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Select Employees</label>
                                    <div className="bg-light p-3 rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                        {assignments.map(assignment => (
                                            <div key={assignment.id} className="form-check mb-2">
                                                <input className="form-check-input" type="checkbox" id={`emp-${assignment.id}`} />
                                                <label className="form-check-label" htmlFor={`emp-${assignment.id}`}>
                                                    {assignment.name} ({assignment.employeeId}) - {assignment.department}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Effective Date</label>
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowBulkAssignModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={() => {
                                    alert('Bulk assignment completed successfully!');
                                    setShowBulkAssignModal(false);
                                }}>
                                    Assign Structures
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Version History Modal */}
            {showVersionModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Version History</h5>
                                <button type="button" className="btn-close" onClick={() => setShowVersionModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Version</th>
                                                <th>Structure</th>
                                                <th>Changes</th>
                                                <th>Date</th>
                                                <th>Changed By</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {versions.map(version => (
                                                <tr key={version.id}>
                                                    <td className="fw-medium">{version.version}</td>
                                                    <td>{structures.find(s => s.id === version.structureId)?.name}</td>
                                                    <td>{version.changes}</td>
                                                    <td>{version.date}</td>
                                                    <td>{version.changedBy}</td>
                                                    <td>{getStatusBadge(version.status)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowVersionModal(false)}>
                                    Close
                                </button>
                                <button className="btn btn-primary" onClick={() => alert('Export version history')}>
                                    <Download size={16} className="me-2" />
                                    Export History
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Component Modal */}
            {showComponentModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {selectedComponent ? 'Edit Component' : 'Add New Component'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => {
                                    setShowComponentModal(false);
                                    setSelectedComponent(null);
                                }}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Component Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g., Performance Bonus"
                                            defaultValue={selectedComponent?.name || ''}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Category</label>
                                        <select className="form-select" defaultValue={selectedComponent?.type || ''}>
                                            <option value="">Select Category</option>
                                            <option value="earnings">Earnings</option>
                                            <option value="deductions">Deductions</option>
                                            <option value="employerContributions">Employer Contributions</option>
                                            <option value="reimbursements">Reimbursements</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Calculation Type</label>
                                        <select className="form-select" defaultValue={selectedComponent?.calculation || ''}>
                                            <option value="">Select Type</option>
                                            <option value="flat">Flat Amount</option>
                                            <option value="percentage">Percentage</option>
                                            <option value="formula">Custom Formula</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Base for Calculation</label>
                                        <select className="form-select" defaultValue={selectedComponent?.base || ''}>
                                            <option value="">Select Base</option>
                                            <option value="Basic">Basic Salary</option>
                                            <option value="Gross">Gross Salary</option>
                                            <option value="CTC">CTC</option>
                                            <option value="Taxable">Taxable Amount</option>
                                            <option value="fixed">Fixed Amount</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            {selectedComponent?.calculation === 'percentage' ? 'Percentage Value' : 'Amount (₹)'}
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder={selectedComponent?.calculation === 'percentage' ? 'e.g., 12.5' : 'e.g., 5000'}
                                            defaultValue={selectedComponent?.value || ''}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Component Type</label>
                                        <select className="form-select" defaultValue={selectedComponent?.type || ''}>
                                            <option value="">Select Type</option>
                                            <option value="fixed">Fixed</option>
                                            <option value="variable">Variable</option>
                                            <option value="statutory">Statutory</option>
                                        </select>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="taxable" defaultChecked={selectedComponent?.taxable} />
                                            <label className="form-check-label" htmlFor="taxable">Taxable</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="statutory" defaultChecked={selectedComponent?.statutory} />
                                            <label className="form-check-label" htmlFor="statutory">Statutory</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" id="proRata" defaultChecked />
                                            <label className="form-check-label" htmlFor="proRata">Pro-rata Calculation</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => {
                                    setShowComponentModal(false);
                                    setSelectedComponent(null);
                                }}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={() => {
                                    alert(selectedComponent ? 'Component updated!' : 'Component added!');
                                    setShowComponentModal(false);
                                    setSelectedComponent(null);
                                }}>
                                    <Save size={16} className="me-2" />
                                    {selectedComponent ? 'Update Component' : 'Add Component'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalaryStructure;