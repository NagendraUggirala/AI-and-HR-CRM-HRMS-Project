import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  sendEmail,
  sendBulkEmails,
  copyEmailToClipboard,
  generateMailtoLink,
} from "../../../services/emailService";

const BackgroundVerification = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [activeSection, setActiveSection] = useState("configuration");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState("");
  // Add these to your existing useState declarations
  const [newRequestPhone, setNewRequestPhone] = useState("");
  const [newRequestDepartment, setNewRequestDepartment] = useState("");
  const [newRequestDesignation, setNewRequestDesignation] = useState("");
  const [newRequestEmployeeId, setNewRequestEmployeeId] = useState("");
  // Add these to your useState declarations
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  // Add these state variables with your other useState declarations
  const [emailUploads, setEmailUploads] = useState([]);
  const [emailUploadedDocuments, setEmailUploadedDocuments] = useState([]);

  // Add these near your other useState declarations
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Add these state variables with your other useState declarations
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editEmployeeName, setEditEmployeeName] = useState("");
  const [editEmployeePhone, setEditEmployeePhone] = useState("");
  const [editEmployeeEmail, setEditEmployeeEmail] = useState("");
  const [editEmployeeDepartment, setEditEmployeeDepartment] = useState("");
  const [editEmployeeDesignation, setEditEmployeeDesignation] = useState("");
  const [editEmployeeId, setEditEmployeeId] = useState("");
  const [emailSubject, setEmailSubject] = useState(
    "Background Verification - Document Request",
  );

  const [documentRequests, setDocumentRequests] = useState([]);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState({ type: "", message: "" });
  const [emailMethod, setEmailMethod] = useState("api"); // 'api', 'clipboard', 'mailto'
  const [ccEmails, setCcEmails] = useState("");
  const [bccEmails, setBccEmails] = useState("");
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [newRequestEmail, setNewRequestEmail] = useState("");
  const [newRequestName, setNewRequestName] = useState("");
  const [newRequestTemplate, setNewRequestTemplate] = useState("");
  const [newRequestSubject, setNewRequestSubject] = useState(
    "Background Verification - Document Request",
  );

  // Required documents list
  const requiredDocuments = [
    { id: "aadhar", name: "Aadhaar Card", required: true },
    { id: "pan", name: "PAN Card", required: true },
    { id: "passport", name: "Passport", required: false },
    { id: "driving", name: "Driving License", required: false },
    { id: "education", name: "Education Certificates", required: true },
    { id: "experience", name: "Experience Letters / Relieving Letters", required: true },
    { id: "salary", name: "Last 3–6 Months Salary Slips", required: true },
    { id: "pf", name: "PF / UAN Details", required: false },
    { id: "address", name: "Address Proof", required: true },
    { id: "bank", name: "Bank Statement (Last 6 Months)", required: false },
    { id: "photo", name: "Passport Size Photo", required: true }
  ];

  // Load employees from localStorage
  useEffect(() => {
    loadEmployees();
    loadDocumentRequests();
  }, []);

  const loadEmployees = () => {
    const savedProfiles = localStorage.getItem("employeeProfiles");
    if (savedProfiles) {
      const profiles = JSON.parse(savedProfiles);
      const employeeList = profiles.map((profile) => ({
        id: profile.employeeId || profile.id,
        employeeId: profile.employeeId,
        name: `${profile.firstName} ${profile.middleName ? profile.middleName + " " : ""}${profile.lastName}`.trim(),
        email: profile.officialEmail || profile.email,
        phone: profile.phone,
        department: profile.department,
        designation: profile.designation,
        joiningDate: profile.joiningDate,
        status: profile.bgvStatus || "Not Started",
        candidateId: profile.candidateId,
      }));
      setEmployees(employeeList);
    } else {
      // Sample data if no profiles exist
      const sampleEmployees = [
        {
          id: "EMP001",
          employeeId: "EMP001",
          name: "Rajesh Kumar",
          email: "rajesh.kumar@company.com",
          phone: "+91 98765 43210",
          department: "Engineering",
          designation: "Software Engineer",
          joiningDate: new Date().toISOString().split("T")[0],
          status: "Pending",
          candidateId: "CAND001",
        },
        {
          id: "EMP002",
          employeeId: "EMP002",
          name: "Priya Sharma",
          email: "priya.sharma@company.com",
          phone: "+91 98765 43211",
          department: "Marketing",
          designation: "Marketing Executive",
          joiningDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          status: "In Progress",
          candidateId: "CAND002",
        },
        {
          id: "EMP003",
          employeeId: "EMP003",
          name: "Amit Kumar Patel",
          email: "amit.patel@company.com",
          phone: "+91 98765 43212",
          department: "Sales",
          designation: "Sales Manager",
          joiningDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          status: "Completed",
          candidateId: "CAND003",
        },
      ];
      setEmployees(sampleEmployees);
    }
  };

  const loadDocumentRequests = () => {
    const savedRequests = localStorage.getItem("bgvDocumentRequests");
    if (savedRequests) {
      setDocumentRequests(JSON.parse(savedRequests));
    }
  };

  const saveDocumentRequests = (requests) => {
    localStorage.setItem("bgvDocumentRequests", JSON.stringify(requests));
    setDocumentRequests(requests);
  };

  // Handle document upload
  const handleDocumentUpload = (event, documentId) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload PDF, JPG, PNG, or DOC files only");
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("File size should be less than 5MB");
      return;
    }

    // Create a preview URL
    const fileUrl = URL.createObjectURL(file);

    const newUploadedDoc = {
      id: documentId,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadDate: new Date().toISOString(),
      fileUrl: fileUrl,
      file: file, // Store the file object for later use
    };

    setUploadedDocuments((prev) => {
      // Remove if already exists
      const filtered = prev.filter((doc) => doc.id !== documentId);
      return [...filtered, newUploadedDoc];
    });

    // Reset the file input
    event.target.value = "";
  };

  // Handle remove document
  const handleRemoveDocument = (documentId) => {
    setUploadedDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
  };

  // Handle clear all uploads
  const handleClearAllUploads = () => {
    if (
      window.confirm("Are you sure you want to clear all uploaded documents?")
    ) {
      // Revoke object URLs to prevent memory leaks
      uploadedDocuments.forEach((doc) => {
        if (doc.fileUrl) {
          URL.revokeObjectURL(doc.fileUrl);
        }
      });
      setUploadedDocuments([]);
    }
  };

  // Add these functions
  const handleEmailDocumentUpload = (e, documentId) => {
    const file = e.target.files[0];
    if (!file) return;

    const documentName =
      requiredDocuments.find((doc) => doc.id === documentId)?.name ||
      "Document";

    // Create a unique file URL
    const fileUrl = URL.createObjectURL(file);

    const newUpload = {
      id: Date.now() + Math.random(),
      documentId,
      name: documentName,
      file: file,
      fileUrl: fileUrl,
      uploadDate: new Date().toISOString(),
      size: file.size,
      type: file.type,
    };

    setEmailUploads((prev) => [...prev, newUpload]);
    e.target.value = ""; // Reset file input
  };

  const handleRemoveEmailDocument = (documentId) => {
    // Find the upload to remove and revoke URL
    const uploadToRemove = emailUploads.find(
      (upload) => upload.documentId === documentId,
    );
    if (uploadToRemove && uploadToRemove.fileUrl) {
      URL.revokeObjectURL(uploadToRemove.fileUrl);
    }

    setEmailUploads((prev) =>
      prev.filter((upload) => upload.documentId !== documentId),
    );
  };

  const handleRemoveExistingDocument = (documentId, employeeId) => {
    if (window.confirm("Are you sure you want to remove this document?")) {
      // Remove from document requests
      const updatedRequests = documentRequests.map((req) => {
        if (req.employeeId === employeeId) {
          const updatedDocs = req.documents.map((doc) => {
            if (doc.id === documentId) {
              return {
                ...doc,
                status: "Pending",
                uploadedDate: null,
                fileUrl: null,
              };
            }
            return doc;
          });

          return {
            ...req,
            documents: updatedDocs,
          };
        }
        return req;
      });

      saveDocumentRequests(updatedRequests);

      // Show success message
      setEmailStatus({
        type: "success",
        message: "Document removed successfully!",
      });
    }
  };

  const handleViewDocument = (document) => {
    if (document.fileUrl) {
      window.open(document.fileUrl, "_blank");
    }
  };

  // Update the handleConfirmSendEmail function to include document uploads
  const handleConfirmSendEmailWithUploads = async () => {
    const selectedEmps = employees.filter((emp) =>
      selectedEmployees.includes(emp.id),
    );
    if (selectedEmps.length === 0) {
      setEmailStatus({
        type: "error",
        message: "Please select at least one employee",
      });
      return;
    }

    setSendingEmail(true);
    setEmailStatus({ type: "info", message: "Sending emails..." });

    const timestamp = new Date().toISOString();

    try {
      let emailResult;
      // ... (rest of your email sending logic remains the same)

      // After email is sent successfully, update document requests with uploaded files
      if (emailResult && emailResult.success > 0 && emailUploads.length > 0) {
        // For each selected employee, update their document requests with uploaded files
        const updatedRequests = documentRequests.map((req) => {
          if (selectedEmployees.includes(req.employeeId)) {
            const updatedDocuments = req.documents.map((doc) => {
              // Check if this document was uploaded
              const uploadedDoc = emailUploads.find(
                (up) => up.documentId === doc.id,
              );
              if (uploadedDoc) {
                return {
                  ...doc,
                  status: "Completed",
                  uploadedDate: timestamp,
                  fileUrl: uploadedDoc.fileUrl,
                  fileName: uploadedDoc.name,
                  fileSize: uploadedDoc.size,
                  fileType: uploadedDoc.type,
                };
              }
              return doc;
            });

            return {
              ...req,
              documents: updatedDocuments,
            };
          }
          return req;
        });

        saveDocumentRequests(updatedRequests);

        // Update completion status for employees
        const updatedEmployees = employees.map((emp) => {
          if (selectedEmployees.includes(emp.id)) {
            const empRequest = updatedRequests.find(
              (req) => req.employeeId === emp.id,
            );
            if (empRequest) {
              const completion = getCompletionPercentage(empRequest);
              return {
                ...emp,
                status: completion === 100 ? "Completed" : "In Progress",
              };
            }
          }
          return emp;
        });
        setEmployees(updatedEmployees);
      }

      // ... (rest of your success/error handling)
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailStatus({
        type: "error",
        message:
          error.message ||
          "Failed to send emails. Please try again or use a different method.",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || emp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle employee selection
  const handleSelectEmployee = (employeeId) => {
    setSelectedEmployees((prev) => {
      if (prev.includes(employeeId)) {
        return prev.filter((id) => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map((emp) => emp.id));
    }
  };

  // Generate personalized email template
  const generateEmailTemplate = (employeeName) => {
    return `Dear ${employeeName},\n\nWe hope this email finds you well.\n\nAs part of our standard background verification process, we require the following documents from you:\n\n${requiredDocuments
      .filter((doc) => doc.required)
      .map((doc) => `- ${doc.name}`)
      .join(
        "\n",
      )}\n\nPlease submit scanned copies (PDF format) of these documents at your earliest convenience.\n\nYou can upload the documents through our employee portal or send them via email reply.\n\nIf you have any questions or concerns, please feel free to contact us.\n\nBest regards,\nHR Team\n\n---\nThis is an automated email. Please do not reply directly to this message.`;
  };

  // Handle new request modal open
  const handleNewRequest = () => {
    setNewRequestEmail("");
    setNewRequestName("");
    setNewRequestSubject("Background Verification - Document Request");
    setNewRequestTemplate(generateEmailTemplate("Employee"));
    setShowNewRequestModal(true);
  };

  // Handle send new request
  const handleSendNewRequest = async () => {
    // Replace alerts with setEmailStatus
    if (!newRequestEmail.trim() || !newRequestName.trim()) {
      setEmailStatus({ type: "error", message: "Please enter email and name" });
      return;
    }

    if (!newRequestTemplate.trim() || !newRequestSubject.trim()) {
      setEmailStatus({
        type: "error",
        message: "Please enter subject and email template",
      });
      return;
    }

    setSendingEmail(true);
    setEmailStatus({ type: "info", message: "Sending email..." });

    const timestamp = new Date().toISOString();

    try {
      let emailResult;

      // Personalize template with name
      const personalizedTemplate = newRequestTemplate
        .replace(/\[Employee Name\]/g, newRequestName)
        .replace(/Dear\s+[^,\n]+/, `Dear ${newRequestName}`);

      if (emailMethod === "api") {
        emailResult = await sendBulkEmails(
          [{ email: newRequestEmail, name: newRequestName }],
          newRequestSubject,
          () => personalizedTemplate,
          {
            cc: ccEmails
              ? ccEmails
                  .split(",")
                  .map((e) => e.trim())
                  .filter((e) => e)
              : null,
            bcc: bccEmails
              ? bccEmails
                  .split(",")
                  .map((e) => e.trim())
                  .filter((e) => e)
              : null,
          },
        );
      } else if (emailMethod === "clipboard") {
        const emailContent = `To: ${newRequestEmail}\n${ccEmails ? `CC: ${ccEmails}\n` : ""}${bccEmails ? `BCC: ${bccEmails}\n` : ""}Subject: ${newRequestSubject}\n\n${personalizedTemplate}`;
        await navigator.clipboard.writeText(emailContent);
        emailResult = { success: 1, failed: 0 };
        setEmailStatus({
          type: "success",
          message:
            "Email content copied to clipboard! Please paste it into your email client and send.",
        });
      } else if (emailMethod === "mailto") {
        const mailtoLink = generateMailtoLink(
          newRequestEmail,
          newRequestSubject,
          personalizedTemplate,
        );
        window.location.href = mailtoLink;
        emailResult = { success: 1, failed: 0 };
        setEmailStatus({
          type: "success",
          message: "Opening email client...",
        });
      }

      if (emailResult && emailResult.success > 0) {
        // Generate employee ID if not provided
        const employeeId = newRequestEmployeeId.trim() || `EXT-${Date.now()}`;

        // Check if all required documents are uploaded
        const allRequiredUploaded = requiredDocuments
          .filter((doc) => doc.required)
          .every((doc) => uploadedDocuments.some((ud) => ud.id === doc.id));

        // Determine initial status based on upload completion
        const initialStatus = allRequiredUploaded
          ? "Completed"
          : "Request Sent";

        const newRequest = {
          id: Date.now() + Math.random(),
          employeeId: employeeId,
          employeeName: newRequestName,
          email: newRequestEmail,
          status: initialStatus,
          requestedDate: timestamp,
          documents: requiredDocuments.map((doc) => {
            const uploadedDoc = uploadedDocuments.find(
              (ud) => ud.id === doc.id,
            );
            return {
              id: doc.id,
              name: doc.name,
              required: doc.required,
              status: uploadedDoc ? "Completed" : "Pending",
              uploadedDate: uploadedDoc ? uploadedDoc.uploadDate : null,
              fileUrl: uploadedDoc ? uploadedDoc.fileUrl : null,
              fileName: uploadedDoc ? uploadedDoc.name : null,
              fileType: uploadedDoc ? uploadedDoc.type : null,
              fileSize: uploadedDoc ? uploadedDoc.size : null,
            };
          }),
          emailSent: true,
          emailSentDate: timestamp,
          emailMethod: emailMethod,
          completedDate: allRequiredUploaded ? timestamp : null,
          // Store the actual uploaded files if needed
          uploadedFiles: uploadedDocuments.map((doc) => ({
            id: doc.id,
            name: doc.name,
            file: doc.file,
          })),
        };

        const updatedRequests = [...documentRequests, newRequest];
        saveDocumentRequests(updatedRequests);

        // Add to employees list if not exists
        const existingEmp = employees.find(
          (emp) => emp.email === newRequestEmail,
        );
        if (!existingEmp) {
          const newEmployee = {
            id: employeeId,
            employeeId: employeeId,
            name: newRequestName,
            email: newRequestEmail,
            phone: newRequestPhone || "",
            department: newRequestDepartment || "External",
            designation: newRequestDesignation || "Candidate",
            joiningDate: new Date().toISOString().split("T")[0],
            status: allRequiredUploaded ? "Completed" : "In Progress",
            candidateId: `CAND-${Date.now()}`,
          };
          setEmployees([...employees, newEmployee]);

          // Also update localStorage employeeProfiles
          const savedProfiles = localStorage.getItem("employeeProfiles");
          if (savedProfiles) {
            const profiles = JSON.parse(savedProfiles);
            const newProfile = {
              id: employeeId,
              employeeId: employeeId,
              firstName: newRequestName.split(" ")[0] || newRequestName,
              lastName: newRequestName.split(" ").slice(1).join(" ") || "",
              officialEmail: newRequestEmail,
              email: newRequestEmail,
              phone: newRequestPhone || "",
              department: newRequestDepartment || "External",
              designation: newRequestDesignation || "Candidate",
              joiningDate: new Date().toISOString().split("T")[0],
              bgvStatus: allRequiredUploaded ? "Completed" : "In Progress",
              candidateId: `CAND-${Date.now()}`,
            };
            localStorage.setItem(
              "employeeProfiles",
              JSON.stringify([...profiles, newProfile]),
            );
          }
        } else {
          // Update existing employee status if all documents uploaded
          if (allRequiredUploaded) {
            const updatedEmployees = employees.map((emp) => {
              if (emp.email === newRequestEmail) {
                return { ...emp, status: "Completed" };
              }
              return emp;
            });
            setEmployees(updatedEmployees);

            // Update localStorage
            const savedProfiles = localStorage.getItem("employeeProfiles");
            if (savedProfiles) {
              const profiles = JSON.parse(savedProfiles);
              const updatedProfiles = profiles.map((profile) => {
                if (
                  profile.email === newRequestEmail ||
                  profile.officialEmail === newRequestEmail
                ) {
                  return { ...profile, bgvStatus: "Completed" };
                }
                return profile;
              });
              localStorage.setItem(
                "employeeProfiles",
                JSON.stringify(updatedProfiles),
              );
            }
          }
        }

        setEmailStatus({
          type: "success",
          message: allRequiredUploaded
            ? "Request sent successfully! All documents uploaded - Verification marked as Completed."
            : "Request sent successfully!",
        });

        setTimeout(() => {
          setShowNewRequestModal(false);
          // Reset all form fields
          setNewRequestEmail("");
          setNewRequestName("");
          setNewRequestPhone("");
          setNewRequestDepartment("");
          setNewRequestDesignation("");
          setNewRequestEmployeeId("");
          setNewRequestTemplate("");
          setEmailStatus({ type: "", message: "" });
          setCcEmails("");
          setBccEmails("");
          // Clear uploaded documents and revoke URLs
          uploadedDocuments.forEach((doc) => {
            if (doc.fileUrl) {
              URL.revokeObjectURL(doc.fileUrl);
            }
          });
          setUploadedDocuments([]);
        }, 2000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailStatus({
        type: "error",
        message: error.message || "Failed to send email. Please try again.",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  // Handle send email
  const handleSendEmail = () => {
    if (selectedEmployees.length === 0) {
      alert("Please select at least one employee");
      return;
    }

    const selectedEmps = employees.filter((emp) =>
      selectedEmployees.includes(emp.id),
    );
    // Use first employee's name for template preview, will be personalized during sending
    const defaultTemplate = generateEmailTemplate(
      selectedEmps[0]?.name || "Employee",
    );

    setEmailTemplate(defaultTemplate);
    setShowEmailModal(true);
  };

  const handleClearEmailUploads = () => {
    if (emailUploads.length === 0) return;

    if (window.confirm("Clear all new document uploads?")) {
      // Revoke all object URLs to prevent memory leaks
      emailUploads.forEach((upload) => {
        if (upload.fileUrl) {
          URL.revokeObjectURL(upload.fileUrl);
        }
      });
      setEmailUploads([]);

      setEmailStatus({
        type: "info",
        message: "All new uploads cleared.",
      });
    }
  };

  const handleUpdateEmailDocument = (documentId) => {
    // Trigger file input click
    const fileInput = document.getElementById(`email-upload-${documentId}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  // Update handleConfirmSendEmail to include uploaded documents
  const handleConfirmSendEmail = async () => {
    const selectedEmps = employees.filter((emp) =>
      selectedEmployees.includes(emp.id),
    );
    if (selectedEmps.length === 0) {
      setEmailStatus({
        type: "error",
        message: "Please select at least one employee",
      });
      return;
    }

    setSendingEmail(true);
    setEmailStatus({ type: "info", message: "Sending emails..." });

    const timestamp = new Date().toISOString();

    try {
      let emailResult;

      if (emailMethod === "api") {
        const recipients = selectedEmps.map((emp) => ({
          email: emp.email,
          name: emp.name,
        }));

        const personalizedTemplate = (recipient) => {
          return emailTemplate.replace(
            /Dear\s+[^,\n]+/,
            `Dear ${recipient.name}`,
          );
        };

        emailResult = await sendBulkEmails(
          recipients,
          emailSubject,
          personalizedTemplate,
          {
            cc: ccEmails
              ? ccEmails
                  .split(",")
                  .map((e) => e.trim())
                  .filter((e) => e)
              : null,
            bcc: bccEmails
              ? bccEmails
                  .split(",")
                  .map((e) => e.trim())
                  .filter((e) => e)
              : null,
          },
        );
      }
      // ... rest of your email sending logic

      // Create document requests with uploaded documents
      const newRequests = selectedEmps.map((emp) => {
        // For single employee with uploads, include them
        let employeeDocuments = requiredDocuments.map((doc) => {
          // Check if document exists in existing request
          const existingRequest = documentRequests.find(
            (req) => req.employeeId === emp.id,
          );
          const existingDoc = existingRequest?.documents?.find(
            (d) => d.id === doc.id,
          );

          // Check if there's a new upload for this document
          const newUpload = emailUploads.find(
            (upload) => upload.documentId === doc.id,
          );

          return {
            id: doc.id,
            name: doc.name,
            required: doc.required,
            status: existingDoc?.status || newUpload ? "Completed" : "Pending",
            uploadedDate:
              existingDoc?.uploadedDate || newUpload?.uploadDate || null,
            fileUrl: existingDoc?.fileUrl || newUpload?.fileUrl || null,
            fileName: existingDoc?.fileName || newUpload?.name || null,
          };
        });

        return {
          id: Date.now() + Math.random(),
          employeeId: emp.id,
          employeeName: emp.name,
          email: emp.email,
          status: "Request Sent",
          requestedDate: timestamp,
          documents: employeeDocuments,
          emailSent: true,
          emailSentDate: timestamp,
          emailMethod: emailMethod,
          completedDate: null,
          uploadedFiles: emailUploads.map((upload) => ({
            documentId: upload.documentId,
            name: upload.name,
            file: upload.file,
          })),
        };
      });

      const updatedRequests = [...documentRequests, ...newRequests];
      saveDocumentRequests(updatedRequests);

      // Clear uploads after successful send
      handleClearEmailUploads();

      // ... rest of your success handling
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailStatus({
        type: "error",
        message:
          error.message ||
          "Failed to send emails. Please try again or use a different method.",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const handlePreviewDocument = (document) => {
    if (document.fileUrl) {
      window.open(document.fileUrl, "_blank");
    }
  };

  // Handle update existing document
  const handleUpdateDocument = (documentId) => {
    const fileInput = document.getElementById(`email-upload-${documentId}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "In Progress":
        return "warning";
      case "Pending":
        return "info";
      case "Not Started":
        return "secondary";
      case "Request Sent":
        return "primary";
      default:
        return "secondary";
    }
  };

  // Get document request for employee
  const getDocumentRequest = (employeeId) => {
    return documentRequests.find((req) => req.employeeId === employeeId);
  };

  // Calculate completion percentage
  const getCompletionPercentage = (request) => {
    if (!request) return 0;
    const totalDocs = request.documents.length;
    const completedDocs = request.documents.filter(
      (doc) => doc.status === "Completed",
    ).length;
    return Math.round((completedDocs / totalDocs) * 100);
  };

  // Handle Edit Employee
  const handleEditEmployee = (employee) => {
    setEditingEmployeeId(employee.id);
    setEditEmployeeName(employee.name || "");
    setEditEmployeePhone(employee.phone || "");
    setEditEmployeeEmail(employee.email || "");
    setEditEmployeeDepartment(employee.department || "");
    setEditEmployeeDesignation(employee.designation || "");
    setEditEmployeeId(employee.employeeId || "");
  };

  // Handle Save Employee Edit
  const handleSaveEmployeeEdit = () => {
    if (!editEmployeeName.trim() || !editEmployeeEmail.trim()) {
      setEmailStatus({ type: "error", message: "Please enter name and email" });
      return;
    }

    // Update employees list
    const updatedEmployees = employees.map((emp) => {
      if (emp.id === editingEmployeeId) {
        return {
          ...emp,
          name: editEmployeeName,
          phone: editEmployeePhone,
          email: editEmployeeEmail,
          department: editEmployeeDepartment,
          designation: editEmployeeDesignation,
          employeeId: editEmployeeId || emp.employeeId,
        };
      }
      return emp;
    });
    setEmployees(updatedEmployees);

    // Update document requests with new employee info
    const updatedRequests = documentRequests.map((req) => {
      if (req.employeeId === editingEmployeeId) {
        return {
          ...req,
          employeeName: editEmployeeName,
          email: editEmployeeEmail,
        };
      }
      return req;
    });
    saveDocumentRequests(updatedRequests);

    // Update localStorage
    const savedProfiles = localStorage.getItem("employeeProfiles");
    if (savedProfiles) {
      const profiles = JSON.parse(savedProfiles);
      const updatedProfiles = profiles.map((profile) => {
        if (
          profile.employeeId === editingEmployeeId ||
          profile.id === editingEmployeeId
        ) {
          const nameParts = editEmployeeName.split(" ");
          return {
            ...profile,
            firstName: nameParts[0] || editEmployeeName,
            lastName: nameParts.slice(1).join(" ") || "",
            officialEmail: editEmployeeEmail,
            email: editEmployeeEmail,
            phone: editEmployeePhone,
            department: editEmployeeDepartment,
            designation: editEmployeeDesignation,
            employeeId: editEmployeeId || profile.employeeId,
          };
        }
        return profile;
      });
      localStorage.setItem("employeeProfiles", JSON.stringify(updatedProfiles));
    }

    setEmailStatus({
      type: "success",
      message: "Employee details updated successfully!",
    });

    // Clear edit form
    setTimeout(() => {
      setEditingEmployeeId(null);
    }, 1500);
  };

  // Updated send email function that includes employee edits
  const handleConfirmSendEmailWithEdits = async () => {
    const selectedEmps = employees.filter((emp) =>
      selectedEmployees.includes(emp.id),
    );
    if (selectedEmps.length === 0) {
      setEmailStatus({
        type: "error",
        message: "Please select at least one employee",
      });
      return;
    }

    // If we're editing an employee, save changes first
    if (editingEmployeeId) {
      handleSaveEmployeeEdit();
    }

    setSendingEmail(true);
    setEmailStatus({ type: "info", message: "Sending emails..." });

    const timestamp = new Date().toISOString();

    try {
      let emailResult;

      // Rest of your existing email sending logic...
      // ... (keep your existing email sending code here)

      // Create/update document requests
      const newRequests = selectedEmps.map((emp) => {
        const existingRequest = documentRequests.find(
          (req) => req.employeeId === emp.id,
        );

        if (existingRequest) {
          // Update existing request
          const updatedDocuments = existingRequest.documents.map((doc) => {
            // Check if this document was uploaded in email uploads
            const uploadedDoc = emailUploads.find(
              (up) => up.documentId === doc.id,
            );
            if (uploadedDoc) {
              return {
                ...doc,
                status: "Completed",
                uploadedDate: timestamp,
                fileUrl: uploadedDoc.fileUrl,
                fileName: uploadedDoc.name,
                fileSize: uploadedDoc.size,
                fileType: uploadedDoc.type,
              };
            }
            return doc;
          });

          return {
            ...existingRequest,
            employeeName: emp.name,
            email: emp.email,
            documents: updatedDocuments,
            emailSent: true,
            emailSentDate: timestamp,
            emailMethod: emailMethod,
            status: "Request Sent",
          };
        } else {
          // Create new request
          return {
            id: Date.now() + Math.random(),
            employeeId: emp.id,
            employeeName: emp.name,
            email: emp.email,
            status: "Request Sent",
            requestedDate: timestamp,
            documents: requiredDocuments.map((doc) => ({
              id: doc.id,
              name: doc.name,
              required: doc.required,
              status: "Pending",
              uploadedDate: null,
              fileUrl: null,
            })),
            emailSent: true,
            emailSentDate: timestamp,
            emailMethod: emailMethod,
            completedDate: null,
          };
        }
      });

      // Update or add requests
      const updatedRequests = [...documentRequests];
      newRequests.forEach((newReq) => {
        const index = updatedRequests.findIndex(
          (req) => req.employeeId === newReq.employeeId,
        );
        if (index >= 0) {
          updatedRequests[index] = newReq;
        } else {
          updatedRequests.push(newReq);
        }
      });
      saveDocumentRequests(updatedRequests);

      // Update employee status
      const updatedEmployees = employees.map((emp) => {
        if (selectedEmployees.includes(emp.id)) {
          return { ...emp, status: "In Progress" };
        }
        return emp;
      });
      setEmployees(updatedEmployees);

      // Update localStorage
      const savedProfiles = localStorage.getItem("employeeProfiles");
      if (savedProfiles) {
        const profiles = JSON.parse(savedProfiles);
        const updatedProfiles = profiles.map((profile) => {
          if (selectedEmployees.includes(profile.employeeId || profile.id)) {
            return { ...profile, bgvStatus: "In Progress" };
          }
          return profile;
        });
        localStorage.setItem(
          "employeeProfiles",
          JSON.stringify(updatedProfiles),
        );
      }

      setEmailStatus({
        type: "success",
        message: `Successfully sent ${selectedEmps.length} email(s)`,
      });

      setTimeout(() => {
        setShowEmailModal(false);
        setSelectedEmployees([]);
        setEmailTemplate("");
        setEmailStatus({ type: "", message: "" });
        setCcEmails("");
        setBccEmails("");
        setEditingEmployeeId(null);
        // Clear email uploads
        emailUploads.forEach((doc) => {
          if (doc.fileUrl) URL.revokeObjectURL(doc.fileUrl);
        });
        setEmailUploads([]);
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailStatus({
        type: "error",
        message:
          error.message ||
          "Failed to send emails. Please try again or use a different method.",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="mb-4">
        {/* Back Button */}
        <div className="d-flex align-items-center gap-3 mb-3">
          {activeSection !== "configuration" && (
            <button
              onClick={() => setActiveSection("configuration")}
              className="btn btn-link d-flex align-items-center gap-2"
              style={{ color: "#6B7280", textDecoration: "none" }}
            >
              <Icon icon="heroicons:arrow-left" />
              Back to Configuration
            </button>
          )}
        </div>

        {/* Title and Action Buttons in same row */}
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">
          <div style={{ flex: "1 1 auto", minWidth: "300px" }}>
            <h5 className="text-3xl fw-bold text-dark mb-2 d-flex align-items-center gap-2">
              <Icon icon="heroicons:shield-check" />
              Background Verification
            </h5>
            <p className="text-muted">
              Request and track document collection for employee background
              verification
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="d-flex gap-2 flex-wrap"
            style={{ alignItems: "flex-start" }}
          >
            <button
              className="btn btn-success"
              onClick={handleNewRequest}
              style={{
                borderRadius: 8,
                padding: "10px 20px",
                fontWeight: 500,
                fontSize: 14,
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Icon icon="heroicons:plus-circle" style={{ fontSize: 18 }} />
              New Request
            </button>
            {selectedEmployees.length > 0 && (
              <button
                className="btn btn-primary"
                onClick={handleSendEmail}
                style={{
                  borderRadius: 8,
                  padding: "10px 20px",
                  fontWeight: 500,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Icon icon="heroicons:envelope" style={{ fontSize: 18 }} />
                Send Request ({selectedEmployees.length})
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Filters */}
      <div
        className="card mb-4"
        style={{
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <div className="card-body" style={{ padding: "20px" }}>
          <div className="row g-3 align-items-end">
            <div className="col-md-8 col-lg-9">
              <label
                style={{
                  fontSize: 14,
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                Search
              </label>
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    background: "#F9FAFB",
                    border: "1px solid #D1D5DB",
                    borderRight: "none",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                  }}
                >
                  <Icon
                    icon="heroicons:magnifying-glass"
                    style={{ fontSize: 18, color: "#6B7280" }}
                  />
                </span>
                <input
                  type="search"
                  className="form-control"
                  style={{
                    borderTopRightRadius: "8px",
                    borderBottomRightRadius: "8px",
                    border: "1px solid #D1D5DB",
                    borderLeft: "none",
                    padding: "10px 14px",
                    fontSize: 14,
                    transition: "all 0.2s",
                  }}
                  placeholder="Search by name, email, or employee ID..."
                  value={searchTerm}
                  onChange={(e) => {
                    // Only update searchTerm, don't trigger email validation
                    setSearchTerm(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    // Escape key clears search
                    if (e.key === "Escape") {
                      setSearchTerm("");
                    }
                  }}
                  // Add these attributes to prevent any email-related behaviors
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  // Ensure this doesn't conflict with email inputs
                  name="employeeSearch"
                  id="employeeSearchInput"
                />
              </div>
            </div>

            <div className="col-md-4 col-lg-3">
              <label
                style={{
                  fontSize: 14,
                  color: "#374151",
                  fontWeight: 500,
                  marginBottom: 8,
                  display: "block",
                }}
              >
                Status Filter
              </label>
              <select
                className="form-select"
                style={{
                  borderRadius: 8,
                  border: "1px solid #D1D5DB",
                  padding: "10px 14px",
                  fontSize: 14,
                  transition: "all 0.2s",
                }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Not Started</option>
                <option>Pending</option>
                <option>Request Sent</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: 12,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            <div
              className="card-body text-center text-white"
              style={{ padding: "20px" }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 8,
                  opacity: 0.9,
                }}
              >
                Total Employees
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: "1.2" }}>
                {employees.length}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: 12,
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            }}
          >
            <div
              className="card-body text-center text-white"
              style={{ padding: "20px" }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 8,
                  opacity: 0.9,
                }}
              >
                Pending
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: "1.2" }}>
                {
                  employees.filter(
                    (e) => e.status === "Pending" || e.status === "Not Started",
                  ).length
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: 12,
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            }}
          >
            <div
              className="card-body text-center text-white"
              style={{ padding: "20px" }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 8,
                  opacity: 0.9,
                }}
              >
                In Progress
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: "1.2" }}>
                {
                  employees.filter(
                    (e) =>
                      e.status === "In Progress" || e.status === "Request Sent",
                  ).length
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: 12,
              background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            }}
          >
            <div
              className="card-body text-center text-white"
              style={{ padding: "20px" }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  marginBottom: 8,
                  opacity: 0.9,
                }}
              >
                Completed
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: "1.2" }}>
                {employees.filter((e) => e.status === "Completed").length}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Document Requests Cards */}
      {documentRequests.length > 0 && (
        <div className="mb-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-semibold fs-3 mb-0 text-dark">
              Document Requests
            </h4>

            <span className="badge bg-secondary px-3 py-2 fs-6">
              {documentRequests.length} Request
              {documentRequests.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="row g-3">
            {documentRequests.map((request) => {
              const completion = getCompletionPercentage(request);

              return (
                <div key={request.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm rounded-3">
                    <div className="card-body p-4">
                      {/* Employee + Status */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="flex-grow-1 text-truncate">
                          <h6 className="fw-semibold text-dark mb-1 text-truncate">
                            {request.employeeName}
                          </h6>
                          <p className="text-muted small mb-0 text-truncate">
                            {request.email}
                          </p>
                        </div>

                        <span
                          className={`badge bg-${getStatusColor(request.status)} rounded-pill ms-2 px-3 py-2 text-uppercase`}
                        >
                          {request.status}
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-muted fw-medium">
                            Progress
                          </small>
                          <small className="fw-semibold text-dark">
                            {completion}%
                          </small>
                        </div>

                        <div
                          className="progress rounded"
                          style={{ height: "8px" }}
                        >
                          <div
                            className={`progress-bar bg-${completion === 100 ? "success" : "info"}`}
                            role="progressbar"
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                      </div>

                      {/* Requested Date */}
                      <div className="border-bottom pb-2 mb-3">
                        <small className="text-muted d-block mb-1">
                          Requested Date:
                        </small>
                        <div className="fw-medium text-dark small">
                          {new Date(request.requestedDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="d-flex justify-content-end gap-2 mt-3">
                        <button
                          className="btn btn-sm btn-outline-primary d-flex align-items-center justify-content-center"
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowRequestDetails(true);
                          }}
                          title="View Details"
                        >
                          <Icon icon="heroicons:eye" className="fs-6" />
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                          onClick={() => {
                            const updatedRequests = documentRequests.filter(
                              (req) => req.id !== request.id,
                            );
                            saveDocumentRequests(updatedRequests);
                          }}
                          title="Delete Request"
                        >
                          <Icon icon="heroicons:trash" className="fs-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Employees Table */}
      <div
        className="card border-0 shadow-sm"
        style={{ borderRadius: 12, overflow: "hidden" }}
      >
        <div
          className="card-header bg-white border-bottom"
          style={{ padding: "20px", borderBottom: "2px solid #E5E7EB" }}
        >
          <h5
            style={{
              fontWeight: 600,
              fontSize: 18,
              color: "#1F2937",
              marginBottom: 0,
            }}
          >
            Employees List
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="min-width-50">
                    <input
                      type="checkbox"
                      checked={
                        selectedEmployees.length === filteredEmployees.length &&
                        filteredEmployees.length > 0
                      }
                      onChange={handleSelectAll}
                      className="form-check-input"
                      style={{ cursor: "pointer" }}
                    />
                  </th>
                  <th className="min-width-150">Employee</th>
                  <th className="min-width-150">Contact</th>
                  <th className="d-none d-md-table-cell min-width-120">
                    Department
                  </th>
                  <th className="d-none d-lg-table-cell min-width-120">
                    Joining Date
                  </th>
                  <th className="min-width-100">Status</th>
                  <th className="min-width-150">Progress</th>
                  <th className="min-width-180 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      <div className="text-muted">
                        <Icon
                          icon="heroicons:inbox"
                          style={{ fontSize: 36, marginBottom: 12 }}
                        />
                        <p className="mb-1 fw-medium">No employees found</p>
                        <small>
                          Try adjusting your search or filter criteria
                        </small>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee, idx) => {
                    const request = getDocumentRequest(employee.id);
                    const completion = getCompletionPercentage(request);

                    return (
                      <tr
                        key={employee.id}
                        className={idx % 2 === 1 ? "table-light" : ""}
                      >
                        <td className="align-middle">
                          <input
                            type="checkbox"
                            checked={selectedEmployees.includes(employee.id)}
                            onChange={() => handleSelectEmployee(employee.id)}
                            className="form-check-input"
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                        <td className="align-middle">
                          <div className="fw-semibold">{employee.name}</div>
                          <small className="text-muted">
                            ID: {employee.employeeId}
                          </small>
                        </td>
                        <td className="align-middle">
                          <div
                            className="text-truncate"
                            style={{ maxWidth: "150px" }}
                          >
                            {employee.email}
                          </div>
                          <small className="text-muted">
                            {employee.phone || "N/A"}
                          </small>
                        </td>
                        <td className="d-none d-md-table-cell align-middle">
                          <div>{employee.department}</div>
                          <small className="text-muted">
                            {employee.designation}
                          </small>
                        </td>
                        <td className="d-none d-lg-table-cell align-middle">
                          {new Date(employee.joiningDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </td>
                        <td className="align-middle">
                          <span
                            className={`badge bg-${getStatusColor(employee.status)}`}
                            style={{
                              fontWeight: 500,
                              borderRadius: "20px",
                              padding: "6px 12px",
                              fontSize: 11,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {employee.status}
                          </span>
                        </td>
                        <td className="align-middle">
                          {request ? (
                            <div>
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <small className="text-muted">
                                  {completion}% Complete
                                </small>
                              </div>
                              <div
                                className="progress"
                                style={{ height: "6px" }}
                              >
                                <div
                                  className={`progress-bar bg-${completion === 100 ? "success" : "info"}`}
                                  style={{ width: `${completion}%` }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted small">
                              Not Started
                            </span>
                          )}
                        </td>
                        <td className="align-middle text-center">
                          <div className="btn-group btn-group-sm">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => {
                                setSelectedEmployees([employee.id]);
                                handleSendEmail();
                              }}
                              title="Send Document Request"
                            >
                              <Icon
                                icon="heroicons:envelope"
                                style={{ fontSize: 14 }}
                              />
                            </button>

                            {request && (
                              <button
                                className="btn btn-outline-info btn-sm"
                                onClick={() => {
                                  setSelectedRequest(request);
                                  setShowRequestDetails(true);
                                }}
                                title="View Details"
                              >
                                <Icon
                                  icon="heroicons:eye"
                                  style={{ fontSize: 14 }}
                                />
                              </button>
                            )}

                            {/* Approve Button */}
                            {request && employee.status === "In Progress" && (
                              <button
                                className="btn btn-outline-success btn-sm"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Approve background verification for ${employee.name}?`,
                                    )
                                  ) {
                                    // Update employee status
                                    const updatedEmployees = employees.map(
                                      (emp) =>
                                        emp.id === employee.id
                                          ? { ...emp, status: "Completed" }
                                          : emp,
                                    );
                                    setEmployees(updatedEmployees);

                                    // Update document request status
                                    const updatedRequests =
                                      documentRequests.map((req) =>
                                        req.employeeId === employee.id
                                          ? {
                                              ...req,
                                              status: "Completed",
                                              completedDate:
                                                new Date().toISOString(),
                                            }
                                          : req,
                                      );
                                    saveDocumentRequests(updatedRequests);

                                    // Update localStorage
                                    const savedProfiles =
                                      localStorage.getItem("employeeProfiles");
                                    if (savedProfiles) {
                                      const profiles =
                                        JSON.parse(savedProfiles);
                                      const updatedProfiles = profiles.map(
                                        (profile) =>
                                          (profile.employeeId || profile.id) ===
                                          employee.id
                                            ? {
                                                ...profile,
                                                bgvStatus: "Completed",
                                              }
                                            : profile,
                                      );
                                      localStorage.setItem(
                                        "employeeProfiles",
                                        JSON.stringify(updatedProfiles),
                                      );
                                    }

                                    alert(
                                      `Background verification approved for ${employee.name}`,
                                    );
                                  }
                                }}
                                title="Approve Verification"
                              >
                                <Icon
                                  icon="heroicons:check"
                                  style={{ fontSize: 14 }}
                                />
                              </button>
                            )}

                            {/* Reject Button */}
                            {request &&
                              (employee.status === "In Progress" ||
                                employee.status === "Pending") && (
                                <button
                                  className="btn btn-outline-warning btn-sm"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Reject background verification for ${employee.name}?`,
                                      )
                                    ) {
                                      // Update employee status
                                      const updatedEmployees = employees.map(
                                        (emp) =>
                                          emp.id === employee.id
                                            ? { ...emp, status: "Rejected" }
                                            : emp,
                                      );
                                      setEmployees(updatedEmployees);

                                      // Update document request status
                                      const updatedRequests =
                                        documentRequests.map((req) =>
                                          req.employeeId === employee.id
                                            ? { ...req, status: "Rejected" }
                                            : req,
                                        );
                                      saveDocumentRequests(updatedRequests);

                                      // Update localStorage
                                      const savedProfiles =
                                        localStorage.getItem(
                                          "employeeProfiles",
                                        );
                                      if (savedProfiles) {
                                        const profiles =
                                          JSON.parse(savedProfiles);
                                        const updatedProfiles = profiles.map(
                                          (profile) =>
                                            (profile.employeeId ||
                                              profile.id) === employee.id
                                              ? {
                                                  ...profile,
                                                  bgvStatus: "Rejected",
                                                }
                                              : profile,
                                        );
                                        localStorage.setItem(
                                          "employeeProfiles",
                                          JSON.stringify(updatedProfiles),
                                        );
                                      }

                                      alert(
                                        `Background verification rejected for ${employee.name}`,
                                      );
                                    }
                                  }}
                                  title="Reject Verification"
                                >
                                  <Icon
                                    icon="heroicons:x-mark"
                                    style={{ fontSize: 14 }}
                                  />
                                </button>
                              )}

                            {request && (
                              <button
                                className="btn btn-outline-danger btn-sm"
                                title="Delete Request Permanently"
                                onClick={() => {
                                  setEmployeeToDelete(employee);
                                  setShowDeleteModal(true);
                                }}
                              >
                                <Icon icon="heroicons:trash" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ;{/* Document Request Details Modal */}
      {showRequestDetails && selectedRequest && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1055,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRequestDetails(false);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content border-0 shadow-lg rounded-3">
              {/* Modal Header */}
              <div className="modal-header bg-info text-dark rounded-top-3">
                <div className="d-flex align-items-center">
                  <h5 className="modal-title mb-0 fw-semibold">
                    Document Request
                  </h5>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowRequestDetails(false)}
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body p-0">
                {/* Employee Info Card */}
                <div className="p-4 border-bottom">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                      <Icon
                        icon="heroicons:user"
                        className="text-primary fs-5"
                      />
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="fw-bold mb-1">
                        {selectedRequest.employeeName}
                      </h5>
                      <p className="text-muted small mb-0">
                        <Icon icon="heroicons:envelope" className="me-1" />
                        {selectedRequest.email}
                      </p>
                    </div>
                    <span
                      className={`badge bg-${getStatusColor(selectedRequest.status)} rounded-pill px-3 py-2`}
                    >
                      {selectedRequest.status}
                    </span>
                  </div>
                  {/* Request Info */}
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <h6 className="fw-semibold mb-3">
                            Request Information
                          </h6>
                          <div className="d-flex mb-2">
                            <span
                              className="text-muted me-3"
                              style={{ minWidth: "120px" }}
                            >
                              Requested:
                            </span>
                            <span className="fw-medium">
                              {new Date(
                                selectedRequest.requestedDate,
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="d-flex mb-2">
                            <span
                              className="text-muted me-3"
                              style={{ minWidth: "120px" }}
                            >
                              Email Sent:
                            </span>
                            <span className="fw-medium">
                              {selectedRequest.emailSent ? "Yes" : "No"}
                              {selectedRequest.emailSentDate && (
                                <small className="text-muted ms-2">
                                  (
                                  {new Date(
                                    selectedRequest.emailSentDate,
                                  ).toLocaleDateString()}
                                  )
                                </small>
                              )}
                            </span>
                          </div>
                          <div className="d-flex">
                            <span
                              className="text-muted me-3"
                              style={{ minWidth: "120px" }}
                            >
                              Email Method:
                            </span>
                            <span className="fw-medium text-capitalize">
                              {selectedRequest.emailMethod}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="p-4 border-bottom">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Document Collection</span>
                      <span className="fw-semibold">
                        {getCompletionPercentage(selectedRequest)}%
                      </span>
                    </div>
                    <div
                      className="progress rounded"
                      style={{ height: "10px" }}
                    >
                      <div
                        className={`progress-bar bg-${getCompletionPercentage(selectedRequest) === 100 ? "success" : "info"}`}
                        style={{
                          width: `${getCompletionPercentage(selectedRequest)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="row text-center">
                    <div className="col-4">
                      <div className="fw-bold text-success fs-4">
                        {
                          selectedRequest.documents.filter(
                            (d) => d.status === "Completed",
                          ).length
                        }
                      </div>
                      <div className="text-muted small">Completed</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-warning fs-4">
                        {
                          selectedRequest.documents.filter(
                            (d) => d.status === "Pending",
                          ).length
                        }
                      </div>
                      <div className="text-muted small">Pending</div>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-dark fs-4">
                        {selectedRequest.documents.length}
                      </div>
                      <div className="text-muted small">Total</div>
                    </div>
                  </div>
                </div>

                {/* Documents List */}
                <div className="p-4">
                  <h6 className="fw-semibold mb-3">Documents Status</h6>
                  <div className="list-group list-group-flush">
                    {selectedRequest.documents.map((doc, index) => (
                      <div
                        key={doc.id}
                        className="list-group-item border-0 px-0 py-2"
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div
                              className={`rounded-circle p-1 me-3 bg-${doc.status === "Completed" ? "success" : "warning"}-subtle`}
                            >
                              <Icon
                                icon={
                                  doc.status === "Completed"
                                    ? "heroicons:check-circle"
                                    : "heroicons:clock"
                                }
                                className={`fs-6 text-${doc.status === "Completed" ? "success" : "warning"}`}
                              />
                            </div>
                            <div>
                              <div className="fw-medium">{doc.name}</div>
                              <small
                                className={`badge bg-${doc.required ? "danger" : "secondary"} rounded-pill`}
                              >
                                {doc.required ? "Required" : "Optional"}
                              </small>
                            </div>
                          </div>
                          <span
                            className={`badge bg-${doc.status === "Completed" ? "success" : "warning"} rounded-pill`}
                          >
                            {doc.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-top-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowRequestDetails(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm d-flex align-items-center px-3"
                  onClick={() => {
                    // Find the employee and send email
                    const employee = employees.find(
                      (e) => e.id === selectedRequest.employeeId,
                    );
                    if (employee) {
                      setSelectedEmployees([employee.id]);
                      setShowRequestDetails(false);
                      setTimeout(() => handleSendEmail(), 300);
                    }
                  }}
                >
                  <Icon icon="heroicons:envelope" className="me-2" />
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Email Modal */}
      {showEmailModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1055,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRequestDetails(false);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content border-0 shadow-lg rounded-3">
              {/* Header */}
              <div className="modal-header bg-primary text-white rounded-top-3 border-0 px-4 py-3">
                <h6 className="modal-title d-flex align-items-center fw-semibold mb-0">
                  Send Document Request Email
                </h6>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowEmailModal(false)}
                />
              </div>

              {/* Body */}
              <div className="modal-body p-4">
                {/* Email Status */}
                {emailStatus.message && (
                  <div
                    className={`alert alert-${emailStatus.type === "success" ? "success" : emailStatus.type === "error" ? "danger" : "info"} d-flex align-items-center mb-4`}
                  >
                    <Icon
                      icon={
                        emailStatus.type === "success"
                          ? "heroicons:check-circle"
                          : emailStatus.type === "error"
                            ? "heroicons:exclamation-circle"
                            : "heroicons:information-circle"
                      }
                      className="me-2 flex-shrink-0"
                    />
                    <div className="w-100">{emailStatus.message}</div>
                  </div>
                )}

                {/* Recipients with Edit Option */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">To:</label>
                  <div className="p-3 bg-light rounded">
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {employees
                        .filter((emp) => selectedEmployees.includes(emp.id))
                        .map((emp) => {
                          const existingRequest = documentRequests.find(
                            (req) => req.employeeId === emp.id,
                          );

                          return (
                            <span
                              key={emp.id}
                              className="badge bg-primary d-flex align-items-center"
                            >
                              <Icon
                                icon="heroicons:user-circle"
                                className="me-1"
                              />
                              <span className="d-none d-sm-inline">
                                {emp.name}
                              </span>
                              <span
                                className="d-inline d-sm-none text-truncate"
                                style={{ maxWidth: "80px" }}
                              >
                                {emp.name.split(" ")[0]}
                              </span>
                              <small className="ms-1 opacity-75">
                                ({emp.email})
                              </small>
                              {existingRequest && (
                                <small className="ms-2 text-warning">
                                  <Icon
                                    icon="heroicons:document-text"
                                    className="me-1"
                                  />
                                  Existing
                                </small>
                              )}
                              <button
                                type="button"
                                className="btn btn-link p-0 ms-2 text-white"
                                onClick={() => handleEditEmployee(emp)}
                                title="Edit Employee Details"
                              >
                                <Icon
                                  icon="heroicons:pencil-square"
                                  className="fs-6"
                                />
                              </button>
                            </span>
                          );
                        })}
                    </div>

                    {/* Edit Employee Form (shown when editing) */}
                    {editingEmployeeId && (
                      <div className="border rounded p-3 bg-white mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="mb-0 fw-semibold">
                            <Icon
                              icon="heroicons:pencil-square"
                              className="me-2"
                            />
                            Edit Employee Details
                          </h6>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setEditingEmployeeId(null)}
                          />
                        </div>

                        <div className="row g-3">
                          {/* Name */}
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">
                              Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={editEmployeeName}
                              onChange={(e) =>
                                setEditEmployeeName(e.target.value)
                              }
                              placeholder="Enter employee name"
                              disabled={sendingEmail}
                            />
                          </div>

                          {/* Phone Number */}
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              value={editEmployeePhone}
                              onChange={(e) =>
                                setEditEmployeePhone(e.target.value)
                              }
                              placeholder="+91 98765 43210"
                              disabled={sendingEmail}
                            />
                          </div>

                          {/* Email */}
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">
                              Email ID <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={editEmployeeEmail}
                              onChange={(e) =>
                                setEditEmployeeEmail(e.target.value)
                              }
                              placeholder="Enter email address"
                              disabled={sendingEmail}
                            />
                          </div>

                          {/* Department */}
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">
                              Department{" "}
                            </label>
                            <select
                              className="form-select"
                              value={editEmployeeDepartment}
                              onChange={(e) =>
                                setEditEmployeeDepartment(e.target.value)
                              }
                              disabled={sendingEmail}
                            >
                              <option value="">Select Department</option>
                              <option value="Engineering">Engineering</option>
                              <option value="Marketing">Marketing</option>
                              <option value="Sales">Sales</option>
                              <option value="HR">HR</option>
                              <option value="Finance">Finance</option>
                              <option value="Operations">Operations</option>
                              <option value="External">External</option>
                            </select>
                          </div>

                          {/* Designation */}
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">
                              Designation{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={editEmployeeDesignation}
                              onChange={(e) =>
                                setEditEmployeeDesignation(e.target.value)
                              }
                              placeholder="e.g., Software Engineer, Marketing Executive"
                              disabled={sendingEmail}
                            />
                          </div>

                          {/* Employee ID */}
                          <div className="col-12 col-md-6">
                            <label className="form-label fw-semibold">
                              Employee ID{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={editEmployeeId}
                              onChange={(e) =>
                                setEditEmployeeId(e.target.value)
                              }
                              placeholder="EMP001, CAND001, etc."
                              disabled={sendingEmail}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setEditingEmployeeId(null)}
                            disabled={sendingEmail}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary d-flex align-items-center gap-2"
                            onClick={handleSaveEmployeeEdit}
                            disabled={
                              sendingEmail ||
                              !editEmployeeName.trim() ||
                              !editEmployeeEmail.trim()
                            }
                          >
                            <Icon icon="heroicons:check" />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CC and BCC */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      CC (Optional):
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={ccEmails}
                      onChange={(e) => setCcEmails(e.target.value)}
                      placeholder="email1@example.com, email2@example.com"
                      disabled={emailMethod === "mailto" || sendingEmail}
                    />
                    <small className="text-muted d-block mt-2">
                      <Icon
                        icon="heroicons:information-circle"
                        className="me-1"
                      />
                      Separate multiple emails with commas
                    </small>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      BCC (Optional):
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={bccEmails}
                      onChange={(e) => setBccEmails(e.target.value)}
                      placeholder="email1@example.com, email2@example.com"
                      disabled={emailMethod === "mailto" || sendingEmail}
                    />
                    <small className="text-muted d-block mt-2">
                      <Icon
                        icon="heroicons:information-circle"
                        className="me-1"
                      />
                      Separate multiple emails with commas
                    </small>
                  </div>
                </div>

                {/* Email Method */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Email Sending Method:
                  </label>
                  <div className="btn-group w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="emailMethod"
                      id="method-api"
                      value="api"
                      checked={emailMethod === "api"}
                      onChange={(e) => setEmailMethod(e.target.value)}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="method-api"
                    >
                      <Icon icon="heroicons:server" className="me-1" />
                      API Send
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="emailMethod"
                      id="method-clipboard"
                      value="clipboard"
                      checked={emailMethod === "clipboard"}
                      onChange={(e) => setEmailMethod(e.target.value)}
                    />
                    <label
                      className="btn btn-outline-primary"
                      htmlFor="method-clipboard"
                    >
                      <Icon icon="heroicons:clipboard" className="me-1" />
                      Copy to Clipboard
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="emailMethod"
                      id="method-mailto"
                      value="mailto"
                      checked={emailMethod === "mailto"}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      disabled={selectedEmployees.length > 1}
                    />
                    <label
                      className={`btn btn-outline-primary ${selectedEmployees.length > 1 ? "disabled" : ""}`}
                      htmlFor="method-mailto"
                    >
                      <Icon icon="heroicons:envelope-open" className="me-1" />
                      Mailto (Single)
                    </label>
                  </div>
                  {emailMethod === "api" && (
                    <small className="text-muted d-block mt-1">
                      <Icon
                        icon="heroicons:information-circle"
                        className="me-1"
                      />
                      Sends email via API. Requires backend configured.
                    </small>
                  )}
                  {emailMethod === "clipboard" && (
                    <small className="text-muted d-block mt-1">
                      <Icon
                        icon="heroicons:information-circle"
                        className="me-1"
                      />
                      Copies email content to clipboard for manual send.
                    </small>
                  )}
                  {emailMethod === "mailto" && (
                    <small className="text-muted d-block mt-1">
                      <Icon
                        icon="heroicons:information-circle"
                        className="me-1"
                      />
                      Opens default email client. Single recipient only.
                    </small>
                  )}
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Subject:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject..."
                    disabled={sendingEmail}
                  />
                </div>

                {/* Document Upload Section - Same as New Request Modal */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Upload Documents (Optional):
                  </label>

                  <div className="bg-light rounded p-3">
                    <div className="table-responsive">
                      <table className="table table-borderless table-sm mb-0">
                        <thead>
                          <tr>
                            <th
                              className="fw-semibold text-muted"
                              style={{ width: "40%" }}
                            >
                              Document Name
                            </th>
                            <th
                              className="fw-semibold text-muted"
                              style={{ width: "20%" }}
                            >
                              Type
                            </th>
                            <th
                              className="fw-semibold text-muted"
                              style={{ width: "20%" }}
                            >
                              Upload Status
                            </th>
                            <th
                              className="fw-semibold text-muted"
                              style={{ width: "20%" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {requiredDocuments.map((doc, index) => {
                            // Check if this document is already uploaded
                            const isUploaded = emailUploads.some(
                              (ud) => ud.documentId === doc.id,
                            );
                            const uploadedDoc = emailUploads.find(
                              (ud) => ud.documentId === doc.id,
                            );

                            return (
                              <tr
                                key={doc.id}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-light"
                                }
                              >
                                <td className="align-middle">
                                  <div className="d-flex align-items-center">
                                    <Icon
                                      icon={
                                        isUploaded
                                          ? "heroicons:document-check"
                                          : "heroicons:document"
                                      }
                                      className={`me-2 ${isUploaded ? "text-success" : "text-secondary"}`}
                                    />
                                    <div>
                                      <div className="fw-medium">
                                        {doc.name}
                                      </div>
                                      {uploadedDoc && (
                                        <small className="text-muted">
                                          Uploaded:{" "}
                                          {new Date(
                                            uploadedDoc.uploadDate,
                                          ).toLocaleDateString()}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <span
                                    className={`badge bg-${doc.required ? "danger" : "secondary"}`}
                                  >
                                    {doc.required ? "Required" : "Optional"}
                                  </span>
                                </td>
                                <td className="align-middle">
                                  {isUploaded ? (
                                    <span className="badge bg-success">
                                      Uploaded
                                    </span>
                                  ) : (
                                    <span
                                      className={`badge bg-${doc.required ? "warning" : "secondary"}`}
                                    >
                                      {doc.required ? "Pending" : "Optional"}
                                    </span>
                                  )}
                                </td>
                                <td className="align-middle">
                                  {isUploaded ? (
                                    <div className="d-flex gap-1">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() =>
                                          handleViewDocument(uploadedDoc)
                                        }
                                        title="View Document"
                                      >
                                        <Icon
                                          icon="heroicons:eye"
                                          className="fs-6"
                                        />
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                          handleRemoveEmailDocument(doc.id)
                                        }
                                        title="Remove Document"
                                      >
                                        <Icon
                                          icon="heroicons:trash"
                                          className="fs-6"
                                        />
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <input
                                        type="file"
                                        id={`email-upload-${doc.id}`}
                                        className="d-none"
                                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                        onChange={(e) =>
                                          handleEmailDocumentUpload(e, doc.id)
                                        }
                                        disabled={sendingEmail}
                                      />
                                      <label
                                        htmlFor={`email-upload-${doc.id}`}
                                        className={`btn btn-sm w-100 ${doc.required ? "btn-outline-success" : "btn-outline-secondary"}`}
                                        style={{
                                          cursor: "pointer",
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          gap: "4px",
                                        }}
                                      >
                                        <Icon
                                          icon="heroicons:arrow-up-tray"
                                          style={{ fontSize: 18 }}
                                        />
                                        <span>Upload</span>
                                      </label>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Upload Summary */}
                    {emailUploads.length > 0 && (
                      <div className="mt-3 pt-3 border-top">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <small className="text-muted">
                              {emailUploads.length} of{" "}
                              {requiredDocuments.length} documents uploaded
                            </small>
                            <div
                              className="progress mt-1"
                              style={{ height: "6px", width: "200px" }}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{
                                  width: `${(emailUploads.length / requiredDocuments.length) * 100}%`,
                                }}
                              ></div>
                            </div>

                            {/* Required Documents Summary */}
                            <div className="mt-2">
                              <small className="text-muted d-block">
                                Required:{" "}
                                {
                                  emailUploads.filter((ud) =>
                                    requiredDocuments.find(
                                      (rd) =>
                                        rd.id === ud.documentId && rd.required,
                                    ),
                                  ).length
                                }{" "}
                                of{" "}
                                {
                                  requiredDocuments.filter((d) => d.required)
                                    .length
                                }
                              </small>
                              <div
                                className="progress mt-1"
                                style={{
                                  height: "4px",
                                  width: "200px",
                                  backgroundColor: "#e9ecef",
                                }}
                              >
                                <div
                                  className="progress-bar bg-danger"
                                  style={{
                                    width: `${(emailUploads.filter((ud) => requiredDocuments.find((rd) => rd.id === ud.documentId && rd.required)).length / requiredDocuments.filter((d) => d.required).length) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            {/* Optional Documents Summary */}
                            {requiredDocuments.filter((d) => !d.required)
                              .length > 0 && (
                              <div className="mt-2">
                                <small className="text-muted d-block">
                                  Optional:{" "}
                                  {
                                    emailUploads.filter((ud) =>
                                      requiredDocuments.find(
                                        (rd) =>
                                          rd.id === ud.documentId &&
                                          !rd.required,
                                      ),
                                    ).length
                                  }{" "}
                                  of{" "}
                                  {
                                    requiredDocuments.filter((d) => !d.required)
                                      .length
                                  }
                                </small>
                                <div
                                  className="progress mt-1"
                                  style={{
                                    height: "4px",
                                    width: "200px",
                                    backgroundColor: "#e9ecef",
                                  }}
                                >
                                  <div
                                    className="progress-bar bg-secondary"
                                    style={{
                                      width: `${(emailUploads.filter((ud) => requiredDocuments.find((rd) => rd.id === ud.documentId && !rd.required)).length / requiredDocuments.filter((d) => !d.required).length) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to clear all uploaded documents?",
                                )
                              ) {
                                // Revoke object URLs to prevent memory leaks
                                emailUploads.forEach((doc) => {
                                  if (doc.fileUrl) {
                                    URL.revokeObjectURL(doc.fileUrl);
                                  }
                                });
                                setEmailUploads([]);
                              }
                            }}
                            disabled={emailUploads.length === 0 || sendingEmail}
                          >
                            <Icon icon="heroicons:trash" className="me-1" />
                            Clear All
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Body */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Email Body:</label>
                  <textarea
                    className="form-control"
                    rows="8"
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                    placeholder="Enter email content..."
                    disabled={sendingEmail}
                    style={{ resize: "vertical" }}
                  />
                </div>

                {/* Info Alert */}
                <div className="alert alert-info d-flex align-items-start">
                  <Icon
                    icon="heroicons:information-circle"
                    className="me-2 mt-1 flex-shrink-0"
                  />
                  <div>
                    <strong className="d-block mb-1">Note:</strong>
                    This email will request employees to submit scanned copies
                    (PDF format) of the required documents.
                    {selectedEmployees.length > 0 && (
                      <div className="mt-2">
                        <strong>
                          Employee details can be edited by clicking the edit
                          icon next to their name.
                        </strong>{" "}
                        Changes will be saved to the employee record.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer bg-light rounded-bottom-3 px-4 py-3">
                <div className="d-flex flex-column flex-md-row w-100 gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary order-2 order-md-1 flex-fill"
                    onClick={() => {
                      setShowEmailModal(false);
                      setEmailStatus({ type: "", message: "" });
                      setCcEmails("");
                      setBccEmails("");
                      // Clear edit state
                      setEditingEmployeeId(null);
                      // Clear any temporary uploads
                      emailUploads.forEach((doc) => {
                        if (doc.fileUrl) URL.revokeObjectURL(doc.fileUrl);
                      });
                      setEmailUploads([]);
                    }}
                    disabled={sendingEmail}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary order-1 order-md-2 flex-fill d-flex align-items-center justify-content-center"
                    onClick={handleConfirmSendEmailWithEdits}
                    disabled={
                      sendingEmail ||
                      !emailTemplate.trim() ||
                      !emailSubject.trim()
                    }
                  >
                    {sendingEmail ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Icon
                          icon="heroicons:paper-airplane"
                          className="me-2"
                        />
                        <span>
                          {emailMethod === "api"
                            ? "Send via API"
                            : emailMethod === "clipboard"
                              ? "Copy to Clipboard"
                              : "Open Email Client"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* New Request Modal */}
      {showNewRequestModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1055,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRequestDetails(false);
            }
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content border-0 shadow-lg rounded-3">
              {/* Header */}
              <div className="modal-header bg-success text-white rounded-top-3 border-0 px-4 py-3">
                <h5 className="modal-title d-flex align-items-center fw-semibold mb-0">
                  New Document Request
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowNewRequestModal(false);
                    setEmailStatus({ type: "", message: "" });
                    setCcEmails("");
                    setBccEmails("");
                  }}
                />
              </div>

              {/* Body */}
              <div className="modal-body p-4">
                {/* Email Status */}
                {emailStatus.message && (
                  <div
                    className={`alert alert-${emailStatus.type === "success" ? "success" : emailStatus.type === "error" ? "danger" : "info"} d-flex align-items-center mb-3`}
                  >
                    <Icon
                      icon={
                        emailStatus.type === "success"
                          ? "heroicons:check-circle"
                          : emailStatus.type === "error"
                            ? "heroicons:exclamation-circle"
                            : "heroicons:information-circle"
                      }
                      className="me-2"
                    />
                    {emailStatus.message}
                  </div>
                )}

                {/* Contact Information Row */}
                <div className="row g-3 mb-3">
                  {/* Name */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={newRequestName}
                      onChange={(e) => setNewRequestName(e.target.value)}
                      placeholder="Enter candidate/employee name"
                      disabled={sendingEmail}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      value={newRequestPhone}
                      onChange={(e) => setNewRequestPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      disabled={sendingEmail}
                    />
                  </div>
                </div>

                {/* Email Row */}
                <div className="row g-3 mb-3">
                  {/* Email */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Email ID <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      value={newRequestEmail}
                      onChange={(e) => setNewRequestEmail(e.target.value)}
                      placeholder="Enter email address"
                      disabled={sendingEmail}
                    />
                  </div>

                  {/* Department/Designation */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Department</label>
                    <select
                      className="form-select"
                      value={newRequestDepartment}
                      onChange={(e) => setNewRequestDepartment(e.target.value)}
                      disabled={sendingEmail}
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                      <option value="External">External</option>
                    </select>
                  </div>
                </div>

                {/* Additional Info Row */}
                <div className="row g-3 mb-4">
                  {/* Designation */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Designation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={newRequestDesignation}
                      onChange={(e) => setNewRequestDesignation(e.target.value)}
                      placeholder="e.g., Software Engineer, Marketing Executive"
                      disabled={sendingEmail}
                    />
                  </div>

                  {/* Employee ID */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={newRequestEmployeeId}
                      onChange={(e) => setNewRequestEmployeeId(e.target.value)}
                      placeholder="EMP001, CAND001, etc."
                      disabled={sendingEmail}
                    />
                  </div>
                </div>

                {/* Email Method */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Email Sending Method
                  </label>
                  <div className="btn-group w-100 flex-wrap" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="newRequestEmailMethod"
                      id="method-api"
                      value="api"
                      checked={emailMethod === "api"}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      disabled={sendingEmail}
                    />
                    <label
                      className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                      htmlFor="method-api"
                    >
                      <Icon icon="heroicons:server" className="me-1" />
                      API Send
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="newRequestEmailMethod"
                      id="method-clipboard"
                      value="clipboard"
                      checked={emailMethod === "clipboard"}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      disabled={sendingEmail}
                    />
                    <label
                      className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                      htmlFor="method-clipboard"
                    >
                      <Icon icon="heroicons:clipboard" className="me-1" />
                      Copy to Clipboard
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="newRequestEmailMethod"
                      id="method-mailto"
                      value="mailto"
                      checked={emailMethod === "mailto"}
                      onChange={(e) => setEmailMethod(e.target.value)}
                      disabled={sendingEmail}
                    />
                    <label
                      className="btn btn-outline-primary d-flex align-items-center justify-content-center"
                      htmlFor="method-mailto"
                    >
                      <Icon icon="heroicons:envelope-open" className="me-1" />
                      Mailto
                    </label>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Subject <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRequestSubject}
                    onChange={(e) => setNewRequestSubject(e.target.value)}
                    placeholder="Email subject..."
                    disabled={sendingEmail}
                  />
                </div>

                {/* CC / BCC */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      CC (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={ccEmails}
                      onChange={(e) => setCcEmails(e.target.value)}
                      placeholder="email1@example.com"
                      disabled={emailMethod === "mailto" || sendingEmail}
                    />
                    <small className="text-muted">
                      Separate multiple emails with commas
                    </small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      BCC (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={bccEmails}
                      placeholder="email1@example.com"
                      onChange={(e) => setBccEmails(e.target.value)}
                      disabled={emailMethod === "mailto" || sendingEmail}
                    />
                    <small className="text-muted">
                      Separate multiple emails with commas
                    </small>
                  </div>
                </div>

                {/* Required Documents */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Required Documents
                  </label>
                  <div className="bg-light rounded p-3">
                    <div className="table-responsive">
                      <table className="table table-borderless table-sm mb-0">
                        <thead>
                          <tr>
                            <th
                              className="fw-semibold text-muted"
                              style={{ width: "40%" }}
                            >
                              Document Name
                            </th>
                            <th
                              className="fw-semibold text-muted"
                              style={{ width: "20%" }}
                            >
                              Type
                            </th>
                            <th
                              className="fw-semibold text-muted"
                              style={{ width: "20%" }}
                            >
                              Upload Status
                            </th>
                            <th
                              className="fw-semibold text-muted"
                              style={{ width: "20%" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {requiredDocuments.map((doc, index) => {
                            // Check if this document is already uploaded
                            const isUploaded = uploadedDocuments.some(
                              (ud) => ud.id === doc.id,
                            );
                            const uploadedDoc = uploadedDocuments.find(
                              (ud) => ud.id === doc.id,
                            );

                            return (
                              <tr
                                key={doc.id}
                                className={
                                  index % 2 === 0 ? "bg-white" : "bg-light"
                                }
                              >
                                <td className="align-middle">
                                  <div className="d-flex align-items-center">
                                    <Icon
                                      icon={
                                        isUploaded
                                          ? "heroicons:document-check"
                                          : "heroicons:document"
                                      }
                                      className={`me-2 ${isUploaded ? "text-success" : "text-secondary"}`}
                                    />
                                    <div>
                                      <div className="fw-medium">
                                        {doc.name}
                                      </div>
                                      {uploadedDoc && (
                                        <small className="text-muted">
                                          Uploaded:{" "}
                                          {new Date(
                                            uploadedDoc.uploadDate,
                                          ).toLocaleDateString()}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <span
                                    className={`badge bg-${doc.required ? "danger" : "secondary"}`}
                                  >
                                    {doc.required ? "Required" : "Optional"}
                                  </span>
                                </td>
                                <td className="align-middle">
                                  {isUploaded ? (
                                    <span className="badge bg-success">
                                      Uploaded
                                    </span>
                                  ) : (
                                    <span
                                      className={`badge bg-${doc.required ? "warning" : "secondary"}`}
                                    >
                                      {doc.required ? "Pending" : "Optional"}
                                    </span>
                                  )}
                                </td>
                                <td className="align-middle">
                                  {isUploaded ? (
                                    <div className="d-flex gap-1">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() =>
                                          handleViewDocument(uploadedDoc)
                                        }
                                        title="View Document"
                                      >
                                        <Icon
                                          icon="heroicons:eye"
                                          className="fs-6"
                                        />
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                          handleRemoveDocument(doc.id)
                                        }
                                        title="Remove Document"
                                      >
                                        <Icon
                                          icon="heroicons:trash"
                                          className="fs-6"
                                        />
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <input
                                        type="file"
                                        id={`upload-${doc.id}`}
                                        className="d-none"
                                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                        onChange={(e) =>
                                          handleDocumentUpload(e, doc.id)
                                        }
                                        disabled={sendingEmail}
                                      />
                                      <label
                                        htmlFor={`upload-${doc.id}`}
                                        className={`btn btn-sm w-100 ${doc.required ? "btn-outline-success" : "btn-outline-secondary"} d-flex flex-column align-items-center justify-content-center`}
                                        style={{
                                          cursor: "pointer",
                                          height: "60px", // Optional: Adjust height for better appearance
                                          padding: "6px",
                                          gap: "4px", // Optional: Add spacing between icon and text
                                        }}
                                      >
                                        <Icon
                                          icon="heroicons:arrow-up-tray"
                                          className="mb-1"
                                          style={{ fontSize: "18px" }} // Optional: Adjust icon size
                                        />
                                        <span>Upload</span>
                                      </label>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Upload Summary */}
                    {uploadedDocuments.length > 0 && (
                      <div className="mt-3 pt-3 border-top">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <small className="text-muted">
                              {uploadedDocuments.length} of{" "}
                              {requiredDocuments.length} documents uploaded
                            </small>
                            <div
                              className="progress mt-1"
                              style={{ height: "6px", width: "200px" }}
                            >
                              <div
                                className="progress-bar bg-success"
                                style={{
                                  width: `${(uploadedDocuments.length / requiredDocuments.length) * 100}%`,
                                }}
                              ></div>
                            </div>

                            {/* Required Documents Summary */}
                            <div className="mt-2">
                              <small className="text-muted d-block">
                                Required:{" "}
                                {
                                  uploadedDocuments.filter((ud) =>
                                    requiredDocuments.find(
                                      (rd) => rd.id === ud.id && rd.required,
                                    ),
                                  ).length
                                }{" "}
                                of{" "}
                                {
                                  requiredDocuments.filter((d) => d.required)
                                    .length
                                }
                              </small>
                              <div
                                className="progress mt-1"
                                style={{
                                  height: "4px",
                                  width: "200px",
                                  backgroundColor: "#e9ecef",
                                }}
                              >
                                <div
                                  className="progress-bar bg-danger"
                                  style={{
                                    width: `${(uploadedDocuments.filter((ud) => requiredDocuments.find((rd) => rd.id === ud.id && rd.required)).length / requiredDocuments.filter((d) => d.required).length) * 100}%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            {/* Optional Documents Summary */}
                            {requiredDocuments.filter((d) => !d.required)
                              .length > 0 && (
                              <div className="mt-2">
                                <small className="text-muted d-block">
                                  Optional:{" "}
                                  {
                                    uploadedDocuments.filter((ud) =>
                                      requiredDocuments.find(
                                        (rd) => rd.id === ud.id && !rd.required,
                                      ),
                                    ).length
                                  }{" "}
                                  of{" "}
                                  {
                                    requiredDocuments.filter((d) => !d.required)
                                      .length
                                  }
                                </small>
                                <div
                                  className="progress mt-1"
                                  style={{
                                    height: "4px",
                                    width: "200px",
                                    backgroundColor: "#e9ecef",
                                  }}
                                >
                                  <div
                                    className="progress-bar bg-secondary"
                                    style={{
                                      width: `${(uploadedDocuments.filter((ud) => requiredDocuments.find((rd) => rd.id === ud.id && !rd.required)).length / requiredDocuments.filter((d) => !d.required).length) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to clear all uploaded documents?",
                                )
                              ) {
                                // Revoke object URLs to prevent memory leaks
                                uploadedDocuments.forEach((doc) => {
                                  if (doc.fileUrl) {
                                    URL.revokeObjectURL(doc.fileUrl);
                                  }
                                });
                                setUploadedDocuments([]);
                              }
                            }}
                            disabled={
                              uploadedDocuments.length === 0 || sendingEmail
                            }
                          >
                            <Icon icon="heroicons:trash" className="me-1" />
                            Clear All
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Template */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Template <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows="8"
                    value={newRequestTemplate}
                    onChange={(e) => setNewRequestTemplate(e.target.value)}
                    disabled={sendingEmail}
                  />
                  <small className="text-muted">
                    You can use [Employee Name] placeholder which will be
                    replaced automatically
                  </small>
                </div>

                {/* Info */}
                <div className="alert alert-info d-flex align-items-start">
                  <Icon
                    icon="heroicons:information-circle"
                    className="me-2 mt-1"
                  />
                  <div>
                    <strong>Note:</strong> This email will request the
                    candidate/employee to submit scanned copies (PDF format) of
                    the required documents.
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer bg-light rounded-bottom-3 px-4 py-3">
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary flex-fill"
                    onClick={() => {
                      setShowNewRequestModal(false);
                      setEmailStatus({ type: "", message: "" });
                      setCcEmails("");
                      setBccEmails("");
                      setNewRequestEmail("");
                      setNewRequestName("");
                      setNewRequestPhone("");
                      setNewRequestDepartment("");
                      setNewRequestDesignation("");
                      setNewRequestEmployeeId("");
                      setNewRequestTemplate("");
                    }}
                    disabled={sendingEmail}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-success flex-fill d-flex align-items-center justify-content-center"
                    onClick={handleSendNewRequest}
                    disabled={
                      sendingEmail ||
                      !newRequestTemplate.trim() ||
                      !newRequestSubject.trim() ||
                      !newRequestEmail.trim() ||
                      !newRequestName.trim()
                    }
                  >
                    {sendingEmail ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Icon
                          icon="heroicons:paper-airplane"
                          className="me-2"
                        />
                        {emailMethod === "api"
                          ? "Send via API"
                          : emailMethod === "clipboard"
                            ? "Copy to Clipboard"
                            : "Open Email Client"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {showDeleteModal && employeeToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1060,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !deleting) {
              setShowDeleteModal(false);
              setEmployeeToDelete(null);
            }
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "450px" }}
          >
            <div className="modal-content border-0 shadow-lg rounded-3">
              {/* Modal Header - Reduced height */}
              <div
                className="modal-header bg-danger text-white border-0 px-4 py-3"
                style={{ borderRadius: "0.5rem 0.5rem 0 0" }}
              >
                <h5 className="modal-title d-flex align-items-center fw-semibold mb-0">
                  <Icon
                    icon="heroicons:exclamation-triangle"
                    className="me-2"
                  />
                  Delete Request
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    if (!deleting) {
                      setShowDeleteModal(false);
                      setEmployeeToDelete(null);
                    }
                  }}
                  disabled={deleting}
                  style={{
                    padding: "0.5rem",
                    margin: "-0.5rem -0.5rem -0.5rem auto",
                  }}
                />
              </div>

              {/* Modal Body - Compact layout */}
              <div className="modal-body p-3">
                <div className="text-center">
                  {/* Compact warning icon */}
                  <div className="mb-2">
                    <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle p-2">
                      <Icon
                        icon="heroicons:trash"
                        className="text-danger"
                        style={{ fontSize: "24px" }}
                      />
                    </div>
                  </div>

                  {/* Main message - more compact */}
                  <h6 className="fw-semibold mb-2">Delete Permanently?</h6>
                  <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                    Delete document request for{" "}
                    <strong>{employeeToDelete.name}</strong>?
                  </p>

                  {/* Compact warning alert */}
                  <div
                    className="alert alert-warning py-2 mb-3"
                    style={{ fontSize: "13px" }}
                  >
                    <div className="d-flex align-items-start">
                      <Icon
                        icon="heroicons:exclamation-circle"
                        className="me-2 mt-0"
                        style={{ fontSize: "16px" }}
                      />
                      <div>
                        <strong className="d-block mb-0">Warning:</strong>
                        <small>This action cannot be undone.</small>
                      </div>
                    </div>
                  </div>

                  {/* Compact employee details */}
                  <div
                    className="bg-light rounded p-2 mb-3"
                    style={{ fontSize: "13px" }}
                  >
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Employee:</span>
                      <span
                        className="fw-semibold text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {employeeToDelete.name}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Email:</span>
                      <span
                        className="fw-semibold text-truncate"
                        style={{ maxWidth: "180px" }}
                      >
                        {employeeToDelete.email}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Employee ID:</span>
                      <span className="fw-semibold">
                        {employeeToDelete.employeeId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer - Compact */}
              <div
                className="modal-footer border-top-0 bg-light px-3 py-2"
                style={{ borderRadius: "0 0 0.5rem 0.5rem" }}
              >
                <div className="d-flex w-100 gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm flex-fill"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setEmployeeToDelete(null);
                      setDeleting(false);
                    }}
                    disabled={deleting}
                    style={{ padding: "0.375rem 0.75rem", fontSize: "14px" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm flex-fill d-flex align-items-center justify-content-center"
                    onClick={async () => {
                      setDeleting(true);

                      try {
                        /* 1️⃣ Remove document request completely */
                        const updatedRequests = documentRequests.filter(
                          (req) => req.employeeId !== employeeToDelete.id,
                        );
                        saveDocumentRequests(updatedRequests);

                        /* 2️⃣ Remove employee profile entry from localStorage */
                        const savedProfiles =
                          localStorage.getItem("employeeProfiles");
                        if (savedProfiles) {
                          const profiles = JSON.parse(savedProfiles);
                          const updatedProfiles = profiles.filter(
                            (profile) =>
                              (profile.employeeId || profile.id) !==
                              employeeToDelete.id,
                          );
                          localStorage.setItem(
                            "employeeProfiles",
                            JSON.stringify(updatedProfiles),
                          );
                        }

                        /* 3️⃣ Remove employee from employees list */
                        const updatedEmployees = employees.filter(
                          (emp) => emp.id !== employeeToDelete.id,
                        );
                        setEmployees(updatedEmployees);

                        // Show success status
                        setEmailStatus({
                          type: "success",
                          message: `Successfully deleted request for ${employeeToDelete.name}`,
                        });

                        // Close modal after delay
                        setTimeout(() => {
                          setShowDeleteModal(false);
                          setEmployeeToDelete(null);
                          setDeleting(false);

                          // Clear success message after 3 seconds
                          setTimeout(() => {
                            setEmailStatus({ type: "", message: "" });
                          }, 3000);
                        }, 1000);
                      } catch (error) {
                        console.error("Error deleting request:", error);
                        setEmailStatus({
                          type: "error",
                          message:
                            "Failed to delete request. Please try again.",
                        });
                        setDeleting(false);
                      }
                    }}
                    style={{ padding: "0.375rem 0.75rem", fontSize: "14px" }}
                  >
                    {deleting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Icon
                          icon="heroicons:trash"
                          className="me-1"
                          style={{ fontSize: "16px" }}
                        />
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundVerification;
