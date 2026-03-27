import React, { useState, useEffect } from "react";
import { contactsAPI } from "../../utils/api";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Icon } from '@iconify/react/dist/iconify.js';
import { BASE_URL } from "../../config/api.config";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Load contacts from API
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactsAPI.list();
      setContacts(data);
    } catch (err) {
      console.error("Error loading contacts:", err);
      setError("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    lastName: '',
    role: '',
    phone: '',
    phone2: '',
    fax: '',
    email: '',
    company: '',
    dateOfBirth: '',
    rating: '0',
   owner: "",
customOwner: "",
    deals: '',
    industry: '',
    customIndustry:'',
    currency: 'Dollar',
     customCurrency: '',
    language: 'English',
customLanguage: '',
    source: '',
    customSource: '',
    tags: [],
    img: '/assets/img/users/user-49.jpg',
    // Address Information
    location: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    // Social Profiles
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    skype: '',
    website: '',
    // Access Information
    accessLevel: '',
    department: '',
    allowEmailAccess: false,
    allowPhoneAccess: false,
    allowDataExport: false
  });

  const resetForm = () => {
    setFormData({
      // Basic Information
      name: '',
      lastName: '',
      role: '',
      phone: '',
      phone2: '',
      fax: '',
      email: '',
      company: '',
      dateOfBirth: '',
      rating: '0',
      owner: "",
customOwner: "",
      deals: '',
      industry: '',
      customIndustry:'',
     currency: 'Dollar',
     customCurrency: '',
      language: 'English',
customLanguage: '',
      source: '',
      tags: [],
      img: '/assets/images/users/user1.png',
      // Address Information
      location: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      // Social Profiles
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      skype: '',
      website: '',
      // Access Information
      accessLevel: '',
      department: '',
      allowEmailAccess: false,
      allowPhoneAccess: false,
      allowDataExport: false
    });
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


const exportPDF = () => {
  const doc = new jsPDF();
  
  // Constants for card layout
  const CARD_WIDTH = 190;
  const CARD_HEIGHT = 75;
  const LEFT_COL_X = 14;
  const RIGHT_COL_X = 105;
  const LABEL_OFFSET = 25;
  const LINE_HEIGHT = 5;
  
  let y = 20;
  
  // Helper function to add text with label
const addField = (label, value, x, y, maxLength = 30) => {
  doc.setFont("helvetica", "bold");
  doc.text(label + ":", x, y);
  doc.setFont("helvetica", "normal");

  const displayValue = value || "N/A";

  // If maxLength is null → wrap text (for location etc.)
  if (maxLength === null) {
    const lines = doc.splitTextToSize(displayValue, 65);
    doc.text(lines, x + LABEL_OFFSET, y);
    return lines.length; // return number of lines used
  }

  // Default truncation logic
  if (maxLength && displayValue.length > maxLength) {
    doc.text(displayValue.substring(0, maxLength - 3) + "...", x + LABEL_OFFSET, y);
  } else {
    doc.text(displayValue, x + LABEL_OFFSET, y);
  }

  return 1;
};
  
  // Helper for combined fields
  const combineFields = (fields, separator = ", ") => {
    return fields.filter(Boolean).join(separator) || "N/A";
  };
  
  // Title
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text("Contacts Report", 14, 10);
  
  // Define field groups for better organization
  const fieldGroups = (contact) => ({
    left: [
      { label: "Job Title", value: contact.job_title },
      { label: "Company", value: contact.company_name },
      { label: "Email", value: contact.email },
      { label: "Phone", value: contact.phone_number },
      { label: "Phone 2", value: contact.phone_number_2 },
      { label: "Fax", value: contact.fax },

    ],
    right: [
      { label: "DOB", value: contact.date_of_birth },
      { label: "Rating", value: contact.ratings || "-" },
      { label: "Owner", value: contact.owner },
      { label: "Industry", value: contact.industry },
      { label: "Currency", value: contact.currency },
      { label: "Language", value: contact.language },

    ],
    bottomLeft: [
       { label: "Deals", value: contact.deals, maxLength: 20 },
      { label: "Source", value: contact.source },
      { label: "Postal", value: contact.postal_code },
      { label: "Social 2", value: combineFields([contact.linkedin, contact.instagram]) },
      { label: "Skype", value: contact.skype },
      { label: "Dept", value: contact.department }
    ],
    bottomRight: [
        { label: "Tags", value: Array.isArray(contact.tags) ? contact.tags.join(", ") : contact.tags, maxLength: 20 },
      { 
        label: "Location", 
        value: combineFields([contact.location, contact.city, contact.state, contact.country]),
        maxLength: null // No truncation for location
      },
      { 
        label: "Social", 
        value: combineFields([contact.facebook, contact.twitter]) 
      },
      { 
        label: "Website", 
        value: contact.website 
      },
      { 
        label: "Access", 
        value: contact.access_level 
      },
      { 
        label: "Permissions", 
        value: contact.permissions 
      }
    ]
  });

  // Generic function to render a column of fields
const renderColumn = (fields, startX, startY, maxLength = 30) => {
  let currentY = startY;

  fields.forEach(field => {
    const lines = addField(
      field.label,
      field.value,
      startX,
      currentY,
      field.maxLength !== undefined ? field.maxLength : maxLength
    );

    currentY += lines * LINE_HEIGHT;
  });

  return currentY;
};
  
  contacts.forEach((contact) => {
    // Add new page if space is insufficient
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    // Card border
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.5);
    doc.roundedRect(10, y, CARD_WIDTH, CARD_HEIGHT, 3, 3, 'FD');
    
    // Header separator line
    doc.setDrawColor(220, 220, 220);
    doc.line(10, y + 10, 200, y + 10);
    
    // Name
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204);
    const fullName = combineFields([contact.name, contact.last_name], " ");
    doc.text(fullName, LEFT_COL_X, y + 7);
    
    // Reset font
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    
    const groups = fieldGroups(contact);
    
    // Render main columns
    renderColumn(groups.left, LEFT_COL_X, y + 17);
    renderColumn(groups.right, RIGHT_COL_X, y + 17);
    
    // Render bottom columns
    const secondRowY = y + 47;
    renderColumn(groups.bottomLeft, LEFT_COL_X, secondRowY, 25);
    renderColumn(groups.bottomRight, RIGHT_COL_X, secondRowY, 25);
    
    y += CARD_HEIGHT + 8;
  });
  
  doc.save("contacts_cards.pdf");
};

