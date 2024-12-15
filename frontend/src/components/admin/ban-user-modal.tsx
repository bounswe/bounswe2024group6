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

export default function BanUserModal({ isOpen, setIsOpen, username }) {
  const { getToken } = AuthActions();
  const token = getToken("access");
  const navigate = useNavigate();

  const banUser = () => {
    axios
      .post(
        `${BASE_URL}/admin-ban/`,
        {
          username,
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
          Ban User
        </ModalHeader>
        <ModalBody className="text-center text-default-500">
          Are you sure you want to ban this user?
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={banUser}
            className="w-full"
            color="danger"
            variant="solid"
          >
            Ban
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
