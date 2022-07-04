import React, { useContext } from "react";
import * as d3 from "d3";
import ReactSpeedometer from "react-d3-speedometer";
import { QuizContext } from "../Context/QuizContext";
import { useQuiz } from "../hooks/useQuiz";

export const ResultPage = () => {
  const { quizState } = useContext(QuizContext);
  const { resetQuiz } = useQuiz();

  return (
    <div
      style={{ backgroundColor: "#AF9CF3" }}
      className="h-screen flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-3xl">
        <ReactSpeedometer
          minValue={0}
          maxValue={1}
          value={quizState.rightAnswerCount / quizState.userAnswers.length}
          valueFormat={d3.format(".0%")}
        />
        <div className="flex justiffirsty-start items-center bg-sky-100 p-3 my-2 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <p className="ml-3">
            <span>
              {quizState.userAnswers.length - quizState.rightAnswerCount}
            </span>
            <span className="ml-3">InCorrect</span>
          </p>
        </div>
        <div className="flex justify-start items-center bg-pink-100 p-2 my-2 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <p className="ml-3">
            <span>{quizState.rightAnswerCount}</span>
            <span className="ml-3">Correct</span>
          </p>
        </div>
        <button onClick={resetQuiz} className="bg-red-500 text-white px-28 py-2 mt-5 text-lg rounded-3xl">
          Start Again
        </button>
      </div>
    </div>
  );
};