const exportExcel = () => {
  const excelData = contacts.map((c) => ({
    "Name": `${c.name || ""} ${c.last_name || "N/A"}`.trim() || "N/A",
    "Last Name": c.last_name || "N/A",
    "Job Title": c.job_title || "N/A",
    "Company Name": c.company_name || "N/A",
    "Email": c.email || "N/A",
    "Phone Number": c.phone_number || "N/A",
    "Phone Number 2": c.phone_number_2 || "N/A",
    "Fax": c.fax || "N/A",
    "Deals": c.deals || "N/A",
    "Date of Birth": c.date_of_birth || "N/A",
    "Ratings": c.ratings || "N/A",
    "Owner": c.owner || "N/A",
    "Industry": c.industry || "N/A",
    "Currency": c.currency || "N/A",
    "Language": c.language || "N/A",
    "Tags": c.tags || "N/A",
    "Source": c.source || "N/A",
    "Location": [c.location, c.city, c.state, c.country].filter(Boolean).join(", ") || "N/A",
    "City": c.city || "N/A",
    "State": c.state || "N/A",
    "Country": c.country || "N/A",
    "Postal Code": c.postal_code || "N/A",
    "Facebook": c.facebook || "N/A",
    "Twitter": c.twitter || "N/A",
    "LinkedIn": c.linkedin || "N/A",
    "Instagram": c.instagram || "N/A",
    "Skype": c.skype || "N/A",
    "Website": c.website || "N/A",
    "Access Level": c.access_level || "N/A",
    "Department": c.department || "N/A",

  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Auto-size columns for better alignment
  const maxWidth = 50;
  const minWidth = 10;
  
  // Get the range of the worksheet
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');
  
  // Initialize column widths if not present
  if (!worksheet['!cols']) worksheet['!cols'] = [];
  
  // Calculate optimal column widths
  for (let col = range.s.c; col <= range.e.c; col++) {
    let maxLength = 0;
    
    // Check header
    const headerCell = worksheet[XLSX.utils.encode_cell({ r: 0, c: col })];
    if (headerCell && headerCell.v) {
      maxLength = Math.max(maxLength, String(headerCell.v).length);
    }
    
    // Check data rows (up to first 100 rows for performance)
    const maxRows = Math.min(range.e.r + 1, 100);
    for (let row = 1; row < maxRows; row++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
      if (cell && cell.v) {
        maxLength = Math.max(maxLength, String(cell.v).length);
      }
    }
    
    // Set column width with min/max constraints
    worksheet['!cols'][col] = { 
      wch: Math.min(Math.max(maxLength + 2, minWidth), maxWidth) 
    };
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Generate filename with current date
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  
  saveAs(data, `contacts_${dateStr}.xlsx`);
};



  const handleAddContact = () => {
    setModalType('add');
    resetForm();
    setSelectedContact(null);
    setSelectedFile(null);
    setImagePreview(null);
    setActiveTab('basic');
    setShowModal(true);
  };

  const handleEditContact = (contact) => {

        const predefinedCurrencies = ["Dollar", "Euro", "Rupee", "Pound"];
    const predefinedLanguages = ["English", "Spanish", "French", "German"];
      const predefinedSources = [
    "Social Media",
    "Website",
    "Referral",
    "LinkedIn",
    "Email Campaign",
    "Conference",
    "GitHub"
  ];

  const predefinedOwners = [
  "Hendry Milner",
  "John Doe",
  "Sarah Wilson",
  "Mike Johnson"
];

const predefinedIndustries = [
  "Retail Industry",
  "Technology",
  "Design",
  "Human Resources",
  "Marketing",
  "Consulting"
];
  
    setModalType('edit');
    setSelectedContact(contact);
    setSelectedFile(null);
    // Set image preview from existing profile photo
    let profilePhotoUrl = '/assets/images/users/user1.png';
    if (contact.profile_photo) {
      if (contact.profile_photo.startsWith('http://') || contact.profile_photo.startsWith('https://')) {
        profilePhotoUrl = contact.profile_photo;
      } else if (contact.profile_photo.startsWith('/')) {
        profilePhotoUrl = `${BASE_URL}${contact.profile_photo}`;
      } else {
        profilePhotoUrl = `${BASE_URL}/${contact.profile_photo}`;
      }
    }
    setImagePreview(profilePhotoUrl);
    // Map API response (backend field names) to form data format (frontend field names)
    setFormData({
      // Basic Information
      name: contact.name || '',
      lastName: contact.last_name || '',
      role: contact.job_title || '',
      phone: contact.phone_number || '',
      phone2: contact.phone_number2 || '',
      fax: contact.fax || '',
      email: contact.email || '',
      company: contact.company_name || '',
      dateOfBirth: contact.dob ? (typeof contact.dob === 'string' ? contact.dob.split('T')[0] : contact.dob) : '',
      rating: contact.ratings?.toString() || '0',
      owner: predefinedOwners.includes(contact.owner)
  ? contact.owner
  : "Others",

customOwner: predefinedOwners.includes(contact.owner)
  ? ""
  : contact.owner || "",
      deals: contact.deals || '',

      industry: predefinedIndustries.includes(contact.industry)
  ? contact.industry
  : "Others",

customIndustry: predefinedIndustries.includes(contact.industry)
  ? ""
  : contact.industry || "",
currency: predefinedCurrencies.includes(contact.currency)
  ? contact.currency
  : contact.currency
    ? "Other"
    : "Dollar",

customCurrency: predefinedCurrencies.includes(contact.currency)
  ? ""
  : contact.currency || "",
language: predefinedLanguages.includes(contact.language)
  ? contact.language
  : contact.language
    ? "Other"
    : "English",

customLanguage: predefinedLanguages.includes(contact.language)
  ? ""
  : contact.language || "",
      
    // Source
    source: predefinedSources.includes(contact.source)
      ? contact.source
      : contact.source
        ? "Others"
        : "",

    customSource: predefinedSources.includes(contact.source)
      ? ""
      : contact.source || "",

      tags: Array.isArray(contact.tags) ? contact.tags : (contact.tags ? contact.tags.split(',') : []),
      img: contact.profile_photo || '/assets/images/users/user1.png',
      // Address Information
      location: contact.location || '',
      city: contact.city || '',
      state: contact.state || '',
      country: contact.country || '',
      postalCode: contact.postal_code || '',
      // Social Profiles
      facebook: contact.facebook || '',
      twitter: contact.twitter || '',
      linkedin: contact.linkedin || '',
      instagram: contact.instagram || '',
      skype: contact.skype || '',
      website: contact.website || '',
      // Access Information
      accessLevel: contact.access_level || '',
      department: contact.department || '',
      allowEmailAccess: contact.allow_email_access || false,
      allowPhoneAccess: contact.allow_phone_access || false,
      allowDataExport: contact.allow_data_export || false
    });
    setActiveTab('basic');
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setActiveTab('basic'); // Reset to first tab when closing
    resetForm();
    setSelectedContact(null);
    setSelectedFile(null);
    setImagePreview(null);
  };
  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        setError(null);
        await contactsAPI.delete(contactToDelete.id);
        await loadContacts();
        setShowDeleteModal(false);
        setContactToDelete(null);
      } catch (err) {
        console.error("Error deleting contact:", err);
        const errorMessage = err.message || err.detail || "Failed to delete contact. Please try again.";
        setError(errorMessage);
      }
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    
    try {
      setError(null);
      
      // Handle profile photo path - preserve existing photo if no new file selected
      let profilePhotoPath = null;
      if (modalType === 'edit' && selectedContact) {
        // For edit mode, preserve existing photo path if no new file is selected
        if (selectedFile) {
          // Upload new photo if a file is selected
          try {
            const uploadResult = await contactsAPI.uploadProfilePhoto(selectedContact.id, selectedFile);
            profilePhotoPath = uploadResult.profile_photo;
          } catch (uploadErr) {
            console.error("Error uploading profile photo:", uploadErr);
            setError("Failed to upload profile photo. Please try again.");
            return;
          }
        } else {
          // No new file selected, preserve existing photo path
          profilePhotoPath = selectedContact.profile_photo || null;
        }
      } else {
        // For add mode, use formData.img or null
        profilePhotoPath = formData.img || null;
      }
      
      // Prepare contact data for API - map frontend fields to backend schema
      const contactData = {
        // Basic Information
        name: formData.name || '',
        last_name: formData.lastName || null,
        job_title: formData.role || '',
        phone_number: formData.phone || '',
        phone_number2: formData.phone2 || null,
        fax: formData.fax || null,
        email: formData.email || null,
        company_name: formData.company || '',
        dob: formData.dateOfBirth || null,
        ratings: formData.rating || null,
        owner:
  formData.owner === "Others"
    ? formData.customOwner || null
    : formData.owner || null,
        deals: formData.deals || null,
        
        industry:
  formData.industry === "Others"
    ? formData.customIndustry || null
    : formData.industry || null,

        currency:
  formData.currency === "Other"
    ? formData.customCurrency || null
    : formData.currency || null,
        language:
  formData.language === "Other"
    ? formData.customLanguage || null
    : formData.language || null,
        source:
  formData.source === "Others"
    ? formData.customSource || null
    : formData.source || null,
        tags: Array.isArray(formData.tags) ? formData.tags : (formData.tags ? [formData.tags] : []),
        profile_photo: profilePhotoPath,
        // Address Information
        location: formData.location || null,
        city: formData.city || null,
        state: formData.state || null,
        country: formData.country || null,
        postal_code: formData.postalCode || null,
        // Social Profiles
        facebook: formData.facebook || null,
        twitter: formData.twitter || null,
        linkedin: formData.linkedin || null,
        instagram: formData.instagram || null,
        skype: formData.skype || null,
        website: formData.website || null,
        // Access Information
        access_level: formData.accessLevel || null,
        department: formData.department || null,
        allow_email_access: formData.allowEmailAccess || false,
        allow_phone_access: formData.allowPhoneAccess || false,
        allow_data_export: formData.allowDataExport || false
      };

      let createdContactId = null;
      if (modalType === 'add') {
        const createdContact = await contactsAPI.create(contactData);
        createdContactId = createdContact.id;
        // Upload profile photo for newly created contact
        if (selectedFile && createdContactId) {
          try {
            await contactsAPI.uploadProfilePhoto(createdContactId, selectedFile);
          } catch (uploadErr) {
            console.error("Error uploading profile photo:", uploadErr);
            // Don't fail the whole operation, just log the error
          }
        }
      } else if (selectedContact) {
        await contactsAPI.update(selectedContact.id, contactData);
      }
      
      await loadContacts();
      setShowModal(false);
      resetForm();
      setSelectedContact(null);
      setSelectedFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error saving contact:", err);
      const errorMessage = err.message || err.detail || "Failed to save contact. Please try again.";
      setError(errorMessage);
    }
  };
  const handleCancel = () => {
    setShowModal(false);
    resetForm();
    setSelectedContact(null);
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      // Validate file size (4MB)
      if (file.size > 4 * 1024 * 1024) {
        setError('Image size should be below 4MB');
        return;
      }
      setSelectedFile(file);
      setError(null);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      img: '/assets/img/users/user-49.jpg'
    }));
  };

  const addTag = (tagName) => {
    if (tagName && !formData.tags.includes(tagName)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagName]
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div
      style={{
        backgroundColor: "#f4f6f8",
        padding: "20px",
        borderRadius: "12px",
      }}
    >



      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        {/* Left Section: Title + Description */}
        <div>
          <h5 className="text-3xl fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <span className="icon-circle text-primary">
              <Icon icon="heroicons:building-office" />
            </span>
            Contacts
          </h5>
          <p className="text-muted mb-0">
            Manage all contact information, profiles, and communication details in one place.
          </p>
        </div>

        {/* Right Section: Actions */}
<div className="d-flex align-items-center gap-2">

  {/* Export Dropdown */}
  <div className="dropdown ">
    <button
      type="button"
      className="create-job-btn dropdown-toggle gap-2"
      data-bs-toggle="dropdown"
    >
      <i className="ti ti-file-export me-1"></i>
      Export CSV
    </button>

<ul className="dropdown-menu dropdown-menu-end shadow-sm">

  <li>
    <button
      className="dropdown-item d-flex align-items-center"
      onClick={exportPDF}
    >
      <i className="ti ti-file-type-pdf me-2"></i>
      Export as PDF
    </button>
  </li>

  <li>
    <button
      className="dropdown-item d-flex align-items-center"
      onClick={exportExcel}
    >
      <i className="ti ti-file-type-xls me-2"></i>
      Export as Excel
    </button>
  </li>

</ul>
  </div>

  {/* Add Contact */}
  <button
    onClick={handleAddContact}
    className="add-employee gap-2"
  >
     <Icon icon="heroicons:plus-circle" width="18" />

    Add Contact
  </button>

</div>
      </div>

      {/* Contact Grid Header */}
      <div className="card w-100 p-2 border-0 shadow-sm" style={{ borderRadius: "12px" }}>
        <div className="card-body px-4 py-3 bg-white rounded-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">

            {/* Left: Title */}
            <div className="d-flex align-items-center gap-3">
              <h5 className="mb-0 fw-bold text-dark fs-6">
                Contacts Grid
              </h5>
            </div>

            {/* Right: Sort Dropdown */}
            <div className="dropdown">
              <button
                type="button"
                className="close-btn"
                data-bs-toggle="dropdown"
              >
                Sort By:
                <span className="text-dark">Last 7 Days</span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li>
                  <button className="dropdown-item">Recently Added</button>
                </li>
                <li>
                  <button className="dropdown-item">Ascending</button>
                </li>
                <li>
                  <button className="dropdown-item">Descending</button>
                </li>
                <li>
                  <button className="dropdown-item">Last Month</button>
                </li>
                <li>
                  <button className="dropdown-item active">Last 7 Days</button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>


      {/* Contacts Table */}
      {loading && (
        <div className="text-center py-5">
          <p className="text-muted">Loading contacts...</p>
        </div>
      )}
      {error && !loading && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!loading && !error && contacts.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No contacts found. Add your first contact!</p>
        </div>
      )}

