import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import PricingPage from './components/auth/PricingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminPanel from './components/recruiterDashboard/AdminPanel';
import SuperAdminPanel from './components/superAdmin/SuperAdminPanel';
import SuperAdminLogin from './components/superAdmin/SuperAdminLogin';
import SuperAdminLayout from './components/superAdmin/SuperAdminLayout';
import Candidates from './components/recruiterDashboard/Candidates';
import DashboardOverview from './components/recruiterDashboard/DashboardOverview';
import PipelineOverview from './components/recruiterDashboard/PipelineOverview';
import JobAnalytics from './components/recruiterDashboard/JobAnalytics';
import RecruiterDashboardLayout from './components/recruiterDashboard/RecruiterDashboardLayout';
import ResumeScreening from './components/recruiterDashboard/ResumeScreening';
import CreateJob from './components/CreateJob';
import JobList from './components/JobList';
import PipelineView from './components/pipeline/PipelineView';
import Stages from './components/pipeline/Stages';
import DragDrop from './components/pipeline/DragDrop';
import CollaborationTools from './components/pipeline/CollaborationTools';
import RecruiterPerformance from './components/analytics/RecruiterPerformance';
import TimeToHire from './components/analytics/TimeToHire';
import CandidateSourcing from './components/analytics/CandidateSourcing';
import JobPerformance from './components/analytics/JobPerformance';
import Settings from './components/Settings';
import OrgInfo from './components/recruiterDashboard/OrgInfo';
import Integrations from './components/recruiterDashboard/Integrations';
import Billing from './components/recruiterDashboard/Billing';
import RecruiterProfile from './components/recruiterDashboard/RecruiterProfile';
import CandidateLogin from './components/candidateDashboard/CandidateLogin';
import CandidateDashboard from './components/candidateDashboard/CandidateDashboard';
import CandidateDashboardLayout from './components/candidateDashboard/CandidateDashboardLayout';
import JobSearch from './components/candidateDashboard/JobSearch';
import Applications from './components/candidateDashboard/Applications';
import Profile from './components/candidateDashboard/Profile';
import CandidateSettings from './components/candidateDashboard/CandidateSettings';
import AssessmentManagement from './components/assessments/AssessmentManagement';
import AssessmentLibrary from './components/assessments/AssessmentLibrary';
import AssignAssessments from './components/assessments/AssignAssessments';
import TestResultsViewer from './components/assessments/TestResultsViewer';
import AptitudeTest from './components/assessments/AptitudeTest';
import CodingTest from './components/assessments/CodingTest';
import CommunicationTest from './components/assessments/CommunicationTest';
import AIPrescreening from './components/recruiterDashboard/AIPrescreening';
import ConfigureAIInterview from './components/recruiterDashboard/ConfigureAIInterview';
import ReviewAIInterview from './components/recruiterDashboard/ReviewAIInterview';
import AIInterviewPortal from './components/AIInterviewPortal';
import OfferTemplates from './components/recruiterDashboard/OfferTemplates';
import OfferTracking from './components/recruiterDashboard/OfferTracking';

