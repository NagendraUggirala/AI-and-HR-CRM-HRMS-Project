/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const RecruiterDashboardLayout = ({ children, internalNav = false, activeTab, onTabChange }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  let [assessmentMenuOpen, setAssessmentMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleAssessmentMenu = () => {
    setAssessmentMenuOpen(!assessmentMenuOpen);
  };

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      navigate('/login');
    } catch (error) {
      navigate('/login');
    }
  };

  const LinkItem = ({ to, tabKey, icon, label, isParent = false }) => {
    if (internalNav) {
      return (
        <a href="#" onClick={(e) => { e.preventDefault(); onTabChange && onTabChange(tabKey); }} className={activeTab === tabKey ? "active-page" : ""}>
          <Icon icon={icon} className="menu-icon" />
          <span>{label}</span>
        </a>
      );
    }
    return (
      <NavLink
        to={to}
        className={(navData) => {
          if (isParent) {
            // For parent items like "Jobs", check if current path starts with the parent path
            return location.pathname.startsWith(to) ? "active-page" : "";
          }
          return navData.isActive ? "active-page" : "";
        }}
      >
        <Icon icon={icon} className="menu-icon" />
        <span>{label}</span>
      </NavLink>
    );
  };

  const ShortcutLink = ({ to, tabKey, label, icon }) => {
    if (internalNav) {
      return (
        <a href="#" onClick={(e) => { e.preventDefault(); onTabChange && onTabChange(tabKey); }} className={activeTab === tabKey ? "active-page" : ""}>
          <Icon icon={icon} className="menu-icon" />
          <span>{label}</span>
        </a>
      );
    }
    return (
      <NavLink to={to} className={(navData) => (navData.isActive ? "active-page" : "")}>
        <Icon icon={icon} className="menu-icon" />
        <span>{label}</span>
      </NavLink>
    );
  };

  // Add CSS to ensure active state is visible
  const activeStyles = `
    .sidebar-menu li > a.active-page {
      background-color: #007bff !important;
      color: #fff !important;
      border-radius: 8px;
    }
    .sidebar-menu .sidebar-submenu li > a.active-page {
      background-color: #6c757d !important;
      color: #fff !important;
      border-radius: 6px;
    }
    .sidebar-menu .dropdown.open > a {
      background-color: #007bff !important;
      color: #fff !important;
      border-radius: 8px;
    }
    .sidebar-menu .dropdown > a {
      background-color: transparent !important;
      color: inherit !important;
    }
    .sidebar-menu .dropdown.has-active-submenu > a {
      background-color: #007bff !important;
      color: #fff !important;
      border-radius: 8px;
    }
    .navbar-header.sticky-top {
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 1020;
    }
    .sidebar-submenu li {
      list-style: none !important;
    }
    .sidebar-submenu li::before {
      display: none !important;
    }
    .sidebar-submenu {
      list-style-type: none !important;
    }
  `;

  return (
    <>
      <style>{activeStyles}</style>
      <section className={mobileMenu ? "overlay active" : "overlay "}>
        {/* sidebar */}
        <aside
          className={
            sidebarActive
              ? "sidebar active "
              : mobileMenu
                ? "sidebar sidebar-open"
                : "sidebar"
          }
        >
          <button onClick={mobileMenuControl} type='button' className='sidebar-close-btn'>
            <Icon icon='radix-icons:cross-2' />
          </button>
          <div>
          <Link to='/dashboard' className='sidebar-logo'>
            <img src='assets/images/auth/auth-img.png' alt='site logo' className='light-logo' />
            
            
            <img src='assets/images/auth/auth-img.png' alt='site logo' className='logo-icon' />
          </Link>
        </div>
          <div className='sidebar-menu-area'>

            <ul className='sidebar-menu' id='sidebar-menu' style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start" }}>
              {/* Recruiter Dashboard */}
              <li>
                <LinkItem to='/dashboard' tabKey='dashboard' icon='heroicons:home' label='Dashboard' />
              </li>

              <li className='sidebar-menu-group-title'>Recruitment</li>

              {/* Jobs Management */}
              <li>
                <LinkItem to='/jobslist' tabKey='jobs' icon='solar:clipboard-list-outline' label='Jobs' isParent={true} />
              </li>

              {/* Candidates Management */}
              <li>
                <LinkItem to='/candidates' tabKey='candidates' icon='heroicons:users' label='Candidates' />
              </li>

              {/* AI Resume Screening */}
              <li>
                <LinkItem to='/resume-screening' tabKey='resume-screening' icon='heroicons:document-magnifying-glass' label='AI Resume Screening' />
              </li>

              {/* Pipeline Management */}
              <li>
                <LinkItem to='/pipeline/view' tabKey='pipeline' icon='heroicons:queue-list' label='Pipeline View' />
              </li>

              {/* Recruiter Performance */}
              <li>
                <LinkItem to='/analytics/recruiter-performance' tabKey='recruiter-performance' icon='heroicons:chart-bar-square' label='Analytics' />
              </li>



              {/* Assessment Dropdown */}
              <li className='dropdown'>
                <Link to='#'>
                  <Icon icon='heroicons:briefcase' className='menu-icon' />
                  <span>Assessment</span>
                </Link>
                <ul className='sidebar-submenu'>
                  <li>
                    <NavLink
                      to='/recruiter/assessments-library'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:document-text' className='icon text-sm me-2' />
                      Assessments Library
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/assign-assessment'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:user-plus' className='icon text-sm me-2' />
                      Assign Assessment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/test-results'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:clipboard-document-check' className='icon text-sm me-2' />
                      Test Results
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/prescreening'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:magnifying-glass' className='icon text-sm me-2' />
                      AI Prescreening
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/ai-interview-configure'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:cog-6-tooth' className='icon text-sm me-2' />
                      Configure AI Interview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/ai-interview-review'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:eye' className='icon text-sm me-2' />
                      Review AI Interview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/offer-templates'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:document-duplicate' className='icon text-sm me-2' />
                      Offer Templates
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/recruiter/offer-tracking'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:clipboard-document-list' className='icon text-sm me-2' />
                      Offer Tracking
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Settings Dropdown */}
              <li className='dropdown'>
                <Link to='#'>
                  <Icon icon='icon-park-outline:setting-two' className='menu-icon' />
                  <span>Settings</span>
                </Link>
                <ul className='sidebar-submenu'>
                  <li>
                    <NavLink
                      to='/settings/org-info'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:building-office' className='icon text-sm me-2 fs-5' />
                      Org Info
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/settings/integrations'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:link' className='icon text-sm me-2 fs-5' />
                      Integrations
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/settings/billing'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:credit-card' className='icon text-sm me-2 fs-5' />
                      Billing
                    </NavLink>
                  </li>
                </ul>
              </li>








               {/* CRM Section */}
              <li className='sidebar-menu-group-title'>CRM</li>
              <li className='dropdown'>
                <Link to='#'>
                  <Icon icon="icon-park-outline:badge" className="menu-icon" />
                  <span>CRM</span>
                </Link>
                <ul className='sidebar-submenu'>
                  <li>
                    <NavLink
                      to='/crm/contacts'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:building-office' className='icon text-sm me-2 fs-5' />
                      Contacts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/crm/companies'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:link' className='icon text-sm me-2 fs-5' />
                      Companies
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/crm/deals'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:credit-card' className='icon text-sm me-2 fs-5' />
                      Deals
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/crm/leads'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:building-office' className='icon text-sm me-2 fs-5' />
                     Leads
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/crm/pipeline'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:link' className='icon text-sm me-2 fs-5' />
                      Pipeline
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/crm/analytics'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:credit-card' className='icon text-sm me-2 fs-5' />
                      Analytics
                    </NavLink>
                  </li>
                    <li>
                    <NavLink
                      to='/crm/activities'
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <Icon icon='heroicons:credit-card' className='icon text-sm me-2 fs-5' />
                      Activities
                    </NavLink>
                  </li>
                </ul>
              </li>




            <li className='sidebar-menu-group-title'>HR Management</li>

            {/* All Employees - Quick Access */}
            <li>
              <LinkItem to='/hrms/all-employees' tabKey='all-employees' icon='heroicons:user-group' label='All Employees' />
            </li>

            {/* Onboarding & Pre-Joining */}
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='heroicons:user-plus' className='menu-icon' />
                <span>Onboarding & Pre-Joining</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/onboarding/offers' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:document-check' className='icon text-sm me-2 fs-5' />
                    Offer Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/onboarding/pre-joining' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:chat-bubble-left-right' className='icon text-sm me-2 fs-5' />
                    Pre-Joining Engagement
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/onboarding/joining-day' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:calendar' className='icon text-sm me-2 fs-5' />
                    Joining Day Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/onboarding/induction' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:academic-cap' className='icon text-sm me-2 fs-5' />
                    Induction & Orientation
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/onboarding/probation' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:clock' className='icon text-sm me-2 fs-5' />
                    Probation Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/onboarding/buddy' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:user-group' className='icon text-sm me-2 fs-5' />
                    Buddy/Mentor Program
                  </NavLink>
                </li>
              </ul>
            </li>


              {/* Attendance & Leave Management */}  

            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='heroicons:calendar' className='menu-icon' />
                <span>Attendance & Leave</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/attendance/capture' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:clock' className='icon text-sm me-2 fs-5' />
                    Attendance Capture
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/attendance/shifts' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:arrow-path-rounded-square' className='icon text-sm me-2 fs-5' />
                    Shift Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/attendance/rules' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:document-text' className='icon text-sm me-2 fs-5' />
                    Work Hour Rules
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/attendance/leave' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:calendar-days' className='icon text-sm me-2 fs-5' />
                    Leave Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/attendance/regularization' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:check-badge' className='icon text-sm me-2 fs-5' />
                    Regularization
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/attendance/holidays' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:gift' className='icon text-sm me-2 fs-5' />
                    Holiday Calendar
                  </NavLink>
                </li>

                <li>
                  <NavLink to='/attendance/payroll-integration' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:gift' className='icon text-sm me-2 fs-5' />
                     Payroll Integration
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/attendance/reports' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:chart-bar' className='icon text-sm me-2 fs-5' />
                    Attendance Reports
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Employee Management */}
           
            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='heroicons:users' className='menu-icon' />
                <span>Employe
                   Management</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/employee/master' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:user-circle' className='icon text-sm me-2 fs-5' />
                    Employee Master Data
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/employee/hierarchy' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:rectangle-stack' className='icon text-sm me-2 fs-5' />
                    Org Hierarchy
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/employee/documents' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:archive-box' className='icon text-sm me-2 fs-5' />
                    Document Vault
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/employee/lifecycle' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:arrow-path' className='icon text-sm me-2 fs-5' />
                    Employee Lifecycle
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/employee/self-service' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:computer-desktop' className='icon text-sm me-2 fs-5' />
                    Employee Self-Service
                  </NavLink>
                </li>
              </ul>
            </li>

            

            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='heroicons:banknotes' className='menu-icon' />
                <span>Payroll Management</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/payroll/structure' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:cog-6-tooth' className='icon text-sm me-2 fs-5' />
                    Salary Structure
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payroll/processing' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:arrow-path' className='icon text-sm me-2 fs-5' />
                    Payroll Processing
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payroll/compliance' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:shield-check' className='icon text-sm me-2 fs-5' />
                    Statutory Compliance
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payroll/slips' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:document-text' className='icon text-sm me-2 fs-5' />
                    Salary Slips
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payroll/reimbursements' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:receipt-refund' className='icon text-sm me-2 fs-5' />
                    Reimbursements
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payroll/loans' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:currency-dollar' className='icon text-sm me-2 fs-5' />
                    Loans & Advances
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payroll/settlement' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:document-check' className='icon text-sm me-2 fs-5' />
                    Final Settlement
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payroll/bank-transfer' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:building-library' className='icon text-sm me-2 fs-5' />
                    Bank Transfer
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/payroll/reports' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:chart-pie' className='icon text-sm me-2 fs-5' />
                    Payroll Reports
                  </NavLink>
                </li>
              </ul>
            </li>

            

            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='heroicons:briefcase' className='menu-icon' />
                <span>HR Operations</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/hr-ops/confirmation' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:check-badge' className='icon text-sm me-2 fs-5' />
                    Employee Confirmation
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/hr-ops/promotions' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:arrow-trending-up' className='icon text-sm me-2 fs-5' />
                    Promotions & Career
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/hr-ops/transfers' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:arrow-right-circle' className='icon text-sm me-2 fs-5' />
                    Transfers & Movement
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/hr-ops/helpdesk' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:lifebuoy' className='icon text-sm me-2 fs-5' />
                    HR Helpdesk
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/hr-ops/letters' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:envelope' className='icon text-sm me-2 fs-5' />
                    Letter Generation
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/hr-ops/assets' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:cube' className='icon text-sm me-2 fs-5' />
                    Asset Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/hr-ops/notice' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:exclamation-triangle' className='icon text-sm me-2 fs-5' />
                    Notice Period Tracking
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/hr-ops/exit' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:arrow-right-on-rectangle' className='icon text-sm me-2 fs-5' />
                    Exit Management
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='heroicons:arrow-path' className='menu-icon' />
                <span>Forms & Workflows</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/forms/builder' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:pencil-square' className='icon text-sm me-2 fs-5' />
                    Custom Form Builder
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/forms/requests' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:clipboard-document-list' className='icon text-sm me-2 fs-5' />
                    Request Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/forms/workflow' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:arrows-right-left' className='icon text-sm me-2 fs-5' />
                    Workflow Engine
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/forms/surveys' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:chart-bar-square' className='icon text-sm me-2 fs-5' />
                    Surveys & Pulse Checks
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/forms/approvals' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:check-circle' className='icon text-sm me-2 fs-5' />
                    Approvals Dashboard
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className='dropdown'>
              <Link to='#'>
                <Icon icon='heroicons:chart-bar' className='menu-icon' />
                <span>Reports & Analytics</span>
              </Link>
              <ul className='sidebar-submenu'>
                <li>
                  <NavLink to='/reports/employee' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:user-group' className='icon text-sm me-2 fs-5' />
                    Employee Reports
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/reports/attendance' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:clock' className='icon text-sm me-2 fs-5' />
                    Attendance Reports
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/reports/leave' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:calendar' className='icon text-sm me-2 fs-5' />
                    Leave Reports
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/reports/payroll' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:banknotes' className='icon text-sm me-2 fs-5' />
                    Payroll Reports
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/reports/compliance' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:shield-check' className='icon text-sm me-2 fs-5' />
                    Compliance Reports
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/reports/custom' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:pencil-square' className='icon text-sm me-2 fs-5' />
                    Custom Report Builder
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/reports/dashboards' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:presentation-chart-bar' className='icon text-sm me-2 fs-5' />
                    Executive Dashboards
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/reports/ai-insights' className={(navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:sparkles' className='icon text-sm me-2 fs-5' />
                    AI-Driven Insights
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
                  <NavLink to='/Tenant/Company' className={ (navData) => navData.isActive ? "active-page" : ""}>
                    <Icon icon='heroicons:cog-6-tooth' className='icon menu-icon text-sm me-2 fs-5' />
                    Company Settings
                  </NavLink>
                </li>








              <li className='sidebar-menu-group-title'>Quick Actions</li>

              {/* Shortcuts */}
              <li className="mb-5">
                <ShortcutLink to='/jobs/new' tabKey='create-job' label='Create Job' icon='heroicons:plus' />
              </li>
            </ul>
          </div>
        </aside>

        <main className={(sidebarActive ? "dashboard-main active" : "dashboard-main") + " bg-neutral-50"}>
          <div className='navbar-header bg-base'>
            <div className='row align-items-center justify-content-between'>
              <div className='col-auto'>
                <div className='d-flex flex-wrap align-items-center gap-4'>
                  <button type='button' className='sidebar-toggle' onClick={sidebarControl}>
                    {sidebarActive ? (
                      <Icon icon='iconoir:arrow-right' className='icon text-2xl non-active' />
                    ) : (
                      <Icon icon='heroicons:bars-3-solid' className='icon text-2xl non-active ' />
                    )}
                  </button>
                  <button onClick={mobileMenuControl} type='button' className='sidebar-mobile-toggle'>
                    <Icon icon='heroicons:bars-3-solid' className='icon' />
                  </button>
                  
                </div>
              </div>
              <div className='col-auto'>
                <div className='d-flex flex-wrap align-items-center gap-3'>
                  <div className='dropdown'>
                    <button className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center border-0' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                      <Icon icon='iconoir:bell' className='text-primary-light text-xl' />
                    </button>
                    <div className='dropdown-menu dropdown-menu-end to-top dropdown-menu-lg p-0'>
                      <div className='p-3 radius-8 bg-primary-50 mb-2 d-flex align-items-center justify-content-between'>
                        <div className='flex-grow-1'>
                          <h6 className='text-lg text-primary-light fw-semibold mb-0'>Notifications</h6>
                        </div>
                        <span className='text-primary-600 fw-semibold text-sm w-32-px h-32-px rounded-circle bg-base d-flex justify-content-center align-items-center flex-shrink-0 ms-2'>
                          03
                        </span>
                      </div>
                      <div className='max-h-400-px overflow-y-auto scroll-sm'>
                        <Link to='#' className='px-3 py-3 d-flex align-items-start gap-3 mb-2 border-bottom hover-bg-light'>
                          <span className='w-40-px h-40-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0'>
                            <Icon icon='bitcoin-icons:verify-outline' className='icon text-xl' />
                          </span>
                          <div className='flex-grow-1'>
                            <h6 className='text-md fw-semibold mb-1'>New candidate applied</h6>
                            <p className='mb-0 text-sm text-secondary-light'>You have 5 new applications.</p>
                          </div>
                          <span className='text-sm text-secondary-light flex-shrink-0'>10 mins ago</span>
                        </Link>
                      </div>
                      <div className='text-center p-3 border-top'>
                        <Link to='#' className='text-primary-600 fw-semibold text-sm'>See All Notifications</Link>
                      </div>
                    </div>
                  </div>

                  <div className='dropdown'>
                    <button className='d-flex justify-content-center align-items-center rounded-circle border-0 bg-transparent p-0' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                      <img src='assets/images/user.png' alt='Recruiter' className='w-40-px h-40-px object-fit-cover rounded-circle' />
                    </button>
                    <div className='dropdown-menu dropdown-menu-end to-top dropdown-menu-sm p-0'>
                      <div className='py-3 px-3  bg-primary-50 mb-2 d-flex align-items-center justify-content-between'>
                        <div className='flex-grow-1'>
                          <h6 className='text-lg text-primary-light fw-semibold mb-1'>Recruiter</h6>
                          <span className='text-secondary-light fw-medium text-sm d-block'>Talent & Hiring</span>
                        </div>
                        <button type='button' className='btn-close btn-close-sm ms-2' aria-label='Close'></button>
                      </div>
                      <ul className='list-unstyled mb-0'>
                        <li>
                          <Link className='dropdown-item text-black px-3 py-2 hover-bg-transparent hover-text-primary d-flex align-items-center gap-2' to='/view-profile'>
                            <Icon icon='solar:user-linear' className='icon text-xl' /> <span>My Profile</span>
                          </Link>
                        </li>
                        <li>
                          <button className='dropdown-item text-black px-3 py-2 hover-bg-transparent hover-text-danger d-flex align-items-center gap-2 border-0 bg-transparent w-100 text-start' onClick={handleLogout}>
                            <Icon icon='lucide:power' className='icon text-xl' /> <span>Log Out</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='dashboard-main-body bg-neutral-50'>{children}</div>

          {/* Footer section */}
          <footer className='d-footer bg-neutral-50'>
            <div className='row align-items-center justify-content-between'>
              <div className='col-auto'>
                <p className='mb-0'>© 2025 Recruiter Dashboard. All Rights Reserved.</p>
              </div>
              <div className='col-auto'>
                <p className='mb-0'>
                  Made by{' '}
                  <a
                    href='https://designcareermetrics.com/'
                    target='_blank'
                    rel='noreferrer'
                    className='text-primary-600 text-decoration-none'
                  >
                    DCM
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </main>
      </section>
    </>
  );
};

export default RecruiterDashboardLayout;







