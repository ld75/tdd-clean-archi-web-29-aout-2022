import { initReduxStore, ReduxStore } from "../../../store/reduxStore";
import { AppState } from "../../../store/appState";
import { validateAnswer } from "./validateAnswer";
import { InMemoryQuestionGateway } from "../../../adapters/secondary/gateways/inMemoryQuestionGateway";
import { pickQuestion } from "../question-picker/pickQuestion";
import { FakeTaskWaiter } from "../../../adapters/secondary/gateways/fakeTaskWaiter";

describe("Answer validation", () => {
  let store: ReduxStore;
  let initialState: AppState;
  let questionGateway: InMemoryQuestionGateway;
  let taskWaiter: FakeTaskWaiter;

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
  const question2 = {
    id: "456def",
    title: "Que signifie l'acronyme DDD ?",
    possibleAnswers: {
      A: "Dest-Driven Development",
      B: "Dest-Dodo Development",
      C: "Dhunk-Driven Development",
      D: "Domain-Driven Design",
    },
  };

  beforeEach(() => {
    questionGateway = new InMemoryQuestionGateway();
    taskWaiter = new FakeTaskWaiter();
    store = initReduxStore({ questionGateway, taskWaiter });
    initialState = store.getState();
    questionGateway.nextQuestions = [question, question2];
    store.dispatch(pickQuestion());
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

  /*it("should pick the next question after a good answer and some amount of time", async () => {
    questionGateway.answerValidation = {
      rightAnswerId: "A",
    };
    taskWaiter.currentDelay = 3000;
    await store.dispatch(validateAnswer("A"));
    expect(store.getState()).toEqual<AppState>({
      ...initialState,
      pickQuestion: {
        question: question2,
      },
      pyramid: {
        step: 1,
      },
      validateAnswer: {
        givenAnswerId: "A",
        rightAnswerId: "A",
      },
    });
  });*/
});
