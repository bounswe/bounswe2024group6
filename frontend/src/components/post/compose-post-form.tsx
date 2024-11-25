"use client";

import { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Card,
  Divider,
  Modal,
  ModalContent,
  useDisclosure,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";

import PostCard from "./post-card.tsx";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL.ts";
import { AuthActions } from "../auth/utils.tsx";
import { useNavigate } from "react-router-dom";

const Tags = [
  "#Grammar",
  "#Vocabulary",
  "#Vocabulary Tips",
  "#Cultural Insights",
  "#Idioms & Expressions",
  "#Challenges",
  "#Learning Material",
  "#Common Mistakes",
  "#General",
  "#Fun",
];
const DifficultyTags = ["#A1", "#A2", "#B1", "#B2", "#C1", "#C2"];

export default function ComposePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [diffTag, setDiffTag] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleCategorySelection = (keys: Selection) => {
    setSelectedTags(Array.from(keys) as string[]);
  };

  const handleDifficultySelection = (keys: Selection) => {
    const selectedKey = Array.from(keys)[0] as string;
    setDiffTag(selectedKey || "");
  };

  const handleSubmit = () => {
    const { getToken } = AuthActions();
    const token = getToken("access");

    axios
      .post(
        `${BASE_URL}/post/create/`,
        {
          title: title,
          description: content,
          tags: [...selectedTags, ...(diffTag ? [diffTag] : [])],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        navigate("/forum");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-full overflow-hidden">
      <Card className="w-full max-w-xl mx-4 p-6 shadow-2xl rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Compose Your Post
        </h2>
        <div className="mt-6 space-y-2">
          <label className="block text-md font-medium text-gray-700">
            Title
          </label>
          <Input
            data-testid="post-title-input"
            placeholder="Enter the post title"
            value={title}
            onValueChange={setTitle}
            fullWidth
            required
          />
          <label className="block text-md font-medium text-gray-700">
            Content
          </label>
          <Textarea
            data-testid="post-content-input"
            placeholder="Write your post content here..."
            value={content}
            onValueChange={setContent}
            fullWidth
            minRows={4}
            required
          />
          <div>
            <Divider className="mt-6 mb-3" />
            <label className="block mb-2 text-md text-center font-medium text-gray-700">
              Tags
            </label>
            <div className="flex flex-row justify-between mb-3">
              <Select
                data-testid="difficulty-select"
                label="Difficulty"
                placeholder="Optional"
                className="w-48 text-black"
                selectedKeys={diffTag ? [diffTag] : []}
                onSelectionChange={handleDifficultySelection}
              >
                {DifficultyTags.map((tag) => (
                  <SelectItem
                    data-testid={`difficulty-option-${tag}`}
                    key={tag}
                  >
                    {tag}
                  </SelectItem>
                ))}
              </Select>
              <Select
                data-testid="category-select"
                isRequired
                label="Categories"
                placeholder="Required Field"
                selectionMode="multiple"
                className="w-48 text-black"
                selectedKeys={new Set(selectedTags)}
                onSelectionChange={handleCategorySelection}
              >
                {Tags.map((tag) => (
                  <SelectItem
                    key={tag}
                    data-testid={`category-option-${tag.replace("#", "")}`}
                  >
                    {tag}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            data-testid="preview-button"
            onPress={onOpen}
            color="default"
            isDisabled={!title || !content || selectedTags.length === 0}
            variant="flat"
          >
            Preview
          </Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            className="max-w-[740px]"
            backdrop="blur"
          >
            <ModalContent>
              <PostCard
                id={0}
                username="#alitariksahin"
                title={title}
                content={content}
                tags={[...selectedTags, ...(diffTag ? [diffTag] : [])]}
                likeCount={0}
                timePassed="Just now"
                initialIsLiked={false}
                initialIsBookmarked={false}
              />
            </ModalContent>
          </Modal>
          <Button
            data-testid="submit-post-button"
            color="primary"
            onPress={handleSubmit}
            isDisabled={!title || !content || selectedTags.length === 0}
          >
            Post
          </Button>
        </div>
      </Card>
    </div>
  );
}
