import React, { useEffect, useState } from "react";
import { TAGS } from "../quiz/create-quiz-metadata";
import { LEVELS } from "../quiz/create-quiz-metadata";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ScrollShadow,
} from "@nextui-org/react";
import { AuthActions } from "../auth/utils";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL";
import { useNavigate } from "react-router-dom";

export default function EditQuizTagsModal({
  isOpen,
  setIsOpen,
  quizId,
  title,
  description,
  initialTags,
}) {
  const [search, setSearch] = useState("");
  const [filteredTags, setFilteredTags] = useState(TAGS);
  const [customTags, setCustomTags] = useState(
    initialTags.filter(
      (tag) => !TAGS.includes(tag) && !LEVELS.map((l) => l.key).includes(tag)
    )
  );
  const [selectedTags, setSelectedTags] = useState(initialTags);
  const { getToken } = AuthActions();
  const token = getToken("access");
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredTags(
      TAGS.filter((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search]);

  const handleTagSelection = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    axios
      .post(
        `${BASE_URL}/quiz/update/`,
        {
          quiz_id: quizId,
          quiz: {
            tags: selectedTags,
            title: title,
            description: description,
            level: selectedTags.find((tag) =>
              LEVELS.map((l) => l.key).includes(tag)
            ),
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <ScrollShadow className="max-h-[450px]">
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
          </ScrollShadow>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} color="primary" variant="solid">
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
