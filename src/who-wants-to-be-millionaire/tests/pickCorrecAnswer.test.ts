import { AppState } from "../store/appState";
import {ReduxStore, AppThunk, initReduxStore} from "../store/reduxStore";
import {validateAnswerUsecase} from "../hexagon/use-cases/validateAnswerUsecase";
import {HttpQuestionGateway} from "../adapters/secondary/gateways/httpQuestionGateway";
import {Question} from "../hexagon/entities/question";
import {TimerMock} from "./mocks/timerMock";

let initialstate:AppState;

class InMemOryValidatorGateway extends HttpQuestionGateway{
    nbrquestion:number=0;
    public correctAnswer!:string;
    async getCorrectAnswer(questionid:string,givenAnswer: string):  Promise<Record<string,string>> {
        let res:Record<string,string> = {};
        res[questionid]=this.correctAnswer
        return res;
    }
    set setCorrectAnswer(correctAnswser:string){
        this.correctAnswer=correctAnswser;
    }
    getNextQuestion(): Promise<Question> {
        this.nbrquestion++;
        if (this.nbrquestion<1) return super.getNextQuestion();
        else  return Promise.resolve({id:"2",demande:"deuxiemequestion",possibleAnswers:{"a":"toto","b":"titi"}});
    }
}

describe("getCorrectAnswer", () => {
    let store: ReduxStore;
    let validatorGatewayMock:InMemOryValidatorGateway=new InMemOryValidatorGateway();
    beforeEach(() => {
        store = initReduxStore({questionGatewayInstance:validatorGatewayMock,timer:new TimerMock()})
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
    it("CorrectAnswerGiven_validateAnswer_pickNextQuestion", async () => {
        let givenQuestion="1";
        let givenAnswer="A";
        let theCorrectAnswer="A";
        console.log("putain1-0")
        store.dispatch({type:'PICK_RETURNED_QUESTION',payload:{question:{id:givenQuestion}}})
        validatorGatewayMock.setCorrectAnswer=theCorrectAnswer
        await store.dispatch(validateAnswerUsecase(givenAnswer));
        expect(store.getState()).toEqual<AppState>({
            ...initialstate,
            pickQuestionState: {
                question: {
                    id: "2",
                    demande: "deuxiemequestion",
                    possibleAnswers: {"a": "toto", "b": "titi"}
                }
            }
            ,
            pyramidState: {
                pyramid: {
                    valeur: 1
                }
            }
        });
    });

});
