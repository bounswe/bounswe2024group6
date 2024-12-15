import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import QuizTagSearchModal from "./quiz-tag-search-modal";

const LEVELS = [
  { key: "A1", label: "A1" },
  { key: "A2", label: "A2" },
  { key: "B1", label: "B1" },
  { key: "B2", label: "B2" },
  { key: "C1", label: "C1" },
  { key: "C2", label: "C2" },
];

export const TAGS = [
  "#Activities",
  "#Basics",
  "#Education",
  "#Food",
  "#Health",
  "#Other",
  "#Shopping",
  "#Family",
  "#Sports",
  "#Travel",
  "#Work",
];

export default function CreateQuizMetadata({
  setQuizHeader,
}: {
  setQuizHeader: (quizHeader: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isQuizTagSearchModalOpen, setIsQuizTagSearchModalOpen] =
    useState(false);

  useEffect(() => {
    const tagNames = level
      ? [...tags.map((tag) => ({ name: tag })), { name: level }]
      : tags.map((tag) => ({ name: tag }));

    setQuizHeader({
      title,
      description,
      level,
      tags: tagNames,
      title_image: file,
    });
  }, [title, description, level, tags]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <Card className="w-[840px] px-2 pt-2 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <label className="relative cursor-pointer">
            <div
              className={`bg-default-100 hover:bg-default-200 flex flex-col justify-center items-center rounded-3xl w-[240px] h-[240px] overflow-hidden ${
                preview ? "p-0" : "p-[60px]"
              }`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <IconPlus size={24} className="text-default-500" />
                  <span className="text-default-500 text-sm mt-2">
                    Upload Image
                  </span>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>
          <div className="flex flex-col gap-4 w-full">
            <Input
              isRequired
              label="Title"
              className="w-full"
              size="sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              label="Description"
              placeholder="Enter your description"
              className="w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-row gap-4">
              <Select
                isRequired
                size="lg"
                placeholder="Level*"
                selectedKeys={new Set([level])}
                radius="sm"
                className="w-1/2"
                onSelectionChange={(keys) =>
                  setLevel(Array.from(keys)[0]?.toString() || "")
                }
              >
                {LEVELS.map((level) => (
                  <SelectItem key={level.key}>{level.label}</SelectItem>
                ))}
              </Select>
              <QuizTagSearchModal
                isOpen={isQuizTagSearchModalOpen}
                setIsOpen={setIsQuizTagSearchModalOpen}
                selectedTags={tags}
                setSelectedTags={setTags}
              />
              <Button
                data-testid="add-tag-button"
                color="default"
                size="lg"
                radius="sm"
                onPress={() => setIsQuizTagSearchModalOpen(true)}
                variant="flat"
                className="w-1/2"
              >
                Choose Tags
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {level && (
            <Button
              key={level}
              color="primary"
              variant="flat"
              className="text-sm h-8"
              size="sm"
              radius="full"
              onClick={() => setLevel("")}
            >
              {level}
            </Button>
          )}
          {tags &&
            tags.map((tag) => (
              <Button
                key={tag}
                color="primary"
                variant="flat"
                className="text-sm h-8"
                size="sm"
                radius="full"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
              >
                {tag}
              </Button>
            ))}
        </div>
      </div>
    </Card>
  );
}
