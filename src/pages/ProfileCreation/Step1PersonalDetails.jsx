/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from "react";
import { City } from "country-state-city";
import Stepper from "./Stepper";
import {
  useCreatePersonalDetailsMutation,
  useGetPersonalDetailsQuery,
  useUpdatePersonalDetailsMutation
} from "../../context/createProfile";

const Step1PersonalDetails = ({
  nextStep,
  goToStep,
  data,
  setData,
  completedStep,
  step,
}) => {
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [formData, setFormData] = useState(data || {});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentVersion, setCurrentVersion] = useState(0);

  // RTK Query hooks
  const [createPersonalDetails] = useCreatePersonalDetailsMutation();
  const [updatePersonalDetails] = useUpdatePersonalDetailsMutation();

  // GET API hook
  const {
    data: profileApiResponse,
    isLoading: isFetching,
    error: profileError,
    isSuccess,
    isError
  } = useGetPersonalDetailsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  // Required fields
  const apiRequiredKeys = [
    "firstName", "middleName", "lastName", "age", "gender", "status",
    "address", "taluka", "district", "pinCode", "religion", "caste",
    "maritalStatus", "heightFt", "heightIn", "weight", "bloodGroup",
    "complexion", "diet", "spectacle", "lens", "physicallyChallenged",
    "homeTownDistrict", "nativeTaluka", "currentCity"
  ];

  const isFormValid = apiRequiredKeys.every(
    (key) => formData[key] !== undefined && formData[key] !== ""
  );

  const [validationErrors, setValidationErrors] = useState({});

  // Data arrays for dropdowns
  const genderOptions = ["MALE", "FEMALE", "OTHER"];
  const statusOptions = ["ACTIVE"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const complexionOptions = ["Fair", "Wheatish", "Dark"];
  const dietOptions = ["Vegetarian", "Non-Vegetarian", "Eggetarian"];
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const religionOptions = [
    "Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other",
  ];
  const yesNoOptions = ["Yes", "No"];

  // Height options
  const heightFtOptions = [4, 5, 6, 7];
  const heightInOptions = Array.from({ length: 12 }, (_, i) => i);

  // LOAD DATA FROM GET API
  useEffect(() => {
    if (profileApiResponse && !dataLoaded) {
      console.log("Profile fetch response:", profileApiResponse);

      if (profileApiResponse.data) {
        setHasExistingProfile(true);
        const profileData = profileApiResponse.data;
        setCurrentVersion(profileData.version || 0);

        // Parse height from backend
        let heightFt = "", heightIn = "";
        if (profileData.height) {
          const heightCm = profileData.height;
          const totalInches = heightCm / 2.54;
          heightFt = Math.floor(totalInches / 12).toString();
          heightIn = Math.round(totalInches % 12).toString();
        }

        // Transform backend data to form format
        const transformedData = {
          firstName: profileData.firstName || "",
          middleName: profileData.middleName || "",
          lastName: profileData.lastName || "",
          age: profileData.age ? profileData.age.toString() : "",
          gender: profileData.gender || "",
          status: profileData.status || "INACTIVE",
          address: profileData.address || "",
          taluka: profileData.taluka || "",
          district: profileData.district || "",
          pinCode: profileData.pinCode ? profileData.pinCode.toString() : "",
          religion: profileData.religion || "",
          caste: profileData.caste || "",
          maritalStatus: profileData.maritalStatus || "",
          heightFt: heightFt,
          heightIn: heightIn,
          weight: profileData.weight ? profileData.weight.toString() : "",
          bloodGroup: profileData.bloodGroup || "",
          complexion: profileData.complexion || "",
          diet: profileData.diet || "",
          spectacle: profileData.spectacle ? "Yes" : "No",
          lens: profileData.lens ? "Yes" : "No",
          physicallyChallenged: profileData.physicallyChallenged ? "Yes" : "No",
          homeTownDistrict: profileData.homeTownDistrict || "",
          nativeTaluka: profileData.nativeTaluka || "",
          currentCity: profileData.currentCity || "",
        };

        console.log("Form data populated:", transformedData);

        setFormData(transformedData);
        setData(transformedData);
        setDataLoaded(true);

        setSuccessMessage("Personal details loaded successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  }, [profileApiResponse, dataLoaded, setData]);

  // Handle error state
  useEffect(() => {
    if (profileError && !dataLoaded) {
      console.log("Profile fetch error:", profileError);

      const errorData = profileError.data || {};
      const errorMessageText = errorData.message || "";
      const isProfileNotFound =
        profileError.status === 500 ||
        errorMessageText.includes("profile not found") ||
        errorMessageText.includes("Profile not found") ||
        errorMessageText.includes("No profile found") ||
        errorMessageText.includes("ProfileNotFoundException");

      if (isProfileNotFound) {
        setHasExistingProfile(false);
        setDataLoaded(true);
        setSuccessMessage("No existing profile found. Please create a new one.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else if (profileError.status === 401 || profileError.status === 403) {
        // setErrorMessage("Session expired. Please login again.");
        setDataLoaded(true);
      } else {
        console.error("Unexpected error:", profileError);
        // setErrorMessage("Failed to load profile data");
        setDataLoaded(true);
      }
    }
  }, [profileError, dataLoaded]);

  // Handle successful query with no data
  useEffect(() => {
    if (isSuccess && !profileApiResponse?.data && !dataLoaded) {
      console.log("No profile data found - new user");
      setHasExistingProfile(false);
      setDataLoaded(true);
      setSuccessMessage("No existing profile found. Please create a new one.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [isSuccess, profileApiResponse, dataLoaded]);

  // SMARTER WAY: Load cities as talukas from country-state-city library
  useEffect(() => {
    // Get all cities from Maharashtra state
    const maharashtraCities = City.getCitiesOfState("IN", "MH");

    // Extract city names and remove duplicates
    const cityNames = [...new Set(maharashtraCities.map(city => city.name))];

    // Sort alphabetically
    const sortedCities = cityNames.sort();

    console.log(`Loaded ${sortedCities.length} cities/talukas from Maharashtra`);

    // Use these as both districts and talukas (smart shortcut)
    setDistricts(sortedCities);
    setTalukas(sortedCities);
  }, []);

  const validateField = (name, value) => {
    let err = "";
    if (!value || value.toString().trim() === "") {
      err = "This field is required";
    } else {
      if (name === "pinCode") {
        if (!/^[1-9][0-9]{5}$/.test(value)) {
          err = "Enter a valid Indian PIN code";
        }
      }

      if (
        ["firstName", "middleName", "lastName"].includes(name) &&
        !/^[A-Za-z\s]+$/.test(value)
      ) {
        err = "Only alphabets and spaces allowed";
      }
      if (name === "age") {
        const ageNum = parseInt(value);
        if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
          err = "Age must be between 18 and 100";
        }
      }
      if (["caste", "subCaste"].includes(name)) {
        if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
          err = "Only alphabets and spaces allowed";
        } else if (value.trim().length < 2) {
          err = "Must be at least 2 characters";
        }
      }
      if (name === "weight") {
        const weightNum = parseFloat(value);
        if (isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
          err = "Weight must be between 30 and 300 kg";
        }
      }
      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        err = "Enter a valid email address";
      }
      if (name === "heightFt") {
        const ft = parseInt(value);
        if (isNaN(ft) || ft < 4 || ft > 7) {
          err = "Height must be between 4 and 7 feet";
        }
      }
      if (name === "heightIn") {
        const inches = parseInt(value);
        if (isNaN(inches) || inches < 0 || inches > 11) {
          err = "Inches must be between 0 and 11";
        }
      }
    }
    setValidationErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAllFields = () => {
    const errors = {};
    apiRequiredKeys.forEach((key) => {
      validateField(key, formData[key] || "");
      if (!formData[key]) {
        errors[key] = "Required";
      }
    });
    return Object.keys(errors).length === 0;
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
    console.log("=== PREPARING API DATA ===");
    console.log("Form Data:", formData);
    console.log("Has existing profile:", hasExistingProfile);
    console.log("Current version:", currentVersion);

    // Convert height to centimeters
    const ft = parseInt(formData.heightFt || 0);
    const inches = parseInt(formData.heightIn || 0);
    const heightCm = Math.round((ft * 12 + inches) * 2.54);

    // Parse numeric values
    const weightValue = parseInt(formData.weight || 0);
    const pinCodeValue = parseInt(formData.pinCode || 0);
    const ageValue = parseInt(formData.age || 0);

    // For CREATE (POST)
    if (!hasExistingProfile) {
      const apiData = {
        firstName: (formData.firstName || "").trim(),
        middleName: (formData.middleName || "").trim(),
        lastName: (formData.lastName || "").trim(),
        age: ageValue,
        gender: (formData.gender || "").toUpperCase(),
        status: (formData.status || "INACTIVE").toUpperCase(),
        address: (formData.address || "").trim(),
        taluka: (formData.taluka || "").trim(),
        district: (formData.district || "").trim(),
        pinCode: pinCodeValue,
        religion: (formData.religion || "").trim(),
        caste: (formData.caste || "").trim(),
        maritalStatus: (formData.maritalStatus || "").trim(),
        height: heightCm,
        weight: weightValue,
        bloodGroup: (formData.bloodGroup || "").trim(),
        complexion: (formData.complexion || "").trim(),
        diet: (formData.diet || "").trim(),
        spectacle: formData.spectacle === "Yes",
        lens: formData.lens === "Yes",
        physicallyChallenged: formData.physicallyChallenged === "Yes",
        homeTownDistrict: (formData.homeTownDistrict || "").trim(),
        nativeTaluka: (formData.nativeTaluka || "").trim(),
        currentCity: (formData.currentCity || "").trim()
      };

      console.log("POST API Data:", apiData);
      return apiData;
    }

    // For UPDATE (PATCH) - MUST include version
    const apiData = {
      // VERSION IS REQUIRED FOR PATCH
      version: currentVersion,
      firstName: (formData.firstName || "").trim(),
      middleName: (formData.middleName || "").trim(),
      lastName: (formData.lastName || "").trim(),
      age: ageValue,
      gender: (formData.gender || "").toUpperCase(),
      status: (formData.status || "INACTIVE").toUpperCase(),
      address: (formData.address || "").trim(),
      taluka: (formData.taluka || "").trim(),
      district: (formData.district || "").trim(),
      pinCode: pinCodeValue,
      religion: (formData.religion || "").trim(),
      caste: (formData.caste || "").trim(),
      maritalStatus: (formData.maritalStatus || "").trim(),
      height: heightCm,
      weight: weightValue,
      bloodGroup: (formData.bloodGroup || "").trim(),
      complexion: (formData.complexion || "").trim(),
      diet: (formData.diet || "").trim(),
      spectacle: formData.spectacle === "Yes",
      lens: formData.lens === "Yes",
      physicallyChallenged: formData.physicallyChallenged === "Yes",
      homeTownDistrict: (formData.homeTownDistrict || "").trim(),
      nativeTaluka: (formData.nativeTaluka || "").trim(),
      currentCity: (formData.currentCity || "").trim()
    };

    console.log("PATCH API Data (with version):", apiData);
    return apiData;
  };

  // Handle form submission
  const handleNextClick = async () => {
    console.log("=== PERSONAL DETAILS SUBMISSION STARTED ===");
    console.log("Has existing profile:", hasExistingProfile);
    console.log("Current version:", currentVersion);

    const missingFields = apiRequiredKeys.filter(
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

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Please login to save profile data");
      return;
    }

    // Additional token validation
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const tokenExp = tokenData.exp * 1000;
      const now = Date.now();

      // if (tokenExp < now) {
      //   localStorage.removeItem("token");
      //   setErrorMessage("Session expired. Please login again.");
      //   setTimeout(() => {
      //     window.location.href = "/signin";
      //   }, 2000);
      //   return;
      // }
    } catch (error) {
      console.error("Token parsing error:", error);
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const apiData = prepareApiData();

      if (hasExistingProfile) {
        console.log("=== SENDING PATCH REQUEST ===");

        const response = await updatePersonalDetails(apiData).unwrap();
        console.log("PATCH API Response:", response);

        setSuccessMessage("Profile updated successfully!");

        if (response?.data?.version !== undefined) {
          setCurrentVersion(response.data.version);
        }

        setTimeout(() => {
          nextStep();
        }, 500);
      }
      else {
        console.log("=== SENDING POST REQUEST ===");

        const response = await createPersonalDetails(apiData).unwrap();
        console.log("POST API Response:", response);

        if (response.statusCode === 201 || response.success === true || response.code === "201") {
          setSuccessMessage("Profile created successfully!");
          setHasExistingProfile(true);

          if (response.data?.version) {
            setCurrentVersion(response.data.version);
          }

          setTimeout(() => {
            nextStep();
          }, 1500);
        } else {
          setErrorMessage(response.message || "Failed to create profile");
        }
      }
    } catch (error) {
      console.error("=== PERSONAL DETAILS API ERROR ===");
      console.error("Complete error:", error);
      console.error("Error status:", error.status);
      console.error("Error data:", error.data);

      let errorMsg = "Failed to save profile. Please try again.";

      if (error.data) {
        if (error.data.details) {
          // Parse details string like family background
          try {
            const detailsStr = error.data.details;
            const cleaned = detailsStr.replace(/[{}]/g, '');
            const errors = cleaned.split(', ');
            const errorMessages = errors.map(err => {
              const parts = err.split('=');
              return parts.length > 1 ? parts[1] : parts[0];
            });
            errorMsg = errorMessages.join('. ');
          } catch (e) {
            errorMsg = error.data.details;
          }
        } else if (error.data.errors) {
          const validationErrors = Object.entries(error.data.errors)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMsg = `Validation errors: ${validationErrors}`;
        } else if (error.data.message) {
          errorMsg = error.data.message;
        } else if (error.data.title) {
          errorMsg = error.data.title || "Invalid request data";
          if (error.data.detail) {
            errorMsg += `: ${error.data.detail}`;
          }
        }
      } else if (error.status === 400) {
        errorMsg = "Invalid data. Please check all required fields are filled correctly.";
      } else if (error.status === 409) {
        errorMsg = "Profile was modified by another session. Please refresh and try again.";
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

  // Check authentication
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
            Please login to access your profile data.
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

  // Show loading state
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
          <span className="ml-3">Loading profile data...</span>
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
            className={`mb-6 p-3 rounded-md ${hasExistingProfile
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
          Personal Information
        </h3>

        {/* FORM GRID */}
        <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          {/* FIRST NAME */}
          <div>
            <label style={labelStyle}>First Name <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
              placeholder="Enter First Name"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={45}
            />
            {validationErrors.firstName && (
              <p className="text-red-500 text-xs">
                {validationErrors.firstName}
              </p>
            )}
          </div>

          {/* MIDDLE NAME */}
          <div>
            <label style={labelStyle}>Middle Name <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="middleName"
              value={formData.middleName || ""}
              onChange={handleChange}
              placeholder="Enter Middle Name"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={45}
            />
            {validationErrors.middleName && (
              <p className="text-red-500 text-xs">
                {validationErrors.middleName}
              </p>
            )}
          </div>

          {/* LAST NAME */}
          <div>
            <label style={labelStyle}>Last Name <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              onChange={handleChange}
              placeholder="Enter Last Name"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={45}
            />
            {validationErrors.lastName && (
              <p className="text-red-500 text-xs">
                {validationErrors.lastName}
              </p>
            )}
          </div>

          {/* AGE */}
          <div>
            <label style={labelStyle}>Age <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              placeholder="Enter Age"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              min="18"
              max="100"
            />
            {validationErrors.age && (
              <p className="text-red-500 text-xs">{validationErrors.age}</p>
            )}
          </div>

          {/* GENDER */}
          <div>
            <label style={labelStyle}>Gender <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            {validationErrors.gender && (
              <p className="text-red-500 text-xs">{validationErrors.gender}</p>
            )}
          </div>

          {/* STATUS */}
          <div>
            <label style={labelStyle}>Status <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {validationErrors.status && (
              <p className="text-red-500 text-xs">{validationErrors.status}</p>
            )}
          </div>

          {/* CASTE */}
          <div>
            <label style={labelStyle}>Caste <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="caste"
              value={formData.caste || ""}
              onChange={handleChange}
              placeholder="Enter Caste"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            />
            {validationErrors.caste && (
              <p className="text-red-500 text-xs">{validationErrors.caste}</p>
            )}
          </div>

          {/* MARITAL STATUS */}
          <div>
            <label style={labelStyle}>Marital Status <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="maritalStatus"
              value={formData.maritalStatus || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              {maritalStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {validationErrors.maritalStatus && (
              <p className="text-red-500 text-xs">
                {validationErrors.maritalStatus}
              </p>
            )}
          </div>

          {/* HEIGHT */}
          <div>
            <label style={labelStyle}>Height <span style={{ color: "red" }}>*</span></label>
            <div className="flex gap-2">
              <select
                required
                name="heightFt"
                value={formData.heightFt || ""}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
                style={fieldStyle}
              >
                <option value="">Ft</option>
                {heightFtOptions.map((ft) => (
                  <option key={ft} value={ft}>
                    {ft}
                  </option>
                ))}
              </select>
              <select
                required
                name="heightIn"
                value={formData.heightIn || ""}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
                style={fieldStyle}
              >
                <option value="">Inches</option>
                {heightInOptions.map((inch) => (
                  <option key={inch} value={inch}>
                    {inch}
                  </option>
                ))}
              </select>
            </div>
            {(validationErrors.heightFt || validationErrors.heightIn) && (
              <p className="text-red-500 text-xs">Height is required</p>
            )}
          </div>

          {/* WEIGHT */}
          <div>
            <label style={labelStyle}>Weight <span style={{ color: "red" }}>*</span></label>
            <div className="relative">
              <input
                required
                type="text"
                name="weight"
                value={formData.weight || ""}
                onChange={handleChange}
                placeholder="Enter weight in kg"
                className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
                style={fieldStyle}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                kg
              </span>
            </div>
            {validationErrors.weight && (
              <p className="text-red-500 text-xs">{validationErrors.weight}</p>
            )}
          </div>

          {/* BLOOD GROUP */}
          <div>
            <label style={labelStyle}>Blood Group <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="bloodGroup"
              value={formData.bloodGroup || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              {bloodGroupOptions.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
            {validationErrors.bloodGroup && (
              <p className="text-red-500 text-xs">
                {validationErrors.bloodGroup}
              </p>
            )}
          </div>

          {/* COMPLEXION */}
          <div>
            <label style={labelStyle}>Complexion <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="complexion"
              value={formData.complexion || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              {complexionOptions.map((complexion) => (
                <option key={complexion} value={complexion}>
                  {complexion}
                </option>
              ))}
            </select>
            {validationErrors.complexion && (
              <p className="text-red-500 text-xs">
                {validationErrors.complexion}
              </p>
            )}
          </div>

          {/* DIET */}
          <div>
            <label style={labelStyle}>Diet <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="diet"
              value={formData.diet || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              {dietOptions.map((diet) => (
                <option key={diet} value={diet}>
                  {diet}
                </option>
              ))}
            </select>
            {validationErrors.diet && (
              <p className="text-red-500 text-xs">{validationErrors.diet}</p>
            )}
          </div>

          {/* SPECTACLE */}
          <div>
            <label style={labelStyle}>Spectacle <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="spectacle"
              value={formData.spectacle || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              {yesNoOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {validationErrors.spectacle && (
              <p className="text-red-500 text-xs">
                {validationErrors.spectacle}
              </p>
            )}
          </div>

          {/* LENS */}
          <div>
            <label style={labelStyle}>Lens <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="lens"
              value={formData.lens || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              {yesNoOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {validationErrors.lens && (
              <p className="text-red-500 text-xs">{validationErrors.lens}</p>
            )}
          </div>

          {/* PHYSICALLY CHALLENGED */}
          <div>
            <label style={labelStyle}>Physically Challenged <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="physicallyChallenged"
              value={formData.physicallyChallenged || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select</option>
              {yesNoOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {validationErrors.physicallyChallenged && (
              <p className="text-red-500 text-xs">
                {validationErrors.physicallyChallenged}
              </p>
            )}
          </div>

          {/* HOMETOWN DISTRICT */}
          <div>
            <label style={labelStyle}>Home Town District <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="homeTownDistrict"
              value={formData.homeTownDistrict || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
              style={fieldStyle}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {validationErrors.homeTownDistrict && (
              <p className="text-red-500 text-xs">{validationErrors.homeTownDistrict}</p>
            )}
          </div>

          {/* PIN CODE */}
          <div>
            <label style={labelStyle}>Pin Code <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="pinCode"
              value={formData.pinCode || ""}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                handleChange({
                  target: { name: "pinCode", value: digitsOnly },
                });
              }}
              placeholder="Enter 6-digit Pin Code"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={6}
            />
            {validationErrors.pinCode && (
              <p className="text-red-500 text-xs">{validationErrors.pinCode}</p>
            )}
          </div>

          {/* TALUKA - Now has complete list */}
          <div>
            <label style={labelStyle}>Taluka <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="taluka"
              value={formData.taluka || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
              style={fieldStyle}
            >
              <option value="">Select Taluka</option>
              {talukas.map((taluka, index) => (
                <option key={index} value={taluka}>
                  {taluka}
                </option>
              ))}
            </select>
            {validationErrors.taluka && (
              <p className="text-red-500 text-xs">{validationErrors.taluka}</p>
            )}
          </div>

          {/* NATIVE TALUKA - Same complete list */}
          <div>
            <label style={labelStyle}>Native Taluka <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="nativeTaluka"
              value={formData.nativeTaluka || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
              style={fieldStyle}
            >
              <option value="">Select Native Taluka</option>
              {talukas.map((taluka, index) => (
                <option key={index} value={taluka}>
                  {taluka}
                </option>
              ))}
            </select>
            {validationErrors.nativeTaluka && (
              <p className="text-red-500 text-xs">{validationErrors.nativeTaluka}</p>
            )}
          </div>

          {/* DISTRICT */}
          <div>
            <label style={labelStyle}>District <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="district"
              value={formData.district || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
              style={fieldStyle}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {validationErrors.district && (
              <p className="text-red-500 text-xs">
                {validationErrors.district}
              </p>
            )}
          </div>

          {/* RELIGION */}
          <div>
            <label style={labelStyle}>Religion <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="religion"
              value={formData.religion || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
            >
              <option value="">Select Religion</option>
              {religionOptions.map((religion) => (
                <option key={religion} value={religion}>
                  {religion}
                </option>
              ))}
            </select>
            {validationErrors.religion && (
              <p className="text-red-500 text-xs">
                {validationErrors.religion}
              </p>
            )}
          </div>

          {/* CURRENT CITY */}
          <div>
            <label style={labelStyle}>Current City <span style={{ color: "red" }}>*</span></label>
            <select
              required
              name="currentCity"
              value={formData.currentCity || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none truncate"
              style={fieldStyle}
            >
              <option value="">Select Current City</option>
              {districts.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {validationErrors.currentCity && (
              <p className="text-red-500 text-xs">{validationErrors.currentCity}</p>
            )}
          </div>

          {/* ADDRESS */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <label style={labelStyle}>Address <span style={{ color: "red" }}>*</span></label>
            <input
              required
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Enter Full Address"
              className="w-full px-3 py-2 focus:ring-1 focus:ring-orange-400 outline-none"
              style={fieldStyle}
              maxLength={250}
            />
            {validationErrors.address && (
              <p className="text-red-500 text-xs">{validationErrors.address}</p>
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
              {hasExistingProfile ? "Updating..." : "Creating..."}
            </>
          ) : (
            "Save & Next"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step1PersonalDetails;