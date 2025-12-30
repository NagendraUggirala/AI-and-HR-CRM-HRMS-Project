import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomFormBuilder = () => {
  // State for active tab (0 = Form Design, 1 = Configuration)
  const [activeTab, setActiveTab] = useState(0);

  // Form state
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("dynamicFormBuilder");
    return saved
      ? JSON.parse(saved)
      : {
          id: `form_${Date.now()}`,
          title: "New Form",
          description: "",
          category: "General",
          fields: [],
          sections: [],
          configuration: {
            availability: "all",
            departments: [],
            grades: [],
            submissionWindow: "always",
            startDate: "",
            endDate: "",
            submissionType: "single",
            submissionLimit: 1,
            anonymousSubmission: false,
            autoSave: true,
            confirmationMessage: "Thank you for your submission!",
            postActions: {
              email: false,
              notification: true,
              updateData: false,
            },
          },
          version: 1,
          history: [],
          status: "draft",
          created: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        };
  });

  // UI states
  const [selectedField, setSelectedField] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [importError, setImportError] = useState("");
  const [draggedField, setDraggedField] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // File input ref
  const fileInputRef = useRef(null);

  // Available field types with icons
  const fieldTypes = [
    { type: "text", label: "Text", icon: "bi-text-left", color: "#3B82F6" },
    { type: "number", label: "Number", icon: "bi-123", color: "#10B981" },
    { type: "email", label: "Email", icon: "bi-envelope", color: "#8B5CF6" },
    { type: "phone", label: "Phone", icon: "bi-telephone", color: "#F59E0B" },
    { type: "date", label: "Date", icon: "bi-calendar", color: "#EC4899" },
    {
      type: "dropdown",
      label: "Dropdown",
      icon: "bi-caret-down",
      color: "#6366F1",
    },
    {
      type: "multi-select",
      label: "Multi Select",
      icon: "bi-list-check",
      color: "#14B8A6",
    },
    { type: "radio", label: "Radio", icon: "bi-ui-radios", color: "#F97316" },
    {
      type: "checkbox",
      label: "Checkbox",
      icon: "bi-check-square",
      color: "#84CC16",
    },
    {
      type: "file",
      label: "File Upload",
      icon: "bi-cloud-upload",
      color: "#06B6D4",
    },
    { type: "signature", label: "Signature", icon: "bi-pen", color: "#8B5CF6" },
    {
      type: "rich-text",
      label: "Rich Text",
      icon: "bi-text-paragraph",
      color: "#EF4444",
    },
    { type: "rating", label: "Rating", icon: "bi-star", color: "#F59E0B" },
    { type: "section", label: "Section", icon: "bi-layers", color: "#6B7280" },
  ];

  // Available categories
  const categories = [
    { value: "General", label: "General" },
    { value: "HR", label: "HR" },
    { value: "Finance", label: "Finance" },
    { value: "IT", label: "IT" },
    { value: "Operations", label: "Operations" },
    { value: "Administrative", label: "Administrative" },
    { value: "Feedback", label: "Feedback" },
  ];

  // Departments
  const departments = [
    "HR",
    "IT",
    "Finance",
    "Sales",
    "Marketing",
    "Operations",
    "Customer Service",
    "R&D",
  ];

  // Grades
  const grades = [
    "Intern",
    "Executive",
    "Senior Executive",
    "Assistant Manager",
    "Manager",
    "Senior Manager",
    "Director",
    "Vice President",
    "President",
  ];

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem("dynamicFormBuilder", JSON.stringify(formData));
  }, [formData]);

  // Add form history entry
  const addHistoryEntry = (action) => {
    setFormData((prev) => ({
      ...prev,
      version: prev.version + 1,
      lastModified: new Date().toISOString(),
      history: [
        ...prev.history,
        {
          version: prev.version + 1,
          timestamp: new Date().toISOString(),
          action,
          changedBy: "System",
        },
      ],
    }));
  };

  // Update field
  const updateField = (fieldId, updates) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
    addHistoryEntry("Updated field properties");
  };

  // Delete field
  const deleteField = (fieldId) => {
    setFormData((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }));
    if (selectedField === fieldId) {
      setSelectedField(null);
    }
    addHistoryEntry("Deleted field");
  };

  // Duplicate field
  const duplicateField = (fieldId) => {
    const field = formData.fields.find((f) => f.id === fieldId);
    if (field) {
      const duplicated = {
        ...field,
        id: `field_${Date.now()}`,
        label: `${field.label} (Copy)`,
      };
      setFormData((prev) => ({
        ...prev,
        fields: [...prev.fields, duplicated],
      }));
      addHistoryEntry("Duplicated field");
    }
  };

  // Move field (for drag and drop reordering within current page)
  const moveField = (fieldId, newIndex) => {
    setFormData((prev) => {
      const currentPageFields = prev.fields.filter((f) => f.page === currentPage);
      const otherPageFields = prev.fields.filter((f) => f.page !== currentPage);
      
      const oldIndex = currentPageFields.findIndex((f) => f.id === fieldId);
      if (oldIndex === -1 || oldIndex === newIndex) return prev;

      const reorderedFields = [...currentPageFields];
      const [movedField] = reorderedFields.splice(oldIndex, 1);
      reorderedFields.splice(newIndex, 0, movedField);

      // Maintain original order: other page fields first, then current page fields
      // This preserves the overall structure while reordering within the page
      return {
        ...prev,
        fields: [...otherPageFields, ...reorderedFields],
      };
    });
    addHistoryEntry("Reordered fields");
  };

  // Handle drag start
  const handleDragStart = (e, fieldId) => {
    setDraggedField(fieldId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  // Handle drag over
  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  // Handle drop
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedField !== null) {
      moveField(draggedField, targetIndex);
    }
    setDraggedField(null);
    setDragOverIndex(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedField(null);
    setDragOverIndex(null);
  };

  // Add section
  const addSection = () => {
    const newSection = {
      id: `section_${Date.now()}`,
      title: `Section ${formData.sections.length + 1}`,
      description: "",
      page: currentPage,
    };
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    addHistoryEntry("Added new section");
  };

  // Add page
  const addPage = () => {
    const maxPage = Math.max(
      ...formData.fields.map((f) => f.page || 1),
      currentPage
    );
    setCurrentPage(maxPage + 1);
    addHistoryEntry("Added new page");
  };

  // Duplicate form
  const duplicateForm = () => {
    const duplicated = {
      ...formData,
      id: `form_${Date.now()}`,
      title: `${formData.title} (Copy)`,
      version: 1,
      history: [],
      status: "draft",
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    setFormData(duplicated);
    addHistoryEntry("Duplicated form");
  };

  // Save form
  const saveForm = () => {
    try {
      const updated = {
        ...formData,
        status: "published",
        lastModified: new Date().toISOString(),
        history: [
          ...formData.history,
          {
            version: formData.version + 1,
            timestamp: new Date().toISOString(),
            action: "Form Published",
          },
        ],
        version: formData.version + 1,
      };

      setFormData(updated);
      showSaveStatus("Form published successfully!", "success");
    } catch (error) {
      console.error("Publish Error:", error);
      showSaveStatus("Error publishing form!", "error");
    }
  };

  // Quick save as draft
  const quickSave = () => {
    try {
      const updated = {
        ...formData,
        status: "draft",
        lastModified: new Date().toISOString(),
        history: [
          ...formData.history,
          {
            version: formData.version + 1,
            timestamp: new Date().toISOString(),
            action: "Quick Save",
          },
        ],
        version: formData.version + 1,
      };

      setFormData(updated);
      showSaveStatus("Form saved as draft!", "success");
    } catch (error) {
      console.error("Save Error:", error);
      showSaveStatus("Error saving form!", "error");
    }
  };

  // Show save status
  const showSaveStatus = (message, type) => {
    setSaveStatus(message);
    setTimeout(() => setSaveStatus(""), 3000);
  };

  // Export form as JSON file
  const exportForm = () => {
    try {
      const dataStr = JSON.stringify(formData, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = `form_${
        formData.id
      }_${new Date().getTime()}.json`;

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      addHistoryEntry("Form exported");
      showSaveStatus("Form exported successfully!", "success");
    } catch (error) {
      console.error("Export Error:", error);
      showSaveStatus("Error exporting form!", "error");
    }
  };

  // =====================================
  // FIXED IMPORT FUNCTIONALITY
  // =====================================

  // Open file selector for import
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Import form from JSON file
  const importFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.name.endsWith(".json")) {
      setImportError("Please select a JSON file (.json)");
      setTimeout(() => setImportError(""), 5000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        // Enhanced validation
        if (!importedData.fields || !Array.isArray(importedData.fields)) {
          throw new Error("Invalid form format: Missing fields array");
        }

        if (!importedData.title || typeof importedData.title !== "string") {
          throw new Error("Invalid form format: Missing or invalid title");
        }

        // Add import timestamp and history
        const updatedData = {
          ...importedData,
          id: importedData.id || `form_${Date.now()}`,
          lastModified: new Date().toISOString(),
          history: [
            ...(importedData.history || []),
            {
              version: (importedData.version || 0) + 1,
              timestamp: new Date().toISOString(),
              action: "Form Imported from File",
            },
          ],
        };

        setFormData(updatedData);
        addHistoryEntry("Form imported from file");
        showSaveStatus("Form imported successfully!", "success");

        // Reset file input
        event.target.value = null;
      } catch (error) {
        console.error("Import Error:", error);
        setImportError(`Import failed: ${error.message}`);
        setTimeout(() => setImportError(""), 5000);
      }
    };

    reader.onerror = () => {
      setImportError("Error reading file");
      setTimeout(() => setImportError(""), 5000);
    };

    reader.readAsText(file);
  };

  // Import from JSON text in modal
  const importFromJson = () => {
    try {
      if (!importJson.trim()) {
        setImportError("Please enter JSON data");
        setTimeout(() => setImportError(""), 3000);
        return;
      }

      const importedData = JSON.parse(importJson);

      // Enhanced validation
      if (!importedData.fields || !Array.isArray(importedData.fields)) {
        throw new Error("Invalid form format: Missing fields array");
      }

      if (!importedData.title || typeof importedData.title !== "string") {
        throw new Error("Invalid form format: Missing or invalid title");
      }

      // Add import timestamp and history
      const updatedData = {
        ...importedData,
        id: importedData.id || `form_${Date.now()}`,
        lastModified: new Date().toISOString(),
        history: [
          ...(importedData.history || []),
          {
            version: (importedData.version || 0) + 1,
            timestamp: new Date().toISOString(),
            action: "Form Imported via JSON Text",
          },
        ],
      };

      setFormData(updatedData);
      setShowImportModal(false);
      setImportJson("");
      setImportError("");
      addHistoryEntry("Form imported via JSON");
      showSaveStatus("Form imported successfully!", "success");
    } catch (error) {
      console.error("Import Error:", error);
      setImportError(`Import failed: ${error.message}`);
    }
  };

  // Backup to server (simulated)
  const backupToServer = () => {
    try {
      // Simulate server backup
      console.log("Backing up form to server:", formData);
      showSaveStatus("Form backed up to server!", "success");
      addHistoryEntry("Form backed up to server");
    } catch (error) {
      console.error("Backup Error:", error);
      showSaveStatus("Error backing up form!", "error");
    }
  };

  // Clear localStorage (keep current form in state)
  const clearLocalStorage = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all saved forms? Current form will remain open."
      )
    ) {
      localStorage.removeItem("dynamicFormBuilder");
      showSaveStatus("LocalStorage cleared!", "success");
    }
  };

  // Reset form builder
  const resetFormBuilder = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form builder? All unsaved changes will be lost."
      )
    ) {
      localStorage.removeItem("dynamicFormBuilder");
      setFormData({
        id: `form_${Date.now()}`,
        title: "New Form",
        description: "",
        category: "General",
        fields: [],
        sections: [],
        configuration: {
          availability: "all",
          departments: [],
          grades: [],
          submissionWindow: "always",
          startDate: "",
          endDate: "",
          submissionType: "single",
          submissionLimit: 1,
          anonymousSubmission: false,
          autoSave: true,
          confirmationMessage: "Thank you for your submission!",
          postActions: {
            email: false,
            notification: true,
            updateData: false,
          },
        },
        version: 1,
        history: [],
        status: "draft",
        created: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      });
      setSelectedField(null);
      setCurrentPage(1);
      showSaveStatus("Form builder reset!", "success");
    }
  };

  // Preview field renderer
  const renderPreviewField = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "phone":
      case "number":
        return (
          <input
            type={field.type === "number" ? "number" : "text"}
            className="form-control"
            placeholder={field.placeholder}
          />
        );
      case "date":
        return <input type="date" className="form-control" />;
      case "dropdown":
        return (
          <select className="form-select">
            <option value="">Select an option</option>
            {field.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "multi-select":
        return (
          <div className="d-flex flex-column gap-2">
            {field.options.map((option, idx) => (
              <div key={idx} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`multi_${field.id}_${idx}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`multi_${field.id}_${idx}`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      case "radio":
        return (
          <div className="d-flex flex-column gap-2">
            {field.options.map((option, idx) => (
              <div key={idx} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`radio_${field.id}`}
                  id={`radio_${field.id}_${idx}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`radio_${field.id}_${idx}`}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`checkbox_${field.id}`}
            />
            <label
              className="form-check-label"
              htmlFor={`checkbox_${field.id}`}
            >
              {field.label}
            </label>
          </div>
        );
      case "file":
        return (
          <div className="border-2 border-dashed rounded p-5 text-center cursor-pointer border-gray-300">
            <i className="bi-cloud-arrow-up fs-2 text-gray-500"></i>
            <p className="mt-2 mb-0 text-gray-600">Click to upload files</p>
          </div>
        );
      case "signature":
        return (
          <div className="border-2 border-dashed rounded p-5 text-center cursor-pointer border-gray-300">
            <i className="bi-pen fs-2 text-gray-500"></i>
            <p className="mt-2 mb-0 text-gray-600">Click to sign</p>
          </div>
        );
      case "rich-text":
        return (
          <textarea
            className="form-control"
            placeholder={field.placeholder}
            rows={4}
          />
        );
      case "rating":
        return (
          <div className="d-flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" className="btn btn-link p-1">
                <i className="bi-star-fill text-warning fs-4"></i>
              </button>
            ))}
          </div>
        );
      case "section":
        return (
          <div className="border-bottom border-primary pb-3 mb-4">
            <h3 className="h5 fw-semibold mb-1">{field.label}</h3>
            {field.helpText && (
              <p className="text-muted mb-0">{field.helpText}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // FIELD PROPERTIES PANEL
  const renderFieldProperties = () => {
    const field = formData.fields.find((f) => f.id === selectedField);
    if (!field) return null;

    return (
      <div className="d-flex flex-column gap-3">
        {/* LABEL */}
        <div>
          <label className="form-label small fw-medium">Label</label>
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField(field.id, { label: e.target.value })}
            className="form-control form-control-sm"
          />
        </div>

        {/* PLACEHOLDER */}
        {field.type !== "checkbox" && field.type !== "radio" && (
          <div>
            <label className="form-label small fw-medium">Placeholder</label>
            <input
              type="text"
              value={field.placeholder}
              onChange={(e) =>
                updateField(field.id, { placeholder: e.target.value })
              }
              className="form-control form-control-sm"
            />
          </div>
        )}

        {/* HELP TEXT */}
        <div>
          <label className="form-label small fw-medium">Help Text</label>
          <textarea
            value={field.helpText}
            onChange={(e) =>
              updateField(field.id, { helpText: e.target.value })
            }
            className="form-control form-control-sm"
            rows={2}
          />
        </div>

        {/* REQUIRED TOGGLE */}
        <div className="border rounded p-2">
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              checked={field.required}
              onChange={(e) =>
                updateField(field.id, { required: e.target.checked })
              }
            />
            <label className="form-check-label small">Required Field</label>
          </div>
        </div>

        {/* VALIDATION RULES */}
        <div className="border rounded p-2">
          <label className="form-label small fw-medium mb-2">Validation Rules</label>
          
          {/* Character Limit */}
          <div className="mb-2">
            <label className="form-label x-small text-muted">Max Length</label>
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Max characters"
              value={field.validation?.maxLength || ""}
              onChange={(e) =>
                updateField(field.id, {
                  validation: {
                    ...field.validation,
                    maxLength: e.target.value ? parseInt(e.target.value) : null,
                  },
                })
              }
            />
          </div>

          {/* Min Length */}
          {(field.type === "text" || field.type === "email" || field.type === "phone") && (
            <div className="mb-2">
              <label className="form-label x-small text-muted">Min Length</label>
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Min characters"
                value={field.validation?.minLength || ""}
                onChange={(e) =>
                  updateField(field.id, {
                    validation: {
                      ...field.validation,
                      minLength: e.target.value ? parseInt(e.target.value) : null,
                    },
                  })
                }
              />
            </div>
          )}

          {/* Pattern/Regex for text fields */}
          {(field.type === "text" || field.type === "email" || field.type === "phone") && (
            <div className="mb-2">
              <label className="form-label x-small text-muted">Pattern (Regex)</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="e.g., [A-Za-z0-9]+"
                value={field.validation?.pattern || ""}
                onChange={(e) =>
                  updateField(field.id, {
                    validation: {
                      ...field.validation,
                      pattern: e.target.value || "",
                    },
                  })
                }
              />
              <small className="text-muted x-small">Optional: Enter regex pattern for validation</small>
            </div>
          )}

          {/* Min/Max for number fields */}
          {field.type === "number" && (
            <div className="row g-2 mb-2">
              <div className="col-6">
                <label className="form-label x-small text-muted">Min Value</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Min"
                  value={field.validation?.min || ""}
                  onChange={(e) =>
                    updateField(field.id, {
                      validation: {
                        ...field.validation,
                        min: e.target.value ? parseFloat(e.target.value) : null,
                      },
                    })
                  }
                />
              </div>
              <div className="col-6">
                <label className="form-label x-small text-muted">Max Value</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Max"
                  value={field.validation?.max || ""}
                  onChange={(e) =>
                    updateField(field.id, {
                      validation: {
                        ...field.validation,
                        max: e.target.value ? parseFloat(e.target.value) : null,
                      },
                    })
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* OPTIONS PANEL FOR DROPDOWN/RADIO/MULTI-SELECT */}
        {["dropdown", "radio", "multi-select"].includes(field.type) && (
          <div>
            <label className="form-label small fw-medium">Options</label>

            {field.options.map((opt, idx) => (
              <div key={idx} className="input-group input-group-sm mb-1">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const updated = [...field.options];
                    updated[idx] = e.target.value;
                    updateField(field.id, { options: updated });
                  }}
                  className="form-control"
                />

                <button
                  className="btn btn-danger"
                  onClick={() => {
                    const updated = field.options.filter((_, i) => i !== idx);
                    updateField(field.id, { options: updated });
                  }}
                >
                  <i className="bi-trash"></i>
                </button>
              </div>
            ))}

            <button
              className="btn btn-outline-primary btn-sm mt-1"
              onClick={() =>
                updateField(field.id, {
                  options: [...field.options, "New Option"],
                })
              }
            >
              <i className="bi-plus"></i> Add Option
            </button>
          </div>
        )}

        {/* CONDITIONAL LOGIC */}
        <div>
          <div className="d-flex justify-content-between mb-2">
            <div>
              <div className="fw-medium small">Conditional Field</div>
              <div className="text-muted x-small">
                Show/hide based on other field
              </div>
            </div>

            <button
              className={`btn btn-sm ${
                field.conditional ? "btn-outline-danger" : "btn-outline-primary"
              }`}
              onClick={() =>
                updateField(field.id, {
                  conditional: field.conditional
                    ? null
                    : { dependsOn: "", condition: "equals", value: "" },
                })
              }
            >
              {field.conditional ? "Remove" : "Add"}
            </button>
          </div>

          {field.conditional && (
            <div className="bg-light border rounded p-2">
              {/* Depends on which field? */}
              <select
                className="form-select form-select-sm mb-2"
                value={field.conditional.dependsOn}
                onChange={(e) =>
                  updateField(field.id, {
                    conditional: {
                      ...field.conditional,
                      dependsOn: e.target.value,
                    },
                  })
                }
              >
                <option value="">Select field</option>
                {formData.fields
                  .filter((f) => f.id !== field.id)
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
              </select>

              {/* Condition */}
              <select
                className="form-select form-select-sm mb-2"
                value={field.conditional.condition}
                onChange={(e) =>
                  updateField(field.id, {
                    conditional: {
                      ...field.conditional,
                      condition: e.target.value,
                    },
                  })
                }
              >
                <option value="equals">Equals</option>
                <option value="not-equals">Not equals</option>
                <option value="contains">Contains</option>
                <option value="greater-than">Greater than</option>
                <option value="less-than">Less than</option>
              </select>

              {/* Value */}
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Value"
                value={field.conditional.value}
                onChange={(e) =>
                  updateField(field.id, {
                    conditional: {
                      ...field.conditional,
                      value: e.target.value,
                    },
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  // SECTION PROPERTIES PANEL
  const renderSectionProperties = () => {
    const section = formData.sections.find((s) => s.id === selectedField);
    if (!section) return null;

    return (
      <div className="d-flex flex-column gap-3">
        {/* TITLE */}
        <div>
          <label className="form-label small fw-medium">Section Title</label>
          <input
            type="text"
            value={section.title}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                sections: prev.sections.map((s) =>
                  s.id === section.id ? { ...s, title: e.target.value } : s
                ),
              }))
            }
            className="form-control form-control-sm"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="form-label small fw-medium">Description</label>
          <textarea
            value={section.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                sections: prev.sections.map((s) =>
                  s.id === section.id
                    ? { ...s, description: e.target.value }
                    : s
                ),
              }))
            }
            className="form-control form-control-sm"
            rows="2"
          />
        </div>
      </div>
    );
  };

  const addFieldFromClick = (fieldType) => {
    const newField = {
      id: `field_${Date.now()}`,
      type: fieldType.type,
      label: fieldType.label,
      placeholder: fieldType.placeholder || `Enter ${fieldType.label}`,
      helpText: "",
      required: false,
      validation: {
        pattern: "",
        minLength: null,
        maxLength: null,
        min: null,
        max: null,
      },
      conditional: null,
      options: ["Option 1", "Option 2", "Option 3"],
      defaultValue: "",
      page: currentPage,
      section: null,
      prePopulate: fieldType.prePopulate || false,
      prePopulateType: fieldType.prePopulateType || null,
    };

    setFormData((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }));

    setSelectedField(newField.id);
    addHistoryEntry(`Added ${fieldType.label} field`);
  };

  // Get current page fields
  const currentPageFields = formData.fields.filter(
    (f) => f.page === currentPage
  );
  const totalPages = Math.max(
    ...formData.fields.map((f) => f.page || 1),
    currentPage
  );

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-white border-bottom">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-3">
            <div className="mb-4">
               <h2 className="fw-bold h4 h2-md">Custom Form Builder</h2>
              <p className="text-muted mb-0">
                Click to add fields - Auto-saves to LocalStorage
              </p>
            </div>

            {/* Save Status Indicator */}
            {saveStatus && (
              <div className="alert alert-success py-2 mb-0">
                <i className="bi-check-circle me-2"></i>
                {saveStatus}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Title/Preview button - always visible */}
            <button
              onClick={() => setShowPreview(true)}
              className="btn btn-light d-flex align-items-center gap-2"
            >
              <i className="bi-eye"></i>
              <span className="d-none d-sm-inline">Preview</span>
            </button>

            {/* All actions in dropdown on mobile, buttons on desktop */}
            <div className="d-flex gap-2">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={importFromFile}
                className="d-none"
              />

              {/* Mobile Dropdown (hamburger menu) */}
              <div className="dropdown d-lg-none">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="actionsDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi-three-dots-vertical"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="actionsDropdown"
                >
                  <li>
                    <button onClick={quickSave} className="dropdown-item">
                      <i className="bi-save me-2"></i>
                      Quick Save
                    </button>
                  </li>
                  <li>
                    <button onClick={duplicateForm} className="dropdown-item">
                      <i className="bi-copy me-2"></i>
                      Duplicate Form
                    </button>
                  </li>
                  <li>
                    <button onClick={saveForm} className="dropdown-item">
                      <i className="bi-cloud-arrow-up me-2"></i>
                      Publish Form
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={handleImportClick}
                      className="dropdown-item"
                    >
                      <i className="bi-upload me-2"></i>
                      Import File
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowImportModal(true)}
                      className="dropdown-item"
                    >
                      <i className="bi-code me-2"></i>
                      Import JSON
                    </button>
                  </li>
                  <li>
                    <button onClick={exportForm} className="dropdown-item">
                      <i className="bi-download me-2"></i>
                      Export Form
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={resetFormBuilder}
                      className="dropdown-item text-danger"
                    >
                      <i className="bi-trash me-2"></i>
                      Reset Builder
                    </button>
                  </li>
                </ul>
              </div>

              {/* Desktop: All buttons visible */}
              <div className="d-none d-lg-flex gap-2">
                <button
                  onClick={quickSave}
                  className="btn btn-info d-flex align-items-center gap-2"
                >
                  <i className="bi-save"></i>
                  <span>Save</span>
                </button>
                <button
                  onClick={duplicateForm}
                  className="btn btn-light d-flex align-items-center gap-2"
                >
                  <i className="bi-copy"></i>
                  <span>Duplicate</span>
                </button>
                <button
                  onClick={saveForm}
                  className="btn btn-primary d-flex align-items-center gap-2"
                >
                  <i className="bi-cloud-arrow-up"></i>
                  <span>Publish</span>
                </button>

                <div className="dropdown">
                  <button
                    className="btn btn-warning dropdown-toggle d-flex align-items-center gap-2"
                    type="button"
                    id="desktopImportDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi-upload"></i>
                    <span>Import</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="desktopImportDropdown"
                  >
                    <li>
                      <button
                        onClick={handleImportClick}
                        className="dropdown-item"
                      >
                        <i className="bi-file-earmark me-2"></i>
                        Import File
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowImportModal(true)}
                        className="dropdown-item"
                      >
                        <i className="bi-code me-2"></i>
                        Import JSON
                      </button>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={exportForm}
                  className="btn btn-success d-flex align-items-center gap-2"
                >
                  <i className="bi-download"></i>
                  <span>Export</span>
                </button>
                <button
                  onClick={resetFormBuilder}
                  className="btn btn-danger d-flex align-items-center gap-2"
                >
                  <i className="bi-trash"></i>
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Error Message Display */}
          {importError && (
            <div className="alert alert-danger alert-dismissible fade show mb-3">
              <i className="bi-exclamation-triangle me-2"></i>
              {importError}
              <button
                type="button"
                className="btn-close"
                onClick={() => setImportError("")}
              ></button>
            </div>
          )}

          {/* Status Bar */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="badge bg-secondary me-2">
                <i className="bi-clock me-1"></i>
                Last Modified:{" "}
                {new Date(formData.lastModified).toLocaleTimeString()}
              </span>
              <span className="badge bg-info me-2">
                <i className="bi-list-ol me-1"></i>
                Version: {formData.version}
              </span>
              <span
                className={`badge ${
                  formData.status === "published" ? "bg-success" : "bg-warning"
                }`}
              >
                <i className="bi-circle-fill me-1"></i>
                Status: {formData.status}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="d-inline-flex bg-light rounded-3 p-1 mb-3 flex-wrap">
            <button
              onClick={() => setActiveTab(0)}
              className={`btn py-2 px-3 px-md-4 ${
                activeTab === 0
                  ? "btn-primary text-white shadow-sm"
                  : "btn-white text-dark border-0"
              } me-1 mb-1`}
            >
              <i className="bi-pencil me-1 me-md-2"></i>
              <span className="d-none d-md-inline">Form Design Interface</span>
              <span className="d-md-none">Design</span>
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`btn py-2 px-3 px-md-4 ${
                activeTab === 1
                  ? "btn-primary text-white shadow-sm"
                  : "btn-white text-dark border-0"
              } mb-1`}
            >
              <i className="bi-gear me-1 me-md-2"></i>
              <span className="d-none d-md-inline">Form Configuration</span>
              <span className="d-md-none">Config</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-4">
        {activeTab === 0 ? (
          // FORM DESIGN INTERFACE TAB
          <div className="row g-3">
            {/* LEFT PANEL — FIELD TYPES */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="h6 fw-semibold mb-3">Field Types</h3>
                  <p className="text-muted small mb-3">
                    Click a field to add it
                  </p>

                  {/* Default Field Types */}
                  <div className="row g-2">
                    {fieldTypes.map((field) => (
                      <div key={field.type} className="col-6">
                        <div
                          onClick={() => addFieldFromClick(field)}
                          className="border rounded p-3 text-center cursor-pointer"
                          style={{ transition: "all 0.2s" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = field.color;
                            e.currentTarget.style.boxShadow =
                              "0 4px 6px -1px rgba(0,0,0,0.1)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "";
                            e.currentTarget.style.boxShadow = "";
                            e.currentTarget.style.transform = "";
                          }}
                          title={`Add ${field.label} field`}
                        >
                          <i
                            className={`bi ${field.icon} fs-4`}
                            style={{ color: field.color }}
                          ></i>
                          <div className="small fw-medium mt-2">
                            {field.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PRE-POPULATED EMPLOYEE MASTER */}
                  <div className="mt-4 pt-3 border-top">
                    <h4 className="h6 fw-semibold mb-2">
                      Pre-populate from Employee Master
                    </h4>
                    <div className="bg-light rounded p-2 mb-2 small text-muted">
                      Click to add auto-filled fields
                    </div>

                    <div className="row g-2">
                      {[
                        {
                          type: "employee_name",
                          label: "Employee Name",
                          icon: "bi-person",
                          color: "#3B82F6",
                        },
                        {
                          type: "employee_email",
                          label: "Email Address",
                          icon: "bi-envelope",
                          color: "#8B5CF6",
                        },
                        {
                          type: "employee_department",
                          label: "Department",
                          icon: "bi-building",
                          color: "#10B981",
                        },
                        {
                          type: "employee_grade",
                          label: "Grade/Position",
                          icon: "bi-award",
                          color: "#F59E0B",
                        },
                      ].map((item) => (
                        <div key={item.type} className="col-6">
                          <div
                            onClick={() =>
                              addFieldFromClick({
                                type: "text",
                                label: item.label,
                                icon: item.icon,
                                color: item.color,
                                prePopulate: true,
                                prePopulateType: item.type,
                              })
                            }
                            className="border rounded p-2 text-center cursor-pointer bg-info-subtle"
                            style={{ transition: "all 0.2s" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = item.color;
                              e.currentTarget.style.boxShadow =
                                "0 4px 6px -1px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "";
                              e.currentTarget.style.boxShadow = "";
                            }}
                          >
                            <i
                              className={`bi ${item.icon} fs-5`}
                              style={{ color: item.color }}
                            ></i>
                            <div className="small fw-medium mt-1">
                              {item.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER PANEL — FORM CANVAS */}
            <div className="col-lg-6">
              <div className="card" style={{ minHeight: "600px" }}>
                <div className="card-body">
                  {/* HEADER */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Form Title"
                      className="form-control-plaintext fs-3 fw-semibold border-0 p-0 mb-2"
                    />

                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Form Description (optional)"
                      className="form-control-plaintext text-muted border-0 p-0 resize-none"
                      rows="2"
                    />
                    
                    {/* Drag and Drop Hint */}
                    <div className="alert alert-info py-2 px-3 mt-2 mb-0 small">
                      <i className="bi-info-circle me-2"></i>
                      <strong>Tip:</strong> Drag fields by the grip icon (<i className="bi-grip-vertical"></i>) to reorder them
                    </div>
                  </div>

                  {/* MULTI-PAGE PROGRESS */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <span className="text-muted small">Page</span>
                        <span className="fw-semibold ms-2">
                          {currentPage} of {totalPages}
                        </span>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          onClick={addSection}
                          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
                        >
                          <i className="bi-layers"></i> Add Section
                        </button>

                        <button
                          onClick={addPage}
                          className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                        >
                          <i className="bi-plus"></i> Add Page
                        </button>
                      </div>
                    </div>

                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${
                            totalPages > 1
                              ? (currentPage / totalPages) * 100
                              : 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* SECTIONS */}
                  {formData.sections
                    .filter((s) => s.page === currentPage)
                    .map((section) => (
                      <div
                        key={section.id}
                        className="card border-primary mb-3 cursor-pointer"
                        onClick={() => setSelectedField(section.id)}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="mb-1">{section.title}</h5>
                              {section.description && (
                                <p className="text-muted small mb-0">
                                  {section.description}
                                </p>
                              )}
                            </div>
                            <span className="badge bg-primary">Section</span>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* FIELD LIST */}
                  {currentPageFields.length === 0 ? (
                    <div 
                      className="text-center border-2 border-dashed p-5 bg-light"
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDragEnd();
                      }}
                    >
                      <i className="bi-arrow-down fs-1 text-muted mb-3 d-block"></i>
                      <p className="fw-medium mb-2">Click a field to add it</p>
                      <p className="text-muted small">
                        Use the left panel to add form fields or drag fields to reorder
                      </p>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {currentPageFields.map((field, index) => (
                        <div
                          key={field.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, field.id)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDrop={(e) => handleDrop(e, index)}
                          onDragEnd={handleDragEnd}
                          onClick={() => setSelectedField(field.id)}
                          className={`card cursor-pointer position-relative ${
                            selectedField === field.id
                              ? "border-primary bg-primary-subtle"
                              : ""
                          } ${
                            draggedField === field.id ? "opacity-50" : ""
                          } ${
                            dragOverIndex === index && draggedField !== field.id
                              ? "border-warning border-2"
                              : ""
                          }`}
                          style={{
                            cursor: draggedField === field.id ? "grabbing" : "grab",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {/* DRAG HANDLE */}
                          <div
                            className="position-absolute"
                            style={{
                              left: "8px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "grab",
                              zIndex: 10,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <i className="bi-grip-vertical text-muted fs-5"></i>
                          </div>

                          <div className="card-body" style={{ paddingLeft: "40px" }}>
                            {/* TOP ROW */}
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <div className="d-flex align-items-center gap-2">
                                <i
                                  className={`bi ${
                                    fieldTypes.find(
                                      (ft) => ft.type === field.type
                                    )?.icon
                                  }`}
                                  style={{
                                    color: fieldTypes.find(
                                      (ft) => ft.type === field.type
                                    )?.color,
                                  }}
                                ></i>

                                <span className="fw-semibold">
                                  {field.label}
                                </span>

                                {field.required && (
                                  <span className="badge bg-danger-subtle text-danger">
                                    Required
                                  </span>
                                )}

                                {field.prePopulate && (
                                  <span className="badge bg-info-subtle text-info">
                                    Auto-filled
                                  </span>
                                )}
                              </div>

                              {/* ACTION BUTTONS */}
                              <div className="d-flex gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    duplicateField(field.id);
                                  }}
                                  className="btn btn-sm btn-outline-secondary"
                                  title="Duplicate"
                                >
                                  <i className="bi-copy"></i>
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteField(field.id);
                                  }}
                                  className="btn btn-sm btn-outline-danger"
                                  title="Delete"
                                >
                                  <i className="bi-trash"></i>
                                </button>
                              </div>
                            </div>

                            {/* PLACEHOLDER + CHARACTER LIMIT */}
                            <div className="text-muted small mb-2">
                              {field.placeholder}

                              {field.validation?.maxLength && (
                                <span className="ms-2 text-info">
                                  <i className="bi-text-left me-1"></i>
                                  Max {field.validation.maxLength} chars
                                </span>
                              )}
                            </div>

                            {/* HELP TEXT */}
                            {field.helpText && (
                              <div className="alert alert-light small mb-0">
                                <i className="bi-info-circle me-2"></i>
                                {field.helpText}
                              </div>
                            )}

                            {/* CONDITIONAL BADGE */}
                            {field.conditional && (
                              <div className="mt-2 badge bg-purple-subtle text-purple">
                                <i className="bi-shield-check me-1"></i>
                                Conditional field
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — FIELD / SECTION PROPERTIES */}
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h3 className="h6 fw-semibold mb-3">
                    {selectedField
                      ? formData.fields.find((f) => f.id === selectedField)
                        ? "Field Properties"
                        : "Section Properties"
                      : "No Field Selected"}
                  </h3>

                  {selectedField ? (
                    formData.fields.find((f) => f.id === selectedField) ? (
                      renderFieldProperties()
                    ) : (
                      renderSectionProperties()
                    )
                  ) : (
                    <div className="text-center py-4 text-muted">
                      <i className="bi-cursor fs-2 d-block mb-2"></i>
                      <p className="small mb-0">
                        Select an item to edit its properties
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* VERSION HISTORY */}
              <div className="card mt-3">
                <div className="card-body">
                  <h4 className="h6 fw-semibold mb-3">Version History</h4>

                  <div
                    className="list-group list-group-flush"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {formData.history.length > 0 ? (
                      formData.history
                        .slice()
                        .reverse()
                        .map((entry, idx) => (
                          <div
                            key={idx}
                            className="list-group-item px-0 py-2 border-0"
                          >
                            <div className="d-flex justify-content-between">
                              <div>
                                <div className="fw-medium small">
                                  {entry.action}
                                </div>
                                <div className="text-muted x-small">
                                  Version {entry.version} • {entry.changedBy}
                                </div>
                              </div>
                              <span className="text-muted x-small">
                                {new Date(entry.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center text-muted small py-2">
                        No version history available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // FORM CONFIGURATION TAB - (Same as before, but with improved import button)
          <div className="row g-3">
            {/* LEFT COLUMN - BASIC CONFIGURATION */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="h5 fw-semibold mb-3">Form Configuration</h2>

                  <div className="d-flex flex-column gap-3">
                    {/* Form Title */}
                    <div>
                      <label className="form-label small fw-medium">
                        Form Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Enter form title"
                      />
                    </div>

                    {/* Form Description */}
                    <div>
                      <label className="form-label small fw-medium">
                        Form Description
                      </label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Short description of form"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="form-label small fw-medium">
                        Form Category
                      </label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="form-label small fw-medium">
                        Availability
                      </label>
                      <select
                        className="form-select"
                        value={formData.configuration.availability}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            configuration: {
                              ...prev.configuration,
                              availability: e.target.value,
                            },
                          }))
                        }
                      >
                        <option value="all">All Employees</option>
                        <option value="departments">
                          Specific Departments
                        </option>
                        <option value="grades">Specific Grades</option>
                      </select>

                      {/* Departments */}
                      {formData.configuration.availability ===
                        "departments" && (
                        <div className="mt-2 d-flex flex-wrap gap-2">
                          {departments.map((dept) => (
                            <label key={dept} className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={formData.configuration.departments.includes(
                                  dept
                                )}
                                onChange={(e) => {
                                  const newList = e.target.checked
                                    ? [
                                        ...formData.configuration.departments,
                                        dept,
                                      ]
                                    : formData.configuration.departments.filter(
                                        (d) => d !== dept
                                      );

                                  setFormData((prev) => ({
                                    ...prev,
                                    configuration: {
                                      ...prev.configuration,
                                      departments: newList,
                                    },
                                  }));
                                }}
                              />
                              <span className="form-check-label small">
                                {dept}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {/* Grades */}
                      {formData.configuration.availability === "grades" && (
                        <div className="mt-2 d-flex flex-wrap gap-2">
                          {grades.map((grade) => (
                            <label key={grade} className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={formData.configuration.grades.includes(
                                  grade
                                )}
                                onChange={(e) => {
                                  const newList = e.target.checked
                                    ? [...formData.configuration.grades, grade]
                                    : formData.configuration.grades.filter(
                                        (g) => g !== grade
                                      );

                                  setFormData((prev) => ({
                                    ...prev,
                                    configuration: {
                                      ...prev.configuration,
                                      grades: newList,
                                    },
                                  }));
                                }}
                              />
                              <span className="form-check-label small">
                                {grade}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submission Window */}
                    <div>
                      <label className="form-label small fw-medium">
                        Submission Window
                      </label>
                      <select
                        className="form-select"
                        value={formData.configuration.submissionWindow}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            configuration: {
                              ...prev.configuration,
                              submissionWindow: e.target.value,
                            },
                          }))
                        }
                      >
                        <option value="always">Always Available</option>
                        <option value="daterange">Date Range</option>
                      </select>

                      {formData.configuration.submissionWindow ===
                        "daterange" && (
                        <div className="row g-2 mt-2">
                          <div className="col">
                            <input
                              type="date"
                              className="form-control"
                              value={formData.configuration.startDate}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  configuration: {
                                    ...prev.configuration,
                                    startDate: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                          <div className="col">
                            <input
                              type="date"
                              className="form-control"
                              value={formData.configuration.endDate}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  configuration: {
                                    ...prev.configuration,
                                    endDate: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Submission Type */}
                    <div>
                      <label className="form-label small fw-medium">
                        Submission Type
                      </label>
                      <div className="d-flex gap-3">
                        {/* Single */}
                        <label className="form-check">
                          <input
                            type="radio"
                            name="submissionType"
                            className="form-check-input"
                            checked={
                              formData.configuration.submissionType === "single"
                            }
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                configuration: {
                                  ...prev.configuration,
                                  submissionType: "single",
                                },
                              }))
                            }
                          />
                          <span className="form-check-label">
                            Single Submission
                          </span>
                        </label>

                        {/* Multiple */}
                        <label className="form-check">
                          <input
                            type="radio"
                            name="submissionType"
                            className="form-check-input"
                            checked={
                              formData.configuration.submissionType ===
                              "multiple"
                            }
                            onChange={() =>
                              setFormData((prev) => ({
                                ...prev,
                                configuration: {
                                  ...prev.configuration,
                                  submissionType: "multiple",
                                },
                              }))
                            }
                          />
                          <span className="form-check-label">
                            Multiple Submissions
                          </span>
                        </label>
                      </div>

                      {/* Submission Limit */}
                      {formData.configuration.submissionType === "multiple" && (
                        <div className="mt-2">
                          <label className="form-label small">
                            Submission Limit
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            min="1"
                            value={formData.configuration.submissionLimit}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                configuration: {
                                  ...prev.configuration,
                                  submissionLimit:
                                    parseInt(e.target.value) || 1,
                                },
                              }))
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - ADVANCED SETTINGS */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="h5 fw-semibold mb-3">Advanced Settings</h2>

                  <div className="d-flex flex-column gap-3">
                    {/* Anonymous Submission */}
                    <div className="border rounded p-3">
                      <label className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={formData.configuration.anonymousSubmission}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              configuration: {
                                ...prev.configuration,
                                anonymousSubmission: e.target.checked,
                              },
                            }))
                          }
                        />
                        <span className="form-check-label fw-medium small">
                          Anonymous Submission
                        </span>
                        <div className="text-muted x-small">
                          Allow users to submit without revealing identity
                        </div>
                      </label>
                    </div>

                    {/* Auto-save Draft */}
                    <div className="border rounded p-3">
                      <label className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={formData.configuration.autoSave}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              configuration: {
                                ...prev.configuration,
                                autoSave: e.target.checked,
                              },
                            }))
                          }
                        />
                        <span className="form-check-label fw-medium small">
                          Auto-save Draft
                        </span>
                        <div className="text-muted x-small">
                          Automatically save user's draft progress
                        </div>
                      </label>
                    </div>

                    {/* Confirmation Message */}
                    <div>
                      <label className="form-label small fw-medium">
                        Confirmation Message
                      </label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={formData.configuration.confirmationMessage}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            configuration: {
                              ...prev.configuration,
                              confirmationMessage: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>

                    {/* Post Submission Actions */}
                    <div>
                      <label className="form-label small fw-medium">
                        Post-submission Actions
                      </label>

                      <label className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={formData.configuration.postActions.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              configuration: {
                                ...prev.configuration,
                                postActions: {
                                  ...prev.configuration.postActions,
                                  email: e.target.checked,
                                },
                              },
                            }))
                          }
                        />
                        <span className="form-check-label small">
                          Send Email Notification
                        </span>
                      </label>

                      <label className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={
                            formData.configuration.postActions.notification
                          }
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              configuration: {
                                ...prev.configuration,
                                postActions: {
                                  ...prev.configuration.postActions,
                                  notification: e.target.checked,
                                },
                              },
                            }))
                          }
                        />
                        <span className="form-check-label small">
                          Send In-app Notification
                        </span>
                      </label>

                      <label className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={
                            formData.configuration.postActions.updateData
                          }
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              configuration: {
                                ...prev.configuration,
                                postActions: {
                                  ...prev.configuration.postActions,
                                  updateData: e.target.checked,
                                },
                              },
                            }))
                          }
                        />
                        <span className="form-check-label small">
                          Update Employee Data
                        </span>
                      </label>
                    </div>

                    {/* Data Management Section */}
                    <div className="border-top pt-3 mt-3">
                      <label className="form-label small fw-medium">
                        Data Management
                      </label>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex gap-2">
                          <button
                            onClick={exportForm}
                            className="btn btn-success btn-sm flex-fill d-flex align-items-center justify-content-center gap-2"
                          >
                            <i className="bi-download"></i>
                            Export Form
                          </button>

                          {/* File Import Button */}
                          <button
                            onClick={handleImportClick}
                            className="btn btn-warning btn-sm flex-fill d-flex align-items-center justify-content-center gap-2"
                          >
                            <i className="bi-upload"></i>
                            Import File
                          </button>
                        </div>

                        {/* JSON Text Import Button */}
                        <button
                          onClick={() => setShowImportModal(true)}
                          className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-2"
                        >
                          <i className="bi-code"></i>
                          Import JSON Text
                        </button>

                        <button
                          onClick={clearLocalStorage}
                          className="btn btn-outline-danger text-primary btn-sm d-flex align-items-center justify-content-center gap-2"
                        >
                          <i className="bi-trash"></i>
                          Clear LocalStorage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Form Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPreview(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-4">
                  <h3 className="h5 fw-semibold mb-1">{formData.title}</h3>
                  {formData.description && (
                    <p className="text-muted mb-0">{formData.description}</p>
                  )}
                </div>

                <div className="d-flex flex-column gap-3">
                  {formData.fields.map((field) => (
                    <div key={field.id} className="mb-3">
                      <label className="form-label fw-medium">
                        {field.label}
                        {field.required && (
                          <span className="text-danger ms-1">*</span>
                        )}
                      </label>
                      {renderPreviewField(field)}
                      {field.helpText && (
                        <div className="form-text">{field.helpText}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPreview(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Submit Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Import JSON Modal */}
      {showImportModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Import Form JSON</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowImportModal(false);
                    setImportError("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {importError && (
                  <div className="alert alert-danger mb-3">
                    <i className="bi-exclamation-triangle me-2"></i>
                    {importError}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Paste JSON Data</label>
                  <textarea
                    className="form-control"
                    rows={10}
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    placeholder="Paste your form JSON here..."
                  />
                </div>
                <div className="alert alert-info small">
                  <i className="bi-info-circle me-2"></i>
                  Importing will replace your current form. Make sure to export
                  first!
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowImportModal(false);
                    setImportError("");
                    setImportJson("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={importFromJson}
                >
                  Import JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for import */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".json"
        onChange={importFromFile}
        className="d-none"
      />
    </div>
  );
};

export default CustomFormBuilder;
