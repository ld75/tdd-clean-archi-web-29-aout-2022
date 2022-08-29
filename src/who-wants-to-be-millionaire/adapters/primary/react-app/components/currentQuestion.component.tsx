import { QuestionTitle } from "./questionTitle.component";
import { PossibleAnswers } from "./possibleAnswers.component";
import { QuestionNumber } from "./questionNumber.component";

export const CurrentQuestion = () => {
  return (
    <div>
      <QuestionNumber />
      <QuestionTitle title="Que signifie l'acronyme TDD ?" />
      <PossibleAnswers />
    </div>
  );
};
