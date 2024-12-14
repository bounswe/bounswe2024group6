import { useState } from "react";
import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import Login from "./login";
import Register from "./register";

export default function GuestAuthModal({ isOpen, setIsOpen }) {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="top-center"
      className="max-w-[360px] flex flex-col items-center"
      backdrop="blur"
    >
      <ModalContent className="pb-6 gap-3">
        <ModalBody className="text-center text-default-500">
          {isRegister ? (
            <Register setIsRegister={setIsRegister} isGuestView />
          ) : (
            <Login setIsRegister={setIsRegister} isGuestView />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
