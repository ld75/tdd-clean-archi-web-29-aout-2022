import React, {FunctionComponent} from "react";
import {Question} from "../../../../hexagon/entities/question";

interface Props {
  possibleAnswers: Question["possibleAnswers"];
}

export const PossibleAnswers: FunctionComponent<Props> = ({ possibleAnswers }) => {
  return (
    <div className="w-full justify-center grid grid-cols-2 text-white gap-4 font-mono text-sm text-left font-bold leading-6 bg-stripes-fuchsia rounded-lg">
        {Object.entries(possibleAnswers).map(([key,value])=>{
          return <div>
            <a href=""><span>{key}</span>:<span>{value}</span></a>
                </div>
            })}
    </div>
  );
};
