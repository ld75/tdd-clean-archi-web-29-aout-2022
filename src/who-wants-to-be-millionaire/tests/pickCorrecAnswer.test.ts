import { AppState } from "../store/appState";
import {ReduxStore, AppThunk, initReduxStore} from "../store/reduxStore";
import {validateAnswerUsecase} from "../hexagon/use-cases/validateAnswerUsecase";
import {QuestionGateway} from "../hexagon/gateways/questionGateway";
import {Question} from "../hexagon/entities/question";
import {HttpQuestionGateway} from "../adapters/secondary/gateways/httpQuestionGateway";
import {Answer} from "../hexagon/entities/answer";

let initialstate:AppState;

class InMemOryValidatorGateway extends HttpQuestionGateway{
    public correctAnswer!:string;
    async getCorrectAnswer(questionid:string,givenAnswer: string):  Promise<Record<string,string>> {
        let res:Record<string,string> = {};
        res[questionid]=this.correctAnswer
        return res;
    }
    set setCorrectAnswer(correctAnswser:string){
        this.correctAnswer=correctAnswser;
    }
}

describe("getCorrectAnswer", () => {
    let store: ReduxStore;
    let validatorGatewayMock:InMemOryValidatorGateway=new InMemOryValidatorGateway();
    beforeEach(() => {
        store = initReduxStore({questionGatewayInstance:validatorGatewayMock})
        initialstate=store.getState()
    });
    it('noAnswerchoosenYet_getCorrectAnswser_NothingHappens', function () {
        expect(store.getState()).toEqual<AppState>({
            ...initialstate,
            validateAnswerState:{
                answer:{
                    givenAnswer:null,
                    correctAnswer:null
                }
            }
        });
        //store.dispatch(getCorrectAnswer())
        expect(store.getState().validateAnswerState.answer?.correctAnswer).toBeNull()
        expect(store.getState().validateAnswerState.answer?.givenAnswer).toBeNull()
    });


    it("IdQuestionPresentInState_getAnswer_AnswerReturned", async () => {
        //store.dispatch({type:'PICK_RETURNED_QUESTION',payload:{nbr:"1"}})
        let givenQuestion="1";
        let givenAnswer="A";
        let theCorrectAnswer="B";
        validatorGatewayMock.setCorrectAnswer=theCorrectAnswer
        store.dispatch({type:"PICK_RETURNED_QUESTION",payload:{question:{id:givenQuestion}}});
        initialstate=store.getState();
        await store.dispatch(validateAnswerUsecase(givenAnswer));
        expect(store.getState()).toEqual<AppState>({
            ...initialstate,
            validateAnswerState:{
                    answer: {
                        givenAnswer: givenAnswer,
                        correctAnswer: theCorrectAnswer
                    }
            }
            });
    });

});
