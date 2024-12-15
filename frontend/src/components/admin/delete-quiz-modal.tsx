import { AuthActions } from "../auth/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
} from "@nextui-org/react";
import { BASE_URL } from "../../lib/baseURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DeleteQuizModal({ isOpen, setIsOpen, quiz_id }) {
  const { getToken } = AuthActions();
  const token = getToken("access");
  const navigate = useNavigate();

  const deleteQuiz = () => {
    axios
      .post(
        `${BASE_URL}/quiz/delete/`,
        {
          quiz_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("DELETE QUIZ RESPONSE");
        console.log(response.data);
        navigate(0);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="top-center"
      className="max-w-[360px] flex flex-col items-center"
      backdrop="blur"
    >
      <ModalContent className="pb-6 gap-3">
        <ModalHeader className="text-center text-default-500">
          Delete Quiz
        </ModalHeader>
        <ModalBody className="text-center text-default-500">
          Are you sure you want to delete this quiz?
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={deleteQuiz}
            className="w-full"
            color="danger"
            variant="solid"
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
