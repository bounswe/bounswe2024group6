import { useState } from "react";
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

export default function CreateQuizMetadata() {
  const [level, setLevel] = useState(new Set([]));
  const [tag, setTag] = useState(new Set([]));

  return (
    <Card className="w-[840px] px-2 pt-2 p-4">
      <div className="flex flex-row gap-4">
        <div className="bg-default-100 hover:bg-default-200 p-[60px] flex justify-center items-center rounded-3xl">
          <IconPlus size={24} className="text-default-500" />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-4 w-full">
            <Input isRequired label="Title" className="w-full" size="sm" />
            <Select
              isRequired
              size="lg"
              placeholder="Level*"
              selectedKeys={level}
              radius="sm"
              className="max-w-24"
              onSelectionChange={setLevel}
            >
              {LEVELS.map((level) => (
                <SelectItem key={level.key}>{level.label}</SelectItem>
              ))}
            </Select>
            <Select
              isRequired
              size="lg"
              placeholder="Tag*"
              selectedKeys={tag}
              radius="sm"
              className="max-w-36"
              onSelectionChange={setTag}
            >
              {TAGS.map((tag) => (
                <SelectItem key={tag.key}>{tag.label}</SelectItem>
              ))}
            </Select>
          </div>
          <Textarea
            label="Description"
            placeholder="Enter your description"
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
}
