export interface IObservableToPromise {
  parse(observable: any): Promise<any>
}
