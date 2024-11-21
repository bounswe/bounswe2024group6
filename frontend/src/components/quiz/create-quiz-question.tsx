import { useState } from "react";
import { Card, Input, Select, SelectItem, Button } from "@nextui-org/react";
import { IconWand, IconTrash } from "@tabler/icons-react";

const TYPES = [
  { key: "1", label: "English->Turkish" },
  { key: "2", label: "Turkish->English" },
  { key: "3", label: "Meaning" },
];

export default function CreateQuizQuestion() {
  const [word, setWord] = useState("");
  const [type, setType] = useState(new Set(["1"]));
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState<string[]>(["", "", ""]);
  return (
    <Card className="w-[840px] px-2 pt-2 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 w-full items-center justify-between">
          {type.has("1") && (
            <span>What is the Turkish translation of this word?</span>
          )}
          {type.has("2") && (
            <span>What is the English translation of this word?</span>
          )}
          {type.has("3") && <span>What is the meaning of this word?</span>}
          <div className="flex flex-row items-center gap-2">
            <Input
              isRequired
              label="Word"
              className="w-32"
              size="sm"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <Button
              isIconOnly
              color="secondary"
              size="lg"
              isDisabled={!word}
              onClick={() => {
                setCorrectAnswer("Correct Answer");
                setWrongAnswers([
                  "Wrong Answer 1",
                  "Wrong Answer 2",
                  "Wrong Answer 3",
                ]);
              }}
            >
              <IconWand size={24} />
            </Button>
            <Select
              isRequired
              size="lg"
              placeholder="Type*"
              radius="sm"
              className="w-44"
              selectedKeys={type}
              onSelectionChange={setType}
            >
              {TYPES.map((type) => (
                <SelectItem key={type.key}>{type.label}</SelectItem>
              ))}
            </Select>
            <Button
              isIconOnly
              color="danger"
              size="lg"
              onClick={() => {
                setWord("");
                setCorrectAnswer("");
                setWrongAnswers(["", "", ""]);
              }}
            >
              <IconTrash size={24} />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
          <Input
            isRequired
            label="Correct Answer"
            className="w-full"
            size="sm"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
          {wrongAnswers.map((_, i) => (
            <Input
              isRequired
              key={i}
              label={`Wrong Answer ${i + 1}`}
              className="w-full"
              size="sm"
              value={wrongAnswers[i]}
              onChange={(e) =>
                setWrongAnswers((prev) => {
                  const newAnswers = [...prev];
                  newAnswers[i] = e.target.value;
                  return newAnswers;
                })
              }
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
