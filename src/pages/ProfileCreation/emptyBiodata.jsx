import React from "react";
export const emptyBiodata = {
  profilePic: "/default-avatar.jpg",
  fullName: "",
  age: "",
  gender: "",
  maritalStatus: "",
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
  parentsOccupation: "",
  fatherOccupation: "",
  motherOccupation: "",
  marriedBrothers: "",
  marriedSisters: "",
  parentsResidingIn: "",
};


const FieldRow = ({ leftTitle, leftValue, rightTitle, rightValue }) => (
  <div className="flex flex-wrap justify-between w-full text-sm mb-1">
    {/* Left Field */}
    <div className="flex w-full md:w-1/2 min-w-0">
      <span className="font-semibold text-gray-700 w-32 md:w-40 flex-shrink-0">
        {leftTitle}
      </span>
      <span className="w-3 text-center flex-shrink-0">:</span>
      <span className="text-gray-800 break-words">
        {leftValue ?? ""}
      </span>
    </div>

    {/* Right Field */}
    <div className="flex w-full md:w-1/2 min-w-0 mt-1 md:mt-0">
      <span className="font-semibold text-gray-700 w-32 md:w-40 flex-shrink-0">
        {rightTitle}
      </span>
      <span className="w-3 text-center flex-shrink-0">:</span>
      <span className="text-gray-800 break-words">
        {rightValue ?? ""}
      </span>
    </div>
  </div>
);


export default function BiodataTemplate({ data = emptyBiodata }) {
  return (
    <div className="w-full flex justify-center py-6 sm:py-10 bg-[#fafafa] font-[Inter] overflow-x-hidden">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl px-4 py-6 sm:p-8 lg:p-10">
        {/* MAIN TITLE */}
        <h2 className="text-2xl font-semibold text-orange-500 mb-6 text-center sm:text-left">
          Our Profile
        </h2>

        {/* TWO COLUMN LAYOUT: LEFT IMAGE, RIGHT ALL DETAILS */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* LEFT IMAGE + PAGE SLIDER */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-40 h-52 sm:w-56 sm:h-72 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={data.profilePic || "/default-avatar.jpg"}
                alt="My Profile"
                className="w-full h-full object-cover"
              />
            </div>


            <div className="flex items-center gap-4 mt-4">
              <button className="text-orange-500 text-xl">&#8592;</button>
              <div className="px-4 py-1 border rounded-md text-orange-500 font-semibold">
                1
              </div>
              <button className="text-orange-500 text-xl">&#8594;</button>
            </div>
          </div>

          {/* RIGHT COLUMN: ALL SECTIONS (PERSONAL + HOROSCOPE + EDUCATION + FAMILY) */}
          <div className="flex-1">
            {/* PERSONAL DETAILS */}
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
              rightTitle="Age"
              rightValue={data.age}
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

            <FieldRow
              leftTitle="Mobile"
              leftValue={data.mobile}
              rightTitle="Email"
              rightValue={data.email}
            />

            <FieldRow
              leftTitle="Address"
              leftValue={data.address}
              rightTitle="Current District"
              rightValue={data.currentCity}
            />

            <FieldRow
              leftTitle="Home Town District"
              leftValue={data.homeTownDistrict}
              rightTitle="Parents District"
              rightValue={data.parentsResidingIn}
            />

            <FieldRow
              leftTitle="District"
              leftValue={data.district}
              rightTitle="Taluka"
              rightValue={data.taluka}
            />

            <FieldRow
              leftTitle="Pin Code"
              leftValue={data.pinCode}
              rightTitle="Gender"
              rightValue={data.gender}
            />

            {/* HOROSCOPE DETAILS */}
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
              rightTitle="Birth Place/District"
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
              rightTitle="Gotra / Devak"
              rightValue={data.gotra}
            />

            {/* EDUCATION & PROFESSIONAL DETAILS */}
            <h3 className="text-xl font-semibold text-orange-500 mt-6 mb-3">
              EDUCATION & PROFESSIONAL DETAILS
            </h3>

            <FieldRow
              leftTitle="Education"
              leftValue={data.education}
              rightTitle="Education Details"
              rightValue={data.degree}
            />

            <FieldRow
              leftTitle="Occupation"
              leftValue={data.occupation}
              rightTitle="Occupation Details"
              rightValue={data.occupationDetails}
            />

            <FieldRow
              leftTitle="Annual Income"
              leftValue={data.incomePerYear}
              rightTitle=""
              rightValue=""
            />

            {/* FAMILY BACKGROUND */}
            <h3 className="text-xl font-semibold text-orange-500 mt-6 mb-3">
              FAMILY BACKGROUND
            </h3>

            <FieldRow
              leftTitle="Father's Name"
              leftValue={data.fatherName}
              rightTitle="Father's Occupation"
              rightValue={data.fatherOccupation}
            />

            <FieldRow
              leftTitle="Mother's Name"
              leftValue={data.motherName}
              rightTitle="Mother's Occupation"
              rightValue={data.motherOccupation}
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
              leftTitle="Inter Caste"
              leftValue={data.interCaste}
              rightTitle="Parents Residing In"
              rightValue={data.parentsResidingIn}
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
              rightTitle="Family Wealth"
              rightValue={data.familyWealth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
