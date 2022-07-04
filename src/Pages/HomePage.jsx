import "../App.css";
import Upraisedlogo from "../assets/UpraisedLogo.png";
import { useData } from "../Context/contextExport";
import { useQuiz } from "../hooks/useQuiz";

export const HomePage = () => {
  const { dataState } = useData();
  const { status } = dataState;
  const { startQuiz } = useQuiz();

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(175, 156, 243, 0) 7.92%, #AF9CF3 86.48%)",
        backgroundBlendMode: "multiply",
      }}
      className="h-screen flex flex-col justify-around items-center"
    >
      <img className="w-44" src={Upraisedlogo} alt="upraised logo" />
      <div
        className="w-52 h-52 rounded-full border flex justify-center items-center 
      bg-white text-red-500"
      >
        <span className="font-poppins text-3xl">Quiz</span>
      </div>
      <button
        onClick={startQuiz}
        className="bg-red-500 text-white px-28 py-2 text-lg rounded-3xl "
      >
        {status === "loading" ? "Loading..." : "Start"}
      </button>
    </div>
  );
};
