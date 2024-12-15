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

export default function DeletePostModal({
  isOpen,
  setIsOpen,
  post_id,
  isPost,
}) {
  const { getToken } = AuthActions();
  const token = getToken("access");
  const navigate = useNavigate();

  const deletePost = () => {
    axios
      .post(
        `${BASE_URL}/post/delete/`,
        {
          post_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate(0);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const deleteComment = () => {
    axios
      .delete(`${BASE_URL}/post/comment/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          comment_id: post_id,
        },
      })
      .then((response) => {
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
          {isPost ? "Delete Post" : "Delete Comment"}
        </ModalHeader>
        <ModalBody className="text-center text-default-500">
          Are you sure you want to delete this {isPost ? "post" : "comment"}?
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={isPost ? deletePost : deleteComment}
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
