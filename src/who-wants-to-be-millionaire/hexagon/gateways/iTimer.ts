export interface ITimer{
    setTimeout(methode:Function,millisec: number): Promise<void>;
}