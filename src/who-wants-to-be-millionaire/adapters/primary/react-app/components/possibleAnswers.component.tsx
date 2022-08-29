import React, { FC } from "react";
import { Question } from "../../../../../question";

interface Props {
  possibleAnswers: Question["possibleAnswers"];
}

export const PossibleAnswers: FC<Props> = ({ possibleAnswers }) => {
  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
      {Object.entries(possibleAnswers).map(([key, value]) => {
        return (
          <div className="border-3 border-blue-300 rounded-lg px-3 py-1 bg-gray-900">
            <span className="text-orange-500">{key}:</span> {value}
          </div>
        );
      })}
    </div>
  );
};
