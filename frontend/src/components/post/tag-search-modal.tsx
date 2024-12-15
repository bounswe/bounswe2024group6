import React, { useEffect, useState } from "react";
import { Tags } from "./compose-post-form";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

export default function TagSearchModal({
  isOpen,
  setIsOpen,
  selectedTags,
  setSelectedTags,
}) {
  const [search, setSearch] = useState("");
  const [filteredTags, setFilteredTags] = useState(Tags);
  const [customTags, setCustomTags] = useState([]);

  useEffect(() => {
    setFilteredTags(
      Tags.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const handleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="top-center"
      className="w-[360px] flex flex-col items-center"
      backdrop="blur"
    >
      <ModalContent className="pb-6 gap-3 w-full">
        <ModalHeader>Choose Tags</ModalHeader>
        <ModalBody className="text-center text-default-500 w-full">
          <Input
            placeholder="Search tags"
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                if (customTags.includes(search) || search === "") {
                  return;
                }
                handleTagSelection(`#${search}`);
                setCustomTags([...customTags, `#${search}`]);
                setSearch("");
              }
            }}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {customTags.map((tag) => (
              <Button
                key={tag}
                color={selectedTags.includes(tag) ? "primary" : "default"}
                variant="flat"
                className="text-sm h-8"
                size="sm"
                radius="full"
                onClick={() => handleTagSelection(tag)}
              >
                {tag}
              </Button>
            ))}
            {filteredTags.map((tag) => (
              <Button
                key={tag}
                color={selectedTags.includes(tag) ? "primary" : "default"}
                variant="flat"
                className="text-sm h-8"
                size="sm"
                radius="full"
                onClick={() => handleTagSelection(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
