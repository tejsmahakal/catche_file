import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import Step1PersonalDetails from "../../pages/ProfileCreation/Step1PersonalDetails";
import Step2HoroscopeDetails from "../../pages/ProfileCreation/Step2HoroscopeDetails";
import Step3EducationDetails from "../../pages/ProfileCreation/Step3EducationDetails";
import Step4FamilyBackground from "../../pages/ProfileCreation/Step4FamilyBackground";
import Step5PartnerExpectations from "../../pages/ProfileCreation/Step5PartnerExpectations";
import Step6ResidentialDetails from "../../pages/ProfileCreation/Step6ResidentialDetails";
import Step7ProfilePasswordPhoto from "../../pages/ProfileCreation/Step7ProfilePasswordPhoto";

// Import ALL API hooks to check data
import {
  useGetPersonalDetailsQuery,
  useGetHoroscopeDetailsQuery,
  useGetEducationDetailsQuery,
  useGetFamilyBackgroundQuery,
  useGetPartnerPreferenceQuery,
  useGetResidentialDetailsQuery,
} from "../../context/createProfile";

const ProfileCreation = () => {
  const { user } = useAuth();

  // Fetch data for all steps
  const { data: personalResponse, isLoading: loading1 } = useGetPersonalDetailsQuery();
  const { data: horoscopeResponse, isLoading: loading2 } = useGetHoroscopeDetailsQuery();
  const { data: educationResponse, isLoading: loading3 } = useGetEducationDetailsQuery();
  const { data: familyResponse, isLoading: loading4 } = useGetFamilyBackgroundQuery();
  const { data: partnerResponse, isLoading: loading5 } = useGetPartnerPreferenceQuery();
  const { data: residentialResponse, isLoading: loading6 } = useGetResidentialDetailsQuery();

  // Check if user has saved data for EACH step in database
  const hasPersonalData = personalResponse?.data;
  const hasHoroscopeData = horoscopeResponse?.data;
  const hasEducationData = educationResponse?.data;
  const hasFamilyData = familyResponse?.data;
  const hasPartnerData = partnerResponse?.data;
  const hasResidentialData = residentialResponse?.data;

  // Check if ALL data is loaded
  const isLoading = loading1 || loading2 || loading3 || loading4 || loading5 || loading6;

  const [stepsCompletedInDB, setStepsCompletedInDB] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const completedSteps = [];
      
      if (hasPersonalData) completedSteps.push(1);
      if (hasHoroscopeData) completedSteps.push(2);
      if (hasEducationData) completedSteps.push(3);
      if (hasFamilyData) completedSteps.push(4);
      if (hasPartnerData) completedSteps.push(5);
      if (hasResidentialData) completedSteps.push(6);
      
      setStepsCompletedInDB(completedSteps);
    }
  }, [isLoading, hasPersonalData, hasHoroscopeData, hasEducationData, hasFamilyData, hasPartnerData, hasResidentialData]);

  const [step, setStep] = useState(1);
  const [completedStep, setCompletedStep] = useState(0);
  const [data, setData] = useState({});

  // Initialize state based on database data
  useEffect(() => {
    if (!isLoading && user?.id) {
      const totalCompletedSteps = stepsCompletedInDB.length;
      
      if (totalCompletedSteps === 0) {
        // NO data in database - start fresh at step 1
        setStep(1);
        setCompletedStep(0);
        setData({});
        
        // Clear localStorage
        localStorage.removeItem(`currentStep_${user.id}`);
        localStorage.removeItem(`completedStep_${user.id}`);
      } else if (totalCompletedSteps > 0 && totalCompletedSteps < 6) {
        // Some steps completed - continue from where left off
        const nextStep = Math.max(...stepsCompletedInDB) + 1;
        
        setStep(nextStep);
        setCompletedStep(Math.max(...stepsCompletedInDB));
        
        // Save to localStorage
        localStorage.setItem(`currentStep_${user.id}`, nextStep);
        localStorage.setItem(`completedStep_${user.id}`, Math.max(...stepsCompletedInDB));
      } else if (totalCompletedSteps >= 6) {
        // All main steps (1-6) completed - enable all steps
        const savedStep = Number(localStorage.getItem(`currentStep_${user.id}`)) || 1;
        setStep(savedStep);
        setCompletedStep(7); // Mark all as completed for stepper
        
        localStorage.setItem(`currentStep_${user.id}`, savedStep);
        localStorage.setItem(`completedStep_${user.id}`, 7);
      }
    }
  }, [isLoading, stepsCompletedInDB, user]);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`currentStep_${user.id}`, step);
      localStorage.setItem(`completedStep_${user.id}`, completedStep);
    }
  }, [step, completedStep, user]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const updateData = (updatedFields) => {
    setData((prev) => ({ ...prev, ...updatedFields }));
  };

  const goToStep = (num) => {
    // Can always go to current step
    if (num === step) {
      setStep(num);
      return;
    }
    
    // Can go to any COMPLETED step
    if (num <= completedStep) {
      setStep(num);
      return;
    }
    
    // CANNOT go to future steps without saving
    console.log(`Step ${num} is locked. Complete step ${step} first.`);
  };

  const nextStep = () => {  
    // Mark current step as completed
    const newCompletedStep = Math.max(completedStep, step);
    setCompletedStep(newCompletedStep);
    
    // Move to next step (max 7)
    const nextStepNumber = Math.min(step + 1, 7);
    setStep(nextStepNumber);
  };

  const prevStep = () => {
    const prevStepNumber = Math.max(step - 1, 1);
    setStep(prevStepNumber);
  };
  
  const hasFullyCompletedProfile = stepsCompletedInDB.length >= 6;

  // Show loading while checking database
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-0 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking your profile data...</p>
        </div>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-gray-50 pt-0 flex justify-center">
      <div className="w-[100%] max-w-[1600px] bg-white shadow-md rounded-lg p-6 md:p-10">
        <h2
          className="text-center text-gray-700 font-bold text-2xl mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {hasFullyCompletedProfile ? "Edit Your Profile" : "Create Your Profile"}
        </h2>

        {/* REMOVED all text message blocks */}
        
        {step === 1 && (
          <Step1PersonalDetails
            nextStep={nextStep}
            goToStep={goToStep}
            data={data}
            setData={updateData}
            step={step}
            completedStep={completedStep}
            hasDataForStep={hasFullyCompletedProfile}
          />
        )}

        {step === 2 && (
          <Step2HoroscopeDetails
            nextStep={nextStep}
            prevStep={prevStep}
            goToStep={goToStep}
            data={data}
            setData={updateData}
            step={step}
            completedStep={completedStep}
            hasDataForStep={hasFullyCompletedProfile}
          />
        )}

        {step === 3 && (
          <Step3EducationDetails
            nextStep={nextStep}
            prevStep={prevStep}
            goToStep={goToStep}
            data={data}
            setData={updateData}
            step={step}
            completedStep={completedStep}
            hasDataForStep={hasFullyCompletedProfile}
          />
        )}

        {step === 4 && (
          <Step4FamilyBackground
            nextStep={nextStep}
            prevStep={prevStep}
            goToStep={goToStep}
            data={data}
            setData={updateData}
            step={step}
            completedStep={completedStep}
            hasDataForStep={hasFullyCompletedProfile}
          />
        )}

        {step === 5 && (
          <Step5PartnerExpectations
            nextStep={nextStep}
            prevStep={prevStep}
            goToStep={goToStep}
            data={data}
            setData={updateData}
            step={step}
            completedStep={completedStep}
            hasDataForStep={hasFullyCompletedProfile}
          />
        )}

        {step === 6 && (
          <Step6ResidentialDetails
            nextStep={nextStep}
            prevStep={prevStep}
            goToStep={goToStep}
            data={data}
            setData={updateData}
            step={step}
            completedStep={completedStep}
            hasDataForStep={hasFullyCompletedProfile}
          />
        )}

        {step === 7 && (
          <Step7ProfilePasswordPhoto
            nextStep={nextStep}
            prevStep={prevStep}
            goToStep={goToStep}
            data={data}
            setData={updateData}
            step={step}
            completedStep={completedStep}
            hasDataForStep={hasFullyCompletedProfile}
          />
        )}
      </div>
    </div>
  );
}
export default ProfileCreation;