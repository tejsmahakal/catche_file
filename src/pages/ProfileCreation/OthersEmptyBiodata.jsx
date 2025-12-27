/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useSendInterestMutation,

} from "../../context/profileApi";

import defaultProfileImg from "../../assets/DefaultImage/AvtarImg.avif";


export const emptyBiodata = {
  fullName: "",
  age: "",
  gender: "",
  maritalStatus: "",
  religion: "",
  caste: "",
  subCaste: "",
  height: "",
  weight: "",
  bloodGroup: "",
  complexion: "",
  diet: "",
  lens: "",
  spectacle: "",
  physicallyChallenged: "",
  birthDate: "",
  birthTime: "",
  rashi: "",
  nakshatra: "",
  nadi: "",
  mangal: "",
  birthPlace: "",
  charan: "",
  gan: "",
  gotra: "",
  education: "",
  occupation: "",
  annualIncome: "",
  nativeTaluka: "",
  homeTown: "",
  currentCity: "",
  fatherName: "",
  motherName: "",
  brothers: "",
  sisters: "",
  marriedBrothers: "",
  marriedSisters: "",
  parentsResidingIn: "",
  parentsOccupation: "",
  mamaSurname: "",
  mamaPlace: "",
  relativeSurnames: "",
  partnerCities: "",
  partnerEducation: "",
  partnerOccupation: "",
  partnerIncome: "",
  partnerAge: "",
  partnerCaste: "",
  partnerHeight: "",
  partnerMangal: "",
  userId: null,
};

const FieldRow = ({ leftTitle, leftValue, rightTitle, rightValue }) => (
  <div className="flex flex-wrap justify-between w-full text-sm mb-1">
    <div className="flex w-full md:w-1/2 min-w-0">
      <span className="font-semibold text-gray-700 w-32 md:w-40">
        {leftTitle}
      </span>
      <span className="w-3 text-center">:</span>
      <span className="text-gray-800 break-words">{leftValue}</span>
    </div>

    <div className="flex w-full md:w-1/2 min-w-0 mt-1 md:mt-0">
      <span className="font-semibold text-gray-700 w-32 md:w-40">
        {rightTitle}
      </span>
      <span className="w-3 text-center">:</span>
      <span className="text-gray-800 break-words">{rightValue}</span>
    </div>
  </div>
);

