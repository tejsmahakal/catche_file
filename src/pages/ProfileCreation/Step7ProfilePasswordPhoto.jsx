// import React, { useState } from "react";
// import { FaUpload } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { CheckCircle } from "lucide-react";
// import Stepper from "./Stepper";
// import { useNavigate } from "react-router-dom";
// import {
//   useUploadDocumentMutation,
// } from "../../context/createProfile";

// const Step7ProfilePasswordPhoto = ({
//   nextStep,
//   prevStep,
//   goToStep,
//   data,
//   setData,
//   step,
//   completedStep,
//   hasDataForStep,
// }) => {
//   const formData = data;
//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(false);
//   const [uploadDocument] = useUploadDocumentMutation();
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setData({ ...formData, [name]: files[0] });
//   };

//   const isComplete =
//     formData.profilePhoto &&
//     formData.biodata &&
//     formData.leavingCertificate &&
//     formData.adhaarPhoto &&
//     formData.panCard &&
//     formData.salarySlip;

//   const handleFinish = async () => {
//     if (!isComplete || uploading) return;
//     setUploading(true);
    
//     try {
//       const uploads = [
//         { field: "panCard", documentType: "PAN_CARD" },
//         { field: "profilePhoto", documentType: "PROFILE_PHOTO" },
//         { field: "biodata", documentType: "OTHER" },
//         { field: "salarySlip", documentType: "OTHER" },
//         { field: "leavingCertificate", documentType: "EDUCATION_CERTIFICATE" },
//         { field: "adhaarPhoto", documentType: "AADHAAR_CARD" } // Backend expects AADHAAR_CARD not AADHAAR_PHOTO
//       ];

//       // Upload all documents
//       for (const { field, documentType } of uploads) {
//         if (formData[field]) {
//           await uploadDocument({
//             documentType: documentType,
//             file: formData[field],
//             description: `${field} uploaded`
//           }).unwrap();
//         }
//       }

//       setShowModal(true);
//     } catch (error) {
//       console.error("Upload Error:", error);
//       alert(
//         "Document upload failed: " +
//           (error?.data?.message || error?.message || "Please try again.")
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleContinue = () => {
//     setShowModal(false);
//     nextStep && nextStep();
//     navigate("/my-profile");
//   };

//   const labelStyle = {
//     fontSize: "15px",
//     fontFamily: "'Inter', sans-serif",
//     fontWeight: 600,
//     marginBottom: "4px",
//   };

//   const uploadBoxStyle = {
//     backgroundColor: "#55A7FF14",
//     border: "2px dashed #55A7FF",
//     borderRadius: "10px",
//     padding: "22px",
//   };

//   return (
//     <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
//       {/* HEADER BOX */}
//       <div
//         className="px-10 py-1 rounded-t-xl"
//         style={{ backgroundColor: "#FF8C4426" }}
//       >
//         <Stepper
//           step={step}
//           completedStep={completedStep}
//           goToStep={goToStep}
//           hasDataForStep={hasDataForStep}
//         />
//       </div>

//       {/* MAIN BOX */}
//       <div className="px-10 py-8" style={{ backgroundColor: "#FF8C4405" }}>
//         <h3
//           className="text-center text-orange-400 font-semibold uppercase mb-8 tracking-wide text-xl"
//           style={{ fontFamily: "'Inter', sans-serif" }}
//         >
//           Profile Password and Photo 
//         </h3>

//         {/* UPLOAD GRID 3 IN EACH ROW */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             {
//               label: "Upload PAN Card",
//               name: "panCard",
//               accept: ".jpg,.jpeg,.png,.pdf",
//             },
//             {
//               label: "Your Profile Photo",
//               name: "profilePhoto",
//               accept: "image/*",
//             },
//             {
//               label: "Upload Biodata",
//               name: "biodata",
//               accept: ".pdf,.doc,.docx",
//             },
//             {
//               label: "Upload Salary Slip",
//               name: "salarySlip",
//               accept: ".pdf,.jpg,.jpeg,.png",
//             },
//             {
//               label: "Leaving Certificate",
//               name: "leavingCertificate",
//               accept: ".pdf,.jpg,.jpeg,.png",
//             },
//             {
//               label: "Upload Aadhaar Photo",
//               name: "adhaarPhoto",
//               accept: ".jpg,.jpeg,.png",
//             },
//           ].map((item) => (
//             <div key={item.name}>
//               <label style={labelStyle}>
//                 {item.label} <span className="text-red-500">*</span>
//               </label>

//               <div
//                 className="cursor-pointer text-center flex flex-col items-center justify-center"
//                 style={uploadBoxStyle}
//               >
//                 <label className="cursor-pointer flex flex-col items-center text-gray-700">
//                   <FaUpload className="text-2xl mb-2 text-gray-700" />

//                   <span className="font-medium text-sm text-gray-700">
//                     {formData[item.name] ? "Uploaded" : "Upload"}
//                   </span>

//                   <input
//                     type="file"
//                     name={item.name}
//                     accept={item.accept}
//                     onChange={handleFileChange}
//                     className="hidden"
//                     disabled={uploading}
//                   />
//                 </label>

//                 {formData[item.name] && (
//                   <p className="text-xs text-green-600 mt-2 font-medium truncate max-w-full">
//                     {formData[item.name].name}
//                   </p>
//                 )}
//               </div>

//               {/* Helper text */}
//               {item.name === "profilePhoto" && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   (You can crop and upload new photos after login.)
//                 </p>
//               )}

//               {item.name === "biodata" && (
//                 <p className="text-xs text-gray-500 mt-1">
//                   (Upload Marathi Biodata Photo.)
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* BUTTONS */}
//         <div className="mt-6 flex justify-end gap-4 pr-4">
//           <button
//             type="button"
//             onClick={prevStep}
//             disabled={uploading}
//             className="bg-white text-orange-600 px-10 py-3 rounded-xl border border-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>

