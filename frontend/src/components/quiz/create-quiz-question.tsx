import { useEffect, useState } from "react";
import { Card, Input, Select, SelectItem, Button } from "@nextui-org/react";
import { IconWand, IconTrash } from "@tabler/icons-react";
import { Question } from "../../types";
import { AuthActions } from "../auth/utils";
import { BASE_URL } from "../../lib/baseURL";
import axios from "axios";

const TYPES = [
  { key: "1", label: "English->Turkish" },
  { key: "2", label: "Turkish->English" },
  { key: "3", label: "Meaning" },
];

const getTypeValue = (typeSet: Set<string>): string => {
  const typeKey = Array.from(typeSet)[0];
  const selectedType = TYPES.find((t) => t.key === typeKey);
  return selectedType ? selectedType.label : "EN_TO_TR";
};

export default function CreateQuizQuestion({
  setQuizQuestions,
  idx,
}: {
  setQuizQuestions: (quizQuestions: any) => void;
  idx: number;
}) {
  const [word, setWord] = useState("");
  const [type, setType] = useState(new Set(["1"]));
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState<string[]>(["", "", ""]);
  const { getToken } = AuthActions();
  const token = getToken("access");

  useEffect(() => {
    const allAnswers = [correctAnswer, ...wrongAnswers];
    const shuffledAnswers = [...allAnswers].sort(() => Math.random() - 0.5);
    const correctIdx = shuffledAnswers.indexOf(correctAnswer);

    setQuizQuestions((prev: Question[]) => {
      const newQuestions = [...prev];
      newQuestions[idx] = {
        question_number: idx + 1,
        question_text: word,
        choice1: shuffledAnswers[0],
        choice2: shuffledAnswers[1],
        choice3: shuffledAnswers[2],
        choice4: shuffledAnswers[3],
        correct_choice: correctIdx + 1,
      };
      return newQuestions;
    });
  }, [word, type, correctAnswer, wrongAnswers]);

  const handleChoiceCreation = () => {
    console.log("Creating choices...");
    const typeValue =
      getTypeValue(type) === "English->Turkish"
        ? "EN_TO_TR"
        : getTypeValue(type) === "Turkish->English"
        ? "TR_TO_EN"
        : "EN_TO_MEANING";

    axios
      .get(`${BASE_URL}/quiz/choices/${word}/${typeValue}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const correctOption = response.data.correct_answer;
        const wrongOptions = response.data.options;
        setCorrectAnswer(correctOption);
        setWrongAnswers(wrongOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                handleChoiceCreation();
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

