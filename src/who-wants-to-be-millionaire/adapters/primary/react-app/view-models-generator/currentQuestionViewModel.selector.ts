import { AppState } from "../../../../store/appState";

export interface CurrentQuestionVM {
  id: string;
  title: string;
  possibleAnswers: Record<
    string,
    {
      label: string;
      status: string;
    }
  >;
}

export const getCurrentQuestionVM = (state: AppState) => {
  const question = state.pickQuestion.question;
  if (!question) return null;
  const { rightAnswerId, givenAnswerId } = state.validateAnswer;
  return {
    id: question.id,
    title: question.title,
    possibleAnswers: Object.entries(question.possibleAnswers).reduce(
      (acc, [letter, label]) => ({
        ...acc,
        [letter]: {
          label,
          status: (function () {
            if (rightAnswerId && letter === rightAnswerId)
              return "HIGHLIGHTED_GOOD";
            if (givenAnswerId && letter === givenAnswerId)
              return "HIGHLIGHTED_WRONG";
            return "NOT_HIGHLIGHTED";
          })(),
        },
      }),
      {}
    ),
  };
};
