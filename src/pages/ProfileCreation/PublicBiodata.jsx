/* eslint-disable react-refresh/only-export-components */

import React from "react";
import { useNavigate } from "react-router-dom";

/* ------------------------------------------
   EMPTY BIODATA
------------------------------------------ */
export const publicEmptyBiodata = {
  // PERSONAL
  lastName: "",
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

  // HOROSCOPE
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

  // EDUCATION
  education: "",
  occupation: "",
  annualIncome: "",
  currentCity: "",
  degree: "",

  // FAMILY
  fatherName: "",
  motherName: "",
  brothers: "",
  marriedBrothers: "",
  sisters: "",
  marriedSisters: "",
  parentsResidingIn: "",
  parentsOccupation: "",
  mamaSurname: "",
  mamaPlace: "",
  relativeSurnames: "",

  // PARTNER
  partnerCities: "",
  partnerEducation: "",
  partnerOccupation: "",
  partnerIncome: "",
  partnerAgeDifference: "",
  partnerCaste: "",
  partnerHeight: "",
  partnerMangal: "",

  // IMAGE
  image: "",
};

/* HELPER (ONLY FOR COUNTS)*/
const formatCount = (value) => {
  if (value === null || value === undefined) return "";
  return value; // shows 0, 1, 2 correctly
};

/*  FIELD ROW (IMPORTANT FIX HERE)*/
const FieldRow = ({ leftTitle, leftValue, rightTitle, rightValue }) => (
  <div className="flex flex-wrap justify-between w-full text-sm mb-1">
    {/* LEFT */}
    <div className="flex w-full md:w-1/2 min-w-0">
      <span className="font-semibold text-gray-700 w-40 flex-shrink-0">
        {leftTitle}
      </span>
      <span className="w-3 text-center flex-shrink-0">:</span>
      <span className="text-gray-800 break-words">{leftValue ?? ""}</span>
    </div>

    {/* RIGHT */}
    <div className="flex w-full md:w-1/2 min-w-0 mt-1 md:mt-0">
      <span className="font-semibold text-gray-700 w-40 flex-shrink-0">
        {rightTitle}
      </span>
      <span className="w-3 text-center flex-shrink-0">:</span>
      <span className="text-gray-800 break-words">{rightValue ?? ""}</span>
    </div>
  </div>
);

/* MAIN COMPONENT*/
export default function PublicBiodata({ data = publicEmptyBiodata }) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center py-6 bg-[#fafafa] font-[Inter]">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl px-4 py-6 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* IMAGE */}
          <div className="flex flex-col items-center lg:items-start">
            <img
              src={data.image || "/default-avatar.jpg"}
              alt="profile"
              className="w-40 h-52 object-cover bg-gray-200 rounded-lg"
            />
          </div>

          {/* DETAILS */}
          <div className="flex-1">
            {/* PERSONAL */}
            <h3 className="text-xl font-semibold text-orange-500 mb-3">
              PERSONAL DETAILS
            </h3>

            <FieldRow
              leftTitle="Last Name"
              leftValue={data.lastName}
              rightTitle="Gender"
              rightValue={data.gender}
            />
            <FieldRow
              leftTitle="Caste"
              leftValue={data.caste}
              rightTitle="Sub Caste"
              rightValue={data.subCaste}
            />
            <FieldRow
              leftTitle="Marital Status"
              leftValue={data.maritalStatus}
              rightTitle="Religion"
              rightValue={data.religion}
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

            {/* HOROSCOPE */}
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

            {/* EDUCATION */}
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
              rightTitle="Degree"
              rightValue={data.degree}
            />

            {/* FAMILY */}
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
              leftValue={formatCount(data.brothers)}
              rightTitle="Married Brothers"
              rightValue={formatCount(data.marriedBrothers)}
            />

            <FieldRow
              leftTitle="Sisters"
              leftValue={formatCount(data.sisters)}
              rightTitle="Married Sisters"
              rightValue={formatCount(data.marriedSisters)}
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
            <FieldRow
              leftTitle="Relative Surnames"
              leftValue={data.relativeSurnames}
            />

            {/* PARTNER */}
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
              rightTitle="Age Difference Upto"
              rightValue={data.partnerAgeDifference}
            />

            {/* BUTTONS */}
            <div className="flex gap-6 justify-center mt-6">
              <button
                onClick={() => navigate("/signin")}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
              >
                Sign In To View More
              </button>

              <button
                onClick={() => navigate(-1)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
