import Navbar from "../components/common/navbar.tsx";
import { Avatar, Button, Divider, Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../lib/baseURL";
import { AuthActions } from "../components/auth/utils.tsx";
import { convertProfileResponseToProfile } from "../components/common/utils.tsx";
import Cookies from "js-cookie";
import { ProfileResponse } from "../types.ts";
import { Select, SelectItem, Skeleton } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../components/common/usePageTitle.ts";

export default function EditProfile() {
  usePageTitle("Profile");
  const { getToken } = AuthActions();
  const token = getToken("access");
  const tags = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  const [formData, setFormData] = useState({
    username: "",
    level: "",
    bio: "",
    avatar: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Fetch Profile Data
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/profile/${Cookies.get("username")}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data: ProfileResponse = response.data;
        console.log(data);
        const profile = convertProfileResponseToProfile(data);
        setFormData({
          username: profile.username,
          level: profile.level,
          bio: profile.bio || "Hey, new learner here!",
          avatar: profile.image || "https://nextui.org/avatars/avatar-1.png",
        });
        setPreview(profile.image || null);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      });
  }, [token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLevelChange = (level: string) => {
    setFormData({ ...formData, level });
  };


  const handleSubmit = () => {
    const formDataToSend = new FormData();

    // Add basic profile data
    formDataToSend.append("username", formData.username);
    formDataToSend.append("level", formData.level);
    formDataToSend.append("bio", formData.bio);

    // Add avatar file if it exists
    if (file) {
      formDataToSend.append("profile_picture", file);
    }

    axios
      .post(`${BASE_URL}/profile/update/`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Profile updated successfully", response.data);
        navigate(`/profile/${Cookies.get("username")}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="h-full w-full items-center overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex flex-col justify-center gap-6 items-center w-full px-32 py-5">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          {/* Avatar Display */}
          {isLoading ? (
            <Skeleton className="flex rounded-full w-32 h-32 mb-4" />
          )
            :
            (
              <Avatar
                src={preview || formData.avatar} // Show preview if a file is selected, else show the current avatar
                className="w-32 h-32 mb-4"
              />
            )
          }
          {/* Change Avatar Button */}
          {isLoading ? (
            <Skeleton className="w-40 h-10 rounded-lg" />
          ) : (
            <label className="relative cursor-pointer">
              <div className={`bg-default-100 hover:bg-default-200 flex flex-col justify-center items-center rounded-3xl w-[120px] h-[40px] overflow-hidden`}>
                <span className="text-primary text-sm font-bold">Change Avatar</span>
              </div>
              {/* File Input */}
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange} // Handle file selection
                accept="image/*"
              />
            </label>
          )}
        </div>
        <form className="flex flex-col gap-6 w-full max-w-lg">
          {/* Bio Field */}
          <div className="flex flex-col items-start">
            <label htmlFor="bio" className="text-gray-600 font-semibold mb-1">
              Bio
            </label>
            {isLoading ? (
              <Skeleton className="h-20 w-full rounded-lg" />
            ) : (
              <Textarea
                id="bio"
                data-testid="bio-input"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                defaultValue={formData.bio}
                maxLength={75}
                className="w-full mb-1"
              />
            )}
            <p className="text-gray-400 text-sm pl-1">
              {75 - formData.bio.length} characters remaining
            </p>
          </div>

          {/* Level Field */}
          <div className="flex flex-col items-start">
            <label htmlFor="level" className="text-gray-600 font-semibold mb-1">
              Level
            </label>
            {isLoading ? (
              <Skeleton className="h-10 w-full rounded-lg" />
            ) : (
              <Select
                data-testid="level-select"
                selectedKeys={new Set([formData.level])} // Use `selectedKeys` with a Set for controlled component
                onSelectionChange={(keys) => handleLevelChange([...keys][0])} // Convert the Set to an array and get the first value
                className="w-full mb-1"
              >
                {tags.map((tag) => (
                  <SelectItem key={tag} data-testid={`level-option-${tag}`}>{tag}</SelectItem>
                ))}
              </Select>
            )}
            <p className="text-gray-400 text-sm pl-1">Enter your level</p>
          </div>
          <Divider className="mt-2 w-full border-t-4 rounded-2xl border-gray-400" />

          {/* Submit Button */}
          <div className="flex justify-center">
            {isLoading ? (
              <Skeleton className="w-40 h-10 rounded-lg" />
            ) : (
              <Button
                onClick={handleSubmit}
                data-testid="submit-button"
                variant="solid"
                color="primary"
                className="px-8 py-1 font-bold rounded-lg"
              >
                Save Changes
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
