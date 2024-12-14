import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ScrollShadow,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../lib/baseURL";
import ClickableText from "./clickable-text";

export default function DictionaryModal({ isOpen, setIsOpen, word }) {
  const [meanings, setMeanings] = useState([]);
  const [translations, setTranslations] = useState([]);

  useEffect(() => {
    if (!word) {
      return;
    }
    axios
      .get(
        `${BASE_URL}/get-lexvo-info/${word
          .replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "")
          .toLowerCase()}/`
      )
      .then((response) => {
        console.log(response.data);
        setMeanings(response.data.final_info.meanings);
        setTranslations(response.data.final_info.turkish_translations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [word]);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="top-center"
      className="w-[500px] flex flex-col items-center"
      backdrop="blur"
    >
      {word && (
        <ModalContent className="pb-6 gap-3">
          <ModalHeader>{word.match(/[a-zA-Z]+/g).join(" ")}</ModalHeader>
          <ModalBody className="text-left text-default-500">
            <ScrollShadow className="max-h-[450px]">
              <h1 className="text-lg font-semibold text-default-900">
                Meanings
              </h1>
              {meanings.map((meaning, index) => (
                <div key={index} className="flex gap-1">
                  <div>{index + 1}.</div>
                  <div className="flex flex-col gap-1">
                    <ClickableText text={meaning.comment.split(";")[0]} />
                    <div className="flex flex-col gap-1 ml-2 italic">
                      {meaning.comment
                        .split(";")
                        .slice(1)
                        .map((example, i) => (
                          <ClickableText text={example} key={i} />
                        ))}
                    </div>
                  </div>
                </div>
              ))}
              <h1 className="text-lg font-semibold text-default-900">
                Translations
              </h1>
              {translations.map((translation, index) => (
                <div key={index} className="flex gap-1">
                  <div>{index + 1}.</div>
                  <ClickableText text={translation} />
                </div>
              ))}
            </ScrollShadow>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
}
