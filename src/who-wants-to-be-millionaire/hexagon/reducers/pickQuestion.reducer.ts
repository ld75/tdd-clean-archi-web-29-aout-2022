import { AnyAction } from "@reduxjs/toolkit";
import { Question } from "../../../question";

export const pickQuestionReducer = (
  state: { question: Question | null } = { question: null },
  action: AnyAction
) => {
  if (action.type === "PICK_QUESTION") return action.payload;
  return state;
};
