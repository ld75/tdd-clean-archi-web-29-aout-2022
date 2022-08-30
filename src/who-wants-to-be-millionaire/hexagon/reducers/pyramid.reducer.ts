import { AnyAction } from "@reduxjs/toolkit";

export const pyramidReducer = (
  state: { step: number } = { step: 0 },
  action: AnyAction
) => {
  if (action.type === "VALIDATED_ANSWER") {
    const { givenAnswerId, rightAnswerId } = action.payload;
    if (givenAnswerId === rightAnswerId) return { step: state.step + 1 };
    return state;
  }
  return state;
};
