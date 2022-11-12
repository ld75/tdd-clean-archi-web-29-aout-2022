import { AppState } from "../store/appState";
import {ReduxStore, AppThunk, initReduxStore} from "../store/reduxStore";
import {validateAnswerUsecase} from "../hexagon/use-cases/validateAnswerUsecase";
import {QuestionGateway} from "../hexagon/gateways/questionGateway";
import {Question} from "../hexagon/entities/question";
import {HttpQuestionGateway} from "../adapters/secondary/gateways/httpQuestionGateway";
import {Answer} from "../hexagon/entities/answer";
import {Pyramid} from "../hexagon/entities/pyramid";
import {TimerMock} from "./mocks/timerMock";

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

describe("pyramid updates", () => {
    let store: ReduxStore;
    let validatorGatewayMock:InMemOryValidatorGateway=new InMemOryValidatorGateway();
    beforeEach(() => {
        store = initReduxStore({questionGatewayInstance:validatorGatewayMock,timer:new TimerMock()})
        initialstate=store.getState()
    });
    it('wrongAnswer_validateAnswer_PyramidStaysEqual', function () {
        validatorGatewayMock.setCorrectAnswer="goodanswer";
        store.dispatch({type:"PICK_RETURNED_QUESTION",payload:{question:{id:"unequestion"}}});
        store.dispatch(validateAnswerUsecase("wronganswer"))
        expect(store.getState().pyramidState.pyramid).toEqual<Pyramid>(
            {valeur:0}
        );
    });
    it('rightAnswer_validateAnswer_PyramidgoesUp', async function  () {
        validatorGatewayMock.setCorrectAnswer="goodanswer";
        store.dispatch({type:"PICK_RETURNED_QUESTION",payload:{question:{id:"unequestion"}}});
        await store.dispatch(validateAnswerUsecase("goodanswer"))
        expect(store.getState().pyramidState.pyramid).toEqual<Pyramid>(
            {valeur:1}
        );
    });
    it('firstRightAnswerThenWring_validateAnswer_PyramidIsOne', async function  () {
        validatorGatewayMock.setCorrectAnswer="goodanswer";
        store.dispatch({type:"PICK_RETURNED_QUESTION",payload:{question:{id:"unequestion"}}});
        store.dispatch({type:"INCREASE_PYRAMID",payload:{pyramid:{valeur:1}}});
        await store.dispatch(validateAnswerUsecase("wronganswer"))
        expect(store.getState().pyramidState.pyramid).toEqual<Pyramid>(
            {valeur:1}
        );
    });
});
