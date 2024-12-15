import { useEffect, useState } from "react";
import { Card, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";

const LEVELS = [
  { key: "A1", label: "A1" },
  { key: "A2", label: "A2" },
  { key: "B1", label: "B1" },
  { key: "B2", label: "B2" },
  { key: "C1", label: "C1" },
  { key: "C2", label: "C2" },
];
const TAGS = [
  { key: "activities", label: "@Activities" },
  { key: "basics", label: "@Basics" },
  { key: "education", label: "@Education" },
  { key: "food", label: "@Food" },
  { key: "health", label: "@Health" },
  { key: "other", label: "@Other" },
  { key: "shopping", label: "@Shopping" },
  { key: "family", label: "@Family" },
  { key: "sports", label: "@Sports" },
  { key: "travel", label: "@Travel" },
  { key: "work", label: "@Work" },
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

  useEffect(() => {
    const tagNames = level
      ? [...tags.map((tag) => ({ name: tag })), { name: level }]
      : tags.map((tag) => ({ name: tag }));

    setQuizHeader({
      title,
      description,
      level,
      tags: tagNames,
    });
  }, [title, description, level, tags]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <Card className="w-[840px] px-2 pt-2 p-4">
      <div className="flex flex-row gap-4">
        <label className="relative cursor-pointer">
          <div className={`bg-default-100 hover:bg-default-200 flex flex-col justify-center items-center rounded-3xl w-[240px] h-[240px] overflow-hidden ${preview ? 'p-0' : 'p-[60px]'}`}>
            {preview ? (
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <IconPlus size={24} className="text-default-500" />
                <span className="text-default-500 text-sm mt-2">Upload Image</span>
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
            <Select
              isRequired
              size="lg"
              placeholder="Tag*"
              selectedKeys={new Set(tags)}
              selectionMode="multiple"
              radius="sm"
              className="w-1/2"
              onSelectionChange={(keys) =>
                setTags(Array.from(keys) as string[])
              }
            >
              {TAGS.map((tag) => (
                <SelectItem key={tag.key}>{tag.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}

