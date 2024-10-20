import { Button } from "@nextui-org/react";
import { FaPencilAlt } from "react-icons/fa";

const ComposePostButton = () => {
  return (
    <a href="/compose-post">
      <Button
        isIconOnly
        color="primary"
        variant="flat"
        aria-label="Post"
        className="w-24 h-24 mb-5 rounded-full flex items-center justify-center shadow-xl"
      >
        <FaPencilAlt className="text-default-600 text-2xl" />
      </Button>
    </a>
  );
};

export default ComposePostButton;
