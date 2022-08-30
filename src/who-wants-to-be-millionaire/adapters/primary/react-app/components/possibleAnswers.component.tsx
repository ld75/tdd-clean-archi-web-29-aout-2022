import React, { FC } from "react";
import { validateAnswer } from "../../../../hexagon/use-cases/answer-validation/validateAnswer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/reduxStore";
import { CurrentQuestionVM } from "../view-models-generator/currentQuestionViewModel.selector";

interface Props {
  possibleAnswers: CurrentQuestionVM["possibleAnswers"];
}

const highlightedAnswerColors = {
  NOT_HIGHLIGHTED: "bg-gray-900",
  HIGHLIGHTED_GOOD: "bg-green-600",
  HIGHLIGHTED_WRONG: "bg-orange-600",
};

export const PossibleAnswers: FC<Props> = ({ possibleAnswers }) => {
  const dispatch = useDispatch<AppDispatch>();

  const _validateAnswer = (answerId: string) => () => {
    dispatch(validateAnswer(answerId));
  };

  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(possibleAnswers).map(([answerId, answer]) => {
        return (
          <div
            className={`border-3 border-blue-300 rounded-lg px-3 py-1 ${
              highlightedAnswerColors[
                answer.status as keyof typeof highlightedAnswerColors
              ]
            }`}
            onClick={_validateAnswer(answerId)}
          >
            <span className="text-orange-500">{answerId}:</span> {answer.label}
          </div>
        );
      })}
    </div>
  );
};
