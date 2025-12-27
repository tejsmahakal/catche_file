import React from "react";
import {
  useGetOwnProfileQuery,
  useGetProfilePhotoQuery,
} from "../../context/profileApi";
import BiodataTemplate from "./emptyBiodata";
import { mapOwnProfile } from "../../context/mapOwnProfile";

const toImageUrl = (fileData) =>
  fileData ? `data:image/jpeg;base64,${fileData}` : "/default-avatar.jpg";

export default function MyProfilePage() {
  const { data, isLoading, isError } = useGetOwnProfileQuery();

  const { data: photoResponse } = useGetProfilePhotoQuery();

  if (isLoading) {
    return (
      <p className="text-center mt-20 text-lg text-gray-600">
        Loading your profile...
      </p>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-center mt-20 text-red-500 text-lg">
        Failed to fetch your profile.
      </p>
    );
  }

  const mapped = mapOwnProfile(data);

  const profilePic = toImageUrl(photoResponse?.data?.fileData);

  return <BiodataTemplate data={{ ...mapped, profilePic }} />;
}