import Activities from './components/CRM/Activities';
import Analytics from './components/CRM/Analytics';
import Companies from './components/CRM/Companies';
import Contacts from './components/CRM/Contacts';
import Deals from './components/CRM/Deals';
import Leads from './components/CRM/Leads';
import Pipeline from './components/CRM/Pipeline';
// Tenant & User Management
import Authentication from './components/HRMS/Tenant&UserManagement/Authentication';
import CompanySettings from './components/HRMS/Tenant&UserManagement/CompanySettings';
import MultiTenantSetup from './components/HRMS/Tenant&UserManagement/MultiTenantSetup';
import RolesPermissions from './components/HRMS/Tenant&UserManagement/RolesPermissions';
// Employee Management
import EmployeeLifecycle from './components/HRMS/EmployeeManagement/EmployeeLifecycle';
import EmployeeMasterData from './components/HRMS/EmployeeManagement/EmployeeMasterData';
import EmployeeSelfService from './components/HRMS/EmployeeManagement/EmployeeSelfService';
import OrganizationHierarchy from './components/HRMS/EmployeeManagement/OrganizationHierarchy';
import DocumentVault from './components/HRMS/EmployeeManagement/DocumentVault';
// Onboarding & Joining
import OfferManagement from './components/HRMS/Onboarding&Joining/OfferManagement';
import JoiningDayManagement from './components/HRMS/Onboarding&Joining/JoiningDayManagement';
import ProbationManagement from './components/HRMS/Onboarding&Joining/ProbationManagement';
import PreJoiningEngagement from './components/HRMS/Onboarding&Joining/PreJoiningEngagement';
import InductionOrientation from './components/HRMS/Onboarding&Joining/InductionOrientation';
import BuddyMentorAssignment from './components/HRMS/Onboarding&Joining/BuddyMentorAssignment';
// Payroll Management
// HR Operations (HROperations)
import AssestManagement from './components/HRMS/HROperations/AssestManagement';
import EmployeeConfirmation from './components/HRMS/HROperations/EmployeeConfirmation';
import ExitManagement from './components/HRMS/HROperations/ExitManagement';
import HRHelpdesk from './components/HRMS/HROperations/HRHelpdesk';
import LetterGeneration from './components/HRMS/HROperations/LetterGeneration';
import NoticePeriodTracking from './components/HRMS/HROperations/NoticePeriodTracking';
import PromotionsCareer from './components/HRMS/HROperations/PromotionsCareer';
import TranfersMovement from './components/HRMS/HROperations/TranfersMovement';

