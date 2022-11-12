import {ITimer} from "../../hexagon/gateways/iTimer";

export class TimerMock implements ITimer{
    setTimeout(methode: Function, millisec: number): Promise<void> {
        methode();
        return Promise.resolve();
    }

}