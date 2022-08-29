import { initReduxStore, ReduxStore } from "../../../store/reduxStore";
import { AppState } from "../../../store/appState";
import { pickQuestion } from "./pickQuestion";
import { InMemoryQuestionGateway } from "../../../adapters/secondary/gateways/inMemoryQuestionGateway";

describe("Pick the next question", () => {
  let store: ReduxStore;
  let initialState: AppState;
  let questionGateway: InMemoryQuestionGateway;

  beforeEach(() => {
    questionGateway = new InMemoryQuestionGateway();
    store = initReduxStore({ questionGateway });
    initialState = store.getState();
  });

  it("should not have picked any question initially", () => {
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      pickQuestion: {
        question: null,
      },
    });
  });

  it("should not validate any answer yet after question retrieval", () => {
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      pickQuestion: {
        question: null,
      },
      validateAnswer: {
        givenAnswerId: null,
        rightAnswerId: null,
      },
    });
  });

  it("should pick one random question from the questions pool", async () => {
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
    await store.dispatch(pickQuestion());
    expect(store.getState()).toEqual({
      ...initialState,
      pickQuestion: {
        question: {
          id: "123abc",
          title: "Que signifie l'acronyme TDD ?",
          possibleAnswers: {
            A: "Test-Driven Development",
            B: "Test-Dodo Development",
            C: "Thunk-Driven Development",
            D: "Test-Driven Design",
          },
        },
      },
    });
  });
});
