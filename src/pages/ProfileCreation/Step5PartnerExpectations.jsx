import React, { useState, useEffect } from "react";
import { Country } from "country-state-city";
import Stepper from "./Stepper";
import {
  useGetPartnerPreferenceQuery,
  useCreatePartnerPreferenceMutation,
  useUpdatePartnerPreferenceMutation
} from "../../context/createProfile";

const Step5PartnerExpectations = ({
  nextStep,
  prevStep,
  goToStep,
  data,
  setData,
  step,
  completedStep,
}) => {
  const [formData, setFormData] = useState(data || {});
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasExistingPartner, setHasExistingPartner] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [version, setVersion] = useState(0); // For optimistic locking

  // RTK Query hooks
  const { data: partnerApiResponse, isLoading: isFetching, error: partnerError } = useGetPartnerPreferenceQuery();
  const [createPartnerPreference] = useCreatePartnerPreferenceMutation();
  const [updatePartnerPreference] = useUpdatePartnerPreferenceMutation();

  // Required fields as per backend validation
  const requiredKeys = [
    "ageRange",
    "lookingFor",
    "heightRange",
    "partnerComplexion",
    "partnerReligion",
    "partnerCaste",
    "partnerEducation",
    "residentStatus",
    "eatingHabits",
    "countryLivingIn",
    "cityLivingIn",
    "mangal",
    "partnerOccupation",
    "partnerIncome"
  ];

  const isFormValid = requiredKeys.every(
    (key) => formData[key] !== undefined && formData[key] !== ""
  );

  const [validationErrors, setValidationErrors] = useState({});

  // Initialize countries
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Load data from GET API
  useEffect(() => {
    if (partnerApiResponse && !dataLoaded) {
      console.log("Partner API Response:", partnerApiResponse);
      
      const response = partnerApiResponse.data || partnerApiResponse;
      
      if (response && response.success !== false) {
        const partnerData = response.data || response;
        
        if (partnerData) {
          setHasExistingPartner(true);
          setVersion(partnerData.version || 0);
          
          // Transform backend field names to frontend field names
          const transformedData = {
            ageRange: partnerData.ageRange || "",
            lookingFor: partnerData.lookingFor || "",
            heightRange: partnerData.heightRange || "",
            partnerComplexion: partnerData.complexion || "",
            partnerReligion: partnerData.religion || "",
            partnerCaste: partnerData.caste || "",
            partnerEducation: partnerData.education || "",
            residentStatus: partnerData.residentStatus || "",
            eatingHabits: partnerData.eatingHabits || "",
            countryLivingIn: partnerData.countryLivingIn || "",
            cityLivingIn: partnerData.cityLivingIn || "",
            stateLivingIn: partnerData.stateLivingIn || "",
            mangal: partnerData.mangal === true ? "Yes" : partnerData.mangal === false ? "No" : "",
            partnerOccupation: partnerData.partnerOccupation || "",
            partnerIncome: partnerData.partnerIncome ? partnerData.partnerIncome.toString() : "",
            partnerSubCaste: partnerData.subCaste || "",
            partnerMaritalStatus: partnerData.maritalStatus || "",
            partnerMotherTongue: partnerData.motherTongue || "",
            partnerAdditionalPreferences: partnerData.additionalPreferences || "",
            partnerDrinkingHabits: partnerData.drinkingHabits || "",
            partnerSmokingHabits: partnerData.smokingHabits || ""
          };

          console.log("Transformed Form Data:", transformedData);
          
          setFormData(transformedData);
          setData(transformedData);
          setDataLoaded(true);
          
          setSuccessMessage("Partner preferences loaded successfully");
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      } else {
        // No data exists
        setHasExistingPartner(false);
        setDataLoaded(true);
        setSuccessMessage("Create new partner preferences");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  }, [partnerApiResponse, dataLoaded, setData]);

  // Handle API errors
  useEffect(() => {
    if (partnerError && !dataLoaded) {
      console.log("Partner fetch error:", partnerError);
      
      if (partnerError.status === 404) {
        // No partner preferences exist yet
        setHasExistingPartner(false);
        setDataLoaded(true);
        setSuccessMessage("No existing partner preferences found. Please create new ones.");
      } else {
        // setErrorMessage("Failed to load partner preferences. Please try again.");
      }
      setDataLoaded(true);
    }
  }, [partnerError, dataLoaded]);

  const validateField = (name, value) => {
    let err = "";
    
    if (requiredKeys.includes(name) && (!value || value.toString().trim() === "")) {
      err = "This field is required";
    } else if (value && value.toString().trim() !== "") {
      // Specific validations
      if (name === "partnerEducation") {
        if (!/^[A-Za-z\s\-\.&]+$/.test(value)) {
          err = "Only letters, spaces, hyphens, dots, and ampersand allowed";
        }
      }
      
      if (name === "ageRange") {
        if (!/^\d{1,2}-\d{1,2}$/.test(value)) {
          err = "Age range must be in format 'min-max' (e.g., '25-35')";
        } else {
          const [min, max] = value.split('-').map(Number);
          if (min < 18 || max > 80) {
            err = "Age range should be between 18 and 80";
          }
          if (min > max) {
            err = "Minimum age cannot be greater than maximum age";
          }
        }
      }

      if (name === "heightRange") {
        if (value.length < 3 || value.length > 50) {
          err = "Height range should be 3-50 characters";
        }
        const lowerHeight = value.toLowerCase();
        if (!lowerHeight.includes("'") && !lowerHeight.includes("ft") && 
            !lowerHeight.includes("cm") && !lowerHeight.includes("inch")) {
          err = "Include height units (ft, cm, inch, or ')";
        }
      }

      if (name === "partnerIncome") {
        const income = parseInt(value);
        if (isNaN(income) || income < 100000 || income > 50000000) {
          err = "Income should be between ₹1,00,000 and ₹5,00,00,000";
        }
      }

      if (name === "cityLivingIn") {
        if (!/^[A-Za-z\s\-\.]+$/.test(value)) {
          err = "Only alphabets, spaces, hyphens and dots allowed";
        } else if (value.trim().length < 2) {
          err = "City name must be at least 2 characters";
        }
      }

      if (name === "partnerCaste") {
        if (!/^[A-Za-z\s\-]+$/.test(value)) {
          err = "Only alphabets, spaces and hyphens allowed";
        }
      }
    }
    
    setValidationErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAllFields = () => {
    requiredKeys.forEach((key) => validateField(key, formData[key] || ""));
    return !Object.values(validationErrors).some((err) => err);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setData(updatedData);
    validateField(name, value);
    
    if (errorMessage) setErrorMessage("");
  };

  const prepareApiData = () => {
    console.log("Current form data:", formData);
    
    // Create POST/PATCH data according to backend DTO
    const apiData = {
      // For PATCH, include version for optimistic locking
      ...(hasExistingPartner && { version }),
      
      // Required fields
      ageRange: (formData.ageRange || "").trim(),
      lookingFor: (formData.lookingFor || "").trim(),
      heightRange: (formData.heightRange || "").trim(),
      complexion: (formData.partnerComplexion || "").trim(),
      religion: (formData.partnerReligion || "").trim(),
      caste: (formData.partnerCaste || "").trim(),
      education: (formData.partnerEducation || "").trim(),
      residentStatus: (formData.residentStatus || "").trim(),
      eatingHabits: (formData.eatingHabits || "").trim(),
      countryLivingIn: (formData.countryLivingIn || "").trim(),
      cityLivingIn: (formData.cityLivingIn || "").trim(),
      stateLivingIn: (formData.stateLivingIn || "").trim(),
      mangal: formData.mangal === "Yes",
      partnerOccupation: (formData.partnerOccupation || "").trim(),
      partnerIncome: parseInt(formData.partnerIncome) || 0,
      
      // Optional fields
      ...(formData.partnerSubCaste && { subCaste: formData.partnerSubCaste.trim() }),
      ...(formData.partnerMaritalStatus && { maritalStatus: formData.partnerMaritalStatus.trim() }),
      ...(formData.partnerMotherTongue && { motherTongue: formData.partnerMotherTongue.trim() }),
      ...(formData.partnerAdditionalPreferences && { additionalPreferences: formData.partnerAdditionalPreferences.trim() }),
      ...(formData.partnerDrinkingHabits && { drinkingHabits: formData.partnerDrinkingHabits.trim() }),
      ...(formData.partnerSmokingHabits && { smokingHabits: formData.partnerSmokingHabits.trim() })
    };

    console.log("API Data to send:", apiData);
    return apiData;
  };

  const handleNextClick = async () => {
    console.log("=== FORM SUBMISSION STARTED ===");
    
    // Validate required fields
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
      setErrorMessage("Please login to save partner preferences");
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      
      const apiData = prepareApiData();
      console.log("Sending to API...");
      
     let response;

if (hasExistingPartner) {
  console.log("Using PATCH to update existing partner preferences");
  response = await updatePartnerPreference(apiData).unwrap();
} else {
  console.log("Using POST to create new partner preferences");
  response = await createPartnerPreference(apiData).unwrap();
}

console.log("API Response:", response);

//unwrap() guarantees success
setSuccessMessage(
  hasExistingPartner
    ? "Partner preferences updated successfully!"
    : "Partner preferences created successfully!"
);

// MOVE TO NEXT STEP IMMEDIATELY
nextStep();

    } catch (error) {
      console.error("API Error:", error);
      
      let errorMsg = "Failed to save partner preferences. Please try again.";
      
      if (error.data) {
        if (error.data.errors) {
          const validationErrors = Object.entries(error.data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMsg = `Validation errors: ${validationErrors}`;
        } else if (error.data.message) {
          errorMsg = error.data.message;
        }
      } else if (error.status === 400) {
        errorMsg = "Invalid data. Please check all fields.";
      } else if (error.status === 409) {
        errorMsg = "Conflict - partner preferences already exist for this user";
      } else if (error.status === 429) {
        errorMsg = "Too many requests. Please wait and try again.";
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

  // Check authentication
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
        <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto" style={{ backgroundColor: "#FF8C4426" }}>
          <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
        </div>
        <div className="px-4 sm:px-6 md:px-10 py-20 flex flex-col items-center justify-center" style={{ backgroundColor: "#FF8C4405" }}>
          <div className="text-red-500 text-lg mb-4">Authentication Required</div>
          <p className="text-gray-600 mb-6">Please login to access your partner preferences.</p>
          <button onClick={() => (window.location.href = "/signin")} className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isFetching && !dataLoaded) {
    return (
      <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
        <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto" style={{ backgroundColor: "#FF8C4426" }}>
          <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
        </div>
        <div className="flex justify-center items-center h-64" style={{ backgroundColor: "#FF8C4405" }}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <span className="ml-3">Loading partner preferences...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
      {/* STEP HEADER */}
      <div className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl overflow-x-auto" style={{ backgroundColor: "#FF8C4426" }}>
        <Stepper step={step} completedStep={completedStep} goToStep={goToStep} />
      </div>

      {/* MAIN FORM BOX */}
      <div className="px-4 sm:px-6 md:px-10 py-8" style={{ backgroundColor: "#FF8C4405" }}>
        {/* Status Messages */}
        {successMessage && (
          <div className={`mb-6 p-3 rounded-md ${hasExistingPartner ? "bg-green-50 border border-green-200 text-green-600" : "bg-blue-50 border border-blue-200 text-blue-600"}`}>
            <p className="text-sm text-center">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          </div>
        )}

        <h3 className="text-center text-orange-400 font-[Inter] font-semibold uppercase mb-8 tracking-wide text-xl">
          Partner Expectations
        </h3>

        {/* FORM GRID */}
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          {/* AGE RANGE */}
          <div>
            <label style={labelStyle}>Age Range <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="ageRange"
              value={formData.ageRange || ""}
              onChange={handleChange}
              placeholder="e.g., 25-35"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            />
            <p className="text-xs text-gray-500 mt-1">Format: min-max (e.g., 25-35)</p>
            {validationErrors.ageRange && <p className="text-red-500 text-xs mt-1">{validationErrors.ageRange}</p>}
          </div>

          {/* LOOKING FOR */}
          <div>
            <label style={labelStyle}>Looking For <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="lookingFor"
              value={formData.lookingFor || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              <option value="Unmarried">Unmarried</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
              <option value="Awaiting Divorce">Awaiting Divorce</option>
              <option value="Any">Any</option>
            </select>
          </div>

          {/* HEIGHT RANGE */}
          <div>
            <label style={labelStyle}>Height Range <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="heightRange"
              value={formData.heightRange || ""}
              onChange={handleChange}
              placeholder="e.g., 5'6'' - 5'10'' or 165-178 cm"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            />
            <p className="text-xs text-gray-500 mt-1">Include units (ft/cm/inch)</p>
            {validationErrors.heightRange && <p className="text-red-500 text-xs mt-1">{validationErrors.heightRange}</p>}
          </div>

          {/* COMPLEXION */}
          <div>
            <label style={labelStyle}>Complexion <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="partnerComplexion"
              value={formData.partnerComplexion || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              <option value="Fair">Fair</option>
              <option value="Wheatish">Wheatish</option>
              <option value="Dark">Dark</option>
              <option value="Any">Any</option>
            </select>
          </div>

          {/* RELIGION */}
          <div>
            <label style={labelStyle}>Religion <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="partnerReligion"
              value={formData.partnerReligion || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
              <option value="Jain">Jain</option>
              <option value="Buddhist">Buddhist</option>
              <option value="Any">Any</option>
            </select>
          </div>

          {/* CASTE */}
          <div>
            <label style={labelStyle}>Caste <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="partnerCaste"
              value={formData.partnerCaste || ""}
              onChange={handleChange}
              placeholder="Enter caste"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
            {validationErrors.partnerCaste && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerCaste}</p>}
          </div>

          {/* SUB-CASTE (Optional) */}
          <div>
            <label style={labelStyle}>Sub-Caste</label>
            <input
              type="text"
              name="partnerSubCaste"
              value={formData.partnerSubCaste || ""}
              onChange={handleChange}
              placeholder="Enter sub-caste (optional)"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
          </div>

          {/* EDUCATION */}
          <div>
            <label style={labelStyle}>Education <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="partnerEducation"
              value={formData.partnerEducation || ""}
              onChange={handleChange}
              placeholder="Enter Education"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={100}
            />
            {validationErrors.partnerEducation && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerEducation}</p>}
          </div>

          {/* RESIDENT STATUS */}
          <div>
            <label style={labelStyle}>Resident Status <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="residentStatus"
              value={formData.residentStatus || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              <option value="Citizen">Citizen</option>
              <option value="Permanent Resident">Permanent Resident</option>
              <option value="Work Permit">Work Permit</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Temporary Visa">Temporary Visa</option>
            </select>
          </div>

          {/* OCCUPATION */}
          <div>
            <label style={labelStyle}>Occupation <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="partnerOccupation"
              value={formData.partnerOccupation || ""}
              onChange={handleChange}
              placeholder="Enter Occupation"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={100}
            />
          </div>

          {/* INCOME */}
          <div>
            <label style={labelStyle}>Income (per year) <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="number"
              name="partnerIncome"
              value={formData.partnerIncome || ""}
              onChange={handleChange}
              placeholder="Enter income in rupees"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              min="100000"
              max="50000000"
            />
            <p className="text-xs text-gray-500 mt-1">Annual income (₹1,00,000 - ₹5,00,00,000)</p>
            {validationErrors.partnerIncome && <p className="text-red-500 text-xs mt-1">{validationErrors.partnerIncome}</p>}
          </div>

          {/* COUNTRY */}
          <div>
            <label style={labelStyle}>Country Living in <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="countryLivingIn"
              value={formData.countryLivingIn || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.isoCode} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* CITY */}
          <div>
            <label style={labelStyle}>City Living in <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="cityLivingIn"
              value={formData.cityLivingIn || ""}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
            {validationErrors.cityLivingIn && <p className="text-red-500 text-xs mt-1">{validationErrors.cityLivingIn}</p>}
          </div>

          {/* STATE (Optional) */}
          <div>
            <label style={labelStyle}>State Living in</label>
            <input
              type="text"
              name="stateLivingIn"
              value={formData.stateLivingIn || ""}
              onChange={handleChange}
              placeholder="Enter state (optional)"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
          </div>

          {/* EATING HABITS */}
          <div>
            <label style={labelStyle}>Eating Habits <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="eatingHabits"
              value={formData.eatingHabits || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Jain Vegetarian">Jain Vegetarian</option>
              <option value="Eggetarian">Eggetarian</option>
              <option value="Occasionally Non-Vegetarian">Occasionally Non-Vegetarian</option>
            </select>
          </div>

          {/* DRINKING HABITS (Optional) */}
          <div>
            <label style={labelStyle}>Drinking Habits</label>
            <select
              name="partnerDrinkingHabits"
              value={formData.partnerDrinkingHabits || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select (optional)</option>
              <option value="Non-drinker">Non-drinker</option>
              <option value="Drinks socially">Drinks socially</option>
              <option value="Drinks regularly">Drinks regularly</option>
              <option value="Occasional drinker">Occasional drinker</option>
            </select>
          </div>

          {/* SMOKING HABITS (Optional) */}
          <div>
            <label style={labelStyle}>Smoking Habits</label>
            <select
              name="partnerSmokingHabits"
              value={formData.partnerSmokingHabits || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select (optional)</option>
              <option value="Non-smoker">Non-smoker</option>
              <option value="Light smoker">Light smoker</option>
              <option value="Regular smoker">Regular smoker</option>
              <option value="Occasional smoker">Occasional smoker</option>
            </select>
          </div>

          {/* MANGAL */}
          <div>
            <label style={labelStyle}>Mangal (Kuja Dosha) <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="mangal"
              value={formData.mangal || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Doesn't Matter">Doesn't Matter</option>
            </select>
          </div>

          {/* MARITAL STATUS (Optional) */}
          <div>
            <label style={labelStyle}>Marital Status</label>
            <select
              name="partnerMaritalStatus"
              value={formData.partnerMaritalStatus || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select (optional)</option>
              <option value="Never Married">Never Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
              <option value="Awaiting Divorce">Awaiting Divorce</option>
            </select>
          </div>

          {/* MOTHER TONGUE (Optional) */}
          <div>
            <label style={labelStyle}>Mother Tongue</label>
            <input
              type="text"
              name="partnerMotherTongue"
              value={formData.partnerMotherTongue || ""}
              onChange={handleChange}
              placeholder="Mother tongue (optional)"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={50}
            />
          </div>

          {/* ADDITIONAL PREFERENCES (Optional) */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
            <label style={labelStyle}>Additional Preferences</label>
            <textarea
              name="partnerAdditionalPreferences"
              value={formData.partnerAdditionalPreferences || ""}
              onChange={handleChange}
              placeholder="Any other preferences (optional)"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={{ ...fieldStyle, minHeight: "80px" }}
              rows={3}
              maxLength={500}
            />
          </div>
        </form>
      </div>

      {/* BUTTON ROW */}
      <div className="border-gray-300 flex justify-end items-center gap-4 py-4 px-4 sm:px-6 md:px-10" style={{ backgroundColor: "#FF8C4405" }}>
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
          className={`px-10 py-3 rounded-xl text-white flex items-center justify-center ${
            isFormValid && !isLoading 
              ? "bg-orange-400 hover:bg-orange-500" 
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              {hasExistingPartner ? "Updating..." : "Creating..."}
            </>
          ) : (
            "Save & Next"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step5PartnerExpectations;