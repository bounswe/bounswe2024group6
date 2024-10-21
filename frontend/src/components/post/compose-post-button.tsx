import { Button } from "@nextui-org/react";
import { IconPencil } from "@tabler/icons-react";

const ComposePostButton = () => {
  return (
    <a href="/compose-post">
      <Button
        isIconOnly
        color="primary"
        variant="flat"
        aria-label="Post"
        className="w-24 h-12 mb-5 flex items-center justify-center shadow-xl"
      >
        <IconPencil className="text-default-600 text-2xl" />
      </Button>
    </a>
  );
};

export default ComposePostButton;