//           <button
//             type="button"
//             onClick={handleFinish}
//             disabled={!isComplete || uploading}
//             className={`px-10 py-3 rounded-xl text-white ${
//               isComplete && !uploading
//                 ? "bg-orange-400 hover:bg-orange-500"
//                 : "bg-gray-400 cursor-not-allowed"
//             }`}
//           >
//             {uploading ? "Uploading..." : "Finish"}
//           </button>
//         </div>
//       </div>

//       {/* SUCCESS MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-2xl p-8 shadow-lg text-center w-[90%] sm:w-[400px]"
//           >
//             <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-4" />

//             <h2 className="text-xl font-semibold text-gray-800">Successful</h2>

//             <p className="text-gray-600 mt-2">
//               Congratulations, your Profile has been successfully created.
//             </p>

//             <button
//               onClick={handleContinue}
//               className="mt-6 bg-orange-500 text-white font-medium px-6 py-2 rounded-full hover:bg-orange-600 transition"
//             >
//               Continue
//             </button>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Step7ProfilePasswordPhoto;





import React, { useState, useMemo } from "react";
import { FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Stepper from "./Stepper";
import { useNavigate } from "react-router-dom";
import { useUploadDocumentMutation } from "../../context/createProfile";

const Step7ProfilePasswordPhoto = ({
  nextStep,
  prevStep,
  goToStep,
  data,
  setData,
  step,
  completedStep,
  hasDataForStep,
}) => {
  const navigate = useNavigate();

  // MEMOIZED FORM DATA (PREVENT EXTRA RERENDERS)
  const formData = useMemo(() => data, [data]);

  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [uploadDocument] = useUploadDocumentMutation();

  /* ---------------- FILE CHANGE ---------------- */
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    setData({ ...formData, [name]: files[0] });
  };

  /* ---------------- VALIDATION ---------------- */
  const isComplete =
    formData.profilePhoto &&
    formData.biodata &&
    formData.leavingCertificate &&
    formData.adhaarPhoto &&
    formData.panCard &&
    formData.salarySlip;

  /* ---------------- FINISH & UPLOAD ---------------- */
  const handleFinish = async () => {
    if (!isComplete || uploading) return;

    setUploading(true);

    try {
      const uploads = [
        { field: "panCard", documentType: "PAN_CARD" },
        { field: "profilePhoto", documentType: "PROFILE_PHOTO" },
        { field: "biodata", documentType: "OTHER" },
        { field: "salarySlip", documentType: "OTHER" },
        { field: "leavingCertificate", documentType: "EDUCATION_CERTIFICATE" },
        { field: "adhaarPhoto", documentType: "AADHAAR_CARD" },
      ];

      // 🚀 PARALLEL UPLOADS (PERFORMANCE BOOST)
      const uploadPromises = uploads
        .filter(({ field }) => formData[field])
        .map(({ field, documentType }) =>
          uploadDocument({
            documentType,
            file: formData[field],
            description: `${field} uploaded`,
          }).unwrap()
        );

      await Promise.all(uploadPromises);

      setShowModal(true);
    } catch (error) {
      console.error("Upload Error:", error);
      alert(
        "Document upload failed: " +
          (error?.data?.message ||
            error?.message ||
            "Please try again.")
      );
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- CONTINUE ---------------- */
  const handleContinue = () => {
    setShowModal(false);
    nextStep && nextStep();
    navigate("/my-profile");
  };

  /* ---------------- STYLES ---------------- */
  const labelStyle = {
    fontSize: "15px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    marginBottom: "4px",
  };

  const uploadBoxStyle = {
    backgroundColor: "#55A7FF14",
    border: "2px dashed #55A7FF",
    borderRadius: "10px",
    padding: "22px",
  };

  return (
    <div className="w-full max-w-[95%] lg:max-w-[95%] xl:max-w-[90%] mx-auto font-[Inter] flex flex-col">
      {/* HEADER */}
      <div
        className="px-10 py-1 rounded-t-xl"
        style={{ backgroundColor: "#FF8C4426" }}
      >
        <Stepper
          step={step}
          completedStep={completedStep}
          goToStep={goToStep}
          hasDataForStep={hasDataForStep}
        />
      </div>

      {/* MAIN */}
      <div className="px-10 py-8" style={{ backgroundColor: "#FF8C4405" }}>
        <h3 className="text-center text-orange-400 font-semibold uppercase mb-8 tracking-wide text-xl">
          Profile Password and Photo
        </h3>

        {/* UPLOAD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: "Upload PAN Card", name: "panCard", accept: ".jpg,.jpeg,.png,.pdf" },
            { label: "Your Profile Photo", name: "profilePhoto", accept: "image/*" },
            { label: "Upload Biodata", name: "biodata", accept: ".pdf,.doc,.docx" },
            { label: "Upload Salary Slip", name: "salarySlip", accept: ".pdf,.jpg,.jpeg,.png" },
            { label: "Leaving Certificate", name: "leavingCertificate", accept: ".pdf,.jpg,.jpeg,.png" },
            { label: "Upload Aadhaar Photo", name: "adhaarPhoto", accept: ".jpg,.jpeg,.png" },
          ].map((item) => (
            <div key={item.name}>
              <label style={labelStyle}>
                {item.label} <span className="text-red-500">*</span>
              </label>

              <div
                className="cursor-pointer text-center flex flex-col items-center justify-center"
                style={uploadBoxStyle}
              >
                <label className="cursor-pointer flex flex-col items-center text-gray-700">
                  <FaUpload className="text-2xl mb-2" />
                  <span className="font-medium text-sm">
                    {formData[item.name] ? "Uploaded" : "Upload"}
                  </span>

                  <input
                    type="file"
                    name={item.name}
                    accept={item.accept}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>

                {formData[item.name] && (
                  <p className="text-xs text-green-600 mt-2 font-medium truncate max-w-full">
                    {formData[item.name].name}
                  </p>
                )}
              </div>

              {item.name === "profilePhoto" && (
                <p className="text-xs text-gray-500 mt-1">
                  (You can crop and upload new photos after login.)
                </p>
              )}

              {item.name === "biodata" && (
                <p className="text-xs text-gray-500 mt-1">
                  (Upload Marathi Biodata Photo.)
                </p>
              )}
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-end gap-4 pr-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={uploading}
            className="bg-white text-orange-600 px-10 py-3 rounded-xl border border-orange-500 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleFinish}
            disabled={!isComplete || uploading}
            className={`px-10 py-3 rounded-xl text-white ${
              isComplete && !uploading
                ? "bg-orange-400 hover:bg-orange-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {uploading ? "Uploading documents..." : "Finish"}
          </button>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg text-center w-[90%] sm:w-[400px]"
          >
            <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-4" />

            <h2 className="text-xl font-semibold text-gray-800">Successful</h2>

            <p className="text-gray-600 mt-2">
              Congratulations, your Profile has been successfully created.
            </p>

            <button
              onClick={handleContinue}
              className="mt-6 bg-orange-500 text-white font-medium px-6 py-2 rounded-full hover:bg-orange-600 transition"
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Step7ProfilePasswordPhoto;