import Salaryslip from './components/HRMS/PayrollManagement/Salaryslip';
import StatutoryCompliance from './components/HRMS/PayrollManagement/StatutoryCompliance';
import SalaryStructure from './components/HRMS/PayrollManagement/SalaryStructure';
import Reimbursements from './components/HRMS/PayrollManagement/Reimbursements';
import PayrollProcessingEngine from './components/HRMS/PayrollManagement/PayrollProcessingEngine';
import LoansAdvances from './components/HRMS/PayrollManagement/LoansAdvances';
import PayrollReports from './components/HRMS/PayrollManagement/PayrollReports';
import BankTransfer from './components/HRMS/PayrollManagement/BankTransfer';
import FinalSettlement from './components/HRMS/PayrollManagement/FinalSettlement';
// Attendance & Leave Management
import AttendanceCapture from './components/HRMS/Attendance&Leave/AttendanceCapture';
import ShiftManagement from './components/HRMS/Attendance&Leave/ShiftManagement';
import WorkHourRules from './components/HRMS/Attendance&Leave/WorkHourRules';
import LeaveManagement from './components/HRMS/Attendance&Leave/LeaveManagement';
import Regularization from './components/HRMS/Attendance&Leave/Regularization';
import HolidayCalendar from './components/HRMS/Attendance&Leave/HolidayCalendar';
import AttendanceReports from './components/HRMS/Attendance&Leave/AttendanceReports';
import PayrollIntegration from './components/HRMS/Attendance&Leave/PayrollIntegration';
// Reports & Analytics
import AIDrivenInsights from './components/HRMS/Reports&Analytics/AIDrivenInsights';
import ReportsAttendance from './components/HRMS/Reports&Analytics/AttendanceReports';
import ComplianceReports from './components/HRMS/Reports&Analytics/ComplianceReports';
import CustomReportBuilder from './components/HRMS/Reports&Analytics/CustomReportBuilder';
import EmployeeReports from './components/HRMS/Reports&Analytics/EmployeeReports';
import LeaveReports from './components/HRMS/Reports&Analytics/LeaveReports';
import ReportsPayroll from './components/HRMS/Reports&Analytics/PayrollReports';
import ExecutiveDashboards from './components/HRMS/Reports&Analytics/ExecutiveDashboards';
// Forms & Workflows
import ApprovalsDashboard from './components/HRMS/Forms&Workflows/ApprovalsDashboard';
import CustomFromBuilder from './components/HRMS/Forms&Workflows/CustomFromBuilder';
import RequestManagement from './components/HRMS/Forms&Workflows/RequestManagement';
import SurveysPulseChecks from './components/HRMS/Forms&Workflows/SurveysPulseChecks';
import WorkflowEngine from './components/HRMS/Forms&Workflows/WorkflowEngine';



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/ForgotPassword' element={<ForgotPassword />} />
      <Route path='/pricing' element={<PricingPage />} />

      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <DashboardOverview />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/candidates'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Candidates />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/resume-screening'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ResumeScreening />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/jobs/new'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CreateJob />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/jobslist'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <JobList />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/pipeline/view'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PipelineOverview />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/pipeline/stages'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Stages />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/pipeline/drag-drop'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <DragDrop />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/pipeline/collaboration'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CollaborationTools />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/analytics/jobs'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <JobAnalytics />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/analytics/recruiter-performance'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <RecruiterPerformance />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/analytics/time-to-hire'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <TimeToHire />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/analytics/job-sourcing'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CandidateSourcing />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/analytics/job-performance'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <JobPerformance />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/settings'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Settings />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/settings/org-info'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <OrgInfo />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/settings/integrations'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Integrations />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/settings/billing'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Billing />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/view-profile'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <RecruiterProfile />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Candidate Routes */}
      <Route path='/candidate/login' element={<CandidateLogin />} />
      <Route
        path='/candidate/dashboard'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <CandidateDashboard />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/candidate/jobs'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <JobSearch />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/candidate/applications'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <Applications />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/candidate/profile'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <Profile />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/candidate/settings'
        element={
          <ProtectedRoute>
            <CandidateDashboardLayout>
              <CandidateSettings />
            </CandidateDashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Assessment Management Routes - Recruiter */}
      <Route
        path='/assessments'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AssessmentManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/recruiter/assessments-library'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AssessmentLibrary />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/recruiter/assign-assessment'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AssignAssessments />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/recruiter/test-results'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <TestResultsViewer />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/recruiter/prescreening'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AIPrescreening />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/recruiter/ai-interview-configure'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ConfigureAIInterview />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/recruiter/ai-interview-review'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ReviewAIInterview />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/recruiter/offer-templates'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <OfferTemplates />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/recruiter/offer-tracking'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <OfferTracking />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />


      {/*  CRM Routes Section  */}


      <Route
        path='/crm/activities'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              < Activities />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path='/crm/analytics'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              < Analytics />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/crm/companies'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              < Companies />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/crm/contacts'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              < Contacts />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/crm/deals'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              < Deals />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/crm/leads'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              < Leads />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path='/crm/pipeline'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              < Pipeline />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />


      {/* Legacy sidebar routes for Tenant links (match RecruiterDashboardLayout NavLinks) */}
      <Route
        path='/Tenant/MultiTenant'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <MultiTenantSetup />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/Tenant/Authentication'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Authentication />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/Tenant/RolesPermission'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <RolesPermissions />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/Tenant/Company'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CompanySettings />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Employee Management Routes (match sidebar links) */}
      <Route
        path='/employee/master'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <EmployeeMasterData />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/employee/hierarchy'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <OrganizationHierarchy />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/employee/documents'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <DocumentVault />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/employee/lifecycle'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <EmployeeLifecycle />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/employee/self-service'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <EmployeeSelfService />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />


      {/* Onboarding & Joining Routes (canonical) */}
      <Route
        path='/onboarding/offer-management'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <OfferManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/pre-joining-engagement'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PreJoiningEngagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/joining-day'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <JoiningDayManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/induction-orientation'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <InductionOrientation />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/probation-management'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ProbationManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/buddy-assignment'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <BuddyMentorAssignment />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

       {/* Attendance & Leave Routes (canonical) */}
      <Route
        path='/attendance/capture'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AttendanceCapture />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/attendance/shifts'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ShiftManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/attendance/rules'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <WorkHourRules />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/attendance/leave'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <LeaveManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/attendance/regularization'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Regularization />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/attendance/holidays'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <HolidayCalendar />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/attendance/reports'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AttendanceReports />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/attendance/payroll-integration'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PayrollIntegration />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />


