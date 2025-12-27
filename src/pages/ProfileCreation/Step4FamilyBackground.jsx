import React, { useState, useEffect } from "react";
import Stepper from "./Stepper";
import { 
  useCreateFamilyBackgroundMutation, 
  useGetFamilyBackgroundQuery,
  useUpdateFamilyBackgroundMutation 
} from "../../context/createProfile";

const Step4FamilyBackground = ({
  nextStep,
  prevStep,
  goToStep,
  data,
  setData,
  step,
  completedStep,
}) => {
  const [formData, setFormData] = useState(data || {});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasExistingFamily, setHasExistingFamily] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [version, setVersion] = useState(null);

  // RTK Query hooks
  const [createFamilyBackground] = useCreateFamilyBackgroundMutation();
  const [updateFamilyBackground] = useUpdateFamilyBackgroundMutation();

  // GET API hook - Auto fetches on mount
  const {
    data: familyApiResponse,
    isLoading: isFetching,
    error: familyError,
    isSuccess,
    isError
  } = useGetFamilyBackgroundQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const requiredKeys = [
    "fathersName",
    "fatherOccupation",
    "mothersName",
    "motherOccupation",
    "brothers",
    "marriedBrothers",
    "sisters",
    "marriedSisters",
    "interCasteInFamily",
    "parentResiding",
    "mamaSurname",
    "mamaPlace",
    "familyWealth",
    "relativeSurnames",
  ];

  const isFormValid = requiredKeys.every(
    (key) => formData[key] !== undefined && formData[key] !== ""
  );

  const [validationErrors, setValidationErrors] = useState({});

  // LOAD DATA FROM GET API - Only run once
  useEffect(() => {
    // Only process if we have a response and haven't loaded data yet
    if (familyApiResponse && !dataLoaded) {
      console.log("Family fetch response:", familyApiResponse);

      if (familyApiResponse.data) {
        setHasExistingFamily(true);
        const familyData = familyApiResponse.data;
        
        // Get version from familyData AFTER it's declared
        setVersion(familyData.version || 0);

        // Transform backend data to form format
        const transformedData = {
          fathersName: familyData.fathersName || "",
          fatherOccupation: familyData.fatherOccupation || "",
          mothersName: familyData.mothersName || "",
          motherOccupation: familyData.motherOccupation || "",
          brothers: familyData.brother ? familyData.brother.toString() : "",
          marriedBrothers: familyData.marriedBrothers ? familyData.marriedBrothers.toString() : "",
          sisters: familyData.sisters ? familyData.sisters.toString() : "",
          marriedSisters: familyData.marriedSisters ? familyData.marriedSisters.toString() : "",
          interCasteInFamily: familyData.interCasteInFamily === true ? "Yes" : "No",
          parentResiding: familyData.parentResiding || "",
          mamaSurname: familyData.mamaSurname || "",
          mamaPlace: familyData.mamaPlace || "",
          familyWealth: familyData.familyWealth || "",
          relativeSurnames: familyData.relativeSurnames || "",
        };

        console.log("Family form data populated:", transformedData);

        setFormData(transformedData);
        setData(transformedData);
        setDataLoaded(true);

        setSuccessMessage("Family background loaded successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  }, [familyApiResponse, dataLoaded, setData]);

  // Handle error state from the query
  useEffect(() => {
    if (familyError && !dataLoaded) {
      console.log("Family fetch error:", familyError);

      const errorData = familyError.data || {};
      const errorMessageText = errorData.message || "";
      const isFamilyNotFound =
        familyError.status === 500 ||
        errorMessageText.includes("family not found") ||
        errorMessageText.includes("Family not found") ||
        errorMessageText.includes("No family found") ||
        errorMessageText.includes("FamilyNotFoundException");

      if (isFamilyNotFound) {
        // This is normal - new user doesn't have family background yet
        setHasExistingFamily(false);
        setDataLoaded(true);
        setSuccessMessage(
          "No existing family background found. Please create new ones."
        );
        setTimeout(() => setSuccessMessage(""), 3000);
      } else if (familyError.status === 401 || familyError.status === 403) {
        // setErrorMessage("Session expired. Please login again.");
        setDataLoaded(true);
      } else {
        console.error("Unexpected error:", familyError);
        // setErrorMessage("Failed to load family background data");
        setDataLoaded(true);
      }
    }
  }, [familyError, dataLoaded]);

  // Handle successful query with no data (new user)
  useEffect(() => {
    if (isSuccess && !familyApiResponse?.data && !dataLoaded) {
      console.log("No family background data found - new user");
      setHasExistingFamily(false);
      setDataLoaded(true);
      setSuccessMessage(
        "No existing family background found. Please create new ones."
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [isSuccess, familyApiResponse, dataLoaded]);

  const validateField = (name, value) => {
    let err = "";
    if (!value || value.toString().trim() === "") {
      err = "This field is required";
    } else {
      if (["fathersName", "mothersName", "mamaSurname", "relativeSurnames"].includes(name)) {
        if (!/^[A-Za-z\s\-\.']+$/.test(value)) return "Only alphabets, spaces, hyphens, dots and apostrophes allowed";
      }

      if (["fatherOccupation", "motherOccupation"].includes(name)) {
        if (!/^[A-Za-z\s\-\.']+$/.test(value)) return "Only alphabets, spaces, hyphens, dots and apostrophes allowed";
      }

      if (["parentResiding", "mamaPlace", "familyWealth"].includes(name)) {
        if (!/^[A-Za-z0-9\s\-\.\,]+$/.test(value))
          return "Only letters, numbers, spaces, commas, dots and hyphens allowed";
      }

      if (name === "interCasteInFamily") {
        if (!/^(Yes|No)$/i.test(value)) return "Please select Yes or No";
      }

      if (["brothers", "marriedBrothers", "sisters", "marriedSisters"].includes(name)) {
        if (!/^(None|[0-9]+)$/.test(value)) return "Please select a valid number or None";
      }
    }
    setValidationErrors((prev) => ({ ...prev, [name]: err }));
  };

  const parseFormNumber = (value) => {
    if (!value || value === "None") return 0;
    if (value === "6+") return 6;
    const num = parseInt(value, 10);
    return isNaN(num) ? 0 : num;
  };

  const validateAllFields = () => {
    // Clear previous validation errors
    const newErrors = {};
    
    // Validate all required fields
    requiredKeys.forEach((key) => {
      const value = formData[key] || "";
      if (!value || value.toString().trim() === "") {
        newErrors[key] = "This field is required";
      }
    });

    // Parse numbers for validation
    const brothersCount = parseFormNumber(formData.brothers);
    const marriedBrothersCount = parseFormNumber(formData.marriedBrothers);
    const sistersCount = parseFormNumber(formData.sisters);
    const marriedSistersCount = parseFormNumber(formData.marriedSisters);

    // Validate married brothers cannot exceed total brothers
    if (marriedBrothersCount > brothersCount) {
      newErrors.marriedBrothers = `Married brothers (${marriedBrothersCount}) cannot exceed total brothers (${brothersCount})`;
    }

    // Validate married sisters cannot exceed total sisters
    if (marriedSistersCount > sistersCount) {
      newErrors.marriedSisters = `Married sisters (${marriedSistersCount}) cannot exceed total sisters (${sistersCount})`;
    }

    // If married brothers is "None" but we have brothers, show error
    if (formData.marriedBrothers === "None" && brothersCount > 0) {
      newErrors.marriedBrothers = "Please select a number for married brothers";
    }

    // If married sisters is "None" but we have sisters, show error
    if (formData.marriedSisters === "None" && sistersCount > 0) {
      newErrors.marriedSisters = "Please select a number for married sisters";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    
    // Auto-reset married brothers/sisters when total is set to None or 0
    if (name === "brothers") {
      if (value === "None" || value === "0") {
        updatedData.marriedBrothers = "None";
      } else if (parseFormNumber(updatedData.marriedBrothers) > parseFormNumber(value)) {
        // If married brothers exceed new total, reset it
        updatedData.marriedBrothers = "0";
      }
    }
    
    if (name === "sisters") {
      if (value === "None" || value === "0") {
        updatedData.marriedSisters = "None";
      } else if (parseFormNumber(updatedData.marriedSisters) > parseFormNumber(value)) {
        // If married sisters exceed new total, reset it
        updatedData.marriedSisters = "0";
      }
    }
    
    setFormData(updatedData);
    setData(updatedData);
    
    // Clear messages when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const prepareApiData = () => {
    // Convert Yes/No → boolean
    const interCasteBool = formData.interCasteInFamily === "Yes";

    // Convert string numbers → number
    const parseNumber = (value) => {
      if (!value || value === "None") return 0;
      if (value === "6+") return 6;
      const num = parseInt(value, 10);
      return isNaN(num) ? 0 : num;
    };

    const brothersCount = parseNumber(formData.brothers);
    const marriedBrothersCount = parseNumber(formData.marriedBrothers);
    const sistersCount = parseNumber(formData.sisters);
    const marriedSistersCount = parseNumber(formData.marriedSisters);

    const apiData = {
      fathersName: (formData.fathersName || "").trim(),
      fatherOccupation: (formData.fatherOccupation || "").trim(),
      mothersName: (formData.mothersName || "").trim(),
      motherOccupation: (formData.motherOccupation || "").trim(),
      brother: brothersCount,
      marriedBrothers: marriedBrothersCount,
      sisters: sistersCount,
      marriedSisters: marriedSistersCount,
      interCasteInFamily: interCasteBool,
      parentResiding: (formData.parentResiding || "").trim(),
      familyWealth: (formData.familyWealth || "").trim(),
      mamaSurname: (formData.mamaSurname || "").trim(),
      mamaPlace: (formData.mamaPlace || "").trim(),
      relativeSurnames: (formData.relativeSurnames || "").trim(),
    };

    //PATCH requires version - ALWAYS include it if hasExistingFamily is true
    if (hasExistingFamily) {
      // Use the version from state or default to 0
      apiData.version = version !== null && version !== undefined ? version : 0;
    }

    console.log("API data being sent:", apiData);
    return apiData;
  };

  // Handle form submission
  const handleNextClick = async () => {
    console.log("=== FAMILY FORM SUBMISSION STARTED ===");
    console.log("Has existing family:", hasExistingFamily);
    console.log("Current version:", version);

    // Check all required fields are filled
    const missingFields = requiredKeys.filter(
      (key) => !formData[key] || formData[key].toString().trim() === ""
    );

    if (missingFields.length > 0) {
      setErrorMessage(`Please fill all required fields: ${missingFields.join(", ")}`);
      console.log("Missing fields:", missingFields);
      return;
    }

    if (!validateAllFields()) {
      setErrorMessage("Please fix all validation errors");
      console.log("Validation errors:", validationErrors);
      return;
    }

    // Check authentication
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Please login to save family background data");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      // Prepare API data
      const apiData = prepareApiData();
      console.log("Sending family background data to API...", apiData);

      let response;

      if (hasExistingFamily) {
        console.log("Using PATCH to update existing family background");
        response = await updateFamilyBackground(apiData).unwrap();
      } else {
        console.log("Using POST to create new family background");
        response = await createFamilyBackground(apiData).unwrap();
      }

      console.log("API Response:", response);

      if (
        response.code === "201" ||
        response.statusCode === 200 ||
        response.success === true ||
        response.message?.includes("success")
      ) {
        setSuccessMessage(
          hasExistingFamily
            ? "Family background updated successfully!"
            : "Family background created successfully!"
        );

        // Move to next step
        setTimeout(() => {
          nextStep();
        }, 1500);
      } else {
        setErrorMessage(response.message || "Failed to save family background");
      }
    } catch (error) {
      console.error("=== API ERROR DETAILS ===");
      console.error("Error:", error);
      console.error("Error data:", error.data);
      console.error("Error status:", error.status);

      let errorMsg = "Failed to save family background. Please try again.";

      if (error.data) {
        // Parse the details string
        if (error.data.details) {
          // The details string looks like: "{marriedBrothersValid=Married brothers cannot exceed total brothers, version=Version is required for updates to prevent conflicts}"
          try {
            // Extract error messages from the details string
            const detailsStr = error.data.details;
            // Remove curly braces and split by comma
            const cleaned = detailsStr.replace(/[{}]/g, '');
            const errors = cleaned.split(', ');
            
            // Extract error messages
            const errorMessages = errors.map(err => {
              const parts = err.split('=');
              return parts.length > 1 ? parts[1] : parts[0];
            });
            
            errorMsg = errorMessages.join('. ');
          } catch (e) {
            // If parsing fails, use the raw details
            errorMsg = error.data.details;
          }
        } else if (error.data.message) {
          errorMsg = error.data.message;
        } else if (error.data.errors) {
          const validationErrors = Object.entries(error.data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMsg = `Validation errors: ${validationErrors}`;
        }
      } else if (error.status === 400) {
        errorMsg = "Invalid data. Please check all required fields are filled correctly.";
      } else if (error.status === 500) {
        errorMsg = "Server error. Please try again later.";
      }

      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const fieldStyle = {
    backgroundColor: "#FF8C4405",
    border: "1px solid #8180801c",
    borderRadius: "6px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    color: "#646565ff",
    padding: "14px 12px",
  };

  const labelStyle = {
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: "4px",
  };

  // Generate options for married brothers based on selected brothers
  const getMarriedBrothersOptions = () => {
    const brothersValue = formData.brothers || "";
    if (!brothersValue || brothersValue === "None") {
      return [<option key="none" value="None">None</option>];
    }
    
    const maxBrothers = brothersValue === "6+" ? 6 : parseInt(brothersValue);
    const options = [];
    
    // Always include "None" option
    options.push(<option key="none" value="None">None</option>);
    
    // Add numbers from 0 to maxBrothers
    for (let i = 0; i <= maxBrothers; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    
    return options;
  };

  // Generate options for married sisters based on selected sisters
  const getMarriedSistersOptions = () => {
    const sistersValue = formData.sisters || "";
    if (!sistersValue || sistersValue === "None") {
      return [<option key="none" value="None">None</option>];
    }
    
    const maxSisters = sistersValue === "6+" ? 6 : parseInt(sistersValue);
    const options = [];
    
    // Always include "None" option
    options.push(<option key="none" value="None">None</option>);
    
    // Add numbers from 0 to maxSisters
    for (let i = 0; i <= maxSisters; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    
    return options;
  };

  // Check authentication first
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
        <div
          className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
          style={{ backgroundColor: "#FF8C4426" }}
        >
          <Stepper
            step={step}
            completedStep={completedStep}
            goToStep={goToStep}
          />
        </div>
        <div
          className="px-4 sm:px-6 md:px-10 py-20 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#FF8C4405" }}
        >
          <div className="text-red-500 text-lg mb-4">
            Authentication Required
          </div>
          <p className="text-gray-600 mb-6">
            Please login to access your family background data.
          </p>
          <button
            onClick={() => (window.location.href = "/signin")}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading state ONLY when initially fetching
  if (isFetching && !dataLoaded) {
    return (
      <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
        <div
          className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
          style={{ backgroundColor: "#FF8C4426" }}
        >
          <Stepper
            step={step}
            completedStep={completedStep}
            goToStep={goToStep}
          />
        </div>
        <div
          className="flex justify-center items-center h-64"
          style={{ backgroundColor: "#FF8C4405" }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <span className="ml-3">Loading family background data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
      {/* STEP HEADER */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto"
        style={{ backgroundColor: "#FF8C4426" }}
      >
        <Stepper
          step={step}
          completedStep={completedStep}
          goToStep={goToStep}
        />
      </div>

      {/* MAIN FORM BOX */}
      <div
        className="px-4 sm:px-6 md:px-10 py-8"
        style={{ backgroundColor: "#FF8C4405" }}
      >
        {/* Status Messages */}
        {successMessage && (
          <div
            className={`mb-6 p-3 rounded-md ${hasExistingFamily
                ? "bg-green-50 border border-green-200 text-green-600"
                : "bg-blue-50 border border-blue-200 text-blue-600"
              }`}
          >
            <p className="text-sm text-center">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          </div>
        )}

        <h3 className="text-center text-orange-400 font-[Inter] font-semibold uppercase mb-8 tracking-wide text-xl">
          Family Background
        </h3>

        {/* FORM GRID */}
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          {/* FATHER'S NAME */}
          <div>
            <label style={labelStyle}>Father's Name <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="fathersName"
              value={formData.fathersName || ""}
              onChange={handleChange}
              placeholder="Enter Father's Name"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
            {validationErrors.fathersName && (
              <p className="text-red-500 text-xs">{validationErrors.fathersName}</p>
            )}
          </div>

          {/* FATHER OCCUPATION */}
          <div>
            <label style={labelStyle}>Father Occupation <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="fatherOccupation"
              value={formData.fatherOccupation || ""}
              onChange={handleChange}
              placeholder="Enter Father Occupation"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
            {validationErrors.fatherOccupation && (
              <p className="text-red-500 text-xs">{validationErrors.fatherOccupation}</p>
            )}
          </div>

          {/* MOTHER'S NAME */}
          <div>
            <label style={labelStyle}>Mother's Name <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="mothersName"
              value={formData.mothersName || ""}
              onChange={handleChange}
              placeholder="Enter Mother's Name"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
            {validationErrors.mothersName && (
              <p className="text-red-500 text-xs">{validationErrors.mothersName}</p>
            )}
          </div>

          {/* MOTHER OCCUPATION */}
          <div>
            <label style={labelStyle}>Mother Occupation <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="motherOccupation"
              value={formData.motherOccupation || ""}
              onChange={handleChange}
              placeholder="Enter Mother Occupation"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
            {validationErrors.motherOccupation && (
              <p className="text-red-500 text-xs">{validationErrors.motherOccupation}</p>
            )}
          </div>

          {/* BROTHERS */}
          <div>
            <label style={labelStyle}>Brothers <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="brothers"
              value={formData.brothers || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6+">6+</option>
            </select>
            {validationErrors.brothers && (
              <p className="text-red-500 text-xs">{validationErrors.brothers}</p>
            )}
          </div>

          {/* MARRIED BROTHERS */}
          <div>
            <label style={labelStyle}>Married Brothers <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="marriedBrothers"
              value={formData.marriedBrothers || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              disabled={!formData.brothers}
            >
              <option value="">Select</option>
              {getMarriedBrothersOptions()}
            </select>
            {validationErrors.marriedBrothers && (
              <p className="text-red-500 text-xs">{validationErrors.marriedBrothers}</p>
            )}
          </div>

          {/* SISTERS */}
          <div>
            <label style={labelStyle}>Sisters <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="sisters"
              value={formData.sisters || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6+">6+</option>
            </select>
            {validationErrors.sisters && (
              <p className="text-red-500 text-xs">{validationErrors.sisters}</p>
            )}
          </div>

          {/* MARRIED SISTERS */}
          <div>
            <label style={labelStyle}>Married Sisters <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="marriedSisters"
              value={formData.marriedSisters || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              disabled={!formData.sisters || formData.sisters === "None"}
            >
              <option value="">Select</option>
              {getMarriedSistersOptions()}
            </select>
            {validationErrors.marriedSisters && (
              <p className="text-red-500 text-xs">{validationErrors.marriedSisters}</p>
            )}
          </div>

          {/* INTER-CASTE IN FAMILY */}
          <div>
            <label style={labelStyle}>Inter-caste in Family <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="interCasteInFamily"
              value={formData.interCasteInFamily || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {validationErrors.interCasteInFamily && (
              <p className="text-red-500 text-xs">{validationErrors.interCasteInFamily}</p>
            )}
          </div>

          {/* PARENT RESIDING */}
          <div>
            <label style={labelStyle}>Parent Residing In <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="parentResiding"
              value={formData.parentResiding || ""}
              onChange={handleChange}
              placeholder="Enter parent residing location"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={100}
            />
            {validationErrors.parentResiding && (
              <p className="text-red-500 text-xs">{validationErrors.parentResiding}</p>
            )}
          </div>

          {/* MAMA SURNAME */}
          <div>
            <label style={labelStyle}>Mama Surname <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="mamaSurname"
              value={formData.mamaSurname || ""}
              onChange={handleChange}
              placeholder="Enter Mama Surname"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
            {validationErrors.mamaSurname && (
              <p className="text-red-500 text-xs">{validationErrors.mamaSurname}</p>
            )}
          </div>

          {/* MAMA PLACE */}
          <div>
            <label style={labelStyle}>Mama Place <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="mamaPlace"
              value={formData.mamaPlace || ""}
              onChange={handleChange}
              placeholder="Enter Mama Place"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={100}
            />
            {validationErrors.mamaPlace && (
              <p className="text-red-500 text-xs">{validationErrors.mamaPlace}</p>
            )}
          </div>

          {/* FAMILY WEALTH */}
          <div>
            <label style={labelStyle}>Family Wealth <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="familyWealth"
              value={formData.familyWealth || ""}
              onChange={handleChange}
              placeholder="Enter Family Wealth details"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={100}
            />
            {validationErrors.familyWealth && (
              <p className="text-red-500 text-xs">{validationErrors.familyWealth}</p>
            )}
          </div>

          {/* RELATIVE SURNAMES */}
          <div>
            <label style={labelStyle}>Relative Surnames <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="relativeSurnames"
              value={formData.relativeSurnames || ""}
              onChange={handleChange}
              placeholder="Enter Relative Surnames (comma separated)"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={200}
            />
            {validationErrors.relativeSurnames && (
              <p className="text-red-500 text-xs">{validationErrors.relativeSurnames}</p>
            )}
          </div>
        </form>
      </div>

      {/* BUTTON ROW */}
      <div
        className="border-gray-300 flex justify-end items-center gap-4 py-4 px-4 sm:px-6 md:px-10"
        style={{ backgroundColor: "#FF8C4405" }}
      >
        <button
          type="button"
          onClick={prevStep}
          className="bg-white text-orange-600 px-10 py-3 rounded-xl cursor-pointer border border-orange-500 hover:bg-orange-50"
          disabled={isLoading}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!isFormValid || isLoading}
          onClick={handleNextClick}
          className={`px-10 py-3 rounded-xl text-white flex items-center justify-center ${isFormValid && !isLoading
              ? "bg-orange-400 hover:bg-orange-500"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              {hasExistingFamily ? "Updating..." : "Creating..."}
            </>
          ) : (
            "Save & Next"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step4FamilyBackground;