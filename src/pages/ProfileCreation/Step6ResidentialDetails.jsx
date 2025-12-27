import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";  // Import the library
import Stepper from "./Stepper";
import {
  useCreateResidentialDetailsMutation,
  useGetResidentialDetailsQuery,
  useUpdateResidentialDetailsMutation,
} from "../../context/createProfile";

const Step6ResidentialDetails = ({
  nextStep,
  prevStep,
  goToStep,
  data,
  setData,
  step,
  completedStep,
  hasDataForStep,
}) => {
  // Add states for country-state-city data
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState(data || {});

  /* -------------------- API HOOKS -------------------- */
  const [createResidentialDetails] = useCreateResidentialDetailsMutation();
  const [updateResidentialDetails] = useUpdateResidentialDetailsMutation();

  const {
    data: residentialResponse,
    error: residentialError,
    isLoading: residentialLoading,
    isFetching,
    isSuccess,
  } = useGetResidentialDetailsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  /* STATE */
  const [hasExistingContact, setHasExistingContact] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [version, setVersion] = useState(0);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Required fields according to backend DTO
  const requiredKeys = [
    "fullAddress",
    "city", 
    "country",
    "pinCode",
    "mobileNumber",
    "contactVisibility"
  ];

  /*  COUNTRY-STATE-CITY LOGIC  */
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const sortedCountries = allCountries.sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    setCountries(sortedCountries);
    console.log("Loaded countries:", sortedCountries.length);
    
    // Set default country to India if not already set
    if (!formData.country) {
      const defaultCountry = sortedCountries.find(c => c.name === "India");
      if (defaultCountry) {
        const updatedData = { ...formData, country: "India", countryCode: "IN" };
        setFormData(updatedData);
        setData(updatedData);
        
        // Load Indian states
        const indiaStates = State.getStatesOfCountry("IN");
        const sortedStates = indiaStates.sort((a, b) => a.name.localeCompare(b.name));
        setStates(sortedStates);
        console.log("Loaded Indian states:", sortedStates.length);
      }
    }
  }, []);

  // When country changes, load its states
  useEffect(() => {
    if (formData.countryCode) {
      const countryStates = State.getStatesOfCountry(formData.countryCode);
      const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
      setStates(sortedStates);
      setCities([]);
      console.log(`Loaded states for ${formData.countryCode}:`, sortedStates.length);
      
      // Reset state and city when country changes
      const updatedData = { ...formData, state: "", stateCode: "", city: "" };
      setFormData(updatedData);
      setData(updatedData);
    }
  }, [formData.countryCode]);

  // When state changes, load its cities - FIXED THIS FUNCTION
  useEffect(() => {
    if (formData.countryCode && formData.stateCode) {
      console.log(`Loading cities for country: ${formData.countryCode}, state: ${formData.stateCode}`);
      
      try {
        // Method 1: Using getCitiesOfState (recommended)
        const stateCities = City.getCitiesOfState(formData.countryCode, formData.stateCode);
        console.log("Cities found (Method 1):", stateCities.length);
        
        // Method 2: Alternative approach if method 1 returns empty
        let citiesData = stateCities;
        
        if (stateCities.length === 0) {
          console.log("Trying alternative method...");
          // Get all cities of country and filter by state
          const allCities = City.getCitiesOfCountry(formData.countryCode);
          citiesData = allCities.filter(city => city.stateCode === formData.stateCode);
          console.log("Cities found (Method 2):", citiesData.length);
        }
        
        // Sort cities alphabetically
        const sortedCities = citiesData.sort((a, b) => a.name.localeCompare(b.name));
        setCities(sortedCities);
        console.log(`Loaded ${sortedCities.length} cities for ${formData.stateCode}`);
        
      } catch (error) {
        console.error("Error loading cities:", error);
        setCities([]);
      }
      
      // Reset city when state changes
      const updatedData = { ...formData, city: "" };
      setFormData(updatedData);
      setData(updatedData);
    } else {
      setCities([]);
    }
  }, [formData.countryCode, formData.stateCode]);

  /* LOAD DATA FROM GET API  */
  useEffect(() => {
    if (residentialResponse && !dataLoaded) {
      console.log("Contact fetch response:", residentialResponse);

      if (residentialResponse.data) {
        setHasExistingContact(true);
        const contactData = residentialResponse.data;
        
        // Store version for optimistic locking
        if (contactData.version) {
          setVersion(contactData.version);
        }

        // Transform backend data to form format
        const transformedData = {
          fullAddress: contactData.fullAddress || "",
          streetAddress: contactData.streetAddress || "",
          city: contactData.city || "",
          state: contactData.state || "",
          country: contactData.country || "",
          pinCode: contactData.pinCode || "",
          mobileNumber: contactData.mobileNumber || "",
          alternateNumber: contactData.alternateNumber || "",
          whatsappNumber: contactData.whatsappNumber || "",
          emailAddress: contactData.emailAddress || "",
          emergencyContactName: contactData.emergencyContactName || "",
          emergencyContactNumber: contactData.emergencyContactNumber || "",
          emergencyContactRelation: contactData.emergencyContactRelation || "",
          preferredContactMethod: contactData.preferredContactMethod || "",
          contactVisibility: contactData.contactVisibility || "PRIVATE",
        };

        console.log("Contact form data populated:", transformedData);

        setFormData(transformedData);
        setData(transformedData);
        setDataLoaded(true);

        // Find country code for the loaded country
        if (transformedData.country) {
          const countryObj = countries.find(c => c.name === transformedData.country);
          if (countryObj) {
            const updatedData = { 
              ...transformedData, 
              countryCode: countryObj.isoCode 
            };
            setFormData(updatedData);
            setData(updatedData);
            
            // Load states for this country
            const countryStates = State.getStatesOfCountry(countryObj.isoCode);
            const sortedStates = countryStates.sort((a, b) => a.name.localeCompare(b.name));
            setStates(sortedStates);
            
            // If state is already set, find state code and load cities
            if (transformedData.state) {
              const stateObj = sortedStates.find(s => s.name === transformedData.state);
              if (stateObj) {
                const updatedData2 = { 
                  ...updatedData, 
                  stateCode: stateObj.isoCode 
                };
                setFormData(updatedData2);
                setData(updatedData2);
                
                // Load cities for this state
                try {
                  const stateCities = City.getCitiesOfState(countryObj.isoCode, stateObj.isoCode);
                  if (stateCities.length === 0) {
                    // Fallback method
                    const allCities = City.getCitiesOfCountry(countryObj.isoCode);
                    const filteredCities = allCities.filter(city => city.stateCode === stateObj.isoCode);
                    const sortedCities = filteredCities.sort((a, b) => a.name.localeCompare(b.name));
                    setCities(sortedCities);
                    console.log(`Loaded ${sortedCities.length} cities for ${stateObj.name} using fallback method`);
                  } else {
                    const sortedCities = stateCities.sort((a, b) => a.name.localeCompare(b.name));
                    setCities(sortedCities);
                    console.log(`Loaded ${sortedCities.length} cities for ${stateObj.name}`);
                  }
                } catch (error) {
                  console.error("Error loading cities from saved data:", error);
                  setCities([]);
                }
              }
            }
          }
        }

        setSuccessMessage("Contact details loaded successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  }, [residentialResponse, dataLoaded, setData, countries]);

  // Handle error state from the query
  useEffect(() => {
    if (residentialError && !dataLoaded) {
      console.log("Contact fetch error:", residentialError);

      const errorData = residentialError.data || {};
      const errorMessageText = errorData.message || "";
      const isContactNotFound =
        residentialError.status === 500 ||
        errorMessageText.includes("contact not found") ||
        errorMessageText.includes("Contact not found") ||
        errorMessageText.includes("No contact found") ||
        errorMessageText.includes("ContactNotFoundException");

      if (isContactNotFound) {
        setHasExistingContact(false);
        setDataLoaded(true);
        setSuccessMessage("No existing contact details found. Please create new ones.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else if (residentialError.status === 401 || residentialError.status === 403) {
        // setApiError("Session expired. Please login again.");
        setDataLoaded(true);
      } else {
        console.error("Unexpected error:", residentialError);
        // setApiError("Failed to load contact details");
        setDataLoaded(true);
      }
    }
  }, [residentialError, dataLoaded]);

  // Handle successful query with no data (new user)
  useEffect(() => {
    if (isSuccess && !residentialResponse?.data && !dataLoaded) {
      console.log("No contact data found - new user");
      setHasExistingContact(false);
      setDataLoaded(true);
      setSuccessMessage("No existing contact details found. Please create new ones.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [isSuccess, residentialResponse, dataLoaded]);

  /*  VALIDATION  */
  const validateField = (name, value) => {
    let err = "";
    const trimmedValue = value ? value.toString().trim() : "";
    
    console.log(`Validating ${name}:`, value);
    
    // Check required fields
    if (requiredKeys.includes(name) && trimmedValue === "") {
      err = "This field is required";
      console.log(`Required field ${name} is empty`);
    } else if (trimmedValue !== "") {
      switch (name) {
        case "fullAddress":
          if (trimmedValue.length < 10) {
            err = "Address must be at least 10 characters";
          }
          break;
          
        case "city":
          if (!/^[A-Za-z\s.-]+$/.test(trimmedValue)) {
            err = "Only alphabets, spaces, dots and hyphens allowed";
          }
          break;
          
        case "pinCode":
          if (!/^\d{6}$/.test(trimmedValue)) {
            err = "Enter valid 6-digit PIN code";
          }
          break;
          
        case "mobileNumber":
          const cleanNumber = trimmedValue.replace(/[\s()-]/g, '');
          if (!/^[+]?[0-9]{10,20}$/.test(cleanNumber)) {
            err = "Enter valid 10-20 digit phone number";
          }
          break;
          
        case "emailAddress":
          if (trimmedValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
            err = "Enter valid email address";
          }
          break;
          
        case "country":
          if (trimmedValue && !countries.find(c => c.name === trimmedValue)) {
            err = "Please select a valid country from the list";
          }
          break;
          
        default:
          break;
      }
    }
    
    console.log(`Validation error for ${name}:`, err);
    setValidationErrors((prev) => ({ ...prev, [name]: err }));
    return err;
  };

  // Check if form is valid whenever formData changes
  useEffect(() => {
    console.log("=== CHECKING FORM VALIDITY ===");
    console.log("Form data:", formData);
    console.log("Validation errors:", validationErrors);
    
    // First, check all required fields are filled
    const allRequiredFilled = requiredKeys.every(key => {
      const value = formData[key];
      const filled = value && value.toString().trim() !== "";
      console.log(`${key}: ${value} -> filled: ${filled}`);
      return filled;
    });
    
    console.log("All required filled:", allRequiredFilled);
    
    if (!allRequiredFilled) {
      setIsValid(false);
      return;
    }
    
    // Then, check if there are any validation errors for required fields
    const hasValidationErrors = requiredKeys.some(key => {
      const hasError = validationErrors[key] && validationErrors[key] !== "";
      console.log(`${key} has error: ${hasError} (${validationErrors[key]})`);
      return hasError;
    });
    
    console.log("Has validation errors:", hasValidationErrors);
    setIsValid(!hasValidationErrors);
  }, [formData, validationErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    
    // Special handling for country selection
    if (name === "country") {
      const selectedCountry = countries.find(country => country.name === value);
      if (selectedCountry) {
        updatedData = { 
          ...updatedData, 
          country: selectedCountry.name,
          countryCode: selectedCountry.isoCode,
          state: "",
          stateCode: "",
          city: ""
        };
      }
    }
    
    // Special handling for state selection
    if (name === "state") {
      const selectedState = states.find(state => state.name === value);
      if (selectedState) {
        updatedData = { 
          ...updatedData, 
          state: selectedState.name,
          stateCode: selectedState.isoCode,
          city: ""
        };
      }
    }
    
    setFormData(updatedData);
    setData(updatedData);
    
    // Validate the field immediately
    validateField(name, value);

    // Clear error message when user starts typing
    if (apiError) setApiError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const prepareApiData = () => {
    // console.log("=== DEBUGGING CONTACT FORM DATA ===");
    // console.log("Current form data:", formData);

    // Check all required fields are filled
    const missingFields = requiredKeys.filter(key => {
      const value = formData[key];
      return !value || value.toString().trim() === "";
    });
    
    console.log("Missing required fields:", missingFields);

    if (missingFields.length > 0) {
      throw new Error(`Please fill all required fields: ${missingFields.join(", ")}`);
    }

    // Prepare API data according to ContactDetails DTO structure
    const apiData = {
      fullAddress: (formData.fullAddress || "").trim(),
      streetAddress: (formData.streetAddress || "").trim(),
      city: (formData.city || "").trim(),
      state: (formData.state || "").trim(),
      country: (formData.country || "").trim(),
      pinCode: (formData.pinCode || "").trim(),
      mobileNumber: (formData.mobileNumber || "").trim(),
      alternateNumber: (formData.alternateNumber || "").trim(),
      whatsappNumber: (formData.whatsappNumber || "").trim(),
      emailAddress: (formData.emailAddress || "").trim(),
      emergencyContactName: (formData.emergencyContactName || "").trim(),
      emergencyContactNumber: (formData.emergencyContactNumber || "").trim(),
      emergencyContactRelation: (formData.emergencyContactRelation || "").trim(),
      preferredContactMethod: (formData.preferredContactMethod || "").trim(),
      contactVisibility: (formData.contactVisibility || "PRIVATE").trim(),
    };

    // For update, add version
    if (hasExistingContact) {
      apiData.version = version;
    }

    console.log("=== FINAL CONTACT API DATA ===");
    console.log("API Data:", apiData);
    console.log("API Data JSON:", JSON.stringify(apiData, null, 2));

    return apiData;
  };

  /* -------------------- SUBMIT HANDLER - FIXED VERSION -------------------- */
  const handleNext = async () => {
    console.log("=== CONTACT FORM SUBMISSION STARTED ===");
    console.log("nextStep function available:", typeof nextStep === 'function');
    console.log("nextStep function:", nextStep);

    // Double-check form validity
    if (!isValid) {
      setApiError("Please fill all required fields correctly");
      // Log which fields are causing issues
      const issues = requiredKeys.filter(key => {
        const value = formData[key];
        return !value || value.toString().trim() === "" || validationErrors[key];
      });
      console.log("Validation issues with fields:", issues);
      return;
    }

    try {
      setLoading(true);
      setApiError("");
      setSuccessMessage("");

      // Prepare API data
      const apiData = prepareApiData();
      console.log("Sending contact details data to API...");

      let response;

      if (hasExistingContact) {
        console.log("Using PATCH to update existing contact details");
        response = await updateResidentialDetails(apiData).unwrap();
      } else {
        console.log("Using POST to create new contact details");
        response = await createResidentialDetails(apiData).unwrap();
      }

      console.log("=== CONTACT API RESPONSE DETAILS ===");
      console.log("Full response:", response);
      console.log("Response keys:", Object.keys(response));
      console.log("Response statusCode:", response.statusCode);
      console.log("Response code:", response.code);
      console.log("Response success:", response.success);
      console.log("Response data:", response.data);

      // FIXED: Check for multiple response formats
      const isSuccessResponse = 
        response.statusCode === 201 || 
        response.statusCode === 200 || 
        response.code === "201" || 
        response.code === "200" ||
        response.success === true ||
        (response.data && (response.data.statusCode === 201 || response.data.statusCode === 200)) ||
        response.message?.toLowerCase().includes("success") ||
        response.message?.toLowerCase().includes("created") ||
        response.message?.toLowerCase().includes("updated");

      if (isSuccessResponse) {
        const successMsg = hasExistingContact
          ? "Contact details updated successfully!"
          : "Contact details created successfully!";
        
        setSuccessMessage(successMsg);
        console.log(successMsg);

        // Clear any previous errors
        setApiError("");

        // FIXED: Call nextStep with better debugging
        // console.log("Attempting to navigate to next step...");
        
        // Test if nextStep is a function
        if (typeof nextStep === 'function') {
          // Option 2: Short timeout to show success message
          setTimeout(() => {
            console.log("Timeout fired, calling nextStep...");
            try {
              nextStep();
              console.log("nextStep called successfully");
            } catch (error) {
              console.error("Error calling nextStep:", error);
              setApiError("Navigation failed. Please try again.");
            }
          }, 1000); // Reduced timeout
        } else {
          console.error("nextStep is not a function! Type:", typeof nextStep);
          setApiError("Navigation error. Please contact support.");
        }
      } else {
        const errorMsg = response.message || response.data?.message || "Failed to save contact details";
        setApiError(errorMsg);
        console.error("Save failed:", errorMsg);
      }

    } catch (error) {
      console.error("=== API ERROR DETAILS ===");
      console.error("Error status:", error.status);
      console.error("Error data:", error.data);
      console.error("Full error:", error);

      let errorMsg = "Failed to save contact details. Please try again.";

      if (error.data) {
        if (error.data.errors) {
          const validationErrors = Object.entries(error.data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMsg = `Validation errors: ${validationErrors}`;
        } else if (error.data.message) {
          errorMsg = error.data.message;
        } else if (error.data.detail) {
          errorMsg = error.data.detail;
        }
      } else if (error.status === 400) {
        errorMsg = "Invalid data. Please check all required fields are filled correctly.";
      } else if (error.status === 500) {
        errorMsg = "Server error. Please try again later.";
      } else if (error.message && error.message.includes("Please fill all required fields")) {
        errorMsg = error.message;
      }

      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI STYLES -------------------- */
  const fieldStyle = {
    backgroundColor: "#FF8C4405",
    border: "1px solid #8180801c",
    borderRadius: "6px",
    padding: "14px 12px",
    color: "#707C8B",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    outline: "none",
    width: "100%",
  };

  const labelStyle = {
    fontSize: "15px",
    fontWeight: 600,
    marginBottom: "4px",
    fontFamily: "'Inter', sans-serif",
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="w-full max-w-[95%] mx-auto font-[Inter] flex flex-col min-h-[600px]">

      {/* Stepper */}
      <div
        className="px-4 sm:px-6 md:px-10 py-1 rounded-t-xl"
        style={{ backgroundColor: "#FF8C4426" }}
      >
        <Stepper 
          step={step} 
          completedStep={completedStep} 
          goToStep={goToStep} 
          hasDataForStep={hasDataForStep}
        />
      </div>

      {/* FORM */}
      <div className="px-4 sm:px-6 md:px-10 py-8 flex-grow" style={{ backgroundColor: "#FF8C4405" }}>
        <h3 className="text-center text-orange-400 font-semibold uppercase mb-8 text-xl">
          Residential Address / Contact Details
        </h3>

        {/* Loading State */}
        {(isFetching || residentialLoading) && !dataLoaded && (
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-600 text-sm text-center">Loading your contact details...</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-600 text-sm text-center">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {apiError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm text-center">{apiError}</p>
            <p className="text-red-500 text-xs mt-1 text-center">
              Please fix the errors and try again.
            </p>
          </div>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* FULL ADDRESS */}
          <div className="md:col-span-2 lg:col-span-3">
            <label style={labelStyle}>Full Address <span style={{ color: "red" }}>*</span></label>
            <textarea
              name="fullAddress"
              value={formData.fullAddress || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{...fieldStyle, minHeight: "100px", resize: "vertical"}}
              placeholder="Enter your complete address (minimum 10 characters)"
              rows={3}
            />
            {validationErrors.fullAddress && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.fullAddress}</p>
            )}
          </div>

          {/* STREET ADDRESS */}
          <div>
            <label style={labelStyle}>Street Address</label>
            <input
              name="streetAddress"
              value={formData.streetAddress || ""}
              onChange={handleChange}
              style={fieldStyle}
              placeholder="House number, street"
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label style={labelStyle}>Country <span style={{ color: "red" }}>*</span></label>
            <select
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
              required
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.name}>
                  {country.name} ({country.isoCode})
                </option>
              ))}
            </select>
            {validationErrors.country && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.country}</p>
            )}
          </div>

          {/* STATE */}
          <div>
            <label style={labelStyle}>State</label>
            <select
              name="state"
              value={formData.state || ""}
              onChange={handleChange}
              style={fieldStyle}
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {!formData.country ? "Select a country first" : `${states.length} states available`}
            </p>
          </div>

          {/* CITY - FIXED: Now it should show cities correctly */}
          <div>
            <label style={labelStyle}>City <span style={{ color: "red" }}>*</span></label>
            <select
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
              required
              disabled={!formData.state || cities.length === 0}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={`${city.name}-${city.stateCode}`} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {validationErrors.city && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {!formData.state 
                ? "Select a state first" 
                : cities.length === 0 
                  ? "No cities found for this state. Please enter city manually below."
                  : `${cities.length} cities available`}
            </p>
          </div>

          {/* MANUAL CITY INPUT (fallback) */}
          {formData.state && cities.length === 0 && (
            <div>
              <label style={labelStyle}>Enter City Manually <span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                style={fieldStyle}
                placeholder="Enter your city name"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                City not found in database. Please enter manually.
              </p>
            </div>
          )}

          {/* PIN CODE */}
          <div>
            <label style={labelStyle}>PIN Code <span style={{ color: "red" }}>*</span></label>
            <input
              name="pinCode"
              value={formData.pinCode || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
              placeholder="6-digit PIN code"
              maxLength={6}
            />
            {validationErrors.pinCode && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.pinCode}</p>
            )}
          </div>

          {/* MOBILE NUMBER */}
          <div>
            <label style={labelStyle}>Mobile Number <span style={{ color: "red" }}>*</span></label>
            <input
              name="mobileNumber"
              value={formData.mobileNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
              placeholder="e.g., +91-9876543210"
            />
            {validationErrors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.mobileNumber}</p>
            )}
          </div>

          {/* ALTERNATE MOBILE NUMBER */}
          <div>
            <label style={labelStyle}>Alternate Mobile Number</label>
            <input
              name="alternateNumber"
              value={formData.alternateNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
              placeholder="Alternative contact number"
            />
          </div>

          {/* WHATSAPP NUMBER */}
          <div>
            <label style={labelStyle}>WhatsApp Number</label>
            <input
              name="whatsappNumber"
              value={formData.whatsappNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
              placeholder="WhatsApp number (if different)"
            />
          </div>

          {/* EMAIL ADDRESS */}
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="emailAddress"
              value={formData.emailAddress || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
              placeholder="your.email@example.com"
            />
          </div>

          {/* EMERGENCY CONTACT NAME */}
          <div>
            <label style={labelStyle}>Emergency Contact Name</label>
            <input
              name="emergencyContactName"
              value={formData.emergencyContactName || ""}
              onChange={handleChange}
              style={fieldStyle}
              placeholder="Name of emergency contact"
            />
          </div>

          {/* EMERGENCY CONTACT NUMBER */}
          <div>
            <label style={labelStyle}>Emergency Contact Number</label>
            <input
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
              placeholder="Emergency contact phone"
            />
          </div>

          {/* EMERGENCY CONTACT RELATION */}
          <div>
            <label style={labelStyle}>Emergency Contact Relation</label>
            <select
              name="emergencyContactRelation"
              value={formData.emergencyContactRelation || ""}
              onChange={handleChange}
              style={fieldStyle}
            >
              <option value="">Select Relation</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Brother">Brother</option>
              <option value="Sister">Sister</option>
              <option value="Spouse">Spouse</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* PREFERRED CONTACT METHOD */}
          <div>
            <label style={labelStyle}>Preferred Contact Method</label>
            <select
              name="preferredContactMethod"
              value={formData.preferredContactMethod || ""}
              onChange={handleChange}
              style={fieldStyle}
            >
              <option value="">Select Method</option>
              <option value="Mobile">Mobile</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Email">Email</option>
              <option value="Alternate Number">Alternate Number</option>
            </select>
          </div>

          {/* CONTACT VISIBILITY */}
          <div>
            <label style={labelStyle}>Contact Visibility <span style={{ color: "red" }}>*</span></label>
            <select
              name="contactVisibility"
              value={formData.contactVisibility || "PRIVATE"}
              onChange={handleChange}
              onBlur={handleBlur}
              style={fieldStyle}
            >
              <option value="PRIVATE">Private (Only you)</option>
              <option value="MEMBERS_ONLY">Members Only</option>
              <option value="PUBLIC">Public (All users)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Who can see your contact information
            </p>
          </div>

        </form>
      </div>

      {/* BUTTONS */}
      <div 
        className="flex justify-end gap-4 py-4 px-4 sm:px-6 md:px-10" 
        style={{ backgroundColor: "#FF8C4405" }}
      >
        <button
          onClick={prevStep}
          className="bg-white text-orange-600 px-10 py-3 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
          disabled={loading || (isFetching && !dataLoaded)}
        >
          Previous
        </button>

        <button
          disabled={!isValid || loading || (isFetching && !dataLoaded)}
          onClick={handleNext}
          className={`px-10 py-3 text-white rounded-lg transition-colors ${
            isValid && !loading && !(isFetching && !dataLoaded)
              ? "bg-orange-400 hover:bg-orange-500 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              {hasExistingContact ? "Updating..." : "Saving..."}
            </>
          ) : (isFetching && !dataLoaded) ? (
            "Loading..."
          ) : hasExistingContact ? (
            "Update & Next"
          ) : (
            "Save & Next"
          )}
        </button>
      </div>

    </div>
  );
};

export default Step6ResidentialDetails;