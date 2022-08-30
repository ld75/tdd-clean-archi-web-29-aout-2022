import { initReduxStore, ReduxStore } from "../../store/reduxStore";
import { AppState } from "../../store/appState";

describe("Pyramid update", () => {
  let store: ReduxStore;
  let initialState: AppState;

  beforeEach(() => {
    store = initReduxStore({});
    initialState = store.getState();
  });

  it("should set the pyramid at the very bottom before any good answer", () => {
    expect(store.getState()).toEqual({
      ...initialState,
      pyramid: {
        step: 0,
      },
    });
  });

  describe("Good answer has been given", () => {
    describe("Game is new", () => {
      it("should increment the pyramid from its current state", () => {
        giveAGoodAnswer("B");
        expectPyramidState("B", "B", 1);
      });
    });

    describe("A good answer has already been given", () => {
      it("should increment the pyramid from its current state", () => {
        giveAGoodAnswer("A");
        giveAGoodAnswer("B");
        expectPyramidState("B", "B", 2);
      });
    });
  });

  describe("Wrong answer has been given", () => {
    describe("Game is new", () => {
      it("should N0T increment the pyramid from its current state", () => {
        giveAWrongAnswer("C", "B");
        expectPyramidState("C", "B", 0);
      });
    });

    describe("A good answer has already been given", () => {
      it("should keep the state from previous good answers", () => {
        giveAGoodAnswer("B");
        giveAWrongAnswer("C", "B");
        expectPyramidState("C", "B", 1);
      });
    });
  });

  const giveAGoodAnswer = (answerId: string) => {
    store.dispatch({
      type: "VALIDATED_ANSWER",
      payload: {
        givenAnswerId: answerId,
        rightAnswerId: answerId,
      },
    });
  };

  const giveAWrongAnswer = (givenAnswerId: string, rightAnswerId: string) => {
    store.dispatch({
      type: "VALIDATED_ANSWER",
      payload: {
        givenAnswerId,
        rightAnswerId,
      },
    });
  };

  const expectPyramidState = (
    givenAnswerId: string,
    rightAnswerId: string,
    step: number
  ) => {
    expect(store.getState()).toEqual({
      ...initialState,
      validateAnswer: {
        givenAnswerId,
        rightAnswerId,
      },
      pyramid: {
        step,
      },
    });
  };
});
