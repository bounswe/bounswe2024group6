import { useState } from "react";
import { IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import GuestAuthModal from "../auth/guest-auth-modal";
import { AuthActions } from "../auth/utils";

const CreateQuizButton = () => {
  const navigate = useNavigate();
  const { getToken } = AuthActions();
  const token = getToken("access");
  const isGuest = !token;
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  return (
    <>
      <GuestAuthModal isOpen={guestModalOpen} setIsOpen={setGuestModalOpen} />
      <div
        onClick={
          isGuest
            ? () => setGuestModalOpen(true)
            : () => navigate("/create-quiz")
        }
        color="primary"
        aria-label="Post"
        className="flex items-center justify-center shadow-xl fixed right-6 bottom-6 rounded-full p-4 bg-blue-600 hover:bg-blue-500 cursor-pointer"
      >
        <IconPencil className="text-default-50" size={28} />
      </div>
    </>
  );
};

export default CreateQuizButton;
