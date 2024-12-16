import { useEffect, useState } from "react";
import { Card, Input, Select, SelectItem, Button } from "@nextui-org/react";
import {
  IconWand,
  IconTrash,
  IconPhoto,
  IconUpload,
} from "@tabler/icons-react";
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
  const [image, setImage] = useState<File | null>(null);
  const { getToken } = AuthActions();
  const token = getToken("access");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
        image: image, // Ensure image is included in dependency array
      };
      return newQuestions;
    });
  }, [word, type, correctAnswer, wrongAnswers, image, idx, setQuizQuestions]); // Add image to dependency array

  const handleChoiceCreation = () => {
    console.log("Creating choices...");
    const typeValue =
      getTypeValue(type) === "English->Turkish"
        ? "EN_TO_TR"
        : getTypeValue(type) === "Turkish->English"
        ? "TR_TO_EN"
        : "EN_TO_MEANING";
    console.log(`${BASE_URL}/quiz/choices/${word}/${typeValue}/`);

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

  // Add this helper function
  const logFormData = (formData: FormData) => {
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: `, pair[1]);
    }
  };

  // Example usage in your code:
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create FormData and log it
      const formData = new FormData();
      formData.append("image", file);
      logFormData(formData); // This will show the contents

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertBinaryToFile = (binaryData: string, filename: string) => {
    // Convert binary string to Uint8Array
    const bytes = new Uint8Array(
      binaryData.split("").map((char) => char.charCodeAt(0))
    );

    // Create a Blob from the bytes
    const blob = new Blob([bytes], { type: "image/jpeg" });

    // Create a File from the Blob
    const file = new File([blob], filename, { type: "image/jpeg" });
    return file;
  };

  const generateImage = async () => {
    setIsGenerating(true);
    console.log("Generating image...", { word });

    try {
      const response = await axios.get(`${BASE_URL}/image/${word}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "arraybuffer", // Important: receive binary data
      });

      // Convert the binary data to a base64 string for preview
      const base64Image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      // Create a File object from the binary data
      const imageFile = new File([response.data], `${word}_generated.jpg`, {
        type: "image/jpeg",
      });

      setImage(imageFile);
      setImagePreview(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
    setIsGenerating(false);
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

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col justify-center items-center border-2 border-dashed rounded-lg p-4">
              {imagePreview ? (
          <img
            src={imagePreview}
            alt="Question preview"
            className="max-h-[200px] object-contain rounded-lg mb-4"
          />
              ) : (
          <span className="text-gray-500 mb-4">No image selected</span>
              )}
              <div className="flex gap-4">
          <Button
            startContent={<IconUpload size={18} />}
            as="label"
            variant="flat"
            size="sm"
          >
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </Button>
          <Button
            isLoading={isGenerating}
            startContent={<IconPhoto size={18} />}
            size="sm"
            color="secondary"
            onClick={() => generateImage()}
          >
            Generate
          </Button>
              </div>
            </div>
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