export default function OthersEmptyBiodata({ data = emptyBiodata }) {
  const navigate = useNavigate();
  const [sendInterest, { isLoading: sending }] = useSendInterestMutation();
  const [showContact, setShowContact] = useState(false);


  const profileImage = data?.profileImage || defaultProfileImg;



  const handleSendInterest = async () => {
    if (!data?.userId) {
      alert("User ID missing, cannot send interest");
      return;
    }

    try {
      const res = await sendInterest({
        toUserId: data.userId,
        message: "Hi! I found your profile interesting.",
      }).unwrap();

      alert(res?.message || "Interest sent successfully!");
    } catch (err) {
      console.error("Interest API Error:", err);

      alert(
        err?.data?.message ||
        "Failed to send interest. Please try again."
      );
    }
  };


  return (
    <>
      {/* MAIN PAGE */}
      <div className="w-full flex justify-center py-6 sm:py-10 bg-[#fafafa] font-[Inter]">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl px-4 py-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* LEFT IMAGE */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-60 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // 🔒 STOP LOOP
                    e.currentTarget.src = defaultProfileImg;
                  }}
                />


              </div>

              {/* CONTACT BUTTON */}
              <button
                onClick={() => setShowContact(true)}
                className="mt-6 bg-orange-500 text-white px-10 py-2 rounded-lg font-medium hover:bg-orange-600"
              >
                Contact
              </button>
            </div>

            {/* RIGHT DETAILS */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-orange-500 mb-3">
                PERSONAL DETAILS
              </h3>

              <FieldRow
                leftTitle="Full Name"
                leftValue={data.fullName}
                rightTitle="Gender"
                rightValue={data.gender}
              />
              <FieldRow
                leftTitle="Caste"
                leftValue={data.caste}
                rightTitle="age"
                rightValue={data.age}
              />
              <FieldRow
                leftTitle="Marital Status"
                leftValue={data.maritalStatus}
                rightTitle="City"
                rightValue={data.taluka}
              />
              <FieldRow
                leftTitle="Height"
                leftValue={data.height}
                rightTitle="Weight"
                rightValue={data.weight}
              />
              <FieldRow
                leftTitle="Blood Group"
                leftValue={data.bloodGroup}
                rightTitle="Complexion"
                rightValue={data.complexion}
              />
              <FieldRow
                leftTitle="Diet"
                leftValue={data.diet}
                rightTitle="Spectacle"
                rightValue={data.spectacle}
              />
              <FieldRow
                leftTitle="Lens"
                leftValue={data.lens}
                rightTitle="Physically Challenged"
                rightValue={data.physicallyChallenged}
              />

              {/* Horoscope */}
              <h3 className="text-xl font-semibold text-orange-500 mt-6 mb-3">
                HOROSCOPE DETAILS
              </h3>

              <FieldRow
                leftTitle="Birth Date"
                leftValue={data.birthDate}
                rightTitle="Birth Time"
                rightValue={data.birthTime}
              />
              <FieldRow
                leftTitle="Rashi"
                leftValue={data.rashi}
                rightTitle="Birth Place"
                rightValue={data.birthPlace}
              />
              <FieldRow
                leftTitle="Nakshatra"
                leftValue={data.nakshatra}
                rightTitle="Charan"
                rightValue={data.charan}
              />
              <FieldRow
                leftTitle="Nadi"
                leftValue={data.nadi}
                rightTitle="Gan"
                rightValue={data.gan}
              />
              <FieldRow
                leftTitle="Mangal"
                leftValue={data.mangal}
                rightTitle="Gotra"
                rightValue={data.gotra}
              />

              {/* Education */}
              <h3 className="text-xl font-semibold text-orange-500 mt-6 mb-3">
                EDUCATION & PROFESSIONAL DETAILS
              </h3>

              <FieldRow
                leftTitle="Education"
                leftValue={data.education}
                rightTitle="Occupation"
                rightValue={data.occupation}
              />
              <FieldRow
                leftTitle="Annual Income"
                leftValue={data.annualIncome}
                rightTitle="Current City"
                rightValue={data.currentCity}
              />
              <FieldRow leftTitle="Degree" leftValue={data.degree} />

              {/* Family */}
              <h3 className="text-xl font-semibold text-orange-500 mt-6 mb-3">
                FAMILY BACKGROUND
              </h3>

              <FieldRow
                leftTitle="Father"
                leftValue={data.fatherName}
                rightTitle="Mother"
                rightValue={data.motherName}
              />
              <FieldRow
                leftTitle="Brothers"
                leftValue={data.brothers}
                rightTitle="Married Brothers"
                rightValue={data.marriedBrothers}
              />
              <FieldRow
                leftTitle="Sisters"
                leftValue={data.sisters}
                rightTitle="Married Sisters"
                rightValue={data.marriedSisters}
              />
              <FieldRow
                leftTitle="Parents Residing"
                leftValue={data.parentsResidingIn}
                rightTitle="Parent Occupation"
                rightValue={data.parentsOccupation}
              />
              <FieldRow
                leftTitle="Mama Surname"
                leftValue={data.mamaSurname}
                rightTitle="Mama Place"
                rightValue={data.mamaPlace}
              />

              {/* Partner */}
              <h3 className="text-xl font-semibold text-orange-500 mt-6 mb-3">
                PARTNER EXPECTATIONS
              </h3>

              <FieldRow
                leftTitle="Preferred Cities"
                leftValue={data.partnerCities}
                rightTitle="Mangal"
                rightValue={data.partnerMangal}
              />
              <FieldRow
                leftTitle="Expected Education"
                leftValue={data.partnerEducation}
                rightTitle="Expected Caste"
                rightValue={data.partnerCaste}
              />
              <FieldRow
                leftTitle="Expected Occupation"
                leftValue={data.partnerOccupation}
                rightTitle="Expected Height"
                rightValue={data.partnerHeight}
              />
              <FieldRow
                leftTitle="Expected Income"
                leftValue={data.partnerIncome}
                rightTitle="Partner Age"
                rightValue={data.partnerAge}
              />

              {/* Buttons */}
              <div className="flex gap-6 justify-center mt-6">
                <button
                  onClick={handleSendInterest}
                  disabled={sending}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                >
                  {sending ? "Sending..." : "I am Interested"}
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT POPUP */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-8 relative">
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">
              Contact Detail
            </h2>

            <div className="flex gap-6">
              <img
                src={profileImage}
                alt="Profile"
                className="w-40 h-48 rounded-lg object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null; // 🔒 STOP LOOP
                  e.currentTarget.src = defaultProfileImg;
                }}
              />


              <div className="flex-1 grid grid-cols-2 gap-y-2 text-sm">
                <div>
                  <b>Full Name :</b> {data.fullName}
                </div>
                <div>
                  <b>Age / Sex :</b> {data.age} / {data.gender}
                </div>
                <div>
                  <b>Gender :</b> {data.gender}
                </div>
                <div>
                  <b>Father Name :</b> {data.fatherName}
                </div>
                <div>
                  <b>Caste :</b> {data.caste}
                </div>
                <div>
                  <b>Birth Place :</b> {data.birthPlace}
                </div>
                <div>
                  <b>Height :</b> {data.height}
                </div>
                <div>
                  <b>Email :</b> {data.email || "XXXXX"}
                </div>
                <div>
                  <b>Contact :</b> XXXXX XXXXX
                </div>
                <div>
                  <b>Weight :</b> {data.weight}
                </div>
                <div>
                  <b>Address :</b> {data.currentCity}
                </div>
                <div>
                  <b>Birth Time :</b> {data.birthTime}
                </div>
                <div>
                  <b>Alt Contact :</b> XXXXX XXXXX
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowContact(false)}
                className="bg-orange-500 text-white px-10 py-2 rounded-full hover:bg-orange-600"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


