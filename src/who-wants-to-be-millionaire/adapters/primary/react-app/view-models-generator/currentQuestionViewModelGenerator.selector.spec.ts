import { getCurrentQuestionVM } from "./currentQuestionViewModel.selector";
import { initReduxStore, ReduxStore } from "../../../../store/reduxStore";

describe("Current question view models generator", () => {
  let store: ReduxStore;

  beforeEach(() => {
    store = initReduxStore({});
  });

  it("should not get a view model if the current question has not been loaded yet", () => {
    expect(getCurrentQuestionVM(store.getState())).toEqual(null);
  });

  describe("Question has been loaded", () => {
    beforeEach(() => {
      store.dispatch({
        type: "PICKED_QUESTION",
        payload: {
          question: {
            id: "123abc",
            title: "Que veut dire CQS ?",
            possibleAnswers: {
              A: "Command Query Sunlight",
              B: "Command Quantic Sunlight",
              C: "Command Query Separation",
            },
          },
        },
      });
    });

    it("should not qualify any answer before any validation", () => {
      expect(getCurrentQuestionVM(store.getState())).toEqual({
        id: "123abc",
        title: "Que veut dire CQS ?",
        possibleAnswers: {
          A: {
            label: "Command Query Sunlight",
            status: "NOT_HIGHLIGHTED",
          },
          B: {
            label: "Command Quantic Sunlight",
            status: "NOT_HIGHLIGHTED",
          },
          C: {
            label: "Command Query Separation",
            status: "NOT_HIGHLIGHTED",
          },
        },
      });
    });

    it("should qualify a good answer", () => {
      store.dispatch({
        type: "VALIDATED_ANSWER",
        payload: {
          givenAnswerId: "C",
          rightAnswerId: "C",
        },
      });
      expect(getCurrentQuestionVM(store.getState())).toEqual({
        id: "123abc",
        title: "Que veut dire CQS ?",
        possibleAnswers: {
          A: {
            label: "Command Query Sunlight",
            status: "NOT_HIGHLIGHTED",
          },
          B: {
            label: "Command Quantic Sunlight",
            status: "NOT_HIGHLIGHTED",
          },
          C: {
            label: "Command Query Separation",
            status: "HIGHLIGHTED_GOOD",
          },
        },
      });
    });

    it("should qualify a wrong answer", () => {
      store.dispatch({
        type: "VALIDATED_ANSWER",
        payload: {
          givenAnswerId: "A",
          rightAnswerId: "C",
        },
      });
      expect(getCurrentQuestionVM(store.getState())).toEqual({
        id: "123abc",
        title: "Que veut dire CQS ?",
        possibleAnswers: {
          A: {
            label: "Command Query Sunlight",
            status: "HIGHLIGHTED_WRONG",
          },
          B: {
            label: "Command Quantic Sunlight",
            status: "NOT_HIGHLIGHTED",
          },
          C: {
            label: "Command Query Separation",
            status: "HIGHLIGHTED_GOOD",
          },
        },
      });
    });
  });
});
