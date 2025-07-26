import { Observable } from './Observable'

export class OneTimeObservable<T> extends Observable<T> {
  protected notify(state: T) {
    super.notify(state)
    this.clear()
  }
}
