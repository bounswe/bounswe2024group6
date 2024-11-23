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
} from "@nextui-org/react";

import PostCard from "./post-card.tsx";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL.ts";
import { AuthActions } from "../auth/utils.tsx";
import { useNavigate } from "react-router-dom";

const Tags = [
  "#Vocabulary",
  "#Grammar",
  "#Vocabulary Tips",
  "#Cultural Insights",
  "#Idioms & Expressions",
  "#Challenges",
  "#Learning Material",
  "#Common Mistakes",
  "#General",
  "#Fun",
];
const DifficultyTags = ["#A1", "#A2", "#B1", "#B2", "#C1", "#C2",];

export default function ComposePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const [diffTag, setDiffTag] = useState<string>("");
  const handleDiffTagClick = (tag: string) => {
    setDiffTag((prevTag) => (prevTag === tag ? "" : tag)); // Toggle diffTag
  };

  const handleSubmit = () => {  
    const { getToken } = AuthActions();
    const token = getToken("access"); 
    
    axios
      .post(`${BASE_URL}/post/create/`, {
        title: title,
        description: content,
        tags: [...selectedTags, ...(diffTag ? [diffTag] : [])],
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        navigate("/forum");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }

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
                label="Difficulty"
                placeholder="Optional"
                className="w-48 text-black"
              >
                {DifficultyTags.map((tag) => (
                  <SelectItem onPress={() => handleDiffTagClick(tag)} key={tag}>{tag}</SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                label="Categories"
                placeholder="Required Field"
                selectionMode="multiple"
                className="w-48 text-black"
              >
                {Tags.map((tag) => (
                  <SelectItem onPress={() => handleTagClick(tag)} key={tag}>{tag}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
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
              />
            </ModalContent>
          </Modal>
          <Button
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
