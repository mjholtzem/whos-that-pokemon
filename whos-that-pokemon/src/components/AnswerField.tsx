import { useEffect, useRef } from "react";

function AnswerField({
  disabled,
  className,
  guessResult,
  answer,
  setAnswer,
  submitAnswer,
}: {
  disabled: boolean;
  className?: string | null;
  guessResult: boolean | null;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  submitAnswer: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if(guessResult !== null) inputRef.current?.blur();
  }, [guessResult])

  return (
    <div
      className={`${className} p-[min(1vw,1vh)] rounded-[min(4vw,4vh)] ${
        guessResult === null && "invisible"
      } ${
        guessResult === null
          ? "bg-transparent"
          : guessResult === true
          ? "bg-green-500"
          : "bg-red-500"
      } transition-colors delay-1500`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitAnswer();
        }}
        className="opacity-100 visible"
      >
        <input
          disabled={disabled}
          ref={inputRef}
          spellCheck={false}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Input Guess..."
          className={`uppercase rounded-[min(3vw,3vh)] bg-slate-300 p-[min(2vw,2vh)] text-center text-[min(3vw,3vh)] font-bold placeholder:font-light outline-none focus:ring-2 ring-slate-700`}
        ></input>
      </form>
    </div>
  );
}

export default AnswerField;
