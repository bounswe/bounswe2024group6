import { IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ComposePostButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/compose-post")}
      data-testid="compose-button"
      color="primary"
      aria-label="Post"
      className="flex items-center justify-center shadow-xl fixed right-6 bottom-6 rounded-full p-4 bg-blue-600 hover:bg-blue-500 cursor-pointer"
    >
      <IconPencil className="text-default-50" size={28} />
    </div>
  );
};

export default ComposePostButton;
