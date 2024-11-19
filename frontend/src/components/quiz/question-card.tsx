import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";

type Props = {
  ques_count: number;
  cur_question: number;
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
};
enum Answer {
  None,
  A,
  B,
  C,
  D,
}

export default function App({
  ques_count,
  cur_question,
  answers,
  setAnswers,
}: Props) {
  function handleClick(answer: Answer) {
    return () => {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        if (newAnswers[cur_question - 1] === answer) {
          newAnswers[cur_question - 1] = Answer.None;
        } else {
          newAnswers[cur_question - 1] = answer;
        }
        return newAnswers;
      });
    };
  }

  return (
    <Card className="max-w-[600px]">
      <CardHeader className="flex flex-row justify-center w-full items-center gap-3">
        <p className="text-md text-center items-center border border-gray-300 rounded-lg p-1 px-3">
          {cur_question} / {ques_count}
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col justify-center shadow-lg rounded-lg shadow-zinc-200 w-[550px] h-[200px]">
        <p className="text-center text-5xl text-blue-900">Lamb</p>
      </CardBody>

      <CardFooter className="w-[550px] h-[170px] py-6">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
          <Button
            color="primary"
            onClick={handleClick(Answer.A)}
            variant={
              answers[cur_question - 1] === Answer.A ? "solid" : "bordered"
            }
            className=" flex items-center justify-center text-xl h-12 mx-3"
          >
            Kuzu
          </Button>
          <Button
            color="primary"
            onClick={handleClick(Answer.B)}
            variant={
              answers[cur_question - 1] === Answer.B ? "solid" : "bordered"
            }
            className=" flex items-center justify-center text-xl h-12 mx-3"
          >
            Lamba
          </Button>
          <Button
            color="primary"
            onClick={handleClick(Answer.C)}
            variant={
              answers[cur_question - 1] === Answer.C ? "solid" : "bordered"
            }
            className=" flex items-center justify-center text-xl h-12 mx-3"
          >
            Koç
          </Button>
          <Button
            color="primary"
            onClick={handleClick(Answer.D)}
            variant={
              answers[cur_question - 1] === Answer.D ? "solid" : "bordered"
            }
            className=" flex items-center justify-center text-xl h-12 mx-3"
          >
            Işık
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
