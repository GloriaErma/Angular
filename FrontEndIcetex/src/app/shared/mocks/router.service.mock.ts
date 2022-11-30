import { of } from 'rxjs';

export class RouterMockService {
  public events = { filter : () => of({}) };
  public navigate() {
    return;
  }
}