{!loading && contacts.length > 0 && (
  <div style={{ padding: "20px", backgroundColor: "#f4f6f8" }}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
      }}
    >
      {contacts.map((c) => (
        <div
          key={c.id}
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: "14px",
            padding: "18px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div className="d-flex justify-content-start mb-3">
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "12px",
                backgroundColor: "#e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={(() => {
                  if (!c.profile_photo) return "/assets/images/users/user1.png";
                  if (c.profile_photo.startsWith("http://") || c.profile_photo.startsWith("https://")) {
                    return c.profile_photo;
                  }
                  if (c.profile_photo.startsWith("/")) {
                    return `${BASE_URL}${c.profile_photo}`;
                  }
                  return `${BASE_URL}/${c.profile_photo}`;
                })()}
                alt={`${c.name || "Contact"}`}
                style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "8px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/users/user1.png";
                }}
              />
            </div>
          </div>

          <h5 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px", lineHeight: "1.3" }}>
            {[c.name, c.last_name].filter(Boolean).join(" ") || "Unnamed Contact"}
          </h5>

          <div style={{ fontSize: "14px", color: "#475569", lineHeight: "1.8", flexGrow: 1 }}>
            <div><strong style={{ color: "#000" }}>Email:</strong> {c.email || "N/A"}</div>
            <div><strong style={{ color: "#000" }}>Phone:</strong> {c.phone_number || c.phone_number2 || "N/A"}</div>
            <div><strong style={{ color: "#000" }}>Company:</strong> {c.company_name || "N/A"}</div>
            <div><strong style={{ color: "#000" }}>Job:</strong> {c.job_title || "N/A"}</div>
            <div><strong style={{ color: "#000" }}>Location:</strong> {[c.location, c.city, c.state, c.country].filter(Boolean).join(", ") || "N/A"}</div>
            <div><strong style={{ color: "#000" }}>Industry:</strong> {c.industry || "N/A"}</div>
            <div className="d-flex align-items-center gap-2">
              <strong style={{ color: "#000" }}>Rating:</strong>
              <span style={{ color: "#f59e0b", fontWeight: 600 }}>
                <i className="ti ti-star-filled me-1"></i>{c.ratings || 0}
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-around gap-2 mt-3">
            <button
              className="btn btn-sm btn-primary d-flex align-items-center justify-content-center"
              onClick={() => handleEditContact(c)}
              title="Edit Contact"
              type="button"
              style={{ fontSize: "12px", padding: "6px 14px", minWidth: "70px" }}
            >
              <Icon icon="heroicons:pencil-square" className="me-1" width="16" />
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger d-flex align-items-center justify-content-center"
              onClick={() => handleDeleteContact(c)}
              title="Delete Contact"
              type="button"
              style={{ fontSize: "12px", padding: "6px 14px", minWidth: "80px" }}
            >
              <Icon icon="heroicons:trash" className="me-1" width="16" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="d-flex justify-content-center align-items-center" style={{ height: "70px" }}>
      <button className="close-btn">Load More</button>
    </div>
  </div>
)}

      {/* Add/Edit Contact Modal */}
      {showModal && (
        <div  className="hrms-modal-overlay">
          <div className="hrms-modal hrms-modal-offer-xl animate-scale-in d-flex flex-column">

              {/* HEADER */}
              <div className="hrms-modal-header">
                 <h5 className="hrms-modal-title d-flex align-items-center">
                  {modalType === 'add' ? 'Add Contact' : 'Edit Contact'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>

              <div className="hrms-modal-body hrms-modal-body-scroll">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                {/* Tab Navigation */}
                <ul className="nav nav-tabs mb-3">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'basic' ? 'active' : ''}`}
                      onClick={() => setActiveTab('basic')}
                    >
                      Basic Information
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                      onClick={() => setActiveTab('address')}
                    >
                      Address
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'social' ? 'active' : ''}`}
                      onClick={() => setActiveTab('social')}
                    >
                      Social Profiles
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'access' ? 'active' : ''}`}
                      onClick={() => setActiveTab('access')}
                    >
                      Access
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                {activeTab === 'basic' && (
                  <form onSubmit={handleSave}>

                    <div className="col-md-12">
                      <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                        <div
                          className="d-flex align-items-center justify-content-center border border-dashed me-2 flex-shrink-0 text-dark frames"
                          style={{
                            position: 'relative',
                            overflow: 'hidden',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            backgroundColor: '#f8f9fa',
                            minWidth: '120px',
                            minHeight: '120px'
                          }}
                        >
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Profile preview"
                              className="img-fluid"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                display: 'block',
                                borderRadius: '50%'
                              }}
                              onError={(e) => {
                                if (e.target.src !== '/assets/images/users/user1.png') {
                                  e.target.onerror = null;
                                  e.target.src = '/assets/images/users/user1.png';
                                }
                              }}
                            />
                          ) : (
                            <i className="ti ti-photo text-gray-2 fs-16" style={{ fontSize: '48px' }}></i>
                          )}
                        </div>
                        <div className="profile-upload">
                          <div className="mb-2">
                            <h6 className="mb-1">Upload Profile Image</h6>
                            <p className="fs-12">Image should be below 4 mb</p>
                          </div>

                          <div className="profile-uploader d-flex align-items-center gap-3">
                            <label className="create-job-btn " style={{ cursor: 'pointer', position: 'relative' }}>
                              Upload
                              <input
                                type="file"
                                className="form-control image-sign"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                              />
                            </label>
                            {(selectedFile || imagePreview) && (
                              <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="delete-btn"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Job Title <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
<div className="col-md-4">
  <div className="mb-3">
    <label className="form-label">
      Company Name <span className="text-danger">*</span>
    </label>
    <input
      type="text"
      className="form-control"
      name="company"
      value={formData.company}
      onChange={handleInputChange}
      placeholder="Enter Company Name"
    />
  </div>
</div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Phone Number 2</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone2"
                            value={formData.phone2}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Fax</label>
                          <input
                            type="text"
                            className="form-control"
                            name="fax"
                            value={formData.fax}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Deals</label>
                          <select
                            className="form-select"
                            name="deals"
                            value={formData.deals}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Deal</option>
                            <option value="Basic">Basic</option>
                            <option value="Premium">Premium</option>
                            <option value="Enterprise">Enterprise</option>
                            <option value="Collins">Collins</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Ratings</label>
                          <select
                            className="form-select"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                          >
                            <option value="0">No Rating</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                          </select>
                        </div>
                      </div>
                      
<div className="col-md-4">
  <div className="mb-3">
    <label className="form-label">Owner</label>

    {formData.owner === "Others" ? (
      <input
        type="text"
        className="form-control"
        placeholder="Enter Owner Name"
        value={formData.customOwner}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customOwner: e.target.value
          }))
        }
      />
    ) : (
      <select
        className="form-select"
        name="owner"
        value={formData.owner}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Others") {
            setFormData((prev) => ({
              ...prev,
              owner: "Others"
            }));
          } else {
            handleInputChange(e);
          }
        }}
      >
        <option value="">Select Owner</option>
        <option value="Hendry Milner">Hendry Milner</option>
        <option value="John Doe">John Doe</option>
        <option value="Sarah Wilson">Sarah Wilson</option>
        <option value="Mike Johnson">Mike Johnson</option>
        <option value="Others">Others</option>
      </select>
    )}
  </div>
</div>

                    </div>

                    <div className="row">
<div className="col-md-4">
  <div className="mb-3">
    <label className="form-label">Industry</label>

    {formData.industry === "Others" ? (
      <input
        type="text"
        className="form-control"
        placeholder="Enter Industry"
        value={formData.customIndustry}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customIndustry: e.target.value
          }))
        }
      />
    ) : (
      <select
        className="form-select"
        name="industry"
        value={formData.industry}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Others") {
            setFormData((prev) => ({
              ...prev,
              industry: "Others"
            }));
          } else {
            handleInputChange(e);
          }
        }}
      >
        <option value="">Select Industry</option>
        <option value="Retail Industry">Retail Industry</option>
        <option value="Technology">Technology</option>
        <option value="Design">Design</option>
        <option value="Human Resources">Human Resources</option>
        <option value="Marketing">Marketing</option>
        <option value="Consulting">Consulting</option>
        <option value="Others">Others</option>
      </select>
    )}
  </div>
</div>
<div className="col-md-4">
  <div className="mb-3">
    <label className="form-label">Currency</label>

    {formData.currency === "Other" ? (
      // 🔹 Show Input when "Other" selected
      <input
        type="text"
        className="form-control"
        placeholder="Enter Currency (e.g. INR, JPY, CNY)"
        value={formData.customCurrency}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customCurrency: e.target.value
          }))
        }
      />
    ) : (
      // 🔹 Normal Dropdown
      <select
        className="form-select"
        value={formData.currency}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Other") {
            setFormData((prev) => ({
              ...prev,
              currency: "Other",
              customCurrency: ""
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              currency: value,
              customCurrency: ""
            }));
          }
        }}
      >
        <option value="Dollar">Dollar</option>
        <option value="Euro">Euro</option>
        <option value="Rupee">Rupee</option>
        <option value="Pound">Pound</option>
        <option value="Other">Other</option>
      </select>
    )}
  </div>
</div>

<div className="col-md-4">
  <div className="mb-3">
    <label className="form-label">Language</label>

    {formData.language === "Other" ? (
      <input
        type="text"
        className="form-control"
        placeholder="Enter Language"
        value={formData.customLanguage}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customLanguage: e.target.value,
          }))
        }
      />
    ) : (
      <select
        className="form-select"
        value={formData.language}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Other") {
            setFormData((prev) => ({
              ...prev,
              language: "Other",
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              language: value,
              customLanguage: "",
            }));
          }
        }}
      >
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Other">Other</option>
      </select>
    )}
  </div>
</div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Tags</label>
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            {formData.tags.map((tag, index) => (
                              <span key={index} className="badge bg-light text-dark">
                                {tag}
                                <button
                                  type="button"
                                  className="btn-close btn-close-sm ms-1"
                                  onClick={() => removeTag(tag)}
                                ></button>
                              </span>
                            ))}
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add new tag and press Enter"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addTag(e.target.value);
                                e.target.value = '';
                              }
                            }}
                          />
                        </div>
                      </div>
<div className="col-md-6">
  <div className="mb-3">
    <label className="form-label">Source</label>

    {formData.source === "Others" ? (
      <input
        type="text"
        className="form-control"
        placeholder="Enter Source"
        value={formData.customSource}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            customSource: e.target.value
          }))
        }
      />
    ) : (
      <select
        className="form-select"
        name="source"
        value={formData.source}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "Others") {
            setFormData((prev) => ({
              ...prev,
              source: "Others"
            }));
          } else {
            handleInputChange(e);
          }
        }}
      >
        <option value="">Select Source</option>
        <option value="Social Media">Social Media</option>
        <option value="Website">Website</option>
        <option value="Referral">Referral</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="Email Campaign">Email Campaign</option>
        <option value="Conference">Conference</option>
        <option value="GitHub">GitHub</option>
        <option value="Others">Others</option>
      </select>
    )}
  </div>
</div>
                    </div>
                    {/* <div className="modal-footer">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="create-job-btn">Save</button>
                    </div> */}
                  </form>
                )}

                {activeTab === 'address' && (
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Location</label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Street address"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="State/Province"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Country</label>
                          <input
                            type="text"
                            className="form-control"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Postal Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="Postal/ZIP code"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="modal-footer">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                      <button type="button" onClick={handleSave} className="create-job-btn">Save</button>
                    </div> */}
                  </div>
                )}


                {activeTab === 'social' && (
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Facebook</label>
                          <input
                            type="url"
                            className="form-control"
                            name="facebook"
                            value={formData.facebook}
                            onChange={handleInputChange}
                            placeholder="https://facebook.com/username"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Twitter</label>
                          <input
                            type="url"
                            className="form-control"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            placeholder="https://twitter.com/username"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">LinkedIn</label>
                          <input
                            type="url"
                            className="form-control"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Instagram</label>
                          <input
                            type="url"
                            className="form-control"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Skype</label>
                          <input
                            type="text"
                            className="form-control"
                            name="skype"
                            value={formData.skype}
                            onChange={handleInputChange}
                            placeholder="skype:username"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Website</label>
                          <input
                            type="url"
                            className="form-control"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            placeholder="https://website.com"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="modal-footer">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                      <button type="button" onClick={handleSave} className="create-job-btn">Save</button>
                    </div> */}
                  </div>
                )}




                {activeTab === 'access' && (
                  <div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Access Level</label>
                          <select
                            className="form-select"
                            name="accessLevel"
                            value={formData.accessLevel}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Access Level</option>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                            <option value="Restricted">Restricted</option>
                            <option value="Internal">Internal</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Department</label>
                          <input
                            type="text"
                            className="form-control"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            placeholder="Department"
                          />
                        </div>
                      </div>
                    </div>
<div className="row">
  <div className="col-md-12">
    <div className="mb-3">
      <h6 className="fs-14 fw-medium mb-3">Permissions</h6>

      {/* Allow Email Access */}
      <label
        className={`custom-checkbox ${formData.allowEmailAccess ? "checked" : ""}`}
      >
        <input
          type="checkbox"
          name="allowEmailAccess"
          checked={formData.allowEmailAccess}
          onChange={handleInputChange}
          hidden
        />
        <div className="checkbox-box">
          {formData.allowEmailAccess && (
            <span className="checkmark">✓</span>
          )}
        </div>
        <span className="checkbox-label">
          Allow Email Access
        </span>
      </label>

      {/* Allow Phone Access */}
      <label
        className={`custom-checkbox ${formData.allowPhoneAccess ? "checked" : ""}`}
      >
        <input
          type="checkbox"
          name="allowPhoneAccess"
          checked={formData.allowPhoneAccess}
          onChange={handleInputChange}
          hidden
        />
        <div className="checkbox-box">
          {formData.allowPhoneAccess && (
            <span className="checkmark">✓</span>
          )}
        </div>
        <span className="checkbox-label">
          Allow Phone Access
        </span>
      </label>

      {/* Allow Data Export */}
      <label
        className={`custom-checkbox ${formData.allowDataExport ? "checked" : ""}`}
      >
        <input
          type="checkbox"
          name="allowDataExport"
          checked={formData.allowDataExport}
          onChange={handleInputChange}
          hidden
        />
        <div className="checkbox-box">
          {formData.allowDataExport && (
            <span className="checkmark">✓</span>
          )}
        </div>
        <span className="checkbox-label">
          Allow Data Export
        </span>
      </label>

    </div>
  </div>
</div>
                    {/* <div className="modal-footer">
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                      <button type="button" onClick={handleSave} className="create-job-btn">Save</button>
                    </div> */}
                  </div>
                )}
              </div>
                  {/* FOOTER (Single Controlled Footer) */}
    <div className="modal-footer border-top">
      <button
        type="button"
        className="cancel-btn"
        onClick={handleCloseModal}
      >
        Cancel
      </button>

      {activeTab === "basic" ? (
                <button type="submit" form="basicForm" className="create-job-btn" onClick={handleSave}>
          Save
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSave}
          className="create-job-btn"
        >
          Save
        </button>
      )}
    </div>
          </div>
        </div>

        
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              {/*Header */}
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              {/*Body */}
              <div className="modal-body">
                <div className="text-center">
                  <i className="ti ti-alert-triangle text-warning fs-1 mb-3"></i>
                  <h5>Are you sure?</h5>
                  <p className="text-muted">
                    Do you want to delete the contact "{contactToDelete?.name}"? This action cannot be undone.
                  </p>
                </div>
              </div>
              {/*Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={confirmDelete}
                >
                  Delete Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};

export default Contacts;