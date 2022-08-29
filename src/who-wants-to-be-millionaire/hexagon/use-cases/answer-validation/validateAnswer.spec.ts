import { initReduxStore, ReduxStore } from "../../../store/reduxStore";
import { AppState } from "../../../store/appState";
import { validateAnswer } from "./validateAnswer";
import { InMemoryQuestionGateway } from "../../../adapters/secondary/gateways/inMemoryQuestionGateway";

describe("Answer validation", () => {
  let store: ReduxStore;
  let initialState: AppState;
  let questionGateway: InMemoryQuestionGateway;

  beforeEach(() => {
    questionGateway = new InMemoryQuestionGateway();
    store = initReduxStore({ questionGateway });
    initialState = store.getState();
    questionGateway.nextQuestion = {
      id: "123abc",
      title: "Que signifie l'acronyme TDD ?",
      possibleAnswers: {
        A: "Test-Driven Development",
        B: "Test-Dodo Development",
        C: "Thunk-Driven Development",
        D: "Test-Driven Design",
      },
    };
  });

  it("should validate a wrong answer", async () => {
    questionGateway.answerValidation = {
      givenAnswerId: "B",
      rightAnswerId: "A",
    };
    await store.dispatch(validateAnswer("123abc", "B"));
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      validateAnswer: {
        givenAnswerId: "B",
        rightAnswerId: "A",
      },
    });
  });
});
