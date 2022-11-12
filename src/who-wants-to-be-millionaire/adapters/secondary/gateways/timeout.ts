import {ITimer} from "../../../hexagon/gateways/iTimer";

export class Timeout implements ITimer{
    setTimeout(methode: Function, millisec: number): Promise<void> {
                return new Promise((resolve)=>{
                setTimeout(methode,millisec);
                return resolve();
            }
        )
    }

}