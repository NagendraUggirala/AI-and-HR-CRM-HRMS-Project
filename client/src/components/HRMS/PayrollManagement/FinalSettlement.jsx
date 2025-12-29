import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const FinalSettlement = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showAssetModal, setShowAssetModal] = useState(false);
    const [showLastWorkingDayModal, setShowLastWorkingDayModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filterType, setFilterType] = useState('All');
    const [selectedForm, setSelectedForm] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [settlementStatus, setSettlementStatus] = useState('draft');
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Settlement Data State
    const [settlementData, setSettlementData] = useState({
        employee: {
            id: 'EMP001',
            name: 'John Smith',
            employeeId: 'EMP001',
            department: 'Engineering',
            designation: 'Senior Software Engineer',
            doj: '2022-03-15',
            dol: '2024-06-30',
            uan: '100123456789',
            pfNumber: 'MH/12345/1234567'
        },
        noticePeriod: {
            verified: true,
            daysServed: 60,
            requiredDays: 90,
            shortfallDays: 30,
            recoveryAmount: 0,
            verificationDate: '2024-06-15'
        },
        salary: {
            basic: 50000,
            hra: 20000,
            specialAllowance: 5000,
            daysWorked: 20,
            totalSalary: 0,
            lastWorkingDay: '2024-06-30',
            paymentDueDate: '2024-07-07'
        },
        leave: {
            earnedLeaveBalance: 18,
            casualLeaveBalance: 5,
            sickLeaveBalance: 3,
            encashmentRate: 2307.69,
            totalEncashment: 0,
            encashmentPolicy: 'Earned leave only'
        },
        bonus: {
            annualBonus: 50000,
            proRataDays: 75,
            proRataBonus: 0,
            eligibility: true,
            calculationMethod: 'Pro-rata based on days worked'
        },
        gratuity: {
            completedYears: 2.3,
            lastDrawnSalary: 50000,
            gratuityAmount: 0,
            eligibility: false,
            eligibilityYears: 5
        },
        reimbursements: {
            pendingClaims: 12500,
            approvedClaims: 10500,
            submittedClaims: 3,
            approvedCount: 2
        },
        deductions: {
            loanOutstanding: 0,
            advanceAmount: 25000,
            penaltyAmount: 0,
            noticePeriodRecovery: 0,
            otherDeductions: 1500,
            idCardDeduction: 500,
            uniformDeduction: 1000,
            assetPenalty: 0,
            totalDeductions: 0
        },
        assets: {
            allocatedAssets: [
                { id: 1, assetId: 'AST001', assetName: 'Dell Laptop', assetTag: 'LAP-2024-001', category: 'Laptop', returnStatus: 'pending', returnDate: null, condition: 'Good', penalty: 0 },
                { id: 2, assetId: 'AST002', assetName: 'Access Card', assetTag: 'CARD-001', category: 'Access Card', returnStatus: 'returned', returnDate: '2024-06-25', condition: 'Good', penalty: 0 },
                { id: 3, assetId: 'AST003', assetName: 'Company Uniform', assetTag: 'UNIFORM-001', category: 'Uniform', returnStatus: 'pending', returnDate: null, condition: null, penalty: 0 }
            ],
            totalAssets: 3,
            returnedAssets: 1,
            pendingAssets: 2,
            totalPenalty: 0
        },
        lastWorkingDay: {
            confirmed: false,
            confirmedDate: null,
            confirmedBy: null,
            actualLastWorkingDay: '2024-06-30',
            noticeServedFrom: '2024-04-01',
            noticeServedTo: '2024-06-30',
            confirmationDate: null
        },
        netSettlement: 0,
        approval: {
            status: 'pending',
            approvedBy: '',
            approvedDate: '',
            initiatedBy: 'HR Manager',
            initiatedDate: '2024-06-15',
            workflow: ['HR', 'Finance', 'Management']
        },
        documents: {
            form16Issued: false,
            pfFormsIssued: false,
            experienceLetter: false,
            relievingLetter: false,
            form19Generated: false,
            form10CGenerated: false
        },
        payment: {
            method: 'Bank Transfer',
            accountNumber: 'XXXXXX1234',
            ifscCode: 'HDFC0001234',
            bankName: 'HDFC Bank',
            paymentDate: '2024-07-07',
            status: 'pending',
            referenceNumber: '',
            processedBy: null,
            processedDate: null,
            paymentProof: null,
            paymentMode: 'NEFT',
            utrNumber: null
        },
        forms: {
            form16: {
                generated: false,
                generatedDate: null,
                financialYear: '2023-24',
                issued: false,
                issuedDate: null,
                downloadUrl: null
            },
            form19: {
                generated: false,
                generatedDate: null,
                pfAccountNumber: 'MH/12345/1234567',
                downloadUrl: null
            },
            form10C: {
                generated: false,
                generatedDate: null,
                pfAccountNumber: 'MH/12345/1234567',
                downloadUrl: null
            },
            experienceLetter: {
                generated: false,
                generatedDate: null,
                issued: false,
                issuedDate: null,
                downloadUrl: null
            },
            relievingLetter: {
                generated: false,
                generatedDate: null,
                issued: false,
                issuedDate: null,
                downloadUrl: null
            }
        }
    });

    // Employees Data for list view
    const [employees, setEmployees] = useState([]);
    const [pendingSettlements, setPendingSettlements] = useState([]);
    const [completedSettlements, setCompletedSettlements] = useState([]);
    const [settlementForms, setSettlementForms] = useState([]);
    const [reports, setReports] = useState([]);

    // Responsive items per page
    const itemsPerPage = isMobile ? 4 : isTablet ? 6 : 8;

    // Calculate all values
    const calculateSettlement = () => {
        setIsCalculating(true);

        const shortfallDays = Math.max(0, settlementData.noticePeriod.requiredDays - settlementData.noticePeriod.daysServed);
        const dailyRate = (settlementData.salary.basic + settlementData.salary.hra + settlementData.salary.specialAllowance) / 30;
        const salaryForDays = dailyRate * settlementData.salary.daysWorked;
        
        // Leave encashment - only earned leave
        const leaveEncashment = settlementData.leave.earnedLeaveBalance * settlementData.leave.encashmentRate;
        
        // Bonus pro-rata calculation
        const proRataBonus = (settlementData.bonus.annualBonus / 365) * settlementData.bonus.proRataDays;
        
        // Gratuity calculation (15 days salary for each completed year)
        const gratuityAmount = settlementData.gratuity.completedYears >= 5
            ? (settlementData.gratuity.lastDrawnSalary / 26) * 15 * Math.floor(settlementData.gratuity.completedYears)
            : 0;
        
        // Notice period recovery
        const noticeRecovery = shortfallDays * dailyRate;
        
        // Asset penalty calculation
        const assetPenalty = settlementData.assets.allocatedAssets
            .filter(asset => asset.returnStatus === 'pending' || asset.condition === 'Damaged' || asset.condition === 'Lost')
            .reduce((sum, asset) => {
                if (asset.condition === 'Lost') return sum + (asset.category === 'Laptop' ? 50000 : asset.category === 'Mobile' ? 20000 : 5000);
                if (asset.condition === 'Damaged') return sum + (asset.category === 'Laptop' ? 10000 : asset.category === 'Mobile' ? 5000 : 2000);
                if (asset.returnStatus === 'pending') return sum + (asset.category === 'Laptop' ? 5000 : asset.category === 'Mobile' ? 2000 : 1000);
                return sum;
            }, 0);
        
        const totalAdditions = salaryForDays + leaveEncashment + proRataBonus + gratuityAmount + settlementData.reimbursements.approvedClaims;
        const totalDeductions = settlementData.deductions.loanOutstanding +
            settlementData.deductions.advanceAmount +
            settlementData.deductions.penaltyAmount +
            noticeRecovery +
            assetPenalty +
            settlementData.deductions.otherDeductions;
        const netSettlement = totalAdditions - totalDeductions;

        setSettlementData(prev => ({
            ...prev,
            noticePeriod: {
                ...prev.noticePeriod,
                shortfallDays,
                recoveryAmount: noticeRecovery
            },
            salary: {
                ...prev.salary,
                totalSalary: salaryForDays
            },
            leave: {
                ...prev.leave,
                totalEncashment: leaveEncashment
            },
            bonus: {
                ...prev.bonus,
                proRataBonus
            },
            gratuity: {
                ...prev.gratuity,
                gratuityAmount,
                eligibility: settlementData.gratuity.completedYears >= 5
            },
            deductions: {
                ...prev.deductions,
                noticePeriodRecovery: noticeRecovery,
                assetPenalty: assetPenalty,
                totalDeductions: totalDeductions
            },
            assets: {
                ...prev.assets,
                totalPenalty: assetPenalty
            },
            netSettlement: netSettlement > 0 ? netSettlement : 0
        }));

        setIsCalculating(false);
    };

    // Confirm Last Working Day
    const handleConfirmLastWorkingDay = () => {
        setSettlementData(prev => ({
            ...prev,
            lastWorkingDay: {
                ...prev.lastWorkingDay,
                confirmed: true,
                confirmedDate: new Date().toISOString().split('T')[0],
                confirmedBy: 'HR Manager',
                confirmationDate: new Date().toISOString().split('T')[0]
            }
        }));
        setShowLastWorkingDayModal(false);
        alert('Last working day confirmed successfully!');
    };

    // Handle Asset Return
    const handleAssetReturn = (assetId, returnDate, condition) => {
        setSettlementData(prev => ({
            ...prev,
            assets: {
                ...prev.assets,
                allocatedAssets: prev.assets.allocatedAssets.map(asset => 
                    asset.id === assetId 
                        ? { 
                            ...asset, 
                            returnStatus: 'returned', 
                            returnDate: returnDate || new Date().toISOString().split('T')[0],
                            condition: condition || 'Good',
                            penalty: condition === 'Damaged' ? (asset.category === 'Laptop' ? 10000 : asset.category === 'Mobile' ? 5000 : 2000) :
                                     condition === 'Lost' ? (asset.category === 'Laptop' ? 50000 : asset.category === 'Mobile' ? 20000 : 5000) : 0
                        }
                        : asset
                ),
                returnedAssets: prev.assets.allocatedAssets.filter(a => a.id === assetId || a.returnStatus === 'returned').length,
                pendingAssets: prev.assets.allocatedAssets.filter(a => a.id !== assetId ? a.returnStatus === 'pending' : false).length
            }
        }));
        calculateSettlement();
        alert('Asset return recorded successfully!');
    };

    // Process Payment
    const handleProcessPayment = (paymentDetails) => {
        setSettlementData(prev => ({
            ...prev,
            payment: {
                ...prev.payment,
                ...paymentDetails,
                status: 'processed',
                processedBy: 'Finance Manager',
                processedDate: new Date().toISOString().split('T')[0]
            },
            approval: {
                ...prev.approval,
                status: 'approved',
                approvedBy: 'Finance Manager',
                approvedDate: new Date().toISOString().split('T')[0]
            }
        }));
        setShowPaymentModal(false);
        alert('Payment processed successfully!');
    };

    // Generate Form
    const handleGenerateForm = (formType) => {
        const today = new Date().toISOString().split('T')[0];
        
        setSettlementData(prev => {
            const forms = { ...prev.forms };
            
            if (formType === 'Form16') {
                forms.form16 = {
                    ...forms.form16,
                    generated: true,
                    generatedDate: today
                };
            } else if (formType === 'Form19') {
                forms.form19 = {
                    ...forms.form19,
                    generated: true,
                    generatedDate: today
                };
            } else if (formType === 'Form10C') {
                forms.form10C = {
                    ...forms.form10C,
                    generated: true,
                    generatedDate: today
                };
            } else if (formType === 'Experience') {
                forms.experienceLetter = {
                    ...forms.experienceLetter,
                    generated: true,
                    generatedDate: today
                };
            } else if (formType === 'Relieving') {
                forms.relievingLetter = {
                    ...forms.relievingLetter,
                    generated: true,
                    generatedDate: today
                };
            }
            
            return {
                ...prev,
                forms: forms
            };
        });
        
        setSelectedForm(formType);
        setShowFormModal(true);
        alert(`${formType} generated successfully!`);
    };

    // Issue Form
    const handleIssueForm = (formType) => {
        const today = new Date().toISOString().split('T')[0];
        
        setSettlementData(prev => {
            const forms = { ...prev.forms };
            
            if (formType === 'Form16') {
                forms.form16 = {
                    ...forms.form16,
                    issued: true,
                    issuedDate: today
                };
            } else if (formType === 'Experience') {
                forms.experienceLetter = {
                    ...forms.experienceLetter,
                    issued: true,
                    issuedDate: today
                };
            } else if (formType === 'Relieving') {
                forms.relievingLetter = {
                    ...forms.relievingLetter,
                    issued: true,
                    issuedDate: today
                };
            }
            
            return {
                ...prev,
                forms: forms
            };
        });
        
        alert(`${formType} issued successfully!`);
    };

    // Calculate KPIs
    const kpis = useMemo(() => {
        const totalAdditions =
            settlementData.salary.totalSalary +
            settlementData.leave.totalEncashment +
            settlementData.bonus.proRataBonus +
            settlementData.gratuity.gratuityAmount +
            settlementData.reimbursements.approvedClaims;

        const totalDeductions =
            settlementData.deductions.loanOutstanding +
            settlementData.deductions.advanceAmount +
            settlementData.deductions.penaltyAmount +
            settlementData.deductions.noticePeriodRecovery +
            settlementData.deductions.assetPenalty +
            settlementData.deductions.otherDeductions;

        const netSettlement = totalAdditions - totalDeductions;

        return {
            totalAdditions,
            totalDeductions,
            netSettlement: netSettlement > 0 ? netSettlement : 0,
            pendingSettlements: pendingSettlements.length,
            completedSettlements: completedSettlements.length,
            pendingForms: settlementForms.filter(f => f.status === 'pending').length,
            totalEmployees: employees.length
        };
    }, [settlementData, pendingSettlements, completedSettlements, settlementForms, employees]);

    // Filter data based on search and type
    const getFilteredData = () => {
        let data = [];
        switch (activeSection) {
            case 'employees':
                data = employees.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (filterType !== 'All') {
                    data = data.filter(item => item[filterType] === true);
                }
                break;
            case 'pending':
                data = pendingSettlements.filter(item =>
                    item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (filterType !== 'All') {
                    data = data.filter(item => item.status === filterType);
                }
                break;
            case 'completed':
                data = completedSettlements.filter(item =>
                    item.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (filterType !== 'All') {
                    data = data.filter(item => item.status === filterType);
                }
                break;
            case 'forms':
                data = settlementForms.filter(item =>
                    item.formName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (filterType !== 'All') {
                    data = data.filter(item => item.status === filterType);
                }
                break;
            case 'reports':
                data = reports.filter(item =>
                    item.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.period.toLowerCase().includes(searchTerm.toLowerCase())
                );
                break;
            default:
                data = [];
        }
        return data;
    };

    // Pagination
    const filteredData = getFilteredData();
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Initial data loading
    useEffect(() => {
        loadInitialData();
        calculateSettlement();
    }, []);

    const loadInitialData = () => {
        setEmployees([
            {
                id: 'EMP001',
                name: 'John Smith',
                employeeId: 'EMP001',
                department: 'Engineering',
                designation: 'Senior Software Engineer',
                doj: '2022-03-15',
                dol: '2024-06-30',
                noticePeriod: 90,
                noticeServed: 60,
                basicSalary: 50000,
                status: 'pending',
                settlementAmount: 125000,
                lastWorkingDay: '2024-06-30'
            },
            {
                id: 'EMP002',
                name: 'Sarah Johnson',
                employeeId: 'EMP002',
                department: 'Marketing',
                designation: 'Marketing Manager',
                doj: '2021-06-20',
                dol: '2024-07-15',
                noticePeriod: 90,
                noticeServed: 90,
                basicSalary: 45000,
                status: 'draft',
                settlementAmount: 98000,
                lastWorkingDay: '2024-07-15'
            },
            {
                id: 'EMP003',
                name: 'Mike Chen',
                employeeId: 'EMP003',
                department: 'Sales',
                designation: 'Sales Executive',
                doj: '2023-01-10',
                dol: '2024-06-20',
                noticePeriod: 60,
                noticeServed: 60,
                basicSalary: 35000,
                status: 'completed',
                settlementAmount: 65000,
                lastWorkingDay: '2024-06-20',
                paymentDate: '2024-06-25'
            },
            {
                id: 'EMP004',
                name: 'Emily Davis',
                employeeId: 'EMP004',
                department: 'HR',
                designation: 'HR Manager',
                doj: '2020-11-05',
                dol: '2024-08-01',
                noticePeriod: 90,
                noticeServed: 45,
                basicSalary: 55000,
                status: 'pending',
                settlementAmount: 145000,
                lastWorkingDay: '2024-08-01'
            },
            {
                id: 'EMP005',
                name: 'David Wilson',
                employeeId: 'EMP005',
                department: 'Finance',
                designation: 'Finance Controller',
                doj: '2019-08-12',
                dol: '2024-05-31',
                noticePeriod: 90,
                noticeServed: 90,
                basicSalary: 70000,
                status: 'completed',
                settlementAmount: 250000,
                lastWorkingDay: '2024-05-31',
                paymentDate: '2024-06-05'
            }
        ]);

        setPendingSettlements([
            {
                id: 'SET001',
                employeeId: 'EMP001',
                employeeName: 'John Smith',
                department: 'Engineering',
                lastWorkingDay: '2024-06-30',
                netAmount: 125000,
                status: 'pending',
                daysPending: 5,
                initiatedBy: 'HR Manager',
                initiatedDate: '2024-06-15'
            },
            {
                id: 'SET002',
                employeeId: 'EMP002',
                employeeName: 'Sarah Johnson',
                department: 'Marketing',
                lastWorkingDay: '2024-07-15',
                netAmount: 98000,
                status: 'draft',
                daysPending: 2,
                initiatedBy: 'HR Executive',
                initiatedDate: '2024-06-25'
            },
            {
                id: 'SET004',
                employeeId: 'EMP004',
                employeeName: 'Emily Davis',
                department: 'HR',
                lastWorkingDay: '2024-08-01',
                netAmount: 145000,
                status: 'pending',
                daysPending: 1,
                initiatedBy: 'HR Manager',
                initiatedDate: '2024-06-28'
            }
        ]);

        setCompletedSettlements([
            {
                id: 'SET003',
                employeeId: 'EMP003',
                employeeName: 'Mike Chen',
                department: 'Sales',
                lastWorkingDay: '2024-06-20',
                netAmount: 65000,
                status: 'completed',
                paymentDate: '2024-06-25',
                paymentMethod: 'Bank Transfer',
                approvedBy: 'Finance Manager',
                completionDate: '2024-06-24'
            },
            {
                id: 'SET005',
                employeeId: 'EMP005',
                employeeName: 'David Wilson',
                department: 'Finance',
                lastWorkingDay: '2024-05-31',
                netAmount: 250000,
                status: 'completed',
                paymentDate: '2024-06-05',
                paymentMethod: 'Bank Transfer',
                approvedBy: 'Finance Director',
                completionDate: '2024-06-04'
            }
        ]);

        setSettlementForms([
            { id: 1, formName: 'Form 16', employeeName: 'John Smith', financialYear: '2023-24', status: 'pending', dueDate: '2024-06-30', type: 'tax' },
            { id: 2, formName: 'Form 19', employeeName: 'John Smith', status: 'generated', generatedDate: '2024-06-15', type: 'pf' },
            { id: 3, formName: 'Form 10C', employeeName: 'John Smith', status: 'generated', generatedDate: '2024-06-15', type: 'pf' },
            { id: 4, formName: 'Experience Letter', employeeName: 'Mike Chen', status: 'issued', issuedDate: '2024-06-22', type: 'hr' },
            { id: 5, formName: 'Relieving Letter', employeeName: 'Mike Chen', status: 'issued', issuedDate: '2024-06-22', type: 'hr' },
            { id: 6, formName: 'Form 16', employeeName: 'David Wilson', financialYear: '2023-24', status: 'issued', issuedDate: '2024-06-04', type: 'tax' }
        ]);

        setReports([
            { id: 1, reportName: 'Monthly Settlement Report', period: 'June 2024', status: 'generated', generatedDate: '2024-07-01', type: 'monthly' },
            { id: 2, reportName: 'Tax Deduction Report', period: 'Q4 FY 2023-24', status: 'pending', dueDate: '2024-07-31', type: 'tax' },
            { id: 3, reportName: 'PF Settlement Report', period: 'June 2024', status: 'generated', generatedDate: '2024-07-02', type: 'pf' },
            { id: 4, reportName: 'Annual Settlement Summary', period: 'FY 2023-24', status: 'in-progress', progress: 75, type: 'annual' }
        ]);

        setIsLoading(false);
    };

    // Status badge functions
    const getStatusBadge = (status) => {
        const styles = {
            'pending': 'bg-warning-subtle text-warning',
            'draft': 'bg-secondary-subtle text-secondary',
            'completed': 'bg-success-subtle text-success',
            'approved': 'bg-success-subtle text-success',
            'rejected': 'bg-danger-subtle text-danger',
            'generated': 'bg-info-subtle text-info',
            'issued': 'bg-success-subtle text-success',
            'in-progress': 'bg-warning-subtle text-warning',
            'paid': 'bg-success-subtle text-success',
            'overdue': 'bg-danger-subtle text-danger'
        };

        return (
            <span className={`badge ${styles[status] || 'bg-secondary-subtle text-secondary'} fs-7 px-2 py-1`}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </span>
        );
    };

    const getTypeBadge = (type) => {
        const styles = {
            'tax': 'bg-primary-subtle text-primary',
            'pf': 'bg-info-subtle text-info',
            'hr': 'bg-success-subtle text-success',
            'monthly': 'bg-warning-subtle text-warning',
            'annual': 'bg-danger-subtle text-danger',
            'compliance': 'bg-dark-subtle text-dark'
        };

        return (
            <span className={`badge ${styles[type] || 'bg-secondary-subtle text-secondary'} fs-7 px-2 py-1`}>
                {type.toUpperCase()}
            </span>
        );
    };

    // Format functions
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Action handlers
    const handleViewDetails = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleUpdateConfig = (section, key, value) => {
        setSettlementData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const handleCheckboxChange = (section, field) => {
        setSettlementData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: !prev[section][field]
            }
        }));
    };

    const handleApproval = (status) => {
        setSettlementData(prev => ({
            ...prev,
            approval: {
                ...prev.approval,
                status,
                approvedDate: new Date().toISOString().split('T')[0]
            }
        }));
        setSettlementStatus(status);
    };

    const handleGenerateReport = () => {
        const report = `FINAL SETTLEMENT REPORT\n=======================\n\n1. EMPLOYEE DETAILS:\n   - Name: ${settlementData.employee.name}\n   - Employee ID: ${settlementData.employee.employeeId}\n   - Department: ${settlementData.employee.department}\n   - Date of Joining: ${settlementData.employee.doj}\n   - Last Working Day: ${settlementData.employee.dol}`;

        const blob = new Blob([report], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Final_Settlement_${settlementData.employee.name}_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
    };

    const handleExportReport = () => {
        let csvData = [];
        let headers = [];

        switch (activeSection) {
            case 'employees':
                headers = ['Employee ID', 'Name', 'Department', 'Last Working Day', 'Settlement Amount', 'Status'];
                csvData = employees.map(emp => [
                    emp.employeeId,
                    emp.name,
                    emp.department,
                    emp.lastWorkingDay,
                    formatCurrency(emp.settlementAmount),
                    emp.status
                ]);
                break;
            case 'pending':
                headers = ['Employee ID', 'Name', 'Department', 'Last Working Day', 'Net Amount', 'Status', 'Days Pending'];
                csvData = pendingSettlements.map(set => [
                    set.employeeId,
                    set.employeeName,
                    set.department,
                    set.lastWorkingDay,
                    formatCurrency(set.netAmount),
                    set.status,
                    set.daysPending
                ]);
                break;
            case 'completed':
                headers = ['Employee ID', 'Name', 'Department', 'Last Working Day', 'Net Amount', 'Payment Date', 'Status'];
                csvData = completedSettlements.map(set => [
                    set.employeeId,
                    set.employeeName,
                    set.department,
                    set.lastWorkingDay,
                    formatCurrency(set.netAmount),
                    set.paymentDate,
                    set.status
                ]);
                break;
            default:
                headers = ['Data', 'Export'];
                csvData = [['No data to export']];
        }

        const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `settlement_${activeSection}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleRefreshData = () => {
        setIsLoading(true);
        setTimeout(() => {
            loadInitialData();
            calculateSettlement();
            setCurrentPage(1);
            setSearchTerm('');
            setFilterType('All');
            alert('Settlement data refreshed successfully!');
        }, 1000);
    };

    // Mobile responsive table data rendering
    const renderMobileCard = (item) => {
        switch (activeSection) {
            case 'employees':
                return (
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h6 className="fw-bold mb-1">{item.name}</h6>
                                    <p className="text-muted small mb-1">{item.employeeId} • {item.designation}</p>
                                </div>
                                {getStatusBadge(item.status)}
                            </div>
                            <div className="row g-2">
                                <div className="col-6">
                                    <small className="text-muted d-block">Department</small>
                                    <span>{item.department}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Last Working Day</small>
                                    <span className="fw-semibold">{item.lastWorkingDay}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Notice Period</small>
                                    <span>{item.noticeServed}/{item.noticePeriod} days</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Amount</small>
                                    <span className="fw-bold text-success">{formatCurrency(item.settlementAmount)}</span>
                                </div>
                            </div>
                            <div className="mt-3 d-flex gap-2">
                                <button
                                    onClick={() => handleViewDetails(item)}
                                    className="btn btn-sm btn-outline-primary flex-fill"
                                >
                                    View
                                </button>
                                <button className="btn btn-sm btn-outline-warning flex-fill">
                                    Process
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'pending':
                return (
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h6 className="fw-bold mb-1">{item.employeeName}</h6>
                                    <p className="text-muted small mb-1">{item.employeeId} • {item.department}</p>
                                </div>
                                {getStatusBadge(item.status)}
                            </div>
                            <div className="row g-2">
                                <div className="col-6">
                                    <small className="text-muted d-block">Last Working Day</small>
                                    <span className="fw-semibold">{item.lastWorkingDay}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Days Pending</small>
                                    <span className={`badge ${item.daysPending > 7 ? 'bg-danger' : 'bg-warning'}`}>
                                        {item.daysPending} days
                                    </span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Net Amount</small>
                                    <span className="fw-bold text-primary">{formatCurrency(item.netAmount)}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Initiated By</small>
                                    <span>{item.initiatedBy}</span>
                                </div>
                            </div>
                            <div className="mt-3 d-flex gap-2">
                                <button
                                    onClick={() => handleViewDetails(item)}
                                    className="btn btn-sm btn-outline-primary flex-fill"
                                >
                                    View
                                </button>
                                <button className="btn btn-sm btn-outline-success flex-fill">
                                    Process
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'completed':
                return (
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h6 className="fw-bold mb-1">{item.employeeName}</h6>
                                    <p className="text-muted small mb-1">{item.employeeId} • {item.department}</p>
                                </div>
                                {getStatusBadge(item.status)}
                            </div>
                            <div className="row g-2">
                                <div className="col-6">
                                    <small className="text-muted d-block">Last Working Day</small>
                                    <span>{item.lastWorkingDay}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Payment Date</small>
                                    <span className="fw-semibold text-success">{item.paymentDate}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Net Amount</small>
                                    <span className="fw-bold text-success">{formatCurrency(item.netAmount)}</span>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Payment Method</small>
                                    <span className="badge bg-info">{item.paymentMethod}</span>
                                </div>
                                <div className="col-12">
                                    <small className="text-muted d-block">Approved By</small>
                                    <span>{item.approvedBy}</span>
                                </div>
                            </div>
                            <div className="mt-3 d-flex gap-2">
                                <button
                                    onClick={() => handleViewDetails(item)}
                                    className="btn btn-sm btn-outline-primary flex-fill"
                                >
                                    View
                                </button>
                                <button className="btn btn-sm btn-outline-success flex-fill">
                                    Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'forms':
                return (
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h6 className="fw-bold mb-1">{item.formName}</h6>
                                    <p className="text-muted small mb-1">{item.employeeName}</p>
                                </div>
                                {getStatusBadge(item.status)}
                            </div>
                            <div className="row g-2">
                                <div className="col-6">
                                    <small className="text-muted d-block">Type</small>
                                    {getTypeBadge(item.type)}
                                </div>
                                <div className="col-6">
                                    <small className="text-muted d-block">Date</small>
                                    <span>{item.generatedDate || item.issuedDate || item.dueDate || 'N/A'}</span>
                                </div>
                                {item.financialYear && (
                                    <div className="col-12">
                                        <small className="text-muted d-block">Financial Year</small>
                                        <span>{item.financialYear}</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 d-flex gap-2">
                                <button
                                    onClick={() => handleViewDetails(item)}
                                    className="btn btn-sm btn-outline-primary flex-fill"
                                >
                                    View
                                </button>
                                {item.status === 'generated' && (
                                    <button className="btn btn-sm btn-outline-success flex-fill">
                                        Download
                                    </button>
                                )}
                                {item.status === 'pending' && (
                                    <button className="btn btn-sm btn-outline-warning flex-fill">
                                        Generate
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Sidebar content
    const sidebarContent = (
        <nav className="space-y-1 p-2 p-md-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mb-md-3">
                Settlement Sections
            </div>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'overview' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('overview')}
            >
                <Icon icon="heroicons:home" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">Overview Dashboard</span>
            </button>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'calculations' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('calculations')}
            >
                <Icon icon="heroicons:calculator" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">Calculations</span>
            </button>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'deductions' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('deductions')}
            >
                <Icon icon="heroicons:banknotes" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">Deductions & Recovery</span>
            </button>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'approval' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('approval')}
            >
                <Icon icon="heroicons:document-check" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">Approval Workflow</span>
            </button>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'documents' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('documents')}
            >
                <Icon icon="heroicons:document-text" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">Document Management</span>
            </button>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'employees' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('employees')}
            >
                <Icon icon="heroicons:users" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">All Employees</span>
            </button>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'pending' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('pending')}
            >
                <Icon icon="heroicons:clock" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">Pending Settlements</span>
            </button>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('completed')}
            >
                <Icon icon="heroicons:check-circle" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">Completed Settlements</span>
            </button>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'forms' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('forms')}
            >
                <Icon icon="heroicons:clipboard-document" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">Settlement Forms</span>
            </button>

            <button
                className={`w-full flex items-center px-2 px-md-3 py-2 text-sm font-medium rounded-md ${activeSection === 'reports' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveSection('reports')}
            >
                <Icon icon="heroicons:chart-bar" className="mr-2 mr-md-3 h-5 w-5 flex-shrink-0" />
                <span className="text-xs md:text-sm">Reports & Analytics</span>
            </button>

            <div className="pt-3 pt-md-4 border-t border-gray-200 mt-3 mt-md-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mb-md-3">
                    Settlement Status
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm text-gray-600">Current Settlement:</span>
                        <span className="font-semibold text-primary text-xs md:text-sm">{formatCurrency(kpis.netSettlement)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm text-gray-600">Total Additions:</span>
                        <span className="font-semibold text-success text-xs md:text-sm">{formatCurrency(kpis.totalAdditions)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm text-gray-600">Total Deductions:</span>
                        <span className="font-semibold text-danger text-xs md:text-sm">{formatCurrency(kpis.totalDeductions)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm text-gray-600">Pending Settlements:</span>
                        <span className="font-semibold text-warning text-xs md:text-sm">{kpis.pendingSettlements}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs md:text-sm text-gray-600">Completed Settlements:</span>
                        <span className="font-semibold text-success text-xs md:text-sm">{kpis.completedSettlements}</span>
                    </div>
                </div>
            </div>
        </nav>
    );

    // User info for sidebar
    const userInfo = {
        name: 'Settlement Manager',
        role: 'HR Settlement',
        email: 'settlement@company.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Settlement'
    };

    // Render different sections
    const renderOverview = () => (
        <div className="row g-3 g-md-4">
            <div className="col-12">
                <div className="card border shadow-sm">
                    <div className="card-header bg-transparent border-0">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                            <h5 className="mb-0 fs-5 fs-md-4">Settlement Overview Dashboard</h5>
                            <div className="d-flex gap-2 w-25 w-md-auto">
                                <button
                                    className="btn btn-primary btn-sm btn-md-normal flex-fill flex-md-none"
                                    onClick={calculateSettlement}
                                    disabled={isCalculating}
                                >
                                    <Icon icon="heroicons:calculator" className="me-1 me-md-2" />
                                    {isCalculating ? 'Calculating...' : 'Recalculate'}
                                </button>
                                <button
                                    className="btn btn-outline-primary flex-fill flex-md-none"
                                    onClick={handleGenerateReport}
                                >
                                    <Icon icon="heroicons:document-arrow-down" className="me-1 me-md-2" />
                                    <span className="d-none d-md-inline">Generate Report</span>
                                    <span className="d-md-none">Report</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-3 p-md-4">
                        <div className="row g-3 g-md-4">
                            {/* Summary Cards */}
                            <div className="col-6 col-md-3">
                                <div className="card border border-primary h-100">
                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <p className="text-muted small mb-1">Total Additions</p>
                                                <h5 className="text-primary mb-0 fs-5 fs-md-4">{formatCurrency(kpis.totalAdditions)}</h5>
                                            </div>
                                            <Icon icon="heroicons:plus-circle" className="text-primary fs-4 fs-md-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="card border border-danger h-100">
                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <p className="text-muted small mb-1">Total Deductions</p>
                                                <h5 className="text-danger mb-0 fs-5 fs-md-4">{formatCurrency(kpis.totalDeductions)}</h5>
                                            </div>
                                            <Icon icon="heroicons:minus-circle" className="text-danger fs-4 fs-md-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="card border border-success h-100">
                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <p className="text-muted small mb-1">Net Settlement</p>
                                                <h5 className="text-success mb-0 fs-5 fs-md-4">{formatCurrency(kpis.netSettlement)}</h5>
                                            </div>
                                            <Icon icon="heroicons:banknotes" className="text-success fs-4 fs-md-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-6 col-md-3">
                                <div className="card border border-warning h-100">
                                    <div className="card-body p-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <p className="text-muted small mb-1">Approval Status</p>
                                                <h5 className="text-warning mb-0 fs-5 fs-md-4">{settlementStatus.toUpperCase()}</h5>
                                            </div>
                                            <Icon icon="heroicons:document-check" className="text-warning fs-4 fs-md-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Employee Information */}
                            <div className="col-12 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Employee Information</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-semibold">Employee Name</label>
                                                <p className="form-control-plaintext fw-bold mb-2 mb-md-3">{settlementData.employee.name}</p>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-semibold">Employee ID</label>
                                                <p className="form-control-plaintext mb-2 mb-md-3">{settlementData.employee.employeeId}</p>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-semibold">Department</label>
                                                <p className="form-control-plaintext mb-2 mb-md-3">{settlementData.employee.department}</p>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-semibold">Designation</label>
                                                <p className="form-control-plaintext mb-2 mb-md-3">{settlementData.employee.designation}</p>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-semibold">Date of Joining</label>
                                                <p className="form-control-plaintext mb-2 mb-md-3">{settlementData.employee.doj}</p>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label className="form-label small fw-semibold">Last Working Day</label>
                                                <p className="form-control-plaintext fw-bold text-danger mb-2 mb-md-3">{settlementData.employee.dol}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Settlement Timeline */}
                            <div className="col-12 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Settlement Timeline</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="timeline">
                                            <div className="timeline-item">
                                                <div className="timeline-marker bg-primary"></div>
                                                <div className="timeline-content">
                                                    <h6 className="fw-bold fs-6">Notice Period Initiated</h6>
                                                    <p className="text-muted small mb-1">15 June 2024</p>
                                                </div>
                                            </div>
                                            <div className="timeline-item">
                                                <div className="timeline-marker bg-info"></div>
                                                <div className="timeline-content">
                                                    <h6 className="fw-bold fs-6">Document Collection</h6>
                                                    <p className="text-muted small mb-1">20 June 2024</p>
                                                </div>
                                            </div>
                                            <div className="timeline-item">
                                                <div className={`timeline-marker ${settlementStatus === 'pending' ? 'bg-warning' : 'bg-success'}`}></div>
                                                <div className="timeline-content">
                                                    <h6 className="fw-bold fs-6">Settlement Calculation</h6>
                                                    <p className="text-muted small mb-1">25 June 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Quick Actions - Mobile Optimized */}
                            <div className="col-12">
                                <div className="card border">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Quick Actions</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-3">
                                            {[
                                                {
                                                    icon: 'heroicons:calculator',
                                                    label: 'Recalculate',
                                                    shortLabel: 'Recalc',
                                                    action: () => setActiveSection('calculations'),
                                                    color: 'primary'
                                                },
                                                {
                                                    icon: 'heroicons:check-circle',
                                                    label: 'Approve',
                                                    shortLabel: 'Approve',
                                                    action: () => handleApproval('approved'),
                                                    color: 'success'
                                                },
                                                {
                                                    icon: 'heroicons:document-text',
                                                    label: 'Documents',
                                                    shortLabel: 'Docs',
                                                    action: () => setActiveSection('documents'),
                                                    color: 'warning'
                                                },
                                                {
                                                    icon: 'heroicons:document-arrow-down',
                                                    label: 'Form 16',
                                                    shortLabel: 'Form 16',
                                                    action: () => handleGenerateForm('Form16'),
                                                    color: 'info'
                                                },
                                                {
                                                    icon: 'heroicons:arrow-down-tray',
                                                    label: 'Export',
                                                    shortLabel: 'Export',
                                                    action: handleExportReport,
                                                    color: 'danger'
                                                },
                                                {
                                                    icon: 'heroicons:arrow-path',
                                                    label: 'Refresh',
                                                    shortLabel: 'Refresh',
                                                    action: handleRefreshData,
                                                    color: 'secondary'
                                                }
                                            ].map((item, index) => (
                                                <div key={index} className="col-6 col-sm-4 col-lg-2">
                                                    <button
                                                        className={`btn btn-outline-${item.color} w-100 d-flex flex-column align-items-center justify-content-center py-3`}
                                                        onClick={item.action}
                                                        style={{ minHeight: '100px' }}
                                                    >
                                                        <Icon
                                                            icon={item.icon}
                                                            className={`mb-2 ${isMobile ? 'fs-3' : 'fs-2'}`}
                                                        />
                                                        <span className="fw-medium text-center">
                                                            <span className="d-none d-sm-block">{item.label}</span>
                                                            <span className="d-sm-none">{item.shortLabel}</span>
                                                        </span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Alternative Mobile-Only View (Optional) */}
                                        {isMobile && (
                                            <div className="mt-3 d-block d-lg-none">
                                                <div className="alert alert-info small mb-0">
                                                    <Icon icon="heroicons:information-circle" className="me-1" />
                                                    Tap any action above to perform quick settlement tasks
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCalculations = () => (
        <div className="row g-3 g-md-4">
            <div className="col-12">
                <div className="card border shadow-sm">
                    <div className="card-header bg-transparent border-0 p-3">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                            <h5 className="mb-0 fs-5 fs-md-4">Settlement Calculations</h5>
                            <button
                                className="btn btn-primary btn-sm btn-md-normal"
                                onClick={calculateSettlement}
                                disabled={isCalculating}
                            >
                                <Icon icon="heroicons:calculator" className="me-1 me-md-2" />
                                {isCalculating ? 'Calculating...' : 'Calculate Settlement'}
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-3 p-md-4">
                        <div className="row g-3 g-md-4">
                            {/* Notice Period */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Notice Period Verification</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={settlementData.noticePeriod.verified}
                                                        onChange={() => handleCheckboxChange('noticePeriod', 'verified')}
                                                        id="noticeVerified"
                                                    />
                                                    <label className="form-check-label fw-semibold" htmlFor="noticeVerified">
                                                        Notice Period Verified
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Days Served</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.noticePeriod.daysServed}
                                                    onChange={(e) => handleUpdateConfig('noticePeriod', 'daysServed', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Required Days</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.noticePeriod.requiredDays}
                                                    onChange={(e) => handleUpdateConfig('noticePeriod', 'requiredDays', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Salary Calculation */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Salary Calculation</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Basic Salary</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.salary.basic}
                                                    onChange={(e) => handleUpdateConfig('salary', 'basic', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">HRA</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.salary.hra}
                                                    onChange={(e) => handleUpdateConfig('salary', 'hra', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Days Worked</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.salary.daysWorked}
                                                    onChange={(e) => handleUpdateConfig('salary', 'daysWorked', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Salary Payable</label>
                                                <input
                                                    type="text"
                                                    className="form-control fw-bold bg-success-subtle"
                                                    value={formatCurrency(settlementData.salary.totalSalary)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Leave Encashment */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Leave Encashment</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Earned Leave Balance</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.leave.earnedLeaveBalance}
                                                    onChange={(e) => handleUpdateConfig('leave', 'earnedLeaveBalance', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Encashment Rate/Day</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.leave.encashmentRate}
                                                    onChange={(e) => handleUpdateConfig('leave', 'encashmentRate', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Total Encashment</label>
                                                <input
                                                    type="text"
                                                    className="form-control fw-bold bg-success-subtle"
                                                    value={formatCurrency(settlementData.leave.totalEncashment)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bonus & Gratuity */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Bonus & Gratuity</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Annual Bonus</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.bonus.annualBonus}
                                                    onChange={(e) => handleUpdateConfig('bonus', 'annualBonus', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Pro-rata Days</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.bonus.proRataDays}
                                                    onChange={(e) => handleUpdateConfig('bonus', 'proRataDays', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Pro-rata Bonus</label>
                                                <input
                                                    type="text"
                                                    className="form-control fw-bold bg-success-subtle"
                                                    value={formatCurrency(settlementData.bonus.proRataBonus)}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Gratuity Amount</label>
                                                <input
                                                    type="text"
                                                    className={`form-control fw-bold ${settlementData.gratuity.eligibility ? 'bg-success-subtle' : 'bg-warning-subtle'}`}
                                                    value={formatCurrency(settlementData.gratuity.gratuityAmount)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDeductions = () => (
        <div className="row g-3 g-md-4">
            <div className="col-12">
                <div className="card border shadow-sm">
                    <div className="card-header bg-transparent border-0 p-3">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                            <h5 className="mb-0 fs-5 fs-md-4">Deductions & Recovery</h5>
                            <button
                                className="btn btn-primary btn-sm btn-md-normal"
                                onClick={calculateSettlement}
                                disabled={isCalculating}
                            >
                                <Icon icon="heroicons:calculator" className="me-1 me-md-2" />
                                Calculate Deductions
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-3 p-md-4">
                        <div className="row g-3 g-md-4">
                            {/* Loan & Advances */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Loan & Advances Recovery</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Loan Outstanding</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.deductions.loanOutstanding}
                                                    onChange={(e) => handleUpdateConfig('deductions', 'loanOutstanding', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Advance Amount</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.deductions.advanceAmount}
                                                    onChange={(e) => handleUpdateConfig('deductions', 'advanceAmount', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notice Period Recovery */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Notice Period Recovery</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Shortfall Days</label>
                                                <input
                                                    type="number"
                                                    className="form-control bg-light"
                                                    value={settlementData.noticePeriod.shortfallDays}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Daily Rate</label>
                                                <input
                                                    type="number"
                                                    className="form-control bg-light"
                                                    value={((settlementData.salary.basic + settlementData.salary.hra + settlementData.salary.specialAllowance) / 30).toFixed(2)}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Notice Period Recovery</label>
                                                <input
                                                    type="text"
                                                    className="form-control fw-bold bg-danger-subtle"
                                                    value={formatCurrency(settlementData.deductions.noticePeriodRecovery)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Asset Return & Penalty */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3 d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0 fs-5">Asset Return & Penalty</h6>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => setShowAssetModal(true)}
                                        >
                                            <Icon icon="heroicons:cog-6-tooth" className="me-1" />
                                            Manage
                                        </button>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="small">Total Assets:</span>
                                                <span className="fw-bold">{settlementData.assets.totalAssets}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="small text-success">Returned:</span>
                                                <span className="fw-bold text-success">{settlementData.assets.returnedAssets}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="small text-warning">Pending:</span>
                                                <span className="fw-bold text-warning">{settlementData.assets.pendingAssets}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="small text-danger">Total Penalty:</span>
                                                <span className="fw-bold text-danger">{formatCurrency(settlementData.assets.totalPenalty)}</span>
                                            </div>
                                        </div>
                                        <div className="list-group list-group-flush">
                                            {settlementData.assets.allocatedAssets.map(asset => (
                                                <div key={asset.id} className="list-group-item px-0 py-2">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <div className="fw-semibold small">{asset.assetName}</div>
                                                            <div className="text-muted small">{asset.assetTag}</div>
                                                        </div>
                                                        <div className="text-end">
                                                            <span className={`badge ${asset.returnStatus === 'returned' ? 'bg-success' : 'bg-warning'} small`}>
                                                                {asset.returnStatus}
                                                            </span>
                                                            {asset.penalty > 0 && (
                                                                <div className="text-danger small mt-1">₹{asset.penalty.toLocaleString()}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Other Deductions */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Other Deductions</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">ID Card Deduction</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.deductions.idCardDeduction}
                                                    onChange={(e) => handleUpdateConfig('deductions', 'idCardDeduction', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <label className="form-label">Uniform Deduction</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.deductions.uniformDeduction}
                                                    onChange={(e) => handleUpdateConfig('deductions', 'uniformDeduction', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label">Other Deductions</label>
                                                <input
                                                    type="number"
                                                    className="form-control form-control-sm form-control-md"
                                                    value={settlementData.deductions.otherDeductions}
                                                    onChange={(e) => handleUpdateConfig('deductions', 'otherDeductions', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Net Settlement */}
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Net Settlement Amount</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="text-center">
                                            <h2 className={`fw-bold ${kpis.netSettlement >= 0 ? 'text-success' : 'text-danger'} fs-1`}>
                                                {formatCurrency(kpis.netSettlement)}
                                            </h2>
                                            <p className="text-muted mb-3">Amount to be paid to employee</p>
                                            <div className="progress" style={{ height: '15px' }}>
                                                <div
                                                    className="progress-bar bg-success"
                                                    role="progressbar"
                                                    style={{ width: `${(kpis.totalAdditions / (kpis.totalAdditions + kpis.totalDeductions)) * 100}%` }}
                                                    aria-valuenow={(kpis.totalAdditions / (kpis.totalAdditions + kpis.totalDeductions)) * 100}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    <span className="d-none d-md-inline">Additions</span>
                                                </div>
                                                <div
                                                    className="progress-bar bg-danger"
                                                    role="progressbar"
                                                    style={{ width: `${(kpis.totalDeductions / (kpis.totalAdditions + kpis.totalDeductions)) * 100}%` }}
                                                    aria-valuenow={(kpis.totalDeductions / (kpis.totalAdditions + kpis.totalDeductions)) * 100}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    <span className="d-none d-md-inline">Deductions</span>
                                                </div>
                                            </div>
                                            <div className="mt-2 d-flex justify-content-between small">
                                                <span className="text-success">Additions: {formatCurrency(kpis.totalAdditions)}</span>
                                                <span className="text-danger">Deductions: {formatCurrency(kpis.totalDeductions)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderApproval = () => (
        <div className="row g-3 g-md-4">
            <div className="col-12">
                <div className="card border shadow-sm">
                    <div className="card-header bg-transparent border-0 p-3">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                            <h5 className="mb-0 fs-5 fs-md-4">Approval Workflow</h5>
                            <div className="d-flex gap-2">
                                {settlementData.approval.status === 'approved' && (
                                    <button
                                        className="btn btn-success btn-sm btn-md-normal"
                                        onClick={() => setShowPaymentModal(true)}
                                    >
                                        <Icon icon="heroicons:banknotes" className="me-1 me-md-2" />
                                        Process Payment
                                    </button>
                                )}
                                <button
                                    className="btn btn-success btn-sm btn-md-normal"
                                    onClick={() => handleApproval('approved')}
                                >
                                    <Icon icon="heroicons:check-circle" className="me-1 me-md-2" />
                                    Approve
                                </button>
                                <button
                                    className="btn btn-danger btn-sm btn-md-normal"
                                    onClick={() => handleApproval('rejected')}
                                >
                                    <Icon icon="heroicons:x-circle" className="me-1 me-md-2" />
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body p-3 p-md-4">
                        <div className="row g-3 g-md-4">
                            {/* Approval Status */}
                            <div className="col-12 col-md-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Approval Status</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="text-center mb-3">
                                            <div className="mb-3">
                                                {settlementData.approval.status === 'approved' && (
                                                    <Icon icon="heroicons:check-circle" className="text-success fs-1" />
                                                )}
                                                {settlementData.approval.status === 'pending' && (
                                                    <Icon icon="heroicons:clock" className="text-warning fs-1" />
                                                )}
                                                {settlementData.approval.status === 'rejected' && (
                                                    <Icon icon="heroicons:x-circle" className="text-danger fs-1" />
                                                )}
                                                {settlementData.approval.status === 'draft' && (
                                                    <Icon icon="heroicons:pencil" className="text-secondary fs-1" />
                                                )}
                                            </div>
                                            <h3 className={`fw-bold text-${settlementData.approval.status === 'approved' ? 'success' : settlementData.approval.status === 'pending' ? 'warning' : settlementData.approval.status === 'rejected' ? 'danger' : 'secondary'}`}>
                                                {settlementData.approval.status.toUpperCase()}
                                            </h3>
                                            <p className="text-muted">
                                                {settlementData.approval.status === 'approved' && 'Settlement has been approved for payment'}
                                                {settlementData.approval.status === 'pending' && 'Awaiting approval from management'}
                                                {settlementData.approval.status === 'rejected' && 'Settlement has been rejected'}
                                                {settlementData.approval.status === 'draft' && 'Settlement is in draft mode'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Approval Workflow */}
                            <div className="col-12 col-md-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Approval Workflow Steps</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="workflow-steps">
                                            <div className={`workflow-step ${settlementStatus === 'draft' ? 'active' : 'completed'}`}>
                                                <div className="step-number">1</div>
                                                <div className="step-content">
                                                    <h6 className="fw-bold mb-1 fs-6">HR Verification</h6>
                                                    <span className="badge bg-success-subtle text-success">Completed</span>
                                                </div>
                                            </div>
                                            <div className={`workflow-step ${settlementStatus === 'pending' ? 'active' : settlementStatus === 'draft' ? 'pending' : 'completed'}`}>
                                                <div className="step-number">2</div>
                                                <div className="step-content">
                                                    <h6 className="fw-bold mb-1 fs-6">Finance Calculation</h6>
                                                    {settlementStatus === 'draft' && <span className="badge bg-secondary-subtle text-secondary">Pending</span>}
                                                    {settlementStatus === 'pending' && <span className="badge bg-warning-subtle text-warning">In Progress</span>}
                                                    {settlementStatus === 'approved' && <span className="badge bg-success-subtle text-success">Completed</span>}
                                                </div>
                                            </div>
                                            <div className={`workflow-step ${settlementStatus === 'pending' ? 'active' : settlementStatus === 'approved' ? 'completed' : 'pending'}`}>
                                                <div className="step-number">3</div>
                                                <div className="step-content">
                                                    <h6 className="fw-bold mb-1 fs-6">Management Approval</h6>
                                                    {settlementStatus === 'pending' && <span className="badge bg-warning-subtle text-warning">Awaiting</span>}
                                                    {settlementStatus === 'approved' && <span className="badge bg-success-subtle text-success">Approved</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Approval Actions */}
                            <div className="col-12">
                                <div className="card border">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Approval Actions</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-6 col-md-3">
                                                <button
                                                    className="btn btn-success w-100 py-2"
                                                    onClick={() => handleApproval('approved')}
                                                >
                                                    <Icon icon="heroicons:check-circle" className="me-1 me-md-2" />
                                                    Approve
                                                </button>
                                            </div>
                                            <div className="col-6 col-md-3">
                                                <button
                                                    className="btn btn-warning w-100 py-2"
                                                    onClick={() => handleApproval('pending')}
                                                >
                                                    <Icon icon="heroicons:clock" className="me-1 me-md-2" />
                                                    Pending
                                                </button>
                                            </div>
                                            <div className="col-6 col-md-3">
                                                <button
                                                    className="btn btn-danger w-100 py-2"
                                                    onClick={() => handleApproval('rejected')}
                                                >
                                                    <Icon icon="heroicons:x-circle" className="me-1 me-md-2" />
                                                    Reject
                                                </button>
                                            </div>
                                            <div className="col-6 col-md-3">
                                                <button
                                                    className="btn btn-outline-secondary w-100 py-2"
                                                    onClick={() => handleApproval('draft')}
                                                >
                                                    <Icon icon="heroicons:pencil" className="me-1 me-md-2" />
                                                    Draft
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDocuments = () => (
        <div className="row g-3 g-md-4">
            <div className="col-12">
                <div className="card border shadow-sm">
                    <div className="card-header bg-transparent border-0 p-3">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                            <h5 className="mb-0 fs-5 fs-md-4">Document Management</h5>
                            <button
                                className="btn btn-primary btn-sm btn-md-normal"
                                onClick={() => handleGenerateForm('All')}
                            >
                                <Icon icon="heroicons:document-arrow-down" className="me-1 me-md-2" />
                                Generate All
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-3 p-md-4">
                        <div className="row g-3 g-md-4">
                            {/* Document Checklist */}
                            <div className="col-12 col-md-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Document Checklist</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="document-checklist">
                                            <div className="document-item mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={settlementData.documents.form16Issued}
                                                        onChange={() => handleCheckboxChange('documents', 'form16Issued')}
                                                        id="form16"
                                                    />
                                                    <label className="form-check-label fw-semibold" htmlFor="form16">
                                                        Form 16 Issued
                                                    </label>
                                                    <p className="text-muted small mb-0">Income Tax Certificate</p>
                                                </div>
                                            </div>
                                            <div className="document-item mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={settlementData.documents.pfFormsIssued}
                                                        onChange={() => handleCheckboxChange('documents', 'pfFormsIssued')}
                                                        id="pfForms"
                                                    />
                                                    <label className="form-check-label fw-semibold" htmlFor="pfForms">
                                                        PF Withdrawal Forms
                                                    </label>
                                                    <p className="text-muted small mb-0">Form 19, 10C</p>
                                                </div>
                                            </div>
                                            <div className="document-item mb-3">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={settlementData.documents.experienceLetter}
                                                        onChange={() => handleCheckboxChange('documents', 'experienceLetter')}
                                                        id="expLetter"
                                                    />
                                                    <label className="form-check-label fw-semibold" htmlFor="expLetter">
                                                        Experience Letter
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Document Actions */}
                            <div className="col-12 col-md-6">
                                <div className="card border h-100">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Document Generation</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="row g-2 g-md-3">
                                            <div className="col-6 col-md-6">
                                                <button
                                                    className="btn btn-outline-primary w-100 h-100 d-flex flex-column align-items-center justify-content-center py-3"
                                                    onClick={() => handleGenerateForm('Form16')}
                                                >
                                                    <Icon icon="heroicons:document-text" className="fs-2 mb-2" />
                                                    <span className="fw-bold fs-6">Form 16</span>
                                                    <span className="small text-muted">Tax Certificate</span>
                                                </button>
                                            </div>
                                            <div className="col-6 col-md-6">
                                                <button
                                                    className="btn btn-outline-success w-100 h-100 d-flex flex-column align-items-center justify-content-center py-3"
                                                    onClick={() => handleGenerateForm('PF')}
                                                >
                                                    <Icon icon="heroicons:building-library" className="fs-2 mb-2" />
                                                    <span className="fw-bold fs-6">PF Forms</span>
                                                    <span className="small text-muted">Form 19, 10C</span>
                                                </button>
                                            </div>
                                            <div className="col-6 col-md-6">
                                                <button
                                                    className="btn btn-outline-warning w-100 h-100 d-flex flex-column align-items-center justify-content-center py-3"
                                                    onClick={() => handleGenerateForm('Experience')}
                                                >
                                                    <Icon icon="heroicons:academic-cap" className="fs-2 mb-2" />
                                                    <span className="fw-bold fs-6">Experience Letter</span>
                                                </button>
                                            </div>
                                            <div className="col-6 col-md-6">
                                                <button
                                                    className="btn btn-outline-info w-100 h-100 d-flex flex-column align-items-center justify-content-center py-3"
                                                    onClick={() => handleGenerateForm('Relieving')}
                                                >
                                                    <Icon icon="heroicons:document" className="fs-2 mb-2" />
                                                    <span className="fw-bold fs-6">Relieving Letter</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderEmployees = () => (
        <div className="card border shadow-sm">
            <div className="card-header bg-transparent border-0 p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                    <h5 className="mb-0 fs-5 fs-md-4">Employee Settlement Status</h5>
                    <div className="d-flex gap-2 w-100 w-md-auto">
                        <button
                            onClick={handleExportReport}
                            className="btn btn-primary btn-sm btn-md-normal flex-fill flex-md-none"
                        >
                            <Icon icon="heroicons:document-arrow-down" className="me-1 me-md-2" />
                            <span className="d-none d-md-inline">Export</span>
                            <span className="d-md-none">Export</span>
                        </button>
                        <button
                            onClick={handleRefreshData}
                            className="btn btn-outline-primary btn-sm btn-md-normal flex-fill flex-md-none"
                        >
                            <Icon icon="heroicons:arrow-path" className="me-1 me-md-2" />
                            <span className="d-none d-md-inline">Refresh</span>
                            <span className="d-md-none">Refresh</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                {/* Filters */}
                <div className="p-3 border-bottom">
                    <div className="d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center">
                        <div className="position-relative w-100">
                            <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control form-control-sm form-control-md ps-5"
                            />
                        </div>
                        <div className="w-100 w-md-auto">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="form-select form-select-sm form-select-md"
                            >
                                <option value="All">All Employees</option>
                                <option value="pending">Pending</option>
                                <option value="draft">Draft</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className={`d-block ${isMobile ? 'p-3' : 'd-none'}`}>
                    {paginatedData.map((item) => renderMobileCard(item))}

                    {paginatedData.length === 0 && (
                        <div className="text-center py-5 text-muted">
                            <Icon icon="heroicons:users" className="fs-1 mb-3" />
                            <h5>No employees found</h5>
                            <p>No employees match your search criteria.</p>
                        </div>
                    )}
                </div>

                {/* Desktop/Tablet Table View */}
                <div className={`d-none ${isMobile ? 'd-none' : 'd-block'}`}>
                    <div className="table-responsive" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table className="table table-hover mb-0" style={{ minWidth: '768px' }}>
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Employee</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Department</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Last Working Day</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Notice Period</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Amount</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Status</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((employee) => (
                                    <tr key={employee.id} className="border-bottom">
                                        <td className="px-3 py-3">
                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                                    <Icon icon="heroicons:user" className="text-muted" />
                                                </div>
                                                <div>
                                                    <div className="fw-medium text-dark">{employee.name}</div>
                                                    <div className="small text-muted">{employee.employeeId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">{employee.department}</td>
                                        <td className="px-2 py-3 fw-semibold">{employee.lastWorkingDay}</td>
                                        <td className="px-2 py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <span className={`badge ${employee.noticeServed >= employee.noticePeriod ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                                    {employee.noticeServed}/{employee.noticePeriod} days
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="fw-bold text-success">{formatCurrency(employee.settlementAmount)}</div>
                                        </td>
                                        <td className="px-2 py-3">{getStatusBadge(employee.status)}</td>
                                        <td className="px-2 py-3">
                                            <div className="d-flex gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(employee)}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="p-3 border-top">
                    <div className="row g-2 g-md-3">
                        <div className="col-6 col-md-3">
                            <div className="card border h-100">
                                <div className="card-body p-3 text-center">
                                    <div className="text-primary mb-2">
                                        <Icon icon="heroicons:users" className="fs-4 fs-md-3" />
                                    </div>
                                    <h4 className="fw-bold mb-1">{employees.length}</h4>
                                    <p className="text-muted mb-0 small">Total Employees</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border h-100">
                                <div className="card-body p-3 text-center">
                                    <div className="text-warning mb-2">
                                        <Icon icon="heroicons:clock" className="fs-4 fs-md-3" />
                                    </div>
                                    <h4 className="fw-bold mb-1">{employees.filter(e => e.status === 'pending').length}</h4>
                                    <p className="text-muted mb-0 small">Pending</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border h-100">
                                <div className="card-body p-3 text-center">
                                    <div className="text-success mb-2">
                                        <Icon icon="heroicons:check-circle" className="fs-4 fs-md-3" />
                                    </div>
                                    <h4 className="fw-bold mb-1">{employees.filter(e => e.status === 'completed').length}</h4>
                                    <p className="text-muted mb-0 small">Completed</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border h-100">
                                <div className="card-body p-3 text-center">
                                    <div className="text-info mb-2">
                                        <Icon icon="heroicons:banknotes" className="fs-4 fs-md-3" />
                                    </div>
                                    <h4 className="fw-bold mb-1">{formatCurrency(employees.reduce((sum, emp) => sum + emp.settlementAmount, 0))}</h4>
                                    <p className="text-muted mb-0 small">Total Amount</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-3 py-3 border-top d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
                        <div className="small text-muted">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} employees
                        </div>
                        <div className="d-flex gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Prev
                            </button>
                            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`btn btn-sm ${currentPage === pageNum
                                                ? 'btn-primary'
                                                : 'btn-outline-secondary'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderPendingSettlements = () => (
        <div className="card border shadow-sm">
            <div className="card-header bg-transparent border-0 p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                    <h5 className="mb-0 fs-5 fs-md-4">Pending Settlements</h5>
                    <div className="d-flex gap-2 w-100 w-md-auto">
                        <button
                            onClick={handleExportReport}
                            className="btn btn-primary btn-sm btn-md-normal flex-fill flex-md-none"
                        >
                            <Icon icon="heroicons:document-arrow-down" className="me-1 me-md-2" />
                            Export
                        </button>
                        <button
                            onClick={handleRefreshData}
                            className="btn btn-outline-primary btn-sm btn-md-normal flex-fill flex-md-none"
                        >
                            <Icon icon="heroicons:arrow-path" className="me-1 me-md-2" />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                {/* Filters */}
                <div className="p-3 border-bottom">
                    <div className="d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center">
                        <div className="position-relative w-100">
                            <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
                            <input
                                type="text"
                                placeholder="Search pending settlements..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control form-control-sm form-control-md ps-5"
                            />
                        </div>
                        <div className="w-100 w-md-auto">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="form-select form-select-sm form-select-md"
                            >
                                <option value="All">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className={`d-block ${isMobile ? 'p-3' : 'd-none'}`}>
                    {paginatedData.map((item) => renderMobileCard(item))}

                    {paginatedData.length === 0 && (
                        <div className="text-center py-5 text-muted">
                            <Icon icon="heroicons:inbox" className="fs-1 mb-3" />
                            <h5>No pending settlements</h5>
                            <p>All settlements have been processed.</p>
                        </div>
                    )}
                </div>

                {/* Desktop/Tablet Table View */}
                <div className={`d-none ${isMobile ? 'd-none' : 'd-block'}`}>
                    <div className="table-responsive" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table className="table table-hover mb-0" style={{ minWidth: '768px' }}>
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Employee</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Last Working Day</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Net Amount</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Status</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Days Pending</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((settlement) => (
                                    <tr key={settlement.id} className="border-bottom">
                                        <td className="px-3 py-3">
                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                                    <Icon icon="heroicons:user" className="text-muted" />
                                                </div>
                                                <div>
                                                    <div className="fw-medium text-dark">{settlement.employeeName}</div>
                                                    <div className="small text-muted">{settlement.employeeId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 fw-semibold">{settlement.lastWorkingDay}</td>
                                        <td className="px-2 py-3">
                                            <div className="fw-bold text-primary">{formatCurrency(settlement.netAmount)}</div>
                                        </td>
                                        <td className="px-2 py-3">{getStatusBadge(settlement.status)}</td>
                                        <td className="px-2 py-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <span className={`badge ${settlement.daysPending > 7 ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'}`}>
                                                    {settlement.daysPending} days
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="d-flex gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(settlement)}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="p-3 border-top">
                    <div className="row g-2 g-md-3">
                        <div className="col-6 col-md-4">
                            <div className="card border border-warning h-100">
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Total Pending Amount</p>
                                            <h4 className="fw-bold text-warning mb-0 fs-5">
                                                {formatCurrency(pendingSettlements.reduce((sum, set) => sum + set.netAmount, 0))}
                                            </h4>
                                        </div>
                                        <Icon icon="heroicons:clock" className="text-warning fs-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="card border border-info h-100">
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Average Processing Time</p>
                                            <h4 className="fw-bold text-info mb-0 fs-5">5.2 days</h4>
                                        </div>
                                        <Icon icon="heroicons:chart-bar" className="text-info fs-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card border border-danger h-100">
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Overdue Settlements</p>
                                            <h4 className="fw-bold text-danger mb-0 fs-5">
                                                {pendingSettlements.filter(set => set.daysPending > 7).length}
                                            </h4>
                                        </div>
                                        <Icon icon="heroicons:exclamation-triangle" className="text-danger fs-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-3 py-3 border-top d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
                        <div className="small text-muted">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} settlements
                        </div>
                        <div className="d-flex gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Prev
                            </button>
                            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`btn btn-sm ${currentPage === pageNum
                                                ? 'btn-primary'
                                                : 'btn-outline-secondary'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderCompletedSettlements = () => (
        <div className="card border shadow-sm">
            <div className="card-header bg-transparent border-0 p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                    <h5 className="mb-0 fs-5 fs-md-4">Completed Settlements</h5>
                    <div className="d-flex gap-2 w-100 w-md-auto">
                        <button
                            onClick={handleExportReport}
                            className="btn btn-primary btn-sm btn-md-normal flex-fill flex-md-none"
                        >
                            <Icon icon="heroicons:document-arrow-down" className="me-1 me-md-2" />
                            Export
                        </button>
                        <button
                            onClick={handleRefreshData}
                            className="btn btn-outline-primary btn-sm btn-md-normal flex-fill flex-md-none"
                        >
                            <Icon icon="heroicons:arrow-path" className="me-1 me-md-2" />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                {/* Filters */}
                <div className="p-3 border-bottom">
                    <div className="d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center">
                        <div className="position-relative w-100">
                            <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
                            <input
                                type="text"
                                placeholder="Search completed settlements..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control form-control-sm form-control-md ps-5"
                            />
                        </div>
                        <div className="w-100 w-md-auto">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="form-select form-select-sm form-select-md"
                            >
                                <option value="All">All</option>
                                <option value="completed">Completed</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className={`d-block ${isMobile ? 'p-3' : 'd-none'}`}>
                    {paginatedData.map((item) => renderMobileCard(item))}

                    {paginatedData.length === 0 && (
                        <div className="text-center py-5 text-muted">
                            <Icon icon="heroicons:check-circle" className="fs-1 mb-3" />
                            <h5>No completed settlements</h5>
                            <p>No settlements have been completed yet.</p>
                        </div>
                    )}
                </div>

                {/* Desktop/Tablet Table View */}
                <div className={`d-none ${isMobile ? 'd-none' : 'd-block'}`}>
                    <div className="table-responsive" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table className="table table-hover mb-0" style={{ minWidth: '768px' }}>
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Employee</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Last Working Day</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Payment Date</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Net Amount</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Status</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((settlement) => (
                                    <tr key={settlement.id} className="border-bottom">
                                        <td className="px-3 py-3">
                                            <div className="d-flex align-items-center">
                                                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                                    <Icon icon="heroicons:user" className="text-muted" />
                                                </div>
                                                <div>
                                                    <div className="fw-medium text-dark">{settlement.employeeName}</div>
                                                    <div className="small text-muted">{settlement.employeeId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">{settlement.lastWorkingDay}</td>
                                        <td className="px-2 py-3 fw-semibold text-success">{settlement.paymentDate}</td>
                                        <td className="px-2 py-3">
                                            <div className="fw-bold text-success">{formatCurrency(settlement.netAmount)}</div>
                                        </td>
                                        <td className="px-2 py-3">{getStatusBadge(settlement.status)}</td>
                                        <td className="px-2 py-3">
                                            <div className="d-flex gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(settlement)}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="p-3 border-top">
                    <div className="row g-2 g-md-3">
                        <div className="col-6 col-md-3">
                            <div className="card border border-success h-100">
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Total Settled Amount</p>
                                            <h4 className="fw-bold text-success mb-0 fs-5">
                                                {formatCurrency(completedSettlements.reduce((sum, set) => sum + set.netAmount, 0))}
                                            </h4>
                                        </div>
                                        <Icon icon="heroicons:banknotes" className="text-success fs-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border border-primary h-100">
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Average Settlement</p>
                                            <h4 className="fw-bold text-primary mb-0 fs-5">
                                                {formatCurrency(completedSettlements.reduce((sum, set) => sum + set.netAmount, 0) / completedSettlements.length || 0)}
                                            </h4>
                                        </div>
                                        <Icon icon="heroicons:calculator" className="text-primary fs-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border border-info h-100">
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">This Month</p>
                                            <h4 className="fw-bold text-info mb-0 fs-5">{completedSettlements.length}</h4>
                                        </div>
                                        <Icon icon="heroicons:calendar" className="text-info fs-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border border-warning h-100">
                                <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Avg Processing Days</p>
                                            <h4 className="fw-bold text-warning mb-0 fs-5">6.5 days</h4>
                                        </div>
                                        <Icon icon="heroicons:clock" className="text-warning fs-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-3 py-3 border-top d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
                        <div className="small text-muted">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} settlements
                        </div>
                        <div className="d-flex gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Prev
                            </button>
                            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`btn btn-sm ${currentPage === pageNum
                                                ? 'btn-primary'
                                                : 'btn-outline-secondary'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderFormsSection = () => (
        <div className="card border shadow-sm">
            <div className="card-header bg-transparent border-0 p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                    <h5 className="mb-0 fs-5 fs-md-4">Settlement Forms Management</h5>
                    <div className="d-flex gap-2 w-100 w-md-auto">
                        <button
                            onClick={handleExportReport}
                            className="btn btn-primary btn-sm btn-md-normal flex-fill flex-md-none"
                        >
                            <Icon icon="heroicons:document-arrow-down" className="me-1 me-md-2" />
                            Export
                        </button>
                        <button
                            onClick={handleRefreshData}
                            className="btn btn-outline-primary btn-sm btn-md-normal flex-fill flex-md-none"
                        >
                            <Icon icon="heroicons:arrow-path" className="me-1 me-md-2" />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                {/* Filters */}
                <div className="p-3 border-bottom">
                    <div className="d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center">
                        <div className="position-relative w-100">
                            <Icon icon="heroicons:magnifying-glass" className="position-absolute top-50 translate-middle-y text-muted ms-3" />
                            <input
                                type="text"
                                placeholder="Search forms..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control form-control-sm form-control-md ps-5"
                            />
                        </div>
                        <div className="w-100 w-md-auto">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="form-select form-select-sm form-select-md"
                            >
                                <option value="All">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="generated">Generated</option>
                                <option value="issued">Issued</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Mobile View */}
                <div className={`d-block ${isMobile ? 'p-3' : 'd-none'}`}>
                    {paginatedData.map((item) => renderMobileCard(item))}

                    {paginatedData.length === 0 && (
                        <div className="text-center py-5 text-muted">
                            <Icon icon="heroicons:document-text" className="fs-1 mb-3" />
                            <h5>No forms found</h5>
                            <p>No forms match your search criteria.</p>
                        </div>
                    )}
                </div>

                {/* Desktop/Tablet Table View */}
                <div className={`d-none ${isMobile ? 'd-none' : 'd-block'}`}>
                    <div className="table-responsive" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table className="table table-hover mb-0" style={{ minWidth: '768px' }}>
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 px-3 py-3 text-uppercase fw-bold text-dark">Form Name</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Employee</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Type</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Status</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Date</th>
                                    <th className="border-0 px-2 py-3 text-uppercase fw-bold text-dark">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((form) => (
                                    <tr key={form.id} className="border-bottom">
                                        <td className="px-3 py-3">
                                            <div className="fw-medium text-dark">{form.formName}</div>
                                            {form.financialYear && (
                                                <div className="small text-muted">{form.financialYear}</div>
                                            )}
                                        </td>
                                        <td className="px-2 py-3">{form.employeeName}</td>
                                        <td className="px-2 py-3">{getTypeBadge(form.type)}</td>
                                        <td className="px-2 py-3">{getStatusBadge(form.status)}</td>
                                        <td className="px-2 py-3">{form.generatedDate || form.issuedDate || form.dueDate || 'N/A'}</td>
                                        <td className="px-2 py-3">
                                            <div className="d-flex gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(form)}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Form Types Summary */}
                <div className="p-3 border-top">
                    <h6 className="mb-3 fs-5">Available Form Types</h6>
                    <div className="row g-2 g-md-3">
                        <div className="col-6 col-md-4">
                            <div className="card border cursor-pointer" onClick={() => handleGenerateForm('Form16')}>
                                <div className="card-body p-3 text-center">
                                    <div className="text-primary mb-2">
                                        <Icon icon="heroicons:document-text" className="fs-2" />
                                    </div>
                                    <h6 className="fw-bold mb-1">Form 16</h6>
                                    <p className="text-muted small mb-0">Tax Certificate</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="card border cursor-pointer" onClick={() => handleGenerateForm('PF')}>
                                <div className="card-body p-3 text-center">
                                    <div className="text-success mb-2">
                                        <Icon icon="heroicons:building-library" className="fs-2" />
                                    </div>
                                    <h6 className="fw-bold mb-1">PF Forms</h6>
                                    <p className="text-muted small mb-0">Form 19, 10C</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-4">
                            <div className="card border cursor-pointer" onClick={() => handleGenerateForm('Experience')}>
                                <div className="card-body p-3 text-center">
                                    <div className="text-warning mb-2">
                                        <Icon icon="heroicons:academic-cap" className="fs-2" />
                                    </div>
                                    <h6 className="fw-bold mb-1">HR Letters</h6>
                                    <p className="text-muted small mb-0">Experience & Relieving</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-3 py-3 border-top d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
                        <div className="small text-muted">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} forms
                        </div>
                        <div className="d-flex gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Prev
                            </button>
                            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`btn btn-sm ${currentPage === pageNum
                                                ? 'btn-primary'
                                                : 'btn-outline-secondary'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderReportsSection = () => (
        <div className="row g-3 g-md-4">
            <div className="col-12">
                <div className="card border shadow-sm">
                    <div className="card-header bg-transparent border-0 p-3">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
                            <h5 className="mb-0 fs-5 fs-md-4">Settlement Reports & Analytics</h5>
                            <button
                                onClick={handleExportReport}
                                className="btn btn-primary btn-sm btn-md-normal"
                            >
                                <Icon icon="heroicons:document-arrow-down" className="me-1 me-md-2" />
                                Export Reports
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-3 p-md-4">
                        <div className="row g-3 g-md-4">
                            {/* Reports Summary */}
                            <div className="col-12">
                                <div className="card border">
                                    <div className="card-header p-3">
                                        <h6 className="mb-0 fs-5">Available Reports</h6>
                                    </div>
                                    <div className="card-body p-3">
                                        <div className="table-responsive" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                            <table className="table table-hover" style={{ minWidth: '768px' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Report Name</th>
                                                        <th>Period</th>
                                                        <th>Type</th>
                                                        <th>Status</th>
                                                        <th>Generated Date</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {reports.map(report => (
                                                        <tr key={report.id}>
                                                            <td className="fw-semibold">{report.reportName}</td>
                                                            <td>{report.period}</td>
                                                            <td>{getTypeBadge(report.type)}</td>
                                                            <td>{getStatusBadge(report.status)}</td>
                                                            <td>{report.generatedDate || 'N/A'}</td>
                                                            <td>
                                                                <div className="d-flex gap-2">
                                                                    <button className="btn btn-sm btn-outline-primary">
                                                                        View
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
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return renderOverview();
            case 'calculations':
                return renderCalculations();
            case 'deductions':
                return renderDeductions();
            case 'approval':
                return renderApproval();
            case 'documents':
                return renderDocuments();
            case 'employees':
                return renderEmployees();
            case 'pending':
                return renderPendingSettlements();
            case 'completed':
                return renderCompletedSettlements();
            case 'forms':
                return renderFormsSection();
            case 'reports':
                return renderReportsSection();
            default:
                return renderOverview();
        }
    };

    if (isLoading) {
        return (
            <div
                sidebarContent={sidebarContent}
                userInfo={userInfo}
                appName="Final Settlement Processing"
            >
                <div className="container-fluid">
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Mobile menu toggle button
    const MobileMenuButton = () => (
        <button
            className="btn btn-primary d-md-none position-fixed"
            style={{ bottom: '20px', right: '20px', zIndex: 1000 }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
            <Icon icon={showMobileMenu ? 'heroicons:x-mark' : 'heroicons:bars-3'} className="fs-4" />
        </button>
    );

    return (
        <>
            <div
                sidebarContent={sidebarContent}
                userInfo={userInfo}
                appName="Final Settlement Processing"
            >
                <div className="container-fluid px-3 px-md-4 py-3 py-md-4">
                    {/* Header */}
                    <div className="mb-3 mb-md-4">
                        <div className="d-flex align-items-center gap-2 mb-2 mb-md-3">
                            {activeSection !== 'overview' && (
                                <button
                                    onClick={() => setActiveSection('overview')}
                                    className="btn btn-link d-flex align-items-center gap-1 text-decoration-none"
                                >
                                    <Icon icon="heroicons:arrow-left" />
                                    <span className="d-none d-md-inline">Back to Overview</span>
                                    <span className="d-md-none">Back</span>
                                </button>
                            )}
                        </div>
                        <h5 className="fw-bold text-dark mb-1 mb-md-2 d-flex align-items-center gap-2 fs-4 fs-md-3">
                            <Icon icon="heroicons:banknotes" />
                            Final Settlement Processing
                        </h5>
                        <p className="text-muted mb-0">
                            Manage full & final settlement with notice period verification, salary calculation, leave encashment, deductions, and approval workflow
                        </p>
                    </div>

                    {/* Current Settlement Status - Compact for Mobile */}
                    <div className="row g-2 g-md-3 mb-3 mb-md-4">
                        <div className="col-6 col-md-3">
                            <div className="card border border-primary h-100">
                                <div className="card-body p-2 p-md-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Current Settlement</p>
                                            <h5 className="text-primary mb-0 fs-5 fs-md-4">{formatCurrency(kpis.netSettlement)}</h5>
                                        </div>
                                        <Icon icon="heroicons:banknotes" className="text-primary fs-4 fs-md-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border border-success h-100">
                                <div className="card-body p-2 p-md-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Total Additions</p>
                                            <h5 className="text-success mb-0 fs-5 fs-md-4">{formatCurrency(kpis.totalAdditions)}</h5>
                                        </div>
                                        <Icon icon="heroicons:plus-circle" className="text-success fs-4 fs-md-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border border-danger h-100">
                                <div className="card-body p-2 p-md-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Total Deductions</p>
                                            <h5 className="text-danger mb-0 fs-5 fs-md-4">{formatCurrency(kpis.totalDeductions)}</h5>
                                        </div>
                                        <Icon icon="heroicons:minus-circle" className="text-danger fs-4 fs-md-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card border border-warning h-100">
                                <div className="card-body p-2 p-md-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="text-muted small mb-1">Approval Status</p>
                                            <h5 className="text-warning mb-0 fs-5 fs-md-4">{settlementData.approval.status.toUpperCase()}</h5>
                                        </div>
                                        <Icon icon="heroicons:document-check" className="text-warning fs-4 fs-md-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    {renderContent()}

                    {/* Mobile Menu Button */}
                    <MobileMenuButton />
                </div>
            </div>

            {/* Generate Form Modal */}
            {showFormModal && selectedForm && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center gap-2 fs-5">
                                    <Icon icon="heroicons:document-plus" />
                                    Generate {selectedForm} Form
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowFormModal(false);
                                        setSelectedForm(null);
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Select Employee</label>
                                    <select className="form-select form-select-sm form-control-md">
                                        <option value="EMP001">John Smith (EMP001)</option>
                                        <option value="EMP002">Sarah Johnson (EMP002)</option>
                                        <option value="EMP003">Mike Chen (EMP003)</option>
                                        <option value="EMP004">Emily Davis (EMP004)</option>
                                        <option value="EMP005">David Wilson (EMP005)</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Select Period</label>
                                    <select className="form-select form-select-sm form-control-md">
                                        <option>June 2024</option>
                                        <option>Q2 2024</option>
                                        <option>FY 2023-24</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Format</label>
                                    <div className="d-flex flex-wrap gap-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="format" id="pdf" defaultChecked />
                                            <label className="form-check-label" htmlFor="pdf">
                                                PDF
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="format" id="excel" />
                                            <label className="form-check-label" htmlFor="excel">
                                                Excel
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="format" id="word" />
                                            <label className="form-check-label" htmlFor="word">
                                                Word
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="alert alert-info">
                                    <Icon icon="heroicons:information-circle" className="me-2" />
                                    The form will be generated with all relevant settlement data.
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setShowFormModal(false);
                                            setSelectedForm(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            alert(`Generating ${selectedForm} form...`);
                                            setShowFormModal(false);
                                            setSelectedForm(null);
                                        }}
                                    >
                                        <Icon icon="heroicons:document-arrow-down" className="me-2" />
                                        Generate & Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Details Modal */}
            {showModal && selectedItem && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center gap-2 fs-5">
                                    <Icon icon="heroicons:eye" />
                                    {selectedItem.name || selectedItem.employeeName || selectedItem.formName} Details
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {(activeSection === 'employees' || activeSection === 'pending' || activeSection === 'completed') && (
                                    <div className="row g-3">
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Employee Name</label>
                                            <p className="form-control-plaintext fw-bold">{selectedItem.name || selectedItem.employeeName}</p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Employee ID</label>
                                            <p className="form-control-plaintext">{selectedItem.employeeId}</p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Department</label>
                                            <p className="form-control-plaintext">{selectedItem.department}</p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Last Working Day</label>
                                            <p className="form-control-plaintext fw-bold text-danger">{selectedItem.lastWorkingDay}</p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Settlement Amount</label>
                                            <p className="form-control-plaintext fw-bold text-success">{formatCurrency(selectedItem.settlementAmount || selectedItem.netAmount)}</p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Status</label>
                                            <p className="form-control-plaintext">{getStatusBadge(selectedItem.status)}</p>
                                        </div>
                                    </div>
                                )}

                                {activeSection === 'forms' && (
                                    <div className="row g-3">
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Form Name</label>
                                            <p className="form-control-plaintext fw-bold">{selectedItem.formName}</p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Employee Name</label>
                                            <p className="form-control-plaintext">{selectedItem.employeeName}</p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Type</label>
                                            <p className="form-control-plaintext">{getTypeBadge(selectedItem.type)}</p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label className="form-label small fw-semibold">Status</label>
                                            <p className="form-control-plaintext">{getStatusBadge(selectedItem.status)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        alert(`Processing ${selectedItem.name || selectedItem.employeeName || selectedItem.formName}...`);
                                        setShowModal(false);
                                    }}
                                >
                                    Take Action
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Processing Modal */}
            {showPaymentModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center gap-2 fs-5">
                                    <Icon icon="heroicons:banknotes" />
                                    Process Payment
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowPaymentModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-info mb-3">
                                    <strong>Net Settlement Amount:</strong> {formatCurrency(kpis.netSettlement)}
                                </div>
                                <div className="row g-3">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Payment Method</label>
                                        <select 
                                            className="form-select"
                                            value={settlementData.payment.method}
                                            onChange={(e) => handleUpdateConfig('payment', 'method', e.target.value)}
                                        >
                                            <option value="Bank Transfer">Bank Transfer</option>
                                            <option value="NEFT">NEFT</option>
                                            <option value="RTGS">RTGS</option>
                                            <option value="IMPS">IMPS</option>
                                            <option value="Cheque">Cheque</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Payment Mode</label>
                                        <select 
                                            className="form-select"
                                            value={settlementData.payment.paymentMode}
                                            onChange={(e) => handleUpdateConfig('payment', 'paymentMode', e.target.value)}
                                        >
                                            <option value="NEFT">NEFT</option>
                                            <option value="RTGS">RTGS</option>
                                            <option value="IMPS">IMPS</option>
                                            <option value="Cheque">Cheque</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Bank Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settlementData.payment.bankName}
                                            onChange={(e) => handleUpdateConfig('payment', 'bankName', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Account Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settlementData.payment.accountNumber}
                                            onChange={(e) => handleUpdateConfig('payment', 'accountNumber', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">IFSC Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settlementData.payment.ifscCode}
                                            onChange={(e) => handleUpdateConfig('payment', 'ifscCode', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Payment Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={settlementData.payment.paymentDate}
                                            onChange={(e) => handleUpdateConfig('payment', 'paymentDate', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">UTR/Reference Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={settlementData.payment.utrNumber || ''}
                                            onChange={(e) => handleUpdateConfig('payment', 'utrNumber', e.target.value)}
                                            placeholder="Enter UTR/Reference number"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Payment Remarks</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Add any payment remarks or notes"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowPaymentModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        handleProcessPayment({
                                            status: 'processed',
                                            processedBy: 'Finance Manager',
                                            processedDate: new Date().toISOString().split('T')[0]
                                        });
                                    }}
                                >
                                    <Icon icon="heroicons:check-circle" className="me-2" />
                                    Process Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Asset Management Modal */}
            {showAssetModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center gap-2 fs-5">
                                    <Icon icon="heroicons:cube" />
                                    Asset Return Management
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAssetModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Asset Name</th>
                                                <th>Asset Tag</th>
                                                <th>Category</th>
                                                <th>Return Status</th>
                                                <th>Condition</th>
                                                <th>Penalty</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {settlementData.assets.allocatedAssets.map(asset => (
                                                <tr key={asset.id}>
                                                    <td className="fw-medium">{asset.assetName}</td>
                                                    <td><code>{asset.assetTag}</code></td>
                                                    <td>{asset.category}</td>
                                                    <td>
                                                        <span className={`badge ${asset.returnStatus === 'returned' ? 'bg-success' : 'bg-warning'}`}>
                                                            {asset.returnStatus}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {asset.returnStatus === 'returned' ? (
                                                            <select
                                                                className="form-select form-select-sm"
                                                                value={asset.condition || 'Good'}
                                                                onChange={(e) => {
                                                                    const newCondition = e.target.value;
                                                                    const penalty = newCondition === 'Lost' ? (asset.category === 'Laptop' ? 50000 : asset.category === 'Mobile' ? 20000 : 5000) :
                                                                                    newCondition === 'Damaged' ? (asset.category === 'Laptop' ? 10000 : asset.category === 'Mobile' ? 5000 : 2000) : 0;
                                                                    handleAssetReturn(asset.id, asset.returnDate, newCondition);
                                                                }}
                                                            >
                                                                <option value="Good">Good</option>
                                                                <option value="Damaged">Damaged</option>
                                                                <option value="Lost">Lost</option>
                                                            </select>
                                                        ) : (
                                                            <span className="text-muted">-</span>
                                                        )}
                                                    </td>
                                                    <td className="fw-bold text-danger">
                                                        {asset.penalty > 0 ? formatCurrency(asset.penalty) : '-'}
                                                    </td>
                                                    <td>
                                                        {asset.returnStatus === 'pending' && (
                                                            <button
                                                                className="btn btn-sm btn-success"
                                                                onClick={() => handleAssetReturn(asset.id, new Date().toISOString().split('T')[0], 'Good')}
                                                            >
                                                                <Icon icon="heroicons:check" className="me-1" />
                                                                Mark Returned
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="alert alert-warning mt-3">
                                    <strong>Note:</strong> Penalties are automatically calculated based on asset condition:
                                    <ul className="mb-0 mt-2">
                                        <li>Lost: ₹50,000 (Laptop), ₹20,000 (Mobile), ₹5,000 (Others)</li>
                                        <li>Damaged: ₹10,000 (Laptop), ₹5,000 (Mobile), ₹2,000 (Others)</li>
                                        <li>Pending Return: ₹5,000 (Laptop), ₹2,000 (Mobile), ₹1,000 (Others)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowAssetModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        calculateSettlement();
                                        setShowAssetModal(false);
                                    }}
                                >
                                    <Icon icon="heroicons:calculator" className="me-2" />
                                    Recalculate Settlement
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Last Working Day Confirmation Modal */}
            {showLastWorkingDayModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex align-items-center gap-2 fs-5">
                                    <Icon icon="heroicons:calendar-check" />
                                    Confirm Last Working Day
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowLastWorkingDayModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label">Actual Last Working Day</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={settlementData.lastWorkingDay.actualLastWorkingDay}
                                            onChange={(e) => handleUpdateConfig('lastWorkingDay', 'actualLastWorkingDay', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Notice Served From</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={settlementData.lastWorkingDay.noticeServedFrom}
                                            onChange={(e) => handleUpdateConfig('lastWorkingDay', 'noticeServedFrom', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Notice Served To</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={settlementData.lastWorkingDay.noticeServedTo}
                                            onChange={(e) => handleUpdateConfig('lastWorkingDay', 'noticeServedTo', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <div className="alert alert-info">
                                            <Icon icon="heroicons:information-circle" className="me-2" />
                                            Confirming the last working day will lock the settlement calculation dates.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowLastWorkingDayModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleConfirmLastWorkingDay}
                                >
                                    <Icon icon="heroicons:check-circle" className="me-2" />
                                    Confirm Last Working Day
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FinalSettlement;