import { initReduxStore, ReduxStore } from "../../../store/reduxStore";
import { AppState } from "../../../store/appState";
import { validateAnswer } from "./validateAnswer";
import { InMemoryQuestionGateway } from "../../../adapters/secondary/gateways/inMemoryQuestionGateway";

describe("Answer validation", () => {
  let store: ReduxStore;
  let initialState: AppState;
  let questionGateway: InMemoryQuestionGateway;
  const question = {
    id: "123abc",
    title: "Que signifie l'acronyme TDD ?",
    possibleAnswers: {
      A: "Test-Driven Development",
      B: "Test-Dodo Development",
      C: "Thunk-Driven Development",
      D: "Test-Driven Design",
    },
  };

  beforeEach(() => {
    questionGateway = new InMemoryQuestionGateway();
    store = initReduxStore({ questionGateway });
    initialState = store.getState();
    questionGateway.nextQuestion = question;
    store.dispatch({
      type: "PICKED_QUESTION",
      payload: {
        question,
      },
    });
  });

  it("should validate a wrong answer", async () => {
    questionGateway.answerValidation = {
      rightAnswerId: "A",
    };
    await store.dispatch(validateAnswer("B"));
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      pickQuestion: {
        question,
      },
      validateAnswer: {
        givenAnswerId: "B",
        rightAnswerId: "A",
      },
    });
  });
});
