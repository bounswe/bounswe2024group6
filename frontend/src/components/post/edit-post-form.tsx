"use client";

import { useState, useEffect } from "react";
import {
  Input,
  Textarea,
  Button,
  Card,
  Divider,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";

import axios from "axios";
import { BASE_URL } from "../../lib/baseURL.ts";
import { AuthActions } from "../auth/utils.tsx";
import { useNavigate } from "react-router-dom";
import TagSearchModal from "./tag-search-modal.tsx";

import { useParams } from "react-router-dom";
import { PostResponse } from "../../types.ts";
import { convertPostResponseToPost } from "../common/utils.tsx";

export const Tags = [
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

export default function EditPostForm() {
  const { postID } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [diffTag, setDiffTag] = useState<string>("");
  const [isTagSearchModalOpen, setIsTagSearchModalOpen] = useState(false);
  const navigate = useNavigate();
  const { getToken } = AuthActions();
  const token = getToken("access");

  useEffect(() => {
    if (postID) {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };
      axios
        .post(
          `${BASE_URL}/post/`,
          {
            post_id: postID,
          },
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response.data);
          const postData: PostResponse = response.data.post;
          const post = convertPostResponseToPost(postData);
          setTitle(post.post.title);
          setContent(post.post.content);
          setDiffTag(
            post.post.tags.filter((tag) => DifficultyTags.includes(tag))[0]
          );
          setSelectedTags(
            post.post.tags.filter((tag) => !DifficultyTags.includes(tag))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [postID, token]);

  const handleDifficultySelection = (keys: Selection) => {
    const selectedKey = Array.from(keys)[0] as string;
    setDiffTag(selectedKey || "");
  };

  const handleSubmit = () => {
    const { getToken } = AuthActions();
    const token = getToken("access");

    axios
      .post(
        `${BASE_URL}/post/update/${postID}/`,
        {
          post_id: postID,
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
          Edit Post
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
            isDisabled
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
            isDisabled
          />
          <div>
            <Divider className="mt-6 mb-3" />
            <label className="block mb-2 text-md text-center font-medium text-gray-700">
              Tags
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between mb-3">
                <Select
                  data-testid="difficulty-select"
                  label="Difficulty"
                  placeholder="Optional"
                  size="sm"
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
                <TagSearchModal
                  isOpen={isTagSearchModalOpen}
                  setIsOpen={setIsTagSearchModalOpen}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
                <Button
                  data-testid="add-tag-button"
                  color="default"
                  size="lg"
                  radius="sm"
                  onPress={() => setIsTagSearchModalOpen(true)}
                  variant="flat"
                >
                  Choose Tags
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {diffTag && (
                  <Button
                    key={diffTag}
                    color="primary"
                    variant="flat"
                    className="text-sm h-8"
                    size="sm"
                    radius="full"
                    onClick={() => setDiffTag("")}
                  >
                    {diffTag}
                  </Button>
                )}
                {selectedTags &&
                  selectedTags.map((tag) => (
                    <Button
                      key={tag}
                      color="primary"
                      variant="flat"
                      className="text-sm h-8"
                      size="sm"
                      radius="full"
                      onClick={() =>
                        setSelectedTags(selectedTags.filter((t) => t !== tag))
                      }
                    >
                      {tag}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-3">
          <Button
            data-testid="submit-post-button"
            color="primary"
            onPress={handleSubmit}
            isDisabled={!title || !content || selectedTags.length === 0}
          >
            Update
          </Button>
        </div>
      </Card>
    </div>
  );
}