{/* Payroll Management Routes (canonical) */}
      <Route
        path='/hrms/payroll/salary-slip'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Salaryslip />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hrms/payroll/salary-structure'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <SalaryStructure />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hrms/payroll/statutory-compliance'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <StatutoryCompliance />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hrms/payroll/reimbursements'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Reimbursements />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hrms/payroll/processing-engine'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PayrollProcessingEngine />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hrms/payroll/loans-advances'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <LoansAdvances />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hrms/payroll/reports'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PayrollReports />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hrms/payroll/bank-transfer'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <BankTransfer />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hrms/payroll/final-settlement'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <FinalSettlement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />


   



      {/* Sidebar legacy HR-Ops paths -> render same protected components directly */}
      <Route
        path='/hr-ops/confirmation'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <EmployeeConfirmation />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hr-ops/promotions'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PromotionsCareer />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hr-ops/transfers'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <TranfersMovement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hr-ops/helpdesk'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <HRHelpdesk />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hr-ops/letters'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <LetterGeneration />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hr-ops/assets'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AssestManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hr-ops/notice'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <NoticePeriodTracking />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/hr-ops/exit'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ExitManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />    

      {/* Sidebar legacy forms paths -> render same protected components directly (avoid redirect fallthrough) */}
      <Route
        path='/forms/builder'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CustomFromBuilder />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/forms/custom'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CustomFromBuilder />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/forms/requests'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <RequestManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/forms/workflow'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <WorkflowEngine />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/forms/surveys'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <SurveysPulseChecks />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/forms/approvals'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ApprovalsDashboard />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />


      {/* Canonical lowercase Payroll routes (match sidebar links) */}
      <Route
        path='/payroll/structure'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <SalaryStructure />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/payroll/processing'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PayrollProcessingEngine />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/payroll/compliance'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <StatutoryCompliance />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/payroll/slips'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Salaryslip />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/payroll/reimbursements'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <Reimbursements />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/payroll/loans'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <LoansAdvances />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/payroll/settlement'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <FinalSettlement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/payroll/bank-transfer'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <BankTransfer />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/payroll/reports'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PayrollReports />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
    
    {/* Canonical lowercase onboarding routes (match sidebar links) */}
      <Route
        path='/onboarding/offers'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <OfferManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/pre-joining'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <PreJoiningEngagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/joining-day'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <JoiningDayManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/induction'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <InductionOrientation />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/probation'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ProbationManagement />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/onboarding/buddy'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <BuddyMentorAssignment />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />

        {/* Sidebar legacy reports paths -> render same protected components directly */}
      <Route
        path='/reports/employee'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <EmployeeReports />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/reports/attendance'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ReportsAttendance />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/reports/leave'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <LeaveReports />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/reports/payroll'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ReportsPayroll />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/reports/compliance'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ComplianceReports />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/reports/custom'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <CustomReportBuilder />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/reports/dashboards'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <ExecutiveDashboards />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/reports/ai-insights'
        element={
          <ProtectedRoute>
            <RecruiterDashboardLayout>
              <AIDrivenInsights />
            </RecruiterDashboardLayout>
          </ProtectedRoute>
        }
      />



      {/* Assessment Test Routes - Public/Candidate */}
      <Route path='/assessment/aptitude' element={<AptitudeTest />} />
      <Route path='/assessment/coding' element={<CodingTest />} />
      <Route path='/assessment/communication' element={<CommunicationTest />} />

      {/* AI Interview Portal - Public Route */}
      <Route path='/ai-interview' element={<AIInterviewPortal />} />

      <Route path='/login' element={<SuperAdminLogin />} />

      {/* Super Admin Route */}
      <Route
        path='/super-admin'
        element={
          <ProtectedRoute superAdminOnly={true}>
            <SuperAdminLayout>
              <SuperAdminPanel />
            </SuperAdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default App;




