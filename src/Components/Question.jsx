import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData, QuizContext } from "../Context/contextExport";
import { useQuiz, useTimer } from "../hooks/hookExport";
import { Option } from "./Option";

export const Question = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const { dataState } = useData();
  const { quizDispatch } = useContext(QuizContext);
  const { questions } = dataState;
  const { time, resetTimer } = useTimer();
  const { storeResponses } = useQuiz();
  const currentQuestion = questions[questionIndex];
  const { image, question, options } = currentQuestion;
  const navigate = useNavigate();

  const changeQuestion = () => {
    if (selectedAnswer.includes(currentQuestion.answer)) {
      quizDispatch({ type: "RIGHT_ANSWER_COUNT" });
    }
    setQuestionIndex((prev) => prev + 1);
    storeResponses(currentQuestion, selectedAnswer, time);
    setSelectedAnswer([]);
    resetTimer();
  };

  const setUserAnswer = (userAnswer) => {
    if (selectedAnswer.find((item) => item === userAnswer)) {
      setSelectedAnswer((prev) =>
        prev.filter((option) => option !== userAnswer)
      );
    } else {
      setSelectedAnswer((prev) => [...prev, userAnswer]);
    }
  };

  const submitQuiz = () => {
    if (selectedAnswer.includes(currentQuestion.answer)) {
      quizDispatch({ type: "RIGHT_ANSWER_COUNT" });
    }
    storeResponses(currentQuestion, selectedAnswer, time);
    navigate("/result");
    resetTimer();
  };
  return (
    <div>
      <div
        className="h-full flex justify-center items-start"
        style={{ backgroundColor: "#AF9CF3" }}
      >
        <div className="w-24 h-24 absolute top-20 bg-white rounded-full flex justify-center items-center">
          <p>
            <i className="text-4xl font-bold">{questionIndex + 1}</i>
            <span className="text-gray-500">/{questions.length}</span>
          </p>
        </div>
        <div className="bg-white flex flex-col max-w-sm w-full mt-32 p-6 rounded-3xl">
          <p className="mt-5 text-lg font-black">{question}</p>
          {image && <img src={image} alt="social network" />}
          {options.map((option, index) => (
            <Option
              index={index}
              option={option}
              selectedAnswer={selectedAnswer}
              setUserAnswer={setUserAnswer}
            />
          ))}
          {questionIndex === questions.length - 1 ? (
            <button
              onClick={submitQuiz}
              className="self-center mt-4 bg-red-500 text-white px-28 py-2 text-lg rounded-3xl "
            >
              Submit
            </button>
          ) : (
            <button
              onClick={changeQuestion}
              disabled={selectedAnswer.length === 0 ? true : false}
              className={`self-center mt-4 bg-red-500 text-white px-28 py-2 text-lg rounded-3xl  ${
                selectedAnswer.length === 0 ? "disabled:opacity-80" : ""
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
