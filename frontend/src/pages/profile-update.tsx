import Navbar from "../components/common/navbar.tsx";
import { Avatar, Button, Divider, Textarea } from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../lib/baseURL";
import { AuthActions } from "../components/auth/utils.tsx";
import { convertProfileResponseToProfile } from "../components/common/utils.tsx";
import Cookies from "js-cookie";
import { ProfileResponse } from "../types.ts";
import { Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../components/common/usePageTitle.ts";

export default function EditProfile() {
  usePageTitle("Profile");
  const { getToken } = AuthActions();
  const token = getToken("access");
  const tags = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    level: "",
    bio: "",
    avatar: "",
  });

  // Fetch Profile Data (unchanged from your logic)
  useEffect(() => {
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
          avatar: "https://nextui.org/avatars/avatar-1.png", // Mocked default avatar
        });
      })
      .catch((error) => {
        console.log(error);
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
    axios
      .post(`${BASE_URL}/profile/update/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("Profile updated successfully");
        navigate(`/profile/${Cookies.get("username")}`);
        //setProfile(formData); // Update profile with new values
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
          <Avatar src={formData.avatar} className="w-32 h-32 mb-4" />
          <Button
            variant="faded"
            color="primary"
            className="font-bold"
            //onClick={() => alert("Avatar change logic goes here!")} // Mocked logic
          >
            Change Avatar
          </Button>
        </div>

        <form className="flex flex-col gap-6 w-full max-w-lg">
          {/* Bio Field */}
          <div className="flex flex-col items-start">
            <label htmlFor="bio" className="text-gray-600 font-semibold mb-1">
              Bio
            </label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              defaultValue={formData.bio}
              maxLength={75}
              className="w-full mb-1"
            />
            <p className="text-gray-400 text-sm pl-1">
              {75 - formData.bio.length} characters remaining
            </p>
          </div>

          {/* Level Field */}
          <div className="flex flex-col items-start">
            <label htmlFor="level" className="text-gray-600 font-semibold mb-1">
              Level
            </label>
            <Select
              selectedKeys={new Set([formData.level])} // Use `selectedKeys` with a Set for controlled component
              onSelectionChange={(keys) => handleLevelChange([...keys][0])} // Convert the Set to an array and get the first value
              className="w-full mb-1"
            >
              {tags.map((tag) => (
                <SelectItem key={tag}>{tag}</SelectItem>
              ))}
            </Select>
            <p className="text-gray-400 text-sm pl-1">Enter your level</p>
          </div>
          <Divider className="mt-2 w-full border-t-4 rounded-2xl border-gray-400" />

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              variant="solid"
              color="primary"
              className="px-8 py-1 font-bold rounded-lg"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
