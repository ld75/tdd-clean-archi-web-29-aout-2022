import { initReduxStore, ReduxStore } from "../../store/reduxStore";
import { AppState } from "../../store/appState";
import { pickQuestion } from "./pickQuestion";
import { InMemoryQuestionGateway } from "../../adapters/secondary/gateways/inMemoryQuestionGateway";

describe("Pick the next question", () => {
  let store: ReduxStore;
  let questionGateway: InMemoryQuestionGateway;

  beforeEach(() => {
    questionGateway = new InMemoryQuestionGateway();
    store = initReduxStore({ questionGateway });
  });

  it("should not have picked any question initially", () => {
    expect(store.getState()).toEqual<AppState>({
      pickQuestion: {
        question: null,
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
