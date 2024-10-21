import { Button } from "@nextui-org/react";
import { IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const ComposePostButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      isIconOnly
      onClick={() => navigate("/compose-post")}
      color="primary"
      variant="flat"
      aria-label="Post"
      className="w-24 h-12 mt-5 flex items-center justify-center shadow-xl"
    >
      <IconPencil className="text-default-600 text-2xl" />
    </Button>
  );
};

export default ComposePostButton;
