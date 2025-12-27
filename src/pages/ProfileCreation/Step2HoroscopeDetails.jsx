import React, { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { City } from "country-state-city";
import {
  useCreateHoroscopeDetailsMutation,
  useGetHoroscopeDetailsQuery,
  useUpdateHoroscopeDetailsMutation
} from "../../context/createProfile";

const Step2HoroscopeDetails = ({
  nextStep,
  prevStep,
  goToStep,
  data,
  setData,
  step,
  completedStep,
}) => {
  const [districts, setDistricts] = useState([]);
  const [formData, setFormData] = useState(data || {});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasExistingHoroscope, setHasExistingHoroscope] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [version, setVersion] = useState(0); // For optimistic locking

  // RTK Query hooks
  const [createHoroscopeDetails] = useCreateHoroscopeDetailsMutation();
  const [updateHoroscopeDetails] = useUpdateHoroscopeDetailsMutation();

  // GET API hook - Auto fetches on mount
  const {
    data: horoscopeApiResponse,
    isLoading: isFetching,
    error: horoscopeError,
    isSuccess,
    isError,
    refetch
  } = useGetHoroscopeDetailsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const requiredKeys = [
    "dob",
    "time",
    "birthPlace",
    "rashi",
    "nakshatra",
    "charan",
    "nadi",
    "gan",
    "mangal",
    "gotra",
    "devak",
  ];

  const isFormValid = requiredKeys.every(
    (key) => formData[key] !== undefined && formData[key] !== ""
  );

  const [validationErrors, setValidationErrors] = useState({});

  // LOAD DATA FROM GET API
  useEffect(() => {
    if (horoscopeApiResponse?.data && !dataLoaded) {
      console.log("Horoscope fetch response:", horoscopeApiResponse);

      const horoscopeData = horoscopeApiResponse.data;
      setHasExistingHoroscope(true);
      setVersion(horoscopeData.version || 0);

      // Format date for input field
      const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        try {
          // Handle both Date object and string
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return "";
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        } catch (error) {
          console.error("Error parsing date:", error);
          return "";
        }
      };

      // Transform backend data to form format
      const transformedData = {
        dob: formatDateForInput(horoscopeData.dob),
        time: horoscopeData.time || "",
        birthPlace: horoscopeData.birthPlace || "",
        rashi: horoscopeData.rashi || "",
        nakshatra: horoscopeData.nakshatra || "",
        charan: horoscopeData.charan || "",
        nadi: horoscopeData.nadi || "",
        gan: horoscopeData.gan || "",
        mangal: horoscopeData.mangal || "",
        gotra: horoscopeData.gotra || "",
        devak: horoscopeData.devak || "",
      };

      console.log("Horoscope form data populated:", transformedData);

      setFormData(transformedData);
      setData(transformedData);
      setDataLoaded(true);

      setSuccessMessage("Horoscope details loaded successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [horoscopeApiResponse, dataLoaded, setData]);

  // Handle 404 - No horoscope found (new user)
  useEffect(() => {
    if (horoscopeError?.status === 404 && !dataLoaded) {
      console.log("No horoscope found - new user");
      setHasExistingHoroscope(false);
      setDataLoaded(true);
      setSuccessMessage("Please create your horoscope details");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [horoscopeError, dataLoaded]);

  // Handle other errors
  useEffect(() => {
    if (horoscopeError && horoscopeError.status !== 404 && !dataLoaded) {
      console.log("Horoscope fetch error:", horoscopeError);
      
      if (horoscopeError.status === 401 || horoscopeError.status === 403) {
  // setErrorMessage("Session expired. Please login again.");
  setDataLoaded(true);
} else {
        // setErrorMessage("Failed to load horoscope data");
      }
      setDataLoaded(true);
    }
  }, [horoscopeError, dataLoaded]);

  // Check if GET returns empty data
  useEffect(() => {
    if (isSuccess && !horoscopeApiResponse?.data && !dataLoaded) {
      console.log("No horoscope data - new user");
      setHasExistingHoroscope(false);
      setDataLoaded(true);
      setSuccessMessage("Please create your horoscope details");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [isSuccess, horoscopeApiResponse, dataLoaded]);

  useEffect(() => {
    // For birth place districts
    const cities = City.getCitiesOfState("IN", "MH");
    setDistricts(cities);
  }, []);

  const validateField = (name, value) => {
    let err = "";
    if (!value || value.toString().trim() === "") {
      err = "This field is required";
    } else {
      if (name === "dob" && value) {
        const selected = new Date(value);
        const today = new Date();
        const minAllowed = new Date();
        minAllowed.setFullYear(today.getFullYear() - 18);

        if (selected > minAllowed) {
          err = "You must be at least 18 years old";
        }
      }
      
      if (name === "time" && !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
        err = "Enter valid time in HH:MM format (24-hour)";
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

    // Clear messages when user starts typing
    if (errorMessage) setErrorMessage("");
  };

  const prepareApiData = () => {
    console.log("=== PREPARING HOROSCOPE API DATA ===");
    console.log("Current form data:", formData);

    // Check all required fields
    const missingFields = requiredKeys.filter(key => !formData[key] || formData[key].toString().trim() === "");
    console.log("Missing required fields:", missingFields);

    // Format date for API - According to your DTO
    let dobFormatted = "";
    if (formData.dob) {
      const dateObj = new Date(formData.dob);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      dobFormatted = `${year}-${month}-${day}`;
      console.log("DOB formatted:", dobFormatted);
    }

    // Prepare API data according to HoroscopeCreateRequest DTO
    let apiData;
    
    if (hasExistingHoroscope) {
      // For PATCH (update) - needs version for optimistic locking
      apiData = {
        dob: dobFormatted,
        time: (formData.time || "").trim(),
        birthPlace: (formData.birthPlace || "").trim(),
        rashi: (formData.rashi || "").trim(),
        nakshatra: (formData.nakshatra || "").trim(),
        charan: (formData.charan || "").trim(),
        nadi: (formData.nadi || "").trim(),
        gan: (formData.gan || "").trim(),
        mangal: (formData.mangal || "").trim(),
        gotra: (formData.gotra || "").trim(),
        devak: (formData.devak || "").trim(),
        version: version // Include version for optimistic locking
      };
      console.log("PATCH Data (with version):", apiData);
    } else {
      // For POST (create)
      apiData = {
        dob: dobFormatted,
        time: (formData.time || "").trim(),
        birthPlace: (formData.birthPlace || "").trim(),
        rashi: (formData.rashi || "").trim(),
        nakshatra: (formData.nakshatra || "").trim(),
        charan: (formData.charan || "").trim(),
        nadi: (formData.nadi || "").trim(),
        gan: (formData.gan || "").trim(),
        mangal: (formData.mangal || "").trim(),
        gotra: (formData.gotra || "").trim(),
        devak: (formData.devak || "").trim()
      };
      console.log("POST Data:", apiData);
    }

    console.log("=== FINAL API DATA ===");
    console.log("JSON:", JSON.stringify(apiData, null, 2));

    return apiData;
  };

  const handleNextClick = async () => {
    console.log("=== HOROSCOPE FORM SUBMISSION STARTED ===");

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


    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      // Prepare API data according to backend DTO
      const apiData = prepareApiData();
      console.log("Sending horoscope data to API...");

      let response;

      if (hasExistingHoroscope) {
        console.log("Using PATCH to update existing horoscope");
        response = await updateHoroscopeDetails(apiData).unwrap();
      } else {
        console.log("Using POST to create new horoscope");
        response = await createHoroscopeDetails(apiData).unwrap();
      }

      console.log("API Response:", response);

      // Check response based on your backend structure
      if (response && response.data) {
        // Success - response contains data
        setVersion(response.data.version || 0); // Update version
        
        setSuccessMessage(
          hasExistingHoroscope
            ? "Horoscope details updated successfully!"
            : "Horoscope details created successfully!"
        );

        // Refetch to get latest data
        await refetch();

        // Move to next step after 1.5 seconds
        setTimeout(() => {
          nextStep();
        }, 1500);
      } else {
        // Response without data structure
        // setErrorMessage(response?.message || "Failed to save horoscope details");
      }
    } catch (error) {
      console.error("=== API ERROR DETAILS ===");
      console.error("Error status:", error.status);
      console.error("Error data:", error.data);
      console.error("Full error:", error);

      let errorMsg = "Failed to save horoscope details. Please try again.";

      // Handle different error formats from your backend
      if (error.data) {
        const errorData = error.data;
        
        // Handle Spring Boot validation errors
        if (errorData.errors) {
          const validationErrors = Object.entries(errorData.errors)
            .map(([field, messages]) => {
              if (Array.isArray(messages)) {
                return `${field}: ${messages.join(', ')}`;
              }
              return `${field}: ${messages}`;
            })
            .join(', ');
          errorMsg = `Validation errors: ${validationErrors}`;
        } 
        // Handle your ResponseDto error structure
        else if (errorData.message) {
          errorMsg = errorData.message;
        }
        // Handle Spring Boot error structure
        else if (errorData.title) {
          errorMsg = errorData.title;
          if (errorData.detail) {
            errorMsg += `: ${errorData.detail}`;
          }
        }
      } else if (error.status === 400) {
        errorMsg = "Invalid data. Please check all fields are correct.";
      } else if (error.status === 401 || error.status === 403) {
        // errorMsg = "Session expired. Please login again.";
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else if (error.status === 409) {
        errorMsg = "Horoscope already exists for this user.";
      } else if (error.status === 404) {
        errorMsg = "Horoscope not found. Please refresh and try again.";
      } else if (error.status === 500) {
        errorMsg = "Server error. Please try again later.";
      }

      setErrorMessage(errorMsg);
      
      // If optimistic lock failure, refresh data
      if (error.status === 409 || error.status === 412) {
        await refetch();
        setErrorMessage("Please refresh the page and try again.");
      }
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
            Please login to access your horoscope data.
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
          <span className="ml-3">Loading horoscope data...</span>
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
            className={`mb-6 p-3 rounded-md ${hasExistingHoroscope
                ? "bg-green-50 border border-green-200 text-green-600"
                : "bg-blue-50 border border-blue-200 text-blue-600"
              }`}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">{successMessage}</p>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-600 text-sm">{errorMessage}</p>
            </div>
          </div>
        )}

        <h3 className="text-center text-orange-400 font-[Inter] font-semibold uppercase mb-8 tracking-wide text-xl">
          Horoscope Details
        </h3>

        {/* FORM GRID */}
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          {/* BIRTH DATE */}
          <div>
            <label style={labelStyle}>Birth Date <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              max={new Date().toISOString().split("T")[0]}
            />
            {validationErrors.dob && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.dob}</p>
            )}
          </div>

          {/* BIRTH TIME */}
          <div>
            <label style={labelStyle}>Birth Time <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="time"
              value={formData.time || ""}
              onChange={handleChange}
              placeholder="HH:MM (24-hour format)"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
              title="Enter time in 24-hour format (e.g., 14:30)"
            />
            {validationErrors.time && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.time}</p>
            )}
          </div>

          {/* BIRTH PLACE */}
          <div>
            <label style={labelStyle}>Birth Place <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="birthPlace"
              value={formData.birthPlace || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
              style={fieldStyle}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            {validationErrors.birthPlace && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.birthPlace}</p>
            )}
          </div>

          {/* RASHI */}
          <div>
            <label style={labelStyle}>Rashi <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="rashi"
              value={formData.rashi || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Rashi</option>
              {[
                "Mesh", "Vrishabh", "Mithun", "Karka", "Simha", "Kanya", 
                "Tula", "Vrishchik", "Dhanu", "Makar", "Kumbh", "Meen"
              ].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {validationErrors.rashi && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.rashi}</p>
            )}
          </div>

          {/* NAKSHATRA */}
          <div>
            <label style={labelStyle}>Nakshatra <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="nakshatra"
              value={formData.nakshatra || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Nakshatra</option>
              {[
                "Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya",
                "Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati",
                "Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha",
                "Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"
              ].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {validationErrors.nakshatra && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.nakshatra}</p>
            )}
          </div>

          {/* CHARAN */}
          <div>
            <label style={labelStyle}>Charan <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="charan"
              value={formData.charan || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Charan</option>
              {["1","2","3","4"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {validationErrors.charan && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.charan}</p>
            )}
          </div>

          {/* NADI */}
          <div>
            <label style={labelStyle}>Nadi <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="nadi"
              value={formData.nadi || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Nadi</option>
              <option value="Adi">Adi</option>
              <option value="Madhya">Madhya</option>
              <option value="Antya">Antya</option>
            </select>
            {validationErrors.nadi && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.nadi}</p>
            )}
          </div>

          {/* GAN */}
          <div>
            <label style={labelStyle}>Gan <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="gan"
              value={formData.gan || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Gan</option>
              <option value="Dev">Dev</option>
              <option value="Manushya">Manushya</option>
              <option value="Rakshas">Rakshas</option>
            </select>
            {validationErrors.gan && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.gan}</p>
            )}
          </div>

          {/* MANGAL */}
          <div>
            <label style={labelStyle}>Mangal <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="mangal"
              value={formData.mangal || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Mangal</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {validationErrors.mangal && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.mangal}</p>
            )}
          </div>

          {/* GOTRA */}
          <div>
            <label style={labelStyle}>Gotra <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="gotra"
              value={formData.gotra || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Gotra</option>
              {[
                "Kashyap","Bharadwaj","Vashishtha","Jamadagni","Atri",
                "Vishvamitra","Gautam","Agastya","Shandilya","Kaushik"
              ].map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {validationErrors.gotra && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.gotra}</p>
            )}
          </div>

          {/* DEVAK */}
          <div>
            <label style={labelStyle}>Devak <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="devak"
              value={formData.devak || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Devak</option>
              {[
                "Audumbar","Vata","Peepal","Bel","Umbar","Palas",
                "Rui","Khair","Shami","Banyan"
              ].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {validationErrors.devak && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.devak}</p>
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
          className="bg-white text-orange-600 px-10 py-3 rounded-xl cursor-pointer border border-orange-500 hover:bg-orange-50 transition-colors duration-200"
          disabled={isLoading}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!isFormValid || isLoading}
          onClick={handleNextClick}
          className={`px-10 py-3 rounded-xl text-white flex items-center justify-center transition-colors duration-200 ${isFormValid && !isLoading
              ? "bg-orange-400 hover:bg-orange-500"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
              {hasExistingHoroscope ? "Updating..." : "Creating..."}
            </>
          ) : (
            "Save & Next"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step2HoroscopeDetails;