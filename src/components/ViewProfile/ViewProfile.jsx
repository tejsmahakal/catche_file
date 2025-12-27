import React, { useRef, useState } from "react";
 
const ProfileForm = () => {
  const photoInputRef = useRef();
  const resumeInputRef = useRef();
  const [photoPreview, setPhotoPreview] = useState(null);
 
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };
 
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Resume uploaded: ${file.name}`);
    }
  };
 
  return (
    <section className="bg-[#FFF7F2] min-h-screen py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-gray-300 p-8 sm:p-10">
 
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
 
          <div className="flex flex-col lg:flex-row gap-8 mb-10 items-start">
 
            <div className="relative w-44 h-52 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300 shadow-sm">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-xs text-gray-500"></span>
              )}
 
              <input
                type="file"
                accept="image/*"
                ref={photoInputRef}
                className="hidden"
                onChange={handlePhotoUpload}
              />
 
            </div>
 
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Profile Photo</h2>
                <p className="text-xs text-gray-500">
                  Upload a clear photo of yourself for better matches.
                </p>
              </div>
 
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm mb-1 block">Full Name*</label>
                  <input className="w-full border rounded-md py-3 px-4 text-sm" />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Age*</label>
                  <input className="w-full border rounded-md py-3 px-4 text-sm" />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Height</label>
                  <input className="w-full border rounded-md py-3 px-4 text-sm" />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Phone No*</label>
                  <input className="w-full border rounded-md py-3 px-4 text-sm" />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Religion</label>
                  <input className="w-full border rounded-md py-3 px-4 text-sm" />
                </div>
                <div>
                  <label className="text-sm mb-1 block">Mother Tongue*</label>
                  <input className="w-full border rounded-md py-3 px-4 text-sm" />
                </div>
              </div>
            </div>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="text-sm mb-1 block">Location*</label>
              <input className="w-full border rounded-md py-3 px-4 text-sm" />
            </div>
            <div>
              <label className="text-sm mb-1 block">Skin Tone</label>
              <input className="w-full border rounded-md py-3 px-4 text-sm" />
            </div>
            <div>
              <label className="text-sm mb-1 block">Date Of Birth</label>
              <input type="date" className="w-full border rounded-md py-3 px-4 text-sm" />
            </div>
          </div>
 
          <div className="mt-6">
            <label className="text-sm mb-1 block">About Me</label>
            <textarea rows="4" className="w-full border rounded-md py-3 px-4 text-sm"></textarea>
          </div>
 
          <div className="mt-6">
            <p className="text-sm text-gray-700 mb-2">Upload the Resume</p>
            <div className="bg-gray-100 border border-dashed border-gray-400 rounded-lg p-6 text-center shadow-sm">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.rtf"
                className="hidden"
                ref={resumeInputRef}
                onChange={handleResumeUpload}
              />
              <button
                className="bg-white text-black border border-orange-500 rounded-full px-5 py-2 text-sm"
                onClick={() => resumeInputRef.current.click()}
              >
                Upload Resume
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: doc, docx, rtf, pdf, up to 2 MB
              </p>
            </div>
          </div>
 
          {/* Buttons Right Side */}
          <div className="flex justify-end gap-4 mt-10">
            <button className="bg-orange-500 text-white rounded-md px-8 py-3 hover:bg-orange-600">
              Next
            </button>
            <button className="bg-orange-500 text-white rounded-md px-8 py-3 hover:bg-orange-600">
              Cancel
            </button>
          </div>
 
        </div>
      </div>
    </section>
  );
};
 
export default ProfileForm;