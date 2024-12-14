import React, { useState } from "react";
import DictionaryModal from "./dictionary-modal";

export default function ClickableText({ text }) {
  const [dictionaryModalOpen, setDictionaryModalOpen] = useState(false);
  const [word, setWord] = useState("");
  const words = text?.match(/\S+|\s+/g) || [];

  function onClickWord(word) {
    console.log(`Clicked on word: ${word}`);
    setDictionaryModalOpen(true);
    setWord(word);
  }

  return (
    <div className="inline">
      <DictionaryModal
        isOpen={dictionaryModalOpen}
        setIsOpen={setDictionaryModalOpen}
        word={word}
      />
      {words.map((word, index) => {
        const isWhitespace = /^\s+$/.test(word);

        if (isWhitespace) {
          return <span key={index}>{word}</span>;
        } else {
          return (
            <span
              key={index}
              onClick={() => onClickWord(word.trim())}
              className="cursor-pointer hover:text-blue-600 transition-colors duration-200 inline"
            >
              {word}
            </span>
          );
        }
      })}
    </div>
  );
}
