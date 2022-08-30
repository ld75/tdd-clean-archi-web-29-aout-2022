import { AnyAction } from "@reduxjs/toolkit";
import { AppState } from "../../store/appState";

export const validateAnswerReducer = (
  state: AppState["validateAnswer"] = {
    givenAnswerId: null,
    rightAnswerId: null,
  },
  action: AnyAction
) => {
  if (action.type === "VALIDATED_ANSWER") {
    return action.payload;
  }
  return state;
};
