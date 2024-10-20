"use client";

import { useState } from "react";
import { Input, Textarea, Button, Card, Divider } from "@nextui-org/react";

const Tags = [
  "@Vocabulary",
  "@Daily Words",
  "@Vocabulary Tips",
  "@Flashcards",
  "@Memorization",
];

export default function ComposePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {};

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
            <div className="flex flex-wrap gap-2">
              {Tags.map((tag) => (
                <Button
                  key={tag}
                  color={selectedTags.includes(tag) ? "secondary" : "secondary"}
                  variant={selectedTags.includes(tag) ? "solid" : "light"}
                  onPress={() => handleTagClick(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            color="default"
            onPress={handleSubmit}
            disabled={!title || !content}
          >
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}
